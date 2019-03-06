import {
    BASE_DIR
} from '../constants.yml'

document.querySelector('.wrapper').addEventListener('click', () => {
    console.log(`hello, ${sample.name}. Base directory is ${BASE_DIR}.`);
});

const doropArea = document.querySelector('.dropArea')
doropArea.addEventListener('drop', (e) => {
    e.preventDefault()
}, false)
doropArea.addEventListener('dragover', (e) => {
    e.preventDefault()
    doropArea.classList.add('dropOver')
}, false)
doropArea.addEventListener('dragleave', (e) => {
    e.preventDefault()
    doropArea.classList.remove('dropOver')
}, false)

doropArea.addEventListener('drop', async (e) => {
    e.preventDefault()
    doropArea.classList.remove('dropOver')

    try {
        const files = e.dataTransfer.files
        const reader = new FileReader();
        reader.onload = async (event) => {
            const lineArr = event.target.result.split("\n");
            await createPage();
            for (let i = 0; i < lineArr.length; i++) {
                await addUrl(lineArr[i])
            }
            closeWindow();
        }
        for (let p = 0; p < files.length; p++) {
            reader.readAsText(files[p])
        }
    } catch (e) {
        console.error(e)
    }
}, false)

const addUrl = (url) => {
    return new Promise(async (resolve, reject) => {
        const resultBody = document.querySelector('#result > tbody')
        const ele = document.createElement('tr')
        ele.innerText = await getPageTitle(url)
        resultBody.appendChild(ele)
        resolve(console.log('resolve!!', url))
    })
}