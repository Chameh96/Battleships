const startButton = document.querySelector('#startButton')
const resetButton = document.querySelector('#resetButton')
const userGrid = document.querySelector('.user-grid')
const computerGrid = document.querySelector('.comp-grid')
const userShips = document.querySelector('.userShips')
const computerShips = document.querySelector('.compShips')
const turnDisplay = document.querySelector('.turns')
const destroyer = document.querySelector('.destroyer')
const submarine = document.querySelector('.sub')
const cruiser = document.querySelector('.cruiser')
const battleship = document.querySelector('.battle')
const carrier = document.querySelector('.carrier')

const width = 10



function createBoard(grid) {
    const squares = []
     for( let i = 0; i < width*width; i++) {
         const square = document. createElement('div')
         square.dataset.id = i
        grid.appendChild(square)
        squares.push(square)
     }
     return squares
}
const userSquares = createBoard(userGrid)
const computerSquares = createBoard(computerGrid)


const shipArray = [
    {
        name: 'destroyer',
        directions: [[0,1], [0,10]]
        
    },
    {
        name: 'submarine',
        directions: [[0,1,2], [0,10,20]]
    },
    {
        name: 'cruiser',
        directions: [[0,1,2], [0,10,20]]
    },
    {
        name: 'battleship',
        directions: [[0,1,2,3], [0,10,20,30]]
    },
    {
        name: 'carrier',
        directions: [[0,1,2,3,4], [0,10,20,30,40]]
    }
]
// console.log(`shiparray primary`, shipArray)
// console.log(`before-->`,Math.floor(Math.random()*5))

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

////////////////////////////////////////////////////SETTING SHIP LOCATION AND MAKING SURE IT IS WITHIN GRID AND NOT ON ANOTHER SHIP///////////////////////////
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
    console.log(`valid cells`,  validCells)
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
    console.log(`valid cells`,  validCells)

    // 5. pick one of the remaining valid cells at random
    let pickRandomCell = validCells[Math.floor(Math.random()* validCells.length)]
    const shipStart = parseInt(pickRandomCell.dataset.id)
    // 6. from shipStart create whole ship.
    for(let i=0; i < length; i++) {
        shipCoords.push(shipStart+increment*i)
    }
    return shipCoords
}


    ///////////////////////////////////////////////////////////ADDING SHIPS/////////////////////////////////////////////////////////
    function displayShip(shipCoords, classes) {
        for (let i = 0; i < shipCoords.length; i++) {
            classes.forEach(className => {
                computerSquares[shipCoords[i]].classList.add(className)
            })
        }
    }


    function carrierSetter() {
        console.log("CARRIER TIME")
        //shipSetter(computerVehicles[4], 5, 6)
        const shipCoords = buildShip(5)
        console.log(shipCoords)
        computerVehicles[4].coords = shipCoords
        displayShip(shipCoords, ['enemyPosition', 'carrier'])
    }
    carrierSetter()
    
    function battleshipSetter() {
        console.log("BATTLESHIP TIME")
        //shipSetter(computerVehicles[3], 4, 7)
        const shipCoords = buildShip(4)
        console.log(shipCoords)
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
    // function rotateShips() {
    //     if (isHorizontal) {
           
    //     }
    //     if (!isHorizontal){

    //     }
    // }

///////////////////////////////////////////////////OLD CODE//////////////////////////////////////////////////

    // function destroyerSetter() {
    //     let shipStart = Math.floor(Math.random() * computerCells.length)
    //     const increment = Math.random() > 0.5 ? 1 : 10
    //     computerVehicles[0].coords.push(shipStart)
    //     computerVehicles[0].coords.push(shipStart+increment) 
    //     console.log(computerVehicles[0])
    //     if (!isValidCoords()) {
    //         destroyerSetter()
    //     }
    // }
    // destroyerSetter()

    // function subSetter() {
    //     let shipStart = Math.floor(Math.random() * computerCells.length)
    //     let link = computerVehicles[1].coords.push(shipStart)
    //     let direction = Math.random() > 0.5 ? computerVehicles[1].coords.push(shipStart+1,shipStart+2) : computerVehicles[1].coords.push(shipStart+10,shipStart+20)
    //     console.log(computerVehicles[1])
    // }
    // subSetter()
   
    // function cruiserSetter() {
    //     let shipStart = Math.floor(Math.random() * computerCells.length)
    //     let link = computerVehicles[2].coords.push(shipStart)
    //     let direction = Math.random() > 0.5 ? computerVehicles[2].coords.push(shipStart+1,shipStart+2) : computerVehicles[2].coords.push(shipStart+10,shipStart+20)
    //     console.log(computerVehicles[2])
    // }
    // cruiserSetter()

    // function battleshipSetter() {
    //     let shipStart = Math.floor(Math.random() * computerCells.length)
    //     let link = computerVehicles[3].coords.push(shipStart)
    //     let direction = Math.random() > 0.5 ? computerVehicles[3].coords.push(shipStart+1,shipStart+2,shipStart+3) : computerVehicles[3].coords.push(shipStart+10,shipStart+20,shipStart+30)
    //     console.log(computerVehicles[3])
    // }
    // battleshipSetter()

    // function carrierSetter() {
    //     computerVehicles[4].coords = []
    //     let shipStart = Math.floor(Math.random() * computerCells.length)
    //     let link = computerVehicles[4].coords.push(shipStart)
    //     let direction = Math.random() > 0.5 ? computerVehicles[4].coords.push(shipStart+1,shipStart+2,shipStart+3,shipStart+4) : computerVehicles[4].coords.push(shipStart+10,shipStart+20,shipStart+30,shipStart+40)
    //     console.log(computerVehicles[4])
    //     isValidCoords() 
    //     if (!isValidCoords()) {
    //         carrierSetter()
    //     }
    //     console.log(newCoords)
    //     console.log(`after`, totalCoords.length)
    //     console.log(`after`, Array.from(newCoords).length)
    // }
    // carrierSetter()

    // function isValidCoords() {
    //      totalCoords = computerVehicles[0].coords.concat(computerVehicles[1].coords).concat(computerVehicles[2].coords).concat(computerVehicles[3].coords).concat(computerVehicles[4].coords)
    //      newCoords = new Set(totalCoords)
    //      return totalCoords.length === newCoords.length
    // }
    
  
