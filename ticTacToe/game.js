let isCurrentPlayerX;
const score = [0, 0];
const rows = [[], [], []];


function getX() {
    const divX = document.createElement('div');
    divX.innerText = 'X';
    return divX;
}

function getO() {
    const divO = document.createElement('div');
    divO.innerText = 'O';
    return divO;
}

function checkIfWin(i, j) {
    // get only i, j to reduce calculations
    // box[i][j] is already not null so no need to check null 
    const rowWin = rows[i][0] == rows[i][1] && rows[i][0] == rows[i][2];
    const columnWin = rows[0][j] == rows[1][j] && rows[0][j] == rows[2][j];
    // check diagonal
    // only if remainder of i,j is not 1
    /*
    0,0 0,1 0,2
    1,0 1,1 1,2
    2,0 2,1 2,2
    */
    const ijremainder = Math.abs(i - j);
    const diagWin = ijremainder == 1 ? false :
        (ijremainder == 0) ? rows[0][0] == rows[1][1] && rows[0][0] == rows[2][2] :
            rows[2][0] == rows[1][1] && rows[2][0] == rows[0][2];
    return rowWin || columnWin || diagWin;
}

function restartGame() {
    this.remove();
    initGame();
}

function createOverlay(msg) {
    const elem = document.createElement('div');
    elem.id = 'overlay';
    elem.onclick = restartGame;
    elem.innerText = msg;
    return elem;
}

function handleWin() {
    let playerName = isCurrentPlayerX ? 'X' : 'O';
    isCurrentPlayerX ? score[0]++ : score[1]++;
    const playerElem = isCurrentPlayerX ? document.getElementById('playerx')
        : document.getElementById('playero');
    playerElem.getElementsByClassName('playerScore')[0].innerText = isCurrentPlayerX ? score[0] : score[1]
    console.log(score);
    let msg = `player ${playerName} has won the game!\n congratulations!
    press anywhere to restart game`;
    document.body.appendChild(createOverlay(msg));
}

function chooseNextPlayer() {
    isCurrentPlayerX = !isCurrentPlayerX;
}

function markBox(elem) {
    let i = elem.dataset.i;
    let j = elem.dataset.j;
    const boxMark = isCurrentPlayerX ? getX() : getO();
    elem.appendChild(boxMark);
    rows[i][j] = isCurrentPlayerX;
    checkIfWin(i, j) ? handleWin() : chooseNextPlayer();

}

function boxClicked(ev) {
    // if box is already selected and somehow the onclick wasnt removed
    if (this.className !== 'box notSelected') {
        return;
    }
    markBox(this);
    this.onClick = '';
    this.classList.remove('notSelected');

}

function createBoxElement(i, j) {
    const box = document.createElement('td');
    const boxDiv = document.createElement('div');
    box.appendChild(boxDiv);
    boxDiv.className = 'box notSelected';
    boxDiv.dataset.i = i;
    boxDiv.dataset.j = j;
    boxDiv.onclick = boxClicked;
    return box;
}

function initGame() {
    isCurrentPlayerX = true;
    const board = document.getElementById('board');
    board.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        // build row i
        const rowElements = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            // build the columns inside the row
            rows[i][j] = null;
            rowElements.appendChild(createBoxElement(i, j));
        }
        board.appendChild(rowElements);
    }
}



function main() {
    initGame();
}

main();