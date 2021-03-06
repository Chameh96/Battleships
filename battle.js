const startButton = document.querySelector('#startButton')
const computersGo = document.querySelector('#computerGo')
const resetButton = document.querySelector('#resetButton')
const randomiseButton = document.querySelector('#reRollButton')
const musicButton = document.querySelector('#music')
const userGrid = document.querySelector('.user-grid')
const computerGrid = document.querySelector('.comp-grid')
const userShips = document.querySelector('.userShips')
const ships = document.querySelectorAll('.ship')
const computerShips = document.querySelector('.compShips')
const destroyer = document.querySelector('.destroyer-container')
const submarine = document.querySelector('.submarine-container')
const cruiser = document.querySelector('.cruiser-container')
const battleship = document.querySelector('.battleship-container')
const carrier =document.querySelector('.carrier-container')
let turnDisplay = document.querySelector('.whoGo')
let gameOver = false
let currentPlayer = 'user'
const audio = document.querySelector('#tunes')
const audio1 = new Audio('piratesocarribbean.mp3')
audio1.volume = 0.1

let isHorizontal = true

const width = 10



function createBoard(grid) {
    const squares = []
     for( let i = 0; i < width*width; i++) {
         const square = document.createElement('div')
         square.dataset.id = i
        grid.appendChild(square)
        squares.push(square)
     }
     return squares
}
const userSquares = createBoard(userGrid)
const computerSquares = createBoard(computerGrid)

let computerCells = Array.from(document.querySelectorAll('.comp-grid div'))
let userCells = Array.from(document.querySelectorAll('.user-grid div'))

const shipArray = [
    {
        name: 'destroyer',
        directions: [[0,1], [0,10]],
        coords: []
        
    },
    {
        name: 'submarine',
        directions: [[0,1,2], [0,10,20]],
        coords: []
    },
    {
        name: 'cruiser',
        directions: [[0,1,2], [0,10,20]],
        coords: []
    },
    {
        name: 'battleship',
        directions: [[0,1,2,3], [0,10,20,30]],
        coords: []
    },
    {
        name: 'carrier',
        directions: [[0,1,2,3,4], [0,10,20,30,40]],
        coords: []
    }
]

let totalCoords = []
let newCoords = []

 
    const computerVehicles = [
        {
            name: 'destroyer',
            directions: [[0,1], [0,10]],
            coords: []
        },
        {
            name: 'submarine',
            directions: [[0,1,2], [0,10,20]],
            coords: []
        },
        {
            name: 'cruiser',
            directions: [[0,1,2], [0,10,20]],
            coords: []
        },
        {
            name: 'battleship',
            directions: [[0,1,2,3], [0,10,20,30]],
            coords: []
        },
        {
            name: 'carrier',
            directions: [[0,1,2,3,4], [0,10,20,30,40]],
            coords: []
        }
    ]

