/**
 * sketch.js
 * Created by Tim on 06/03/2017.
 */

var grid_x;// = window.innerWidth / 3.;
var grid_y;// = window.innerHeight/ 6.;
var noughtChoicesBoxX = [];
var noughtChoicesBoxY = [];
var crossChoicesBoxX = [];
var crossChoicesBoxY = [];


var holdDrawing = false;
var hasWon = false;
var playersTurn = true;
var loc1 = [];
var loc2 = [];
var timer = 0;
var choice = 0;
// if 0, unoccupied, if 1 : nought, if -1: cross
var game = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
};

function setup() {
    frameRate(10);
    createCanvas(screen.width, screen.height);
}


function draw() {
    if (holdDrawing) {
        if (hasWon) {
            strokeWeight(10);
            stroke(0, 255, 0);
            line(loc1[0] + grid_x / 6., loc1[1] + grid_x / 6., loc2[0] + grid_x / 6., loc2[1] + grid_x / 6.);
            messageBox("You lose", [255, 0, 0]);
        } else {
            messageBox("It's a draw!", [0, 0, 255]);
        }
        timer++;
        if (timer > 10) {
            timer = 0;
            holdDrawing = false;
        }
        return;
    }

    grid_x = window.innerWidth / 3.;
    grid_y = window.innerHeight / 6.;
    background(95, 67, 165);

    handleGame();
    // Draw the tic tac toe grid
    setupTicTacToeGrid();
    // Wherever the mouse hovers, offer the symbol there
    drawObject(getMouseLocationQuadrant(mouseX, mouseY), choice, true);

    // Draw the boardgame
    drawBoard();

    if (choice == 0) {
        offerChoice();
    }

}

function mouseReleased() {
    if (holdDrawing) {
        return;
    }
    if (choice !== 0) {
        quadrant = getMouseLocationQuadrant(mouseX, mouseY);
        if (isQuadrantEmpty(quadrant)) {
            drawObject(quadrant, choice, false);
            game[quadrant] = choice;
            playersTurn = false;
        }
    } else {
        if (mouseX < noughtChoicesBoxX[1] && mouseX > noughtChoicesBoxX[0] &&
            mouseY < noughtChoicesBoxY[1] && mouseY > noughtChoicesBoxY[0]) {
            choice = 1;

        }
        if (mouseX < crossChoicesBoxX[1] && mouseX > crossChoicesBoxX[0]  &&
            mouseY < crossChoicesBoxY[1] && mouseY > crossChoicesBoxY[0]) {
            choice = -1;
        }
    }

}

function messageBox(dispStr, text_colour) {
    strokeWeight(1);
    fill(255);
    rect(1.25 * grid_x, 0.25 * grid_y, grid_x / 2., grid_y / 2.);
    fill(text_colour[0], text_colour[1], text_colour[2]);
    stroke(0);
    textSize(30);
    text(dispStr, 1.25 * grid_x + grid_x / 9., 0.25 * grid_y + grid_y / 3.);
}

