import {
    BASE_DIR
} from '../constants.yml'

document.querySelector('.wrapper').addEventListener('click', () => {
    console.log(`hello, ${sample.name}. Base directory is ${BASE_DIR}.`);
});

document.querySelector('#submit').addEventListener('click', async (e) => {
    const url = document.querySelector('#url').value
    document.querySelector('#title').innerText = await getPageTitle(url)
    return false
})

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
doropArea.addEventListener('drop', (e) => {
    e.preventDefault()
    doropArea.classList.remove('dropOver')

    const resultBody = document.querySelector('#result > tbody')
    const files = e.dataTransfer.files
    const reader = new FileReader();
    reader.onload = (event) => {
        // " "ごとに分割して配列化
        const lineArr = event.target.result.split("\n");
        // 行と列の二次元配列にする
        const itemArr = [];
        for (let i = 0; i < lineArr.length; i++) {
            itemArr[i] = lineArr[i].split(",");
        }
        // tableタグで出力
        let insert = '';
        for (let i = 0; i < itemArr.length; i++) {
            insert += '<tr>';
            for (let j = 0; j < itemArr[i].length; j++) {
                insert += '<td>' + itemArr[i][j] + '</td>';
            }
            insert += '</tr>';
        }
        resultBody.innerHTML = insert
    }
    for (let p = 0; p < files.length; p++) {
        reader.readAsText(files[p])
    }
}, false)