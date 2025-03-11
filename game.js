const scoreElem = document.querySelector(".score")
const scorePlayer2 = document.querySelector(".score2")
const rollButtons = document.querySelectorAll(".btn-danger")
const redemptionButtons = document.querySelectorAll(".btn-success")
const imgDiceElems = document.querySelectorAll(".dice")

let rScore = 0
let rScore2 = 0
let isPlaying = 0
const WINNING_SCORE = 100

function rollDice(playerIndex) {
    if (playerIndex !== isPlaying) return

    let randomDices = Math.ceil(Math.random() * 6)

    imgDiceElems[playerIndex].classList.add("rolling")

    setTimeout(() => {
        imgDiceElems[playerIndex].src = `./images/${randomDices}.jpg`
        imgDiceElems[playerIndex].alt = `A dice that rolled a ${randomDices}`
        imgDiceElems[playerIndex].classList.remove("rolling")

        if (randomDices === 1) {
            if (playerIndex === 0) {
                rScore = 0
                scoreElem.textContent = rScore
            } else {
                rScore2 = 0
                scorePlayer2.textContent = rScore2
            }
            switchTurn()
        } else {
            if (playerIndex === 0) {
                rScore += randomDices
                scoreElem.textContent = rScore
                checkWinner(0)
            } else {
                rScore2 += randomDices
                scorePlayer2.textContent = rScore2
                checkWinner(1)
            }
        }
    }, 800)
}



function switchTurn() {
    isPlaying = isPlaying === 0 ? 1 : 0
    updateButtonStates()
}

function redeemPoints(playerIndex) {
    if (playerIndex !== isPlaying) return
    switchTurn()
}

function updateButtonStates() {
    rollButtons[0].disabled = isPlaying !== 0
    rollButtons[1].disabled = isPlaying !== 1
    redemptionButtons[0].disabled = isPlaying !== 0
    redemptionButtons[1].disabled = isPlaying !== 1
}

function resetGame() {
    rScore = 0
    rScore2 = 0
    scoreElem.textContent = rScore
    scorePlayer2.textContent = rScore2
    isPlaying = 0
    updateButtonStates()
}

rollButtons.forEach((button, index) => {
    button.addEventListener("click", () => rollDice(index))
})

redemptionButtons.forEach((button, index) => {
    button.addEventListener("click", () => redeemPoints(index))
})

function checkWinner(playerIndex) {
    if (playerIndex === 0 && rScore >= WINNING_SCORE) {
        alert("🎉 Player 1 Wins! 🏆")
        resetGame()
    } else if (playerIndex === 1 && rScore2 >= WINNING_SCORE) {
        alert("🎉 Player 2 Wins! 🏆")
        resetGame()
    }
}

updateButtonStates()
