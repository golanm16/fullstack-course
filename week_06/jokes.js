const randJokeLink = 'https://api.icndb.com/jokes/random/';
const jokeByIdLink = 'https://api.icndb.com/jokes/';


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

function getDeletedJokes() {
    if (!localStorage.deleted) {
        localStorage.deleted = JSON.stringify([]);
    }
    return JSON.parse(localStorage.deleted);
}

function setDeletedJokes(deleted) {
    return localStorage.deleted = JSON.stringify(deleted)
}

async function getJokeById(id) {
    const link = `${jokeByIdLink}${id}${getNameForJokes()}`;
    let joke = await fetch(link)
        .then(v => v.text())
        .then(v => JSON.parse(v));
    if (joke.type == 'NoSuchQuoteException') {
        // throw `joke with id ${id} was not found in database`;
        const deleted = getDeletedJokes();
        if (!deleted.includes(id)) {
            deleted.push(id);
            setDeletedJokes(deleted);
        }
        joke = {
            value: {
                id: '-1',
                categories: [],
                joke: `joke with id ${id} was not found in database,\ndeleted jokes:${deleted}`
            }
        };
    }
    return joke.value;
}

async function getRandomJokes(number = 1) {
    const catLimit = [];
    for (const cat of await getCategories()) {
        (!document.getElementById(cat).checked) ? catLimit.push(cat) : '';
    }
    const catLimitStr = JSON.stringify(catLimit).replaceAll(`"`, ``);
    const link = `${randJokeLink}${number}?exclude=${catLimitStr}${getNameForJokes()}`;
    console.log(link);
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

function getNameForJokes() {
    const fName = document.getElementById('fName').value;
    const lName = document.getElementById('lName').value;
    return (fName ? `&firstName=${fName}` : "") + (lName ? `&lastName=${lName}` : "");
}

async function handleJokesBtn() {
    numOfJokes = document.getElementById('numOfJokes').value;
    if (numOfJokes < 0) {
        console.log('error: number of jokes cant be less than 0');
        return;
    }
    populateJokes(await getRandomJokes(numOfJokes));
}

async function handleJokeByIdBtn() {
    const jokeId = document.getElementById('jokeId').value;
    if (jokeId < 0) {
        console.log('error');
        return;
    }
    populateJokes([await getJokeById(jokeId)]);
}


function createCategoryElement(cat) {
    const catName = document.createElement('label');
    const catLi = document.createElement('li');
    const catcheck = document.createElement('input');
    catcheck.type = 'checkbox';
    catcheck.checked = true;
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

    textElem.innerText = joke.joke.replaceAll('&quot;', `"`);
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
    document.getElementById('getJokeByIdBtn').onclick = handleJokeByIdBtn;
    document.getElementById('clear').onclick = clearJokes;
}

main();