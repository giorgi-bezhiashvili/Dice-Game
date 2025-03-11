
const scoreElem = document.querySelector(".score")
const scorePlayer2 = document.querySelector(".score2")
const rollButtons = document.querySelectorAll(".btn-danger")
const redemptionButtons = document.querySelectorAll(".btn-success")
const imgDiceElems = document.querySelectorAll(".dice")


let rScore = 0
let rScore2 = 0
let isPlaying = 0 


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
            // Update the score normally
            if (playerIndex === 0) {
                rScore += randomDices
                scoreElem.textContent = rScore
            } else {
                rScore2 += randomDices
                scorePlayer2.textContent = rScore2
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

rollButtons.forEach((button, index) => {
    button.addEventListener("click", () => rollDice(index))
})

redemptionButtons.forEach((button, index) => {
    button.addEventListener("click", () => redeemPoints(index))
})

updateButtonStates()
