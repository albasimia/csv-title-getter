const carlo = require('carlo');
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser.
    const app = await carlo.launch({
        width: 500,
        height: 500,
    });

    // Terminate Node.js process on app window closing.
    app.on('exit', () => process.exit());

    // Tell carlo where your web files are located.
    app.serveFolder(path.join(__dirname, 'public'));

    // Expose 'env' function in the web environment.
    await app.exposeFunction('getPageTitle', getPageTitle);

    // Navigate to the main page of your app.
    await app.load('index.html');
})();

const getPageTitle = async (url) => {
    const browser = await puppeteer.launch({
        // headless: false
    })
    const page = await browser.newPage()
    await page.goto(url, {
        waitUntil: 'networkidle2',
    })
    const title = await page.evaluate(() => {
        return document.getElementsByTagName('title')[0].innerText
    })
    return title
}