import puppeteer from 'puppeteer';

export async function GET({ url }) {
    const contentUrl = url.searchParams.get('url') ?? 'https://kit.svelte.dev/'
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();

    await page.goto(contentUrl, { waitUntil: 'networkidle0' });
    const content = await page.content();
    await browser.close();

    return new Response(content)
}
