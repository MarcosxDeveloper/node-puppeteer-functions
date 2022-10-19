const puppeteer = require("puppeteer");

module.exports = async function (context, req) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(req.body);
    const pdf = await page.pdf();
    await browser.close();

    context.res = {
        body: pdf,
        headers: {
            "content-type": "application/pdf"
        }
    };
};