function offerChoice() {
    strokeWeight(1);
    fill(255);
    var innerX = 1.15 * grid_x;
    var innerY = grid_y + grid_x / 6.;
    var widthX = 2 * grid_x / 3;
    var widthY = 2 * grid_x / 3;
    rect(innerX, innerY, widthX, widthY);

    noughtChoicesBoxX = [innerX + 0.1 * widthX, innerX + 0.1 * widthX + (widthX / 2 - 0.125 * widthX)];
    noughtChoicesBoxY = [innerY + 0.1 * widthY, innerY + 0.1 * widthY + (0.8 * widthY)];

    crossChoicesBoxX = [innerX + 0.5 * widthX, innerX + 0.5 * widthX + (widthX / 2 - 0.125 * widthX)];
    crossChoicesBoxY = [innerY + 0.1 * widthY, innerY + 0.1 * widthY + (0.8 * widthY)];

    ellipseMode(CORNER);
    strokeWeight(10);
    stroke(0, 122, 0);
    noFill();
    ellipse(noughtChoicesBoxX[0] + 10 , noughtChoicesBoxY[0] + 0.25*(noughtChoicesBoxY[1] - noughtChoicesBoxY[0]) + 10,
    noughtChoicesBoxX[1] - noughtChoicesBoxX[0] - 20);

    strokeWeight(10);
    stroke(122, 0, 0);
    line(crossChoicesBoxX[0] + 10, crossChoicesBoxY[0] + 0.25*(crossChoicesBoxY[1] - crossChoicesBoxY[0]) + 10,
        crossChoicesBoxX[1] - 10, crossChoicesBoxY[1] - 0.25*(crossChoicesBoxY[1] - crossChoicesBoxY[0]) - 20);
    line(crossChoicesBoxX[1] - 10, crossChoicesBoxY[0] + 0.25*(crossChoicesBoxY[1] - crossChoicesBoxY[0]) + 10,
        crossChoicesBoxX[0] + 10, crossChoicesBoxY[1] - 0.25*(crossChoicesBoxY[1] - crossChoicesBoxY[0]) - 20);

    if (mouseX < noughtChoicesBoxX[1] && mouseX > noughtChoicesBoxX[0] &&
        mouseY < noughtChoicesBoxY[1] && mouseY > noughtChoicesBoxY[0]) {
        noStroke();
        fill(0, 255, 0, 130);
        rect(noughtChoicesBoxX[0], noughtChoicesBoxY[0] + 0.25 * (crossChoicesBoxY[1] - crossChoicesBoxY[0]),
            noughtChoicesBoxX[1] - noughtChoicesBoxX[0], noughtChoicesBoxX[1] - noughtChoicesBoxX[0]);
    }
    if (mouseX < crossChoicesBoxX[1] && mouseX > crossChoicesBoxX[0]  &&
        mouseY < crossChoicesBoxY[1] && mouseY > crossChoicesBoxY[0]) {
        noStroke();
        fill(0, 255, 0, 130);
        rect(crossChoicesBoxX[0], crossChoicesBoxY[0] + 0.25 * (crossChoicesBoxY[1] - crossChoicesBoxY[0]),
            noughtChoicesBoxX[1] - noughtChoicesBoxX[0], noughtChoicesBoxX[1] - noughtChoicesBoxX[0]);
    }
    strokeWeight(1);
    noStroke();
    fill(0);
    textSize(30);
    text("Pick one!", innerX + widthX * 0.3, innerY + widthY * 0.15);
    textSize(20);
    //text("(you'll take turns going first)", innerX + widthX * 0.1, innerY + widthY * 0.15 + (crossChoicesBoxY[1] - crossChoicesBoxY[0]));


}

function getMouseLocationQuadrant(mouseX, mouseY) {
    // check if actually inside the grid
    if (mouseX < grid_x || mouseX > 2 * grid_x ||
        mouseY < grid_y || mouseY > grid_x + grid_y) {
        return -1;
    }
    var i = Math.floor(3 * (mouseX - grid_x) / grid_x);
    var j = Math.floor(3 * (mouseY - grid_y) / grid_x);
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
    if (!playersTurn) {
        messageBox("Thinking...", [0, 0, 155]);
        setTimeout(getNextMove, 500);
    }

    if (isFinished()) {
        setTimeout(resetGame, 100);
    }
}

function getNextMove() {
    var potentialGame = getGameState();
    game[minimax(potentialGame, 0)] = choice * -1;
    playersTurn = true;
}

function getGameState () {
    var board = {};
    for (var i = 0; i < 9; i++) {
        board[i] = game[i];
    }
    return {board : board, turn: choice * -1};
}

function scoreGame(potentialGame, depth) {
    //console.log(potentialGame);
    var winStates = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (var i = 0; i < winStates.length; i++) {
        var score = potentialGame.board[winStates[i][0]] + potentialGame.board[winStates[i][1]] + potentialGame.board[winStates[i][2]];
        // Player choice is +-1, so if player wins score == +- 3, if player loses score == -+3
        // compute choice * score, if player wins (bad for minimax) this is 3, if player loses (goal) this is -3
        if (score * choice == 3) {
            return 10 - depth;
        } else if (score * choice == -3) {
            return depth - 10;
        }
    }
    return 0;
}

