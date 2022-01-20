# Battleships

Battleships Original Style - This is my first project from the General Assembly course SEI-59

## Goal:

To create a winnable game using HTML, CSS and JavaScript within the one week timeframe.

![Screenshot of the finished product](/Battleships/images/image3.png)

**Deployed Link:** https://chameh96.github.io/Battleships/

## The Brief:

The app we were tasked to create must:

- Render a game in the browser.
- Be built on a grid.
- Design logic for winning and visually display which player won.
- Allow for restarting the game without reloading the browser.
- Include separate HTML / CSS / JavaScript files.
- Use JavaScript for DOM manipulation.
- Deploy your game online.
- Use semantic markup for HTML and CSS (adhere to best practices).

Technologies Used:

- HTML
- CSS
- JavaScript

## The Idea:

The game I played most as a child was battleships, spending hours playing against my brother and sister, so I wanted to recreate that for my first project at General Assembly.  
To get started I broke the game down into different components (data, presentation, views, style and DOM Manipulation) then brainstormed each of them to create a plan and visualise it in my head.

## Project Overview:

We started this project three weeks into the course, and it was the first time I had ever come across the technologies used, which was daunting to say the least. To get started I spent almost a day planning what I would need and trying to think of ways to write the various tasks. I created a list of features that I wanted the game to have, eventually splitting them into MVP and "future features". knowing that this game was grid focussed, I spent a fair amount of time thinking and pseudo-coding. After that I got the basic grid down in code and started trying to tackle the hardest aspect first, the randomised placement of the ships (ensuring they don’t overlap or go outside the container) see challenges and wins for more on this.

For MVP I decided that both the computer and the player would place their ships at random on the grid. With this plan in mind I set about creating a grid and aiming to get all ships placed randomly at once with the click of a button. The computer looks for the cells that are ’Valid’ i.e able to have ships placed within them and then creates a filter to remove any cell that is invalid due to existing ships. Once the valid and invalid lists are created I run shipStart to place the ships in descending size onto the grid. The code for this is seen below:

```
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
```

Then the process for actually setting the ships in place went like the below, I had a function per ship, this function works with the abode valid cells function to call ships (longest first) and then use the valid cells they can be placed to drop all of the ships onto the grid (carrier, battleship, cruiser, submarine and destroyer):

```
function displayShip(shipCoords, classes) {
        for (let i = 0; i < shipCoords.length; i++) {
            classes.forEach(className => {
                computerSquares[shipCoords[i]].classList.add(className)
            })
        }
    }


    function carrierSetter() {
        const shipCoords = buildShip(5)
        computerVehicles[4].coords = shipCoords
        displayShip(shipCoords, ['enemyPosition', 'carrier'])
    }
    carrierSetter()
```

Once I randomized the ship placement the rest of the project was smooth sailing (if you pardon the pun) and I got to have a bit of fun with adding in the Pirates of the Caribbean music. This project taught me how to look at what appears to be a mountain ahead of you, but to break it down into bite size chunks and create a map to success. As once that hard function was out of the way I built the rest of the game with relative ease.

Another section of the code I’m proud of is the reset game function, as a few people just triggered a page refresh which was an instruction to avoid in the brief. To do this I removed all the classes on the grid, so it wiped out the settings for ships and for hit markers and miss markers.

```

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

```

## Challenges and Wins:

The biggest challenge for me was the ship placement, having the ships placed at random, making sure they are not overlapping each other whilst also guaranteeing they do not flow outside the grid. Writing this code the first time I went about it the wrong way and tried to check the placement of the ships after they had been randomly put down instead of forcing the ship placement to only choose the available cells.

Once I realised my error I had a day and a half left to create the rest of the game, which I managed to do and I’m proud of the work I’ve put forward.

## Known bugs:

The only bugs I currently know of are in code that's not being used, I’d made a start on some of my future features and hadn’t got them operational for the game.

## Key Learnings:

When you are stuck on something, take a step back and think ‘are there other ways this can be done, and are those ways better?’ This would have saved me a lot of time and stress in the project so it was an incredibly valuable lesson to learn.

## Future Features:

I would like to add in machine learning and a drag and drop feature for the player’s ships. I had made a start on the drag and droppable ships, but as it was a stretch goal of mine I didn’t have the time to finish off the code.
