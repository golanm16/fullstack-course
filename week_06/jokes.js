const jokesApiLink = 'https://api.chucknorris.io/jokes';

async function getCategories() {
    const link = jokesApiLink + '/categories';
    console.log(link);
    const categories = await fetch(link)
        .then(v => v.text())
        .then(v => JSON.parse(v));
    return categories;
}

function clearJokes() {
    const jokes = document.getElementById('jokeRes');
    while (jokes.firstChild) {
        jokes.lastChild.remove();
    }
    console.trace('cleared');
}


async function getFilteredCategories() {
    let categoriesFiltered = [];
    const categories = await getCategories();
    for (const cat of categories) {
        (document.getElementById(cat).checked) ? categoriesFiltered.push(cat) : '';
    }
    if (categoriesFiltered.length !== 0 || categoriesFiltered.length != categories.length) {
        categoriesFiltered = 'category=' + String(categoriesFiltered)
    }
    return categoriesFiltered;
}

async function getRandomJokes(number = 1) {
    const jokes = [];
    for (let i = 0; i < number; i++) {
        const link = `${jokesApiLink}/random?${await getFilteredCategories()}&${getNameForJokes()}`;
        console.log(link);
        jokes.push(await fetch(link)
            .then(v => v.text())
            .then(v => JSON.parse(v)));
    }
    return jokes;
}

async function populateJoke(joke, board = document.getElementById('jokeRes')) {
    board.getElementsByTagName('tbody')[0].appendChild(createJokeElement(joke));
}

async function populateJokes(numOfJokes) {
    clearJokes();
    const jokesBoard = document.getElementById('jokeRes')

    jokesBoard.appendChild(document.createElement('thead'));
    const rowHead = document.createElement('tr');
    rowHead.className = 'joke';
    jokesBoard.getElementsByTagName('thead')[0].appendChild(rowHead);
    for (const key of ['joke', 'category']) {
        const head = document.createElement('td');
        head.innerText = key;
        rowHead.appendChild(head);
    }

    jokesBoard.appendChild(document.createElement('tbody'));
    const link = `${jokesApiLink}/random?${await getFilteredCategories()}&${getNameForJokes()}`;
    for (let i = 0; i < numOfJokes; i++) {
        const joke = await fetch(link)
            .then(v => v.text())
            .then(v => JSON.parse(v))
        populateJoke(joke, jokesBoard);

    }
}

async function populateCategories() {
    const categories = await getCategories();
    const catList = document.getElementById('catList')
    catList.innerHTML = '';

    for (const cat of categories) {
        catList.appendChild(createCategoryElement(cat));
    }
}

function getNameForJokes() {
    const customName = document.getElementById('customName').value;
    return customName ? `name=${customName}` : "";
}

async function handleJokesBtn() {
    numOfJokes = document.getElementById('numOfJokes').value;
    if (numOfJokes < 0) {
        console.log('error: number of jokes cant be less than 0');
        return;
    }

    // populateJokes(await getRandomJokes(numOfJokes));
    populateJokes(numOfJokes);
}

async function handleJokeByIdBtn() {
    const jokeId = document.getElementById('jokeId').value;
    if (jokeId < 0) {
        console.log('error');
        return;
    }
    populateJokes([await getJokeById(jokeId)]);
}



async function handleJokeSearch() {
    const searchStr = document.getElementById('jokeSearch').value;
    if (searchStr.length < 3) {
        console.log('need 3 chars at least to search');
        return;
    }
    // /search?query={query}

    const link = jokesApiLink + `/search?query=${searchStr}`;
    const resJokes = await fetch(link)
        .then(v => v.text())
        .then(v => JSON.parse(v));
    if (resJokes.total == 0) {
        populateJokes([{ value: `no jokes found with query '${searchStr}'`, categories: [] },]);
        return;
    }
    populateJokes(resJokes.result);
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
    /**
     * {"categories":[],
     * "created_at":"2020-01-05 13:42:21.795084",
     * "icon_url":"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
     * "id":"o97CPYB9TumQrkUlgZZMtg",
     * "updated_at":"2020-01-05 13:42:21.795084",
     * "url":"https://api.chucknorris.io/jokes/o97CPYB9TumQrkUlgZZMtg",
     * "value":"Chuck Norris puts the K in knife. This is to confuse his prey."}
     */

    // console.log(joke);
    const jokeDiv = document.createElement('tr');
    const idElem = document.createElement('td');
    const textElem = document.createElement('td');
    const categoriesDiv = document.createElement('td');
    jokeDiv.classList.add('joke');
    // textElem.classList.add('jokeText');

    textElem.innerText = joke.value.replaceAll('&quot;', `"`);
    // idElem.innerText = joke.id;
    categoriesDiv.innerText = joke.categories.length == 0 ? 'None' : joke.categories.join('\n');
    // jokeDiv.appendChild(idElem);
    jokeDiv.appendChild(textElem);
    jokeDiv.appendChild(categoriesDiv);
    return jokeDiv;
}

function main() {
    populateCategories();
    document.getElementById('getJokesBtn').onclick = handleJokesBtn;
    document.getElementById('jokeSearch').onchange = handleJokeSearch;
    document.getElementById('clear').onclick = clearJokes;
}

main();