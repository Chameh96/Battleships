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

function randomShip(){
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
   
    function destoyerSetter() {
        let shipStart = Math.floor(Math.random() * computerCells.length)
        let link = computerVehicles[0].coords.push(shipStart)
        let direction = Math.random() > 0.5 ? computerVehicles[0].coords.push(shipStart+1) : computerVehicles[0].coords.push(shipStart+10)
        console.log(computerVehicles[0])
    }
    destoyerSetter()

    function subSetter() {
        let shipStart = Math.floor(Math.random() * computerCells.length)
        let link = computerVehicles[1].coords.push(shipStart)
        let direction = Math.random() > 0.5 ? computerVehicles[1].coords.push(shipStart+1,shipStart+2) : computerVehicles[1].coords.push(shipStart+10,shipStart+20)
        console.log(computerVehicles[1])
    }
    subSetter()
   
    function cruiserSetter() {
        let shipStart = Math.floor(Math.random() * computerCells.length)
        let link = computerVehicles[2].coords.push(shipStart)
        let direction = Math.random() > 0.5 ? computerVehicles[2].coords.push(shipStart+1,shipStart+2) : computerVehicles[2].coords.push(shipStart+10,shipStart+20)
        console.log(computerVehicles[2])
    }
    cruiserSetter()

    function battleshipSetter() {
        let shipStart = Math.floor(Math.random() * computerCells.length)
        let link = computerVehicles[3].coords.push(shipStart)
        let direction = Math.random() > 0.5 ? computerVehicles[3].coords.push(shipStart+1,shipStart+2,shipStart+3) : computerVehicles[3].coords.push(shipStart+10,shipStart+20,shipStart+30)
        console.log(computerVehicles[3])
    }
    battleshipSetter()

    function carrierSetter() {
        let shipStart = Math.floor(Math.random() * computerCells.length)
        let link = computerVehicles[4].coords.push(shipStart)
        let direction = Math.random() > 0.5 ? computerVehicles[4].coords.push(shipStart+1,shipStart+2,shipStart+3,shipStart+4) : computerVehicles[4].coords.push(shipStart+10,shipStart+20,shipStart+30,shipStart+40)
        console.log(computerVehicles[4])
    }
    carrierSetter()

}
randomShip()


 // let chosenShip = computerVehicles[Math.floor(Math.random()*computerVehicles.length-1)].directions[0].length
    // console.log(`before=`, chosenShip)
    // let direction = Math.random() > 0.5 ? 'horizontal' : 'vertical'
    // let shipStart = Math.floor(Math.random() * computerCells.length)
    // let newShips = computerVehicles.splice(chosenShip,1)
