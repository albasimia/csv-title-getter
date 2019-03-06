const carlo = require('carlo');
const path = require('path');

let app
let page
let testPage

(async () => {
    // Launch the browser.
    app = await carlo.launch({
        width: 500,
        height: 500,
    });

    // Terminate Node.js process on app window closing.
    app.on('exit', () => process.exit());

    // Tell carlo where your web files are located.
    app.serveFolder(path.join(__dirname, 'public'));

    // Expose 'env' function in the web environment.
    await app.exposeFunction('getPageTitle', getPageTitle);
    await app.exposeFunction('createPage', createPage);
    await app.exposeFunction('closeWindow', closeWindow);

    // Navigate to the main page of your app.
    await app.load('index.html');
})();

const createPage = async () => {
    try {
        page = await app.createWindow()
        page.domContentLoadedCallback_ = () => {
            return false
        }
        testPage = await page.pageForTest()
    } catch (e) {
        console.error(e)
    }
}


const getPageTitle = async (url) => {
    await testPage.goto(url, {
        waitUntil: 'domcontentloaded',
    })
    const title = await testPage.evaluate(() => {
        return document.getElementsByTagName('title')[0].innerText
    })
    return title
}

const closeWindow = () =>{
    page.close()
}
