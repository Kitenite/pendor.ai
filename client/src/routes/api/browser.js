import puppeteer from 'puppeteer';

export async function get(req, res) {
    const { url } = req.query;
  
    if (!url) {
        return res.status(400).json({ message: 'URL query parameter is required' });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle0' });
    const content = await page.content();
    await browser.close();

    res.status(200).json({ content });
}
