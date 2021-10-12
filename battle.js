const startButton = document.querySelector('#startButton')
const resetButton = document.querySelector('#resetButton')
const userGrid = document.querySelector('.user-grid')
const userCells = document.querySelectorAll('.userCells')
const computerGrid = document.querySelector('.comp-grid')
const computerCells = document.querySelectorAll('.compCells')
const userShips = document.querySelector('.userShips')
const computerShips = document.querySelector('.compShips')
const turnDisplay = document.querySelector('.turns')
const destroyer = document.querySelector('.destroyer')
const submarine = document.querySelector('.sub')
const cruiser = document.querySelector('.cruiser')
const battleship = document.querySelector('.battle')
const carrier = document.querySelector('.carrier')

const width = 10
const userSquares = []
const computerSquares=[]


function createBoard(grid, squares) {
     for( let i = 0; i < width*width; i++) {
         const square = document. createElement('div')
         square.dataset.id = i
        grid.appendChild(square)
        squares.push(square)
     }
}
createBoard(userGrid, userSquares)
createBoard(computerGrid, computerSquares)

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
    function shipSetter(array, x, limit) {
        const direction = Math.random() > 0.5 ? 'horizontal' : 'verticle'
        const increment = direction === 'horizontal'? 1 : 10
        const rowLimit = direction === 'horizontal' ? 10 : limit
        const columnLimit = direction === 'verticle' ? 10 : limit
        const randomRow = Math.floor(Math.random() * rowLimit)
        const randomColumn = Math.floor(Math.random() * columnLimit)
        const shipStart = (randomRow*10)+randomColumn
        const totalCoords = computerVehicles.flatMap(item => item.coords)
        console.log(shipStart)

        //const allCoords = computerCells
        
        //array.coords.push(shipStart)
        //console.log(`ship start`, shipStart)

        for(let i=0; i < x; i++) {
            array.coords.push(shipStart+increment*i)
        }
        // console.log(array.coords)
    }
    
    function isValidCoords() {
        totalCoords = computerVehicles.flatMap(item => item.coords)
        console.log(`total coords`, totalCoords)
        newCoords = new Set(totalCoords)
        console.log(`new coords`, newCoords)
        return totalCoords.length === Array.from(newCoords).length

        // let freeCoords = false
        // if( totalCoords.length === Array.from(newCoords).length) {
        //     let freeCoords = true
        // }
        // totalCoords = null 
        // return freeCoords
    }
    isValidCoords()

    ///////////////////////////////////////////////////////////ADDING SHIPS/////////////////////////////////////////////////////////
    
    function carrierSetter() {
        shipSetter(computerVehicles[4], 5, 6)
        const validVar = isValidCoords()
        console.log(validVar)
    }
    carrierSetter()

    function battleshipSetter() {
        shipSetter(computerVehicles[3], 4, 7)
        const validVar = isValidCoords()
        console.log(validVar)
        // if (!validVar) {
        //      battleshipSetter()
        // }
    }
    battleshipSetter()

    function cruiserSetter() {
        shipSetter(computerVehicles[2], 3, 8)
        const validVar = isValidCoords()
        console.log(validVar)
    //     if (!validVar) {
    //         cruiserSetter()
    //     }
    }
    //cruiserSetter()


    function submarineSetter() {
        shipSetter(computerVehicles[1], 3, 8)
        const validVar = isValidCoords()
        console.log(validVar)
    //     if (!validVar) {
    //         submarineSetter()
    //     }
    }
    // submarineSetter()

    function destroyerSetter() {
        shipSetter(computerVehicles[0], 2, 9)
        const validVar = isValidCoords()
        console.log(validVar)
    //     isValidCoords()
    //     if (!validVar) {
    //         destroyerSetter()
    //     }
    }
    // destroyerSetter()


    for(let i = 0; i < totalCoords.length; i++) {
        computerCells[totalCoords[i]].classList.add('enemyPosition')
    }
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
    
  
