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

    function shipSetter(array, x) {
        const increment = Math.random() > 0.5 ? 1 : 10
        let shipStart = Math.floor(Math.random() * computerCells.length)
        array.coords.push(shipStart)
        //console.log(`ship start`, shipStart)

        for(let i=0; i < x; i++) {
            array.coords.push(shipStart+increment)
            shipStart= shipStart+increment
        }
        // console.log(array.coords)
    }
    // shipSetter(computerVehicles[0], 1)
    // shipSetter(computerVehicles[1], 2)
    // shipSetter(computerVehicles[2], 2)
    // shipSetter(computerVehicles[3], 3)
    // shipSetter(computerVehicles[4], 4)

    function isValidCoords() {
        totalCoords = computerVehicles[0].coords.concat(computerVehicles[1].coords).concat(computerVehicles[2].coords).concat(computerVehicles[3].coords).concat(computerVehicles[4].coords)
        console.log(`total coords`, totalCoords)
        newCoords = new Set(totalCoords)
        console.log(`new coords`, newCoords)
        return totalCoords.length === Array.from(newCoords).length
    }
    isValidCoords()

    function carrierSetter() {
        shipSetter(computerVehicles[4], 4)
        isValidCoords() 
        if (isValidCoords()=== false) {
            carrierSetter()
        } 
    }
    carrierSetter()

    function battleshipSetter() {
         shipSetter(computerVehicles[3], 3)
        isValidCoords() 
        if (isValidCoords()=== false) {
             battleshipSetter()
        }
    }
    battleshipSetter()

    function cruiserSetter() {
        shipSetter(computerVehicles[2], 2)
        isValidCoords() 
        if (isValidCoords()=== false) {
            cruiserSetter()
        }
    }
    cruiserSetter()


    function submarineSetter() {
        shipSetter(computerVehicles[1], 2)
        isValidCoords() 
        if (isValidCoords()=== false) {
            submarineSetter()
        }
    }
    submarineSetter()

    function destroyerSetter() {
        shipSetter(computerVehicles[0], 1)
        isValidCoords()
        if (isValidCoords()=== false) {
            destroyerSetter()
        }
    }
    destroyerSetter()

    // function rotateShips() {
    //     if (isHorizontal) {
           
    //     }
    //     if (!isHorizontal){

    //     }
    // }

    // function destroyerSetter() {
    //     let shipStart = Math.floor(Math.random() * computerCells.length)
    //     const increment = Math.random() > 0.5 ? 1 : 10
    //     computerVehicles[0].coords.push(shipStart)
    //     computerVehicles[0].coords.push(shipStart+increment) 
    //     console.log(computerVehicles[0])
    //     isValidCoords() 
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
    
    for(let i = 0; i < totalCoords.length; i++) {
        computerCells[totalCoords[i]].classList.add('enemyPosition')
    }
    console.log(totalCoords)
