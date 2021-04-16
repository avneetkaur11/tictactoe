const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle' //so that we can easily use these strings throughout the aplication without having a duplicate them all

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


//it selects all the cells
const cellElements = document.querySelectorAll('[data-cell]')


const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

//if this variable is true, its circle;s turn and if false, then X;s turn
//so we can easily determine which class is using by checking whose turn 
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    
    //every time we click on the cell it add the eventlistener
    //this handleClick function called only 1 time when the cell is clicked
    //simply, when we click on the cell , its only fires the eventlistener once
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, {once:true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
     //console.log('click');
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

    //placeMark
    placeMark(cell, currentClass) //function used to pass the current cell and the current class

    //check for win
    if (checkWin(currentClass)) {
        // console.log('winner');
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
    //check for draw
    //switch turns
    
    
}

function endGame(draw) {
    if (draw) {
        winningMessageElement.innerText = 'Draw!'
        
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }

    winningMessageElement.classList.add('show')    
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
    
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
    
}