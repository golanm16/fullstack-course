const randJokeLink = 'https://api.icndb.com/jokes/random/';

function clearJokes() {
    const jokes = document.getElementById('jokeRes');
    while (jokes.firstChild) {
        jokes.lastChild.remove();
    }
    console.log('cleared');
}

async function getCategories() {
    const link = 'https://api.icndb.com/categories';
    const categories = await fetch(link)
        .then(v => v.text())
        .then(v => JSON.parse(v).value);
    return categories;
}

async function getRandomJokes(number = 1) {
    const link = randJokeLink + String(number);
    const jokes = await fetch(link)
        .then(v => v.text())
        .then(v => JSON.parse(v).value);
    return jokes;
}

async function populateJokes(jokes) {
    clearJokes();
    const jokesBoard = document.getElementById('jokeRes')
    jokesBoard.appendChild(document.createElement('thead'));
    jokesBoard.appendChild(document.createElement('tbody'));
    const rowHead = document.createElement('tr');
    rowHead.className = 'joke';
    for (const key of ['id', 'category', 'joke']) {
        const head = document.createElement('td');
        head.innerText = key;
        if (key == 'joke') {
            // head.classList.add('jokeText');
        }
        rowHead.appendChild(head);
    }
    jokesBoard.getElementsByTagName('thead')[0].appendChild(rowHead);

    for (const joke of jokes) {
        jokesBoard.getElementsByTagName('tbody')[0].appendChild(createJokeElement(joke));
    }
}

async function populateCategories() {
    const categories = await fetch('https://api.icndb.com/categories')
        .then(v => v.text())
        .then(v => JSON.parse(v).value);
    const catList = document.getElementById('catList')
    catList.innerHTML = '';

    for (const cat of categories) {
        catList.appendChild(createCategoryElement(cat));
    }
}

async function handleJokesBtn() {
    numOfJokes = document.getElementById('numOfJokes').value;
    if (numOfJokes < 0) {
        console.log('error: number of jokes cant be less than 0');
        return;
    }
    populateJokes(await getRandomJokes(numOfJokes));
}


function createCategoryElement(cat) {
    const catName = document.createElement('label');
    const catLi = document.createElement('li');
    const catcheck = document.createElement('input');
    catcheck.type = 'checkbox';
    catcheck.id = cat;
    catName.htmlFor = cat;
    catName.innerText = cat;
    catLi.appendChild(catcheck);
    catLi.appendChild(catName);
    return catLi;
}

function createJokeElement(joke) {
    const jokeDiv = document.createElement('tr');
    const idElem = document.createElement('td');
    const textElem = document.createElement('td');
    const categoriesDiv = document.createElement('td');
    jokeDiv.classList.add('joke');
    // textElem.classList.add('jokeText');

    textElem.innerText = joke.joke;
    idElem.innerText = joke.id;
    categoriesDiv.innerText = joke.categories.length == 0 ? 'None' : joke.categories.join('\n');
    jokeDiv.appendChild(idElem);
    jokeDiv.appendChild(categoriesDiv);
    jokeDiv.appendChild(textElem);
    return jokeDiv;
}

function main() {
    populateCategories();
    document.getElementById('getJokesBtn').onclick = handleJokesBtn;
    document.getElementById('clear').onclick = clearJokes;
}

main();