////////////////////////////////////////////////////SETTING COMPUTER SHIP LOCATION AND MAKING SURE IT IS WITHIN GRID AND NOT ON ANOTHER SHIP///////////////////////////
// computerCells.filter(x => !totalCoords.flatMap(coord => [coord-30,coord-20,coord-10,coord]))
///////////////////////////////////////////////////////
function buildShip(length) {
    //STEP 1
    const shipCoords = []
    let validCells = computerSquares
    //STEP 2
    const direction = Math.random() > 0.5 ? 'horizontal' : 'verticle'
    const increment = direction === 'horizontal'? 1 : width
    //STEP 3
    const columnLimit = direction === 'horizontal' ? width - length : width
    const rowLimit = direction === 'verticle' ? width - length : width

const isACellValid = (cell) => {
    // i.e. you cannot be in column 8 when column limit is 7
    const isACellWithinColumnLimit = parseInt(cell.dataset.id) % width <= columnLimit
    // i.e. you cannot be in row 7 when the row limit is 6
    // i.e. parseInt(cell.dataset.id) cannot be greater than 60 = width * rowLimit
    const isACellWithinRowLimit = parseInt(cell.dataset.id) < (width * rowLimit)
    return isACellWithinRowLimit && isACellWithinColumnLimit
}

    validCells = validCells.filter(isACellValid)
    //STEP 4
    // remove from list of cells any cell that is invalid because of existing ships
    const totalInvalidCoords = computerVehicles.flatMap(existingShip => {
        // If a ship is at 25, 35, 45, 55,
        // then all of these are invalid for a ship of length 3:
        //  23, 24, 25, 33, 34, 35, 43, 44, 45, 53, 54, 55
        const invalidCoords = existingShip.coords.flatMap(coord => {
            const invalidCoordsForCurrentCoords = []
            for (let i = 0; i < length; i++) {
                invalidCoordsForCurrentCoords.push(coord - i * increment)
            }
            return invalidCoordsForCurrentCoords
        })
        return invalidCoords
    })

    validCells = validCells.filter(cell => !totalInvalidCoords.includes(parseInt(cell.dataset.id)))

    // STEP 5. pick one of the remaining valid cells at random
    let pickRandomCell = validCells[Math.floor(Math.random()* validCells.length)]
    const shipStart = parseInt(pickRandomCell.dataset.id)
    // STEP 6. from shipStart create whole ship.
    for(let i=0; i < length; i++) {
        shipCoords.push(shipStart+increment*i)
    }
    return shipCoords
}


    ///////////////////////////////////////////////////////////ADDING COMPUTER SHIPS/////////////////////////////////////////////////////////
    function displayShip(shipCoords, classes) {
        for (let i = 0; i < shipCoords.length; i++) {
            classes.forEach(className => {
                computerSquares[shipCoords[i]].classList.add(className)
            })
        }
    }


    function carrierSetter() {
        //shipSetter(computerVehicles[4], 5, 6)
        const shipCoords = buildShip(5)
        computerVehicles[4].coords = shipCoords
        displayShip(shipCoords, ['enemyPosition', 'carrier'])
    }
    carrierSetter()
    
    function battleshipSetter() {
        //shipSetter(computerVehicles[3], 4, 7)
        const shipCoords = buildShip(4)
        computerVehicles[3].coords = shipCoords
        displayShip(shipCoords, ['enemyPosition', 'battleship'])
    }
    battleshipSetter()

    function cruiserSetter() {
        //shipSetter(computerVehicles[2], 3, 8)
        computerVehicles[2].coords = buildShip(3)
        displayShip(computerVehicles[2].coords, ['enemyPosition', 'cruiser'])
    }
    cruiserSetter()


    function submarineSetter() {
        computerVehicles[1].coords = buildShip(3)
        displayShip(computerVehicles[1].coords, ['enemyPosition', 'submarine'])
    }
    submarineSetter()

    function destroyerSetter() {
        computerVehicles[0].coords = buildShip(2)
        displayShip(computerVehicles[0].coords, ['enemyPosition', 'destroyer'])
    }
    destroyerSetter()

    
/////////////////////////////////////////////////////////////ROTATE SHIPS//////////////////////////////////////////////////////
    // function rotate() {
    //     if (isHorizontal) {
    //        destroyer.classList.toggle('destroyer-container-verticle')
    //        submarine.classList.toggle('submarine-container-verticle')
    //        cruiser.classList.toggle('cruiser-container-verticle')
    //        battleship.classList.toggle('battleship-container-verticle')
    //        carrier.classList.toggle('carrier-container-verticle')
    //        isHorizontal = false
    //     }
    // }
    
    
//////////////////////////////////// DRAGGING USER SHIPS /////////////////////////////
// ships.forEach(ship => ship.addEventListener('dragstart', dragStart))
// userSquares.forEach(square => square.addEventListener('dragstart', dragStart))
// userSquares.forEach(square => square.addEventListener('dragover', dragOver))
// userSquares.forEach(square => square.addEventListener('dragenter', dragEnter))
// userSquares.forEach(square => square.addEventListener('dragleave', dragLeave))
// userSquares.forEach(square => square.addEventListener('drop', dragDrop))
// userSquares.forEach(square => square.addEventListener('dragend', dragEnd))

// let selectedShipNameWithIndex  
// let draggedShip
// let draggedShipLength



// ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
//     selectedShipNameWithIndex = e.target.id
//     console.log(selectedShipNameWithIndex)
// }))

// function dragStart(e) {
//     draggedShip = this
//     draggedShipLength = this.childNodes.length
//     console.log(draggedShip)
// }

// function dragOver(e) {
//     e.preventDefault()
// }

// function dragEnter(e) {
//     e.preventDefault()
// }

// function dragLeave() {
//     console.log('drag leave')
    
// }

// function dragDrop() {
//     let shipNameWithLastId = draggedShip.lastChild.id
//     let shipClass = shipNameWithLastId.slice(0,-2)
//     console.log(shipClass)
//     let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
//     let shipLastId = lastShipIndex + parseInt(this.dataset.id)
//     console.log(shipLastId)

//     selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))
//     console.log(selectedShipIndex)

//     shipLastId = shipLastId - selectedShipIndex

//     for (let i=0; i < draggedShipLength; i++) {
//         userSquares[parseInt(this.dataset.id) - selectedShipIndex + width*i].classList.add('playerShip', shipClass)
//     }

    
// }

// function dragEnd() {
    
// }


