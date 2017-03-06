/**
 * sketch.js
 * Created by Tim on 06/03/2017.
 */

var grid_x;// = window.innerWidth / 3.;
var grid_y;// = window.innerHeight/ 6.;

choice = 1;
// if 0, unoccupied, if 1 : nought, if -1: cross
var game = {
    0 : 0,
    1 : 0,
    2 : 0,
    3 : 0,
    4 : 0,
    5 : 0,
    6 : 0,
    7 : 0,
    8 : 0
};


function setup() {
    createCanvas(screen.width, screen.height);
}


function draw() {
    grid_x = window.innerWidth / 3.;
    grid_y = window.innerHeight/ 6.;
    background(95, 67, 165);

    handleGame();
    // Draw the tic tac toe grid
    setupTicTacToeGrid();
    // Wherever the mouse hovers, offer the symbol there
    drawObject(getMouseLocationQuadrant(mouseX, mouseY), choice, true);

    // Draw the boardgame
    drawBoard();
}

function mouseReleased() {
    quadrant = getMouseLocationQuadrant(mouseX, mouseY);
    if (isQuadrantEmpty(quadrant)) {
        drawObject(quadrant, choice, false);
        game[quadrant] = choice;
    }
    if (choice === -1) {
        choice = 1;
    } else {
        choice = -1;
    }
}

function getMouseLocationQuadrant(mouseX, mouseY) {
    // check if actually inside the grid
    if (mouseX < grid_x || mouseX > 2 * grid_x ||
        mouseY < grid_y || mouseY > grid_x + grid_y) {
        return -1;
    }
    var i = Math.floor(3 * (mouseX - grid_x) / grid_x);
    var j = Math.floor(3 * (mouseY - grid_y) / grid_x);
    // print(grid_x);
    // print();
    return i + 3 * j;
}

function getQuadrantTopLeft(quadrant) {
    var xLoc = grid_x + (quadrant % 3) * (grid_x / 3);
    var yLoc = grid_y + Math.floor(quadrant / 3) * (grid_x / 3);
    return [xLoc, yLoc];
}

function isQuadrantEmpty(quadrant) {
    return game[quadrant] == 0;
}

function handleGame() {
    if (isFinished()) {
        resetGame();
    }
}

function resetGame() {
    game = {
        0 : 0,
        1 : 0,
        2 : 0,
        3 : 0,
        4 : 0,
        5 : 0,
        6 : 0,
        7 : 0,
        8 : 0
    };
}

function isFinished() {
    var keys = Object.keys(game);
    for (var quadCheck = 0; quadCheck < keys.length; quadCheck++) {
        if (game[keys[quadCheck]] == 0) {
            return false;
        }
    }
    return true;
}

function drawObject(quadrant, whichObject, checkOverlap) {
    if (checkOverlap && !isQuadrantEmpty(quadrant)) {
        return;
    }
    if (whichObject == 1) {
        drawNought(quadrant);
    } else if (whichObject == -1) {
        drawCross(quadrant);
    }
}

function drawCross(quadrant) {
    if (quadrant !== -1) {
        var crossTopLeft = getQuadrantTopLeft(quadrant);
        var crossTopLeftX = crossTopLeft[0] + grid_x / 18.;
        var crossTopLeftY = crossTopLeft[1] + grid_x / 18.;
        var innerWidth = (grid_x / 3) * 4 / 6.;
        strokeWeight(10);
        stroke(122, 0, 0);
        line(crossTopLeftX, crossTopLeftY + innerWidth, crossTopLeftX + innerWidth, crossTopLeftY);
        line(crossTopLeftX, crossTopLeftY, crossTopLeftX + innerWidth, crossTopLeftY + innerWidth);
    }
}

function drawNought(quadrant) {
    if (quadrant !== -1) {
        ellipseMode(CORNER);
        var crossTopLeft = getQuadrantTopLeft(quadrant);
        var crossTopLeftX = crossTopLeft[0] + grid_x / 18.;
        var crossTopLeftY = crossTopLeft[1] + grid_x / 18.;
        var innerWidth = (grid_x / 3) * 4 / 6.;
        strokeWeight(10);
        stroke(0, 122, 0);
        noFill();
        ellipse(crossTopLeftX, crossTopLeftY, innerWidth, innerWidth);
    }
}

function setupTicTacToeGrid() {
    strokeWeight(10);
    stroke(0);
    fill(55, 123, 152);
    rect(grid_x, grid_y, grid_x, grid_x, grid_x / 8);
    line(grid_x * (1 + 1./3.), grid_y, grid_x * (1 + 1./3.), grid_y + grid_x);
    line(grid_x * (1 + 2./3.), grid_y, grid_x * (1 + 2./3.), grid_y + grid_x);
    line(grid_x, grid_y + grid_x * (1./3.), 2 * grid_x, grid_y + grid_x * (1./3.));
    line(grid_x, grid_y + grid_x * (2./3.), 2 * grid_x, grid_y + grid_x * (2./3.));
}

function drawBoard() {
    var keys = Object.keys(game);
    for (var i = 0; i < keys.length; i++) {
        drawObject(keys[i], game[keys[i]], false);
    }
}