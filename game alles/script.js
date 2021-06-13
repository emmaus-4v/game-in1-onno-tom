

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

import { LEVEL, OBJECT_TYPE } from './setup';
import { randomMovement } from './geestbewegen';
// Classes
import GameDesign from './GameDesign';
import Pacman from './Pacman';
import Geest from './Geest';

// Elementen
const gameGrid = document.querySelector('#game');
const scoreTaffel = document.querySelector('#score');
const startButton = document.querySelector('#start-button');

//game variabelen
const POWER_PILL_TIME = 10000;
const GLOBAL_SPEED = 80;
const gameBoard = GameDesign.createGameBoard(gameGrid, LEVEL);

// begin game
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;

function gameOver(pacman, Grid) {
    document.removeEventListener('keydown', (e) =>
    pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
    );

    gameBoard.showGameStatus(gameWin);

    clearInterval(timer);
    startButton.classList.remove('.hide');
}

function checkBotsing(pacman, geest) {
    const botsingGeest = geest.find(geest) ; pacman.pos === geest.pos;

    if(botsingGeest) {
        if (pacman.powerPill) {
            gameBoard.removeObject(botsingGeest.pos, [
                OBJECT_TYPE.GHOST,
                OBJECT_TYPE.BANG,
                botsingGeest.name
            ]);
            botsingGeest.pos = botsingGeest.startPos;
            score += 100;
        } else {
            gameBoard.removeObject(pacman.pos [OBJECT_TYPE.PACMAN]);
            gameBoard.rotateDiv(pacman.pos, 0);
            gameOver(pacman, gameGrid);
        }
    }
}

function gameLoop(pacman, geesten) {
    gameBoard.moveCharacter(pacman);
    checkBotsing(pacman, geesten)
    geesten.forEach((ghost) => gameBoard.moveCharacter(geesten));
    // botsing pacman met geest
    checkBotsing(pacman, geesten);
   // pacman eet stip
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {
      gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);

      gameBoard.dotCount--;
      score += 50;
    }
// check power up 
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
      gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);

      pacman.powerPill = true;
      score += 50;

      clearTimeout(powerPillTimer);
      powerPillTimer = setTimeout(
          () => (pacman.powerPill = false),
          POWER_PILL_TIME
      );
    }
    // geest bang voor pacman mode  
    if (pacman.powerPill !== powerPillActive) {
        powerPillActive = pacman.powerPill;
        geesten.forEach((geest) => (geest.isBang = pacman.powerPill));
    }

    // check of alle puntjes zijn gegeten
    if (gameBoard.dotCount === 0) {
        gameWin = true;
        gameOver(pacman, gameGrid);;
    }
   // nieuwe score
    scoreTaffel.innerHTML = score;
}

function startGame() {
    gameWin = false;
    powerPillActive = false;
    score = 0;

    startButton.classList.add('hide');

    gameBoard.createGrid(LEVEL);

    const pacman = new Pacman(2, 287);
    gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
    document.addEventListener('keydown', (e) =>
      pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
    );

    const geesten = [
        new Geest(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
        new Geest(4, 209, randomMovement, OBJECT_TYPE.PINKY),
        new Geest(3, 230, randomMovement, OBJECT_TYPE.INKY),
        new Geest(2, 251, randomMovement, OBJECT_TYPE.CLYDE)
    ];

    timer = setInterval(() => gameLoop(pacman, geesten), GLOBAL_SPEED);
}


startButton.addEventListener('click', startGame);