//////////////////////////////////////////////////////PLAYER RANDOM SHIP PLACEMENT////////////////////////////////////////
function buildPlayerShip(length) {
    //STEP 1
    const userShipCoords = []
    let validCells = userSquares
    //STEP 2
    const direction = Math.random() > 0.5 ? 'horizontal' : 'verticle'
    const increment = direction === 'horizontal'? 1 : width
    //STEP 3
    const columnLimit = direction === 'horizontal' ? width - length : width
    const rowLimit = direction === 'verticle' ? width - length : width

    const isACellValid = (cell) => {
        // i.e. you cannot be in column 8 when column limit is 7
        const isACellWithinColumnLimit = parseInt(cell.dataset.id) % width <= columnLimit
        // i.e. you cannot be in row 7 when the row limit is 6
        // i.e. parseInt(cell.dataset.id) cannot be greater than 60 = width * rowLimit
        const isACellWithinRowLimit = parseInt(cell.dataset.id) < (width * rowLimit)
        return isACellWithinRowLimit && isACellWithinColumnLimit
    }

    validCells = validCells.filter(isACellValid)
    //STEP 4
    // remove from list of cells any cell that is invalid because of existing ships
    const totalInvalidCoords = shipArray.flatMap(existingShip => {
        // If a ship is at 25, 35, 45, 55,
        // then all of these are invalid for a ship of length 3:
        //  23, 24, 25, 33, 34, 35, 43, 44, 45, 53, 54, 55
        const invalidCoords = existingShip.coords.flatMap(coord => {
            const invalidCoordsForCurrentCoords = []
            for (let i = 0; i < length; i++) {
                invalidCoordsForCurrentCoords.push(coord - i * increment)
            }
            return invalidCoordsForCurrentCoords
        })
        return invalidCoords
    })

    validCells = validCells.filter(cell => !totalInvalidCoords.includes(parseInt(cell.dataset.id)))

    // STEP 5. pick one of the remaining valid cells at random
    let pickRandomCell = validCells[Math.floor(Math.random()* validCells.length)]
    const shipStart = parseInt(pickRandomCell.dataset.id)
    // STEP 6. from shipStart create whole ship.
    for(let i=0; i < length; i++) {
        userShipCoords.push(shipStart+increment*i)
    }
    return userShipCoords
}


///////////////////////////////////////////////////////////ADDING PLAYER SHIPS/////////////////////////////////////////////////////////
    function displayPlayerShip(userShipCoords, classes) {
        for (let i = 0; i < userShipCoords.length; i++) {
            classes.forEach(className => {
                userSquares[userShipCoords[i]].classList.add(className)
            })
        }
    }


    function carrierPlayerSetter() {
        const userShipCoords = buildPlayerShip(5)
        shipArray[4].coords = userShipCoords
        displayPlayerShip(userShipCoords, ['playerPosition', 'carrier'])
    }
    carrierPlayerSetter()
    
    function battleshipPlayerSetter() {
        const userShipCoords = buildPlayerShip(4)
        shipArray[3].coords = userShipCoords
        displayPlayerShip(userShipCoords, ['playerPosition', 'battleship'])
    }
    battleshipPlayerSetter()

    function cruiserPlayerSetter() {

        shipArray[2].coords = buildPlayerShip(3)
        displayPlayerShip(shipArray[2].coords, ['playerPosition', 'cruiser'])
    }
    cruiserPlayerSetter()


    function submarinePlayerSetter() {
        shipArray[1].coords = buildPlayerShip(3)
        displayPlayerShip(shipArray[1].coords, ['playerPosition', 'submarine'])
    }
    submarinePlayerSetter()

    function destroyerPlayerSetter() {
        shipArray[0].coords = buildPlayerShip(2)
        displayPlayerShip(shipArray[0].coords, ['playerPosition', 'destroyer'])
    }
    destroyerPlayerSetter()


    ///////////////////////////////////////////////////PLAYER HITTING A SHIP//////////////////////////////////////////////////
console.log(computerCells)
console.log(userCells)

