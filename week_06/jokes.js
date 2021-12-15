const randJokeLink = 'https://api.icndb.com/jokes/random/';

function clearJokes() {
    document.getElementById('jokeRes').innerHTML = 'no jokes';
    console.log('cleared');
}

function getCategories() {

}

async function getRandomJokes(number = 1) {
    const link = randJokeLink + String(number);
    console.log(link);
    const jokes = await fetch(link)
        .then(v => v.text())
        .then(v => JSON.parse(v).value);
    return jokes;
}

async function populateJokes(jokes) {
    const jokesBoard = document.getElementById('jokeRes')
    jokesBoard.innerHTML = '';
    for (const joke of jokes) {
        jokesBoard.appendChild(createJokeElement(joke));
    }
}

async function handleJokesBtn() {
    numOfJokes = document.getElementById('numOfJokes').value;
    if (numOfJokes < 0) {
        console.log('error');
        return;
    }
    populateJokes(await getRandomJokes(numOfJokes));
}


function createJokeElement(joke) {
    const idElem = document.createElement('text');
    const textElem = document.createElement('text');
    const jokeDiv = document.createElement('div');
    const categoriesDiv = document.createElement('div');
    jokeDiv.classList.add('joke');
    textElem.innerText = joke.id;
    idElem.innerText = joke.joke;
    for (const cat of joke.categories) {
        const catElem = document.createElement('text');
        catElem.innerText = cat;
        categoriesDiv.appendChild(catElem)
    }
    jokeDiv.appendChild(textElem);
    jokeDiv.appendChild(categoriesDiv);
    jokeDiv.appendChild(idElem);
    return jokeDiv;
}

function main() {
    document.getElementById('getJokesBtn').onclick = handleJokesBtn;
    document.getElementById('clear').onclick = clearJokes;
}

main();