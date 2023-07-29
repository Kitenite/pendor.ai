

import { CLICK_IDENTIFIER } from '$lib';
import puppeteer from 'puppeteer';

export async function GET({ url }) {
    const contentUrl = url.searchParams.get('url') ?? 'https://kit.svelte.dev/'
    const browser = await puppeteer.launch({headless: true});
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
            document.addEventListener('click', function (event) {
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
                    styleString += \`\${prop}: \${styles.getPropertyValue(prop)}; \`;
                });

                // Create an element with ID to attach the styles
                const elementId = 'clicked-element';
                event.target.id = elementId;
                // Wrap the style string in a style tag, specific to that element
                const styleTag = \`#\${elementId} { \${styleString} }\`;
    
                const message = {
                    type: '${CLICK_IDENTIFIER}',
                    html: event.target.outerHTML,
                    css: styleTag
                };
                window.parent.postMessage(message, '*');
            }, false);

            document.addEventListener('mouseover', function(event) {
                event.target.style.border = "3px solid red";
                event.target.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
                event.target.style.outline = "3px solid red";
                event.target.style.boxShadow = "0 0 10px red";
                event.target.style.cursor = "pointer";
            }, false);

            document.addEventListener('mouseout', function(event) {
                event.target.style.border = "";
                event.target.style.backgroundColor = "";
                event.target.style.outline = "";
                event.target.style.boxShadow = "";
                event.target.style.cursor = "";
            }, false);
        </script>
    `;

    content = content.replace('</body>', `${trackingScript}</body>`);
    content = content.replace('<head>', `<head>${tailwindScript}<style>${cssData}</style>`);  // Inject CSS here

    return new Response(content, { headers: { 'Content-Type': 'text/html' } });
}
