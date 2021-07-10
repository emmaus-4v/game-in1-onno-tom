/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library
   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var spelerX = 8; // begin  x-positie van speler
var spelerY = 10; // begin y-positie van speler

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = 12;   // x-positie van vijand
var vijandY = 12;   // y-positie van vijand

var score = 0; // aantal behaalde punten

var snelheidX = 0;
var snelheidY= 0;

var staart = 3;
var blok = 40;

var vakjes = 19; 

var veldX = 0;
var veldY = 0;
const grote = 800;
/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */

 var tekenVeld = function () {
  fill("gray");
  rect(0, 0, 800, 800)
};

 


/**
 * Tekent de vijand
 * @param {} x x-coördinaat
 * @param {} y y-coördinaat
 */
var tekenVijand = function tekenVijand(x, y) {
fill(72, 255, 0);
rect(vijandX * 40, vijandY * 40, 40, 40)
};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {


};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
 var tekenSpeler = function ( x, y) {
 for (var i = 0; i < staart ; i++) {
   fill("violet");
  rect( x * 40 , y * 40, 40, 40)
  x = x * 40 + 40;
 }
};


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
 function beweegVijand() {
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {

};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */

var beweegSpeler = function draw() {
  if (keyIsDown(37)) {
    snelheidX=-0.07;      
    snelheidY=0;   
  }

  if (keyIsDown(39)) {
    
    snelheidX=0.07;     
    snelheidY=0;  
  }

  if (keyIsDown(38))
   {
  
    snelheidX=0;     
     snelheidY=-0.07;  
  }

  if (keyIsDown(40)) {
    
    snelheidX=0;     
    snelheidY=0.07;  
  }
  spelerX = (spelerX + snelheidX);
  spelerY = (spelerY + snelheidY);
};


/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function eetFruit(vijandX, vijandY, spelerX, spelerY) {
  if (spelerX === vijandX && spelerY === vijandY) {
    staart = staart++;
    let u = random(0,19); 
    vijandX = u;
    let h = random(0, 19);
    vijandY = h;
    tekenVijand();
  }
  else  false;
};




/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function () {
    if( spelerX < 0 || spelerX > 19 || spelerY < 0 || spelerY > 19) {
      /* resets naar begin van de game*/
      staart = 3;                      
      spelerX = 8;
      spelerY = 10;
      score = 0;
    }
  return false;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    
  return false;
};


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(800, 800);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('black');
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case SPELEN:
      beweegVijand();
      beweegSpeler();
      
      if (checkVijandGeraakt()) {
       score = score + 10
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
          
      }

      tekenVeld();
      tekenVijand(vijandX, vijandY);
      tekenSpeler(spelerX, spelerY);

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
  }
}

