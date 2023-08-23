import puppeteer from 'puppeteer';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import css from 'css';

async function isScreenshotSame(page, html, cssString, originalScreenshot) {
    await page.setContent(`<style>${cssString}</style>${html}`);
    await page.waitForTimeout(100);  // Wait for the content to stabilize.
    const screenshot = await page.screenshot();    const img1 = PNG.sync.read(originalScreenshot);
    const img2 = PNG.sync.read(screenshot);

    const diff = new PNG({ width: img1.width, height: img1.height });
    const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: 0.1 });

    return numDiffPixels === 0;
}

async function checkRedundantCSS(html, cssString) {
    const parsedCSS = css.parse(cssString);
    const originalRules = [...parsedCSS.stylesheet.rules];

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    await page.setContent(`<style>${cssString}</style>${html}`);
    await page.waitForTimeout(1000);  // Wait for content to stabilize.
    const originalScreenshot = await page.screenshot();

    const redundantProperties = [];
    
    console.log(`Checking rules for redundant properties...`)
    
    for (let rule of originalRules) {
        if (rule.type !== 'rule') continue; // Only consider style rules

        for (let i = 0; i < rule.declarations.length; i++) {
            const originalDeclarations = [...rule.declarations];
            rule.declarations = rule.declarations.filter((_, index) => index !== i);

            const modifiedCSS = css.stringify(parsedCSS);

            const isSame = await isScreenshotSame(page, html, modifiedCSS, originalScreenshot);
            if (isSame) {
                redundantProperties.push(originalDeclarations[i]);
                console.log(`Found redundant property: ${originalDeclarations[i].property}: ${originalDeclarations[i].value}`);
            } else {
                console.log(`Property ${originalDeclarations[i].property}: ${originalDeclarations[i].value} is not redundant.`);
            }

            // Restore the original declarations
            rule.declarations = originalDeclarations;
        }
    }

    await browser.close();

    console.log(`Found ${redundantProperties.length} redundant properties from ${originalRules.length} rules.`);
    console.log(`Removing redundant properties...`);

    for (let rule of parsedCSS.stylesheet.rules) {
        if (rule.type !== 'rule') continue;
        rule.declarations = rule.declarations.filter(declaration => 
            !redundantProperties.includes(declaration)
        );
    }

    const cleanedCSS = css.stringify(parsedCSS);
    return {
        redundantProperties,
        cleanedCSS
    };
}

export async function POST({ request }) {
    const body = await request.json();
    const html = body.html;
    const cssString = body.css;
    try {
        const { redundantProperties, cleanedCSS } = await checkRedundantCSS(html, cssString);
        const responseBody = {
            redundantProperties: redundantProperties.map(prop => `${prop.property}: ${prop.value}`),
            cleanedCSS
        };

        console.log(`Returning response: ${JSON.stringify(responseBody)}`);

        return new Response(JSON.stringify(responseBody), { status: 200 });
    } catch (err) {
        console.error(`Error checking redundancy: ${err}`);
        return new Response(`Error: ${err}`, { status: 500 });
    }
}
