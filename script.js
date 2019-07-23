const winningMatches = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]

const grid = () => Array.from(document.getElementsByClassName('q'))
const quadNumId = (quadEl) => Number.parseInt(quadEl.id.replace('q', ''))
const emptyQuadrants = () => grid().filter(quadEl => quadEl.innerText === '')
const allSame = (arr) => arr.every(quadEl => quadEl.innerText === arr[0].innerText && quadEl.innerText !== '')

const takeTurn = (index, letter) => grid()[index].innerText = letter
const opponentChoice = () => quadNumId(emptyQuadrants()[Math.floor(Math.random() * emptyQuadrants().length)])

const endGame = (winningSequence) => {
    winningSequence.forEach(quadEl => quadEl.classList.add('winner'))
    disableListeners()
}

const checkForVictory = () => {
    let victory = false
    winningMatches.forEach(m => {
        
        const sequence = [grid()[m[0]], grid()[m[1]], grid()[m[2]]]

        if (allSame(sequence)) {
            victory = true
            endGame(sequence)

        }
    })
    return victory
}

const opponentTurn = () => {
    disableListeners()
    setTimeout(() => {
        takeTurn(opponentChoice(), 'o')
        if (!checkForVictory()) 
        enableListeners()
    }, 1000)
}

const click = (evt) => {
    takeTurn(quadNumId(evt.target), 'x')
    if (!checkForVictory()) 
    opponentTurn()
}

const enableListeners = () => grid().forEach(quad => quad.addEventListener('click', click))
const disableListeners = () => grid().forEach(quad => quad.addEventListener('click', click))

enableListeners()
