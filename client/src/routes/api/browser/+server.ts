import puppeteer from 'puppeteer';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const BROWSERLESS_TOKEN = process.env.BROWSERLESS_TOKEN;



const embeddedTrackingFunction = () => {
    const applyHighlightStyles = (event) => {
        // Store the original styles
        event.target.dataset.originalBorder = event.target.style.border;
        event.target.dataset.originalBackgroundColor = event.target.style.backgroundColor;
        event.target.dataset.originalOutline = event.target.style.outline;
        event.target.dataset.originalBoxShadow = event.target.style.boxShadow;
        event.target.dataset.originalCursor = event.target.style.cursor;
    
        // Apply hover styles
        event.target.style.border = "3px solid red";
        event.target.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
        event.target.style.outline = "3px solid red";
        event.target.style.boxShadow = "0 0 10px red";
        event.target.style.cursor = "pointer";
    }   
    
    const restoreOriginalStyles = (event) => {
        // Restore the original styles from the stored data
        event.target.style.border = event.target.dataset.originalBorder || "";
        event.target.style.backgroundColor = event.target.dataset.originalBackgroundColor || "";
        event.target.style.outline = event.target.dataset.originalOutline || "";
        event.target.style.boxShadow = event.target.dataset.originalBoxShadow || "";
        event.target.style.cursor = event.target.dataset.originalCursor || "";
    }

    // Everything in here needs to be a string, no imports allowed
    const clickHandler = (event) => {
        event.preventDefault();
    
        // Mirror restoreOriginalStyles. Has to be replicated here because no imports are allowed
        restoreOriginalStyles(event);
    
        // Get all computed styles of the clicked element
        const styles = window.getComputedStyle(event.target);
        let styleString = '';
        const relevantStyles = [
            'width', 'height', 'color', 'background-color', 
            'border', 'border-radius', 'border-top', 'border-right', 'border-bottom', 'border-left',
            'font-size', 'font-weight', 'font-style', 'font-family', 'text-transform',
            'letter-spacing', 'line-height', 'text-decoration',
            'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
            'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
            'display', 'position', 'top', 'right', 'bottom', 'left',
            'flex', 'flex-direction', 'flex-wrap', 'flex-flow', 'flex-shrink', 'flex-grow', 'flex-basis',
            'align-items', 'align-content', 'align-self',
            'justify-content', 'justify-items', 'justify-self',
            'grid-template-columns', 'grid-template-rows', 'grid-template-areas',
            'grid-auto-columns', 'grid-auto-rows', 'grid-auto-flow',
            'grid-column-start', 'grid-column-end', 'grid-row-start', 'grid-row-end',
            'order', 'z-index', 'cursor', 'box-shadow', 'opacity', 
            'transform', 'transition', 'animation', 'object-fit', 'object-position',
            'overflow', 'overflow-x', 'overflow-y', 'visibility', 
            'white-space', 'word-spacing', 'vertical-align',
            'background-image', 'background-size', 'background-repeat', 'background-position'
        ];

        relevantStyles.forEach(prop => {
            const value = styles.getPropertyValue(prop);
            if(value) {
                styleString += `${prop}: ${value}; `;
            }
        });
        
        // Create an element with ID to attach the styles
        const elementId = 'CLICKED_ELEMENT_ID';
        event.target.id = elementId;
    
        // Wrap the style string in a style tag, specific to that element
        const styleTag = `#${elementId} { ${styleString} }`;
    
        const message = {
            type: 'CLICK_IDENTIFIER', 
            html: event.target.outerHTML,
            css: styleTag
        };
        window.parent.postMessage(message, '*');
    }
    

    const mouseoverHandler = (event) => {
        applyHighlightStyles(event);
    }

    const mouseoutHandler = (event) => {
        restoreOriginalStyles(event);
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