function minimax(potentialGame, depth) {
    var scores = [];
    var moves = [];
    depth++;
    // since the player's choice is +-1, choice * potentialGame.turn == 1 means it the players turn
    var availableMoves = getAvailableMoves(potentialGame);
    if (availableMoves.length === 0) {
        return scoreGame(potentialGame, depth);
    }

    for (var i = 0; i < availableMoves.length; i++) {
        var possibleGame = makeMove(potentialGame, availableMoves[i]);
        scores.push(minimax(possibleGame, depth));
        moves.push(availableMoves[i]);
    }
    var index = -1;
    if (choice * potentialGame.turn === 1) {
        // MINI
        index = getMinIndex(scores);
    } else {
        // MAX
        index = getMaxIndex(scores);
    }
    return moves[index];

}

function makeMove(potentialGame, quadrant) {
    // potential game is a {board: game, turn: +-1} object
    // quadrant is the quadrant you want to make the move in
    // returns a new potentialGame
    potentialGame.board[quadrant] = potentialGame.turn;
    potentialGame.turn *= -1;
    return potentialGame;
}

function getAvailableMoves(potentialGame) {
    var moves = [];
    for (var i = 0; i < 9; i++) {
        if (potentialGame.board[i] === 0) {
            moves.push(i);
        }
    }
    return moves;
}


function resetGame() {
    game = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0
    };
}


function getMinIndex(arr) {
    var currMin = 1e10;
    var currIndex = -1;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < currMin || currIndex === -1) {
            currMin = arr[i];
            currIndex = i;
        }
    }
    print(arr);
    print("Min found at " + currIndex);
    return currIndex;
}

function getMaxIndex(arr) {
    var currMax = -1e10;
    var currIndex = -1;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > currMax || currIndex === -1) {
            currMax = arr[i];
            currIndex = i;
        }
    }
    print(arr);
    print("Max found at " + currIndex);
    return currIndex;
}

function isFinished() {
    if (checkRows() || checkCols() || checkDiags()) {
        holdDrawing = true;
        hasWon = true;
        return true;
    }

    hasWon = false;
    var keys = Object.keys(game);
    for (var quadCheck = 0; quadCheck < keys.length; quadCheck++) {
        if (game[keys[quadCheck]] == 0) {
            return false;
        }
    }
    holdDrawing = true;
    return true;
}

function checkRows() {
    var locations = [0, 3, 6];
    for (var i = 0; i < locations.length; i++) {
        if (Math.abs(game[locations[i]] + game[locations[i] + 1] + game[locations[i] + 2]) == 3) {
            loc1 = getQuadrantTopLeft(locations[i]);
            loc2 = getQuadrantTopLeft(locations[i] + 2);
            return true;
        }
    }
    return false;
}

function checkCols() {
    var locations = [0, 1, 2];
    for (var i = 0; i < locations.length; i++) {
        if (Math.abs(game[locations[i]] + game[locations[i] + 3] + game[locations[i] + 6]) == 3) {
            loc1 = getQuadrantTopLeft(locations[i]);
            loc2 = getQuadrantTopLeft(locations[i] + 6);
            return true;
        }
    }
    return false;
}

function checkDiags() {
    var locations = [0, 2];
    for (var i = 0; i < locations.length; i++) {
        if (Math.abs(game[locations[i]] + game[4] + game[8 - locations[i]]) == 3) {
            loc1 = getQuadrantTopLeft(locations[i]);
            loc2 = getQuadrantTopLeft(8 - locations[i]);
            return true;
        }
    }
    return false;
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
        var crossTopLeft = getQuadrantTopLeft(quadrant);
        var crossTopLeftX = crossTopLeft[0] + grid_x / 18.;
        var crossTopLeftY = crossTopLeft[1] + grid_x / 18.;
        var innerWidth = (grid_x / 3) * 4 / 6.;
        ellipseMode(CORNER);
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
    line(grid_x * (1 + 1. / 3.), grid_y, grid_x * (1 + 1. / 3.), grid_y + grid_x);
    line(grid_x * (1 + 2. / 3.), grid_y, grid_x * (1 + 2. / 3.), grid_y + grid_x);
    line(grid_x, grid_y + grid_x * (1. / 3.), 2 * grid_x, grid_y + grid_x * (1. / 3.));
    line(grid_x, grid_y + grid_x * (2. / 3.), 2 * grid_x, grid_y + grid_x * (2. / 3.));
}

function drawBoard() {
    var keys = Object.keys(game);
    for (var i = 0; i < keys.length; i++) {
        drawObject(keys[i], game[keys[i]], false);
    }
}