function handleUserTurnClick(event) {
    console.log('event.target', event.target)
    if (event.target.classList.contains('enemyPosition')) {
        event.target.classList.add('shipHit')
    } else {
        event.target.classList.add('shipMiss')
    }
    currentPlayer = 'computer'
    currentPoints()
    if(!keepPlaying()){
        setTimeout(computerGo, 500)
    } else {
        showFinalScores()
    }

    
}
function playerClicks() {
    computerCells.forEach(cell => cell.addEventListener("click", handleUserTurnClick))
}


    /////////////////////////////////////////////////////////COMPUTER RANDOM ATTACK///////////////////////////////////////////////////////////

    //splice from array so doesnt do same move twice

    //do computer turn true/false if player turn is going

    console.log(userCells)
    let computerAttackChoice = Array.from(userCells)

    function computerGo() {
        let random = Math.floor(Math.random() * computerAttackChoice.length)
        const index = computerAttackChoice.indexOf(random)
        console.log(computerAttackChoice.length)
        computerAttackChoice.splice(index,1)
        console.log(computerAttackChoice.length)
        console.log(userCells.length)

        if (computerAttackChoice[random].classList.contains('playerPosition')) {
            computerAttackChoice[random].classList.add('shipHit')
        } else {
            computerAttackChoice[random].classList.add('shipMiss')
        }
       
        currentPlayer = 'user'
        currentPoints()
        if (!keepPlaying()) {
            playerClicks()
        } else {
            showFinalScores()
        }
            
        
    }
    ///////////////////////////////////GAME LOGIC////////////////////////////////////////
    function playGame() {
        // if (gameOver) return
        if (currentPlayer === 'user') {
            turnDisplay.innerHTML = 'Player'
            playerClicks()

        }
        currentPlayer = 'computer'
        if (currentPlayer === 'computer') {
            turnDisplay.innerHTML = 'Let the battle commence'
            setTimeout (computerGo, 500)
        }
        currentPlayer = 'user'
        // audio.currentTime = 0
       // audio1.play()
    }
    startButton.addEventListener('click', playGame)

    /////////////////////////////////////// PLAY MUSIC ////////////////////////////////////////////
    let isPlaying = false;

    function togglePlay() {
        isPlaying ? audio1.pause() : audio1.play();
        };

        audio1.onplaying = function() {
        isPlaying = true;
        };
        audio1.onpause = function() {
        isPlaying = false;
    };
    
    musicButton.addEventListener('click', togglePlay)
    

    ////////////////////////////////////////////////////////GAME OVER/////////////////////////////////////////////////
    // TO WIN THE GAME, PUT EVERYTHING WITH CLASS LIST PLAYER && CLASSLIST OF SHIPHIT INTO AN ARRAY< IF THAT ARRAY REACHES LENGTH 17 = GAME OVER
    // allCellsInBothGrids = userCells + computerCells
    // console.log(allCellsInBothGrids)
    let computerShipsSunk = computerCells.filter(shipsunk => ((shipsunk.classList.contains('enemyPosition')) && (shipsunk.classList.contains('shipHit'))))
    let playerShipsSunk = userCells.filter(shipsunk => (shipsunk.classList.contains('playerPosition' && 'shipHit')))

    function keepPlaying() {
        return (computerShipsSunk.length === 17) || (playerShipsSunk.length === 17)
    }

    function currentPoints() { 
        computerShipsSunk = computerCells.filter(shipsunk => ((shipsunk.classList.contains('enemyPosition')) && (shipsunk.classList.contains('shipHit'))))
        playerShipsSunk = userCells.filter(shipsunk => (shipsunk.classList.contains('playerPosition' && 'shipHit')))
        console.log(`computer ship sunk`,computerShipsSunk.length)
        console.log(`player ship sunk`,playerShipsSunk.length)
    
    }

    
        function showFinalScores() {
        console.log('GAME OVER')
        currentPlayer = 'null'

        if (playerShipsSunk.length === 17) {
            console.log('Player Loses')
            window.alert("Player Loses, computer has sunk all your ships. Hit restart to go again")
            // resetGame()
        } else if (computerShipsSunk.length === 17) {
            console.log('Player Wins')
            window.alert("Player Wins! Player has sunk all enemy ships. Hit restart to play again")
            // resetGame()
        }
        

    }

    ////////////////////////////////////////////////RESET GAME///////////////////////////////////////////////////////////

    function reassignShips() {
        clearPlayerShips()
        carrierPlayerSetter()
        battleshipPlayerSetter()
        cruiserPlayerSetter()
        submarinePlayerSetter()
        destroyerPlayerSetter()
    }

    randomiseButton.addEventListener('click', reassignShips )

        function clearPlayerShips() {
            userCells.forEach(cellId => cellId.classList.remove('playerPosition', 'carrier','battleship', 'cruiser', 'submarine', 'destroyer', 'shipHit', 'shipMiss'))
        } 
        
        function clearComputerShips() {
            computerCells.forEach(cellId => cellId.classList.remove('enemyPosition', 'carrier', 'battleship', 'cruiser', 'submarine', 'destroyer', 'shipHit', 'shipMiss'))
            carrierSetter()
            battleshipSetter()
            cruiserSetter()
            submarineSetter()
            destroyerSetter()
        }
        function resetGame() {
            reassignShips()
            currentPlayer = 'user'
            clearComputerShips()
        
    }
        
    resetButton.addEventListener('click', resetGame)


