// Tic Tac Toe - Game

const statusDisplay = document.querySelector('.status')

let currentPlayer = 'X'
let gameActive = true;
let cells = ['', '', '', '', '', '', '', '', '']

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn()

const playerIcons = {
    'X':  '<i class="fa-solid fa-xmark"></i>',
    'O': '<i class="fa-regular fa-circle"></i>'
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    cells[clickedCellIndex] = currentPlayer
    clickedCell.innerHTML = playerIcons[currentPlayer]
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    statusDisplay.innerHTML = currentPlayerTurn()
}

function handleResultValidation() {
    let roundWon = false;

    for(let i = 0; i < 8; i++) {
        const winCondition = winningConditions[i];
        const a = cells[winCondition[0]];
        const b = cells[winCondition[1]];
        const c = cells[winCondition[2]];
        if(a === '' || b === '' || c === '')
            continue;
        if(a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if(roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    const roundDraw = !cells.includes('')

    if(roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange() 
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = clickedCell.getAttribute('data-cell-index')

    if(cells[clickedCellIndex] !== ''||  !gameActive)
        return;

    handleCellPlayed(clickedCell,clickedCellIndex)
    handleResultValidation()
}

function handleRestartGame(){ 
    gameActive = true;
    currentPlayer = 'X'
    cells = ['', '', '', '', '', '', '', '', '']
    statusDisplay.innerHTML = currentPlayerTurn()
    document.querySelectorAll('.cell').forEach( cell => cell.innerHTML = '');
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick))
document.querySelector('.button').addEventListener('click',handleRestartGame)