const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const cells = $$('.cell')
const restartBtn = $('.btn-restart')
const statusTxt = $('.status')
const playerScore = $('.player-score span')
const computerScore = $('.computer-score span')
let countPlayer1 = 0
let countPlayer2 = 0

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
    [0, 3, 6],
    [2, 5, 8]
]

let options = ["", "", "", "", "", "", "", "", ""]
let curPlayer = 'X'
let running = false

initializeGame()

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    restartBtn.onclick = () => restartcell()
    statusTxt.textContent = `Player 1 is turn`
    running = true
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex")

    if (options[cellIndex] != "" || !running) {
        return
    }

    updateCell(this, cellIndex)
    checkWinner()
}

function updateCell(cell, index) {
    options[index] = curPlayer;
    cell.textContent = curPlayer
}

function changePlayer() {
    curPlayer = curPlayer == "X" ? "O" : "X"
    if (curPlayer == "X") {
        statusTxt.textContent = `Player 1 is turn`
    }
    if (curPlayer == "O") {
        statusTxt.textContent = `Player 2 is turn`
    }
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i]
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true
            break
        }
    }
    if (roundWon) {
        if (curPlayer == "X") {            
            countPlayer1++
            playerScore.innerText = countPlayer1
            statusTxt.textContent = `Player 1 is win!`
            setTimeout(() => {
                restartcell()
            }, 1000)
            setTimeout(() => {
                if (countPlayer1 == 3) {
                    alert("Player 1 win!")
                    restartGame()
                }
            }, 500)
            
        }
        if (curPlayer == "O"){
            countPlayer2++
            computerScore.innerText = countPlayer2
            statusTxt.textContent = `Player 2 is win!`
            setTimeout(() => {
                restartcell()
            }, 1000)
            setTimeout(() => {
                if (countPlayer2 == 3) {
                    alert("Player 2 win!")
                    restartGame()
                }
            }, 500)
        }
        running = false
    } else if(!options.includes("")) {
        statusTxt.textContent = `Draw!`
        setTimeout(() => {
            restartcell()
        },1000)
        running = false
    } else {
        changePlayer()
    }
}

function restartcell() {
    curPlayer = 'X'
    options = ["", "", "", "", "", "", "", "", ""]
    statusTxt.textContent = `Player 1 is turn`
    cells.forEach(cell => cell.textContent = "")
    running = true
}

function restartGame() {
    curPlayer = 'X'
    options = ["", "", "", "", "", "", "", "", ""]
    statusTxt.textContent = `Player 1 is turn`
    cells.forEach(cell => cell.textContent = "")
    running = true
    countPlayer1 = 0
    countPlayer2 = 0
    playerScore.innerText = countPlayer1
    computerScore.innerText = countPlayer2
}
