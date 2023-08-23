import puppeteer from 'puppeteer';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const BROWSERLESS_TOKEN = process.env.BROWSERLESS_TOKEN;

const embeddedTrackingFunction = () => {
    const clickHandler = (event) => {
        event.preventDefault();
        event.target.style.border = "";
        event.target.style.backgroundColor = "";
        event.target.style.outline = "";
        event.target.style.boxShadow = "";
        event.target.style.cursor = "";
        
        // Get all computed styles of the clicked element
        const styles = window.getComputedStyle(event.target);
        let styleString = '';
        Array.from(styles).forEach(prop => {
            styleString += `${prop}: ${styles.getPropertyValue(prop)};`;
        });
    
        // Create an element with ID to attach the styles
        const elementId = 'CLICKED_ELEMENT_ID';
        event.target.id = elementId;
        // Wrap the style string in a style tag, specific to that element
        const styleTag = `#${elementId} { ${styleString} }`;
    
        const message = {
            type: 'CLICK_IDENTIFIER', // Has to be a string here, no imports allowed
            html: event.target.outerHTML,
            css: styleTag
        };
        window.parent.postMessage(message, '*');
    }

    const mouseoverHandler = (event) => {
        event.target.style.border = "3px solid red";
        event.target.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
        event.target.style.outline = "3px solid red";
        event.target.style.boxShadow = "0 0 10px red";
        event.target.style.cursor = "pointer";
    }

    const mouseoutHandler = (event) => {
        event.target.style.border = "";
        event.target.style.backgroundColor = "";
        event.target.style.outline = "";
        event.target.style.boxShadow = "";
        event.target.style.cursor = "";
    }

    document.addEventListener('click', clickHandler, false);
    document.addEventListener('mouseover', mouseoverHandler, false);
    document.addEventListener('mouseout', mouseoutHandler, false);
}

export async function GET({ url }) {
    const contentUrl = url.searchParams.get('url') ?? 'https://kit.svelte.dev/'
    const browser = await ( IS_PRODUCTION ?  
        puppeteer.connect({ browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_TOKEN}` })
        : puppeteer.launch({headless: true}));
    const page = await browser.newPage();

    // This will store the CSS data
    let cssData = '';

    // Set up request interception
    await page.setRequestInterception(true);
    page.on('request', interceptedRequest => {
        if (interceptedRequest.url().endsWith('.css')) {
            interceptedRequest.respond({
                status: 200,
                contentType: 'text/css',
                body: cssData
            });
        } else {
            interceptedRequest.continue();
        }
    });

    // Evaluate the page and get the inline CSS
    cssData = await page.evaluate(() => Array.from(document.styleSheets)
    .reduce((acc, sheet) => {
        if (sheet.href) {
            return acc;
        }

        try {
            return acc + Array.from(sheet.cssRules)
            .reduce((def, rule) => def + rule.cssText, '');
        } catch (e) {
            return acc;
        }
    }, ''));

    await page.goto(contentUrl, { waitUntil: 'networkidle0' });
    let content = await page.content();
    await browser.close();
    
    
    const tailwindScript = `<script src="https://cdn.tailwindcss.com"></script>`
    const trackingScript = `
        <script>
            (${embeddedTrackingFunction.toString()})();
        </script>
    `;

    content = content.replace('</body>', `${trackingScript}</body>`);
    content = content.replace('<head>', `<head>${tailwindScript}<style>${cssData}</style>`);  // Inject CSS here

    return new Response(content, { headers: { 'Content-Type': 'text/html' } });
}
