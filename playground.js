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
let validPLace = true

 
    let computerVehicles = [
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
    function shipSetter(array, x, limit, arrayPosition) {
        if (validPLace === false){
            array.coords = []
            console.log(`total coords before splice`, totalCoords)
            computerVehicles[arrayPosition].coords = []
            console.log(`total coords after pop`, computerVehicles[arrayPosition].coords)
            totalCoords = totalCoords.concat(totalCoords.splice(0,totalCoords.length-(x*2)), totalCoords.splice(totalCoords.length - x, x))
            console.log(`total coords after splice`, totalCoords)
            // for(let i = 0; i<x+1; i++){
            //     totalCoords.pop(totalCoords);
            // }
        }
        let direction = Math.random() > 0.5 ? 'horizontal' : 'verticle'
        let increment = direction === 'horizontal'? 1 : 10
        let rowLimit = direction === 'horizontal' ? 10 : limit
        let columnLimit = direction === 'verticle' ? 10 : limit
        let randomRow = Math.floor(Math.random() * rowLimit)
        let randomColumn = Math.floor(Math.random() * columnLimit)
        let shipStart = (randomRow*10)+randomColumn
        totalCoords = computerVehicles.flatMap(item => item.coords)
        console.log(shipStart)
        
        //array.coords.push(shipStart)
        //console.log(`ship start`, shipStart)

        for(let i=0; i < x; i++) {
            array.coords.push(shipStart+increment*i)
        }
        // console.log(array.coords)
    }
    
    function isValidCoords() {
        let newShipCoords = totalCoords
        console.log(`newship coords`, newShipCoords)
        console.log(`total coords`, totalCoords)
        newCoords = new Set(newShipCoords)
        console.log(`new coords`, newCoords)
       if(newShipCoords.length === Array.from(newCoords).length){
           validPLace = true
           newShipCoords = null
           return true
       }else{
           validPLace = false
           newShipCoords = null
            return false
       }
    }
    isValidCoords()

    ///////////////////////////////////////////////////////////ADDING SHIPS/////////////////////////////////////////////////////////
    
    function carrierSetter() {
       shipSetter(computerVehicles[4], 5, 6, 0)
        const validVar = isValidCoords()
        console.log(validVar)
    }
    carrierSetter()

    function battleshipSetter() {
        
        shipSetter(computerVehicles[3], 4, 7, 1)
        const validVar = isValidCoords()

        console.log(`validPLace`, validPLace)
        if (!validVar) {
             battleshipSetter()
        }
    }
    battleshipSetter()

    function cruiserSetter() {
        
        shipSetter(computerVehicles[2], 3, 8, 2)
        
        const validVar = isValidCoords()
        console.log(validVar)
        if (!validVar) {
            cruiserSetter()
        }
    }
     cruiserSetter()


    // function submarineSetter() {
        
    //     shipSetter(computerVehicles[1], 3, 8, 3)
        
    //     const validVar = isValidCoords()
    //     console.log(validVar)
    //     if (!validVar) {
    //         submarineSetter()
    //     }
    // }
    // submarineSetter()

    // function destroyerSetter() {
        
    //     shipSetter(computerVehicles[0], 2, 9, 4)
        
    //     const validVar = isValidCoords()
    //     console.log(validVar)
    //     isValidCoords()
    //     if (!validVar) {
    //         destroyerSetter()
    //     }
    // }
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
