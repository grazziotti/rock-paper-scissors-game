// modal variables
const modal = document.querySelector('.modal-fullscreen')
const rulesBtn = document.querySelector('.rules-btn') 
const closeModalBtn = document.querySelector('.modal__container__close-btn')

// game variables
const gameContainer = document.querySelector('.game')
let score = 0



// modal 
const closeModal = () => {
    modal.classList.remove('modal--show')
    setTimeout( () => modal.classList.remove('modal--open'), 500)
}
closeModalBtn.addEventListener('click', closeModal)

const openModal = () => {
    modal.classList.add('modal--open')
    setTimeout( () => modal.classList.add('modal--show'), 20)
}
rulesBtn.addEventListener('click', openModal)



// game
const showPickingScreen = () => {
    const div = document.createElement('div')
    div.classList.add('picking-container')
    div.innerHTML = `
        <div data-picking="paper" class="picking picking--paper">
            <div class="picking__img-container">
                <img src="./assets/images/icon-paper.svg" alt="Picking image">
            </div>
        </div>
        <div data-picking="scissors" class="picking picking--scissors">   
            <div class="picking__img-container">
                <img src="./assets/images/icon-scissors.svg" alt="Picking image">
            </div>
        </div>
        <div data-picking="rock" class="picking picking--rock">
            <div class="picking__img-container">
                <img src="./assets/images/icon-rock.svg" alt="Picking image">
            </div>
        </div>
    `
    gameContainer.appendChild(div)
}

const clearGameScreen = () => gameContainer.innerHTML = ''

const init = () => {
    clearGameScreen()
    showPickingScreen()
    
    const gamePickings = document.querySelectorAll('.picking')

    gamePickings.forEach( gameOption => {
        gameOption.addEventListener('click', game)
    })

}

const updateScore = result => {
    const scoreBoard = document.querySelector('.score__board__number')
    
    switch (result) {
        case 'you win':
            score++
            break
        case 'you lose':
            score--
            break
    }
    
    scoreBoard.innerText = score
}

const showResult = result => {
    const resultContainer = document.createElement('div')
    resultContainer.classList.add('result')
    resultContainer.innerHTML = `
        <h1 class="result__msg">${result}</h1>
        <button class="result__btn">play again</button>
    `

    const playAgainBtn = resultContainer.querySelector('.result__btn')
    playAgainBtn.addEventListener('click', init)

    gameContainer.appendChild(resultContainer)

    setTimeout(() => resultContainer.classList.add('result--show'), 10)

    const comparisonContainer = document.querySelector('.comparison')
    comparisonContainer.classList.add('comparison--result')

    switch (result) {
        case 'you win':
            const playerPickContainer = document.querySelector('.comparison__pick:first-child .picking')
            playerPickContainer.classList.add('picking--winner')
            break
        case 'you lose':
            setTimeout( () => {
                const computerPickContainer = document.querySelector('.comparison__pick:last-child .picking')
                computerPickContainer.classList.add('picking--winner')
            }, 20)
            break
    }
}

const getResult = (playerPick, computerPick) => {
    if (playerPick === computerPick) return 'tie'

    if (
        playerPick === 'paper' && computerPick === 'rock' || 
        playerPick === 'scissors' && computerPick === 'paper' ||  
        playerPick === 'rock' && computerPick === 'scissors') 
    {
        return 'you win'
    } else {
        return 'you lose'
    }
}

const showComputerPick = computerPick => {
    const computerPickContainer = document.querySelector('.picking--loading')
    computerPickContainer.classList.remove('picking--loading')
    computerPickContainer.classList.add(`picking--${computerPick}`)
    
    const computerPickContainerImg = computerPickContainer.querySelector('.picking__img-container img')
    computerPickContainerImg.src = `./assets/images/icon-${computerPick}.svg`
    computerPickContainerImg.alt = 'Picking image'
}

const getComputerPick = () => {
    const gamePickings = ['paper', 'rock', 'scissors', '']
    const index = Math.floor(Math.random() * 3)
    return gamePickings[index]
}

const showComparisonScreen = playerPick => {
    const comparisonContainer = document.createElement('div')
    comparisonContainer.classList.add('comparison')
    
    const playerPickContainer = document.createElement('div')
    playerPickContainer.classList.add('comparison__pick')
    playerPickContainer.innerHTML = `
        <p class="comparison__pick__heading">you picked</p>
        <div class="picking picking--${playerPick}">
            <div class="picking__img-container">
                <img src="./assets/images/icon-${playerPick}.svg" alt="Picking image">
            </div>
        </div>
    `

    const computerPickLoading = document.createElement('div')
    computerPickLoading.classList.add('comparison__pick')
    computerPickLoading.innerHTML = `
        <p class="comparison__pick__heading">the house picked</p>
        <div class="picking picking--loading">
            <div class="picking__img-container">
                <img src="" alt="">
            </div>
        </div>
    `

    comparisonContainer.appendChild(playerPickContainer)
    comparisonContainer.appendChild(computerPickLoading)

    gameContainer.appendChild(comparisonContainer)
}

const game = e => {
    const playerPick = e.target.closest('.picking').getAttribute('data-picking')
    const computerPick = getComputerPick()
    const result = getResult(playerPick, computerPick)

    clearGameScreen()
    showComparisonScreen(playerPick)

    setTimeout(() => {
        showComputerPick(computerPick)
        showResult(result)
        updateScore(result)
    }, 2000)
}

init()
