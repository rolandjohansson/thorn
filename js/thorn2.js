/*
    Thorn2.js

    Author: Roland Johansson, October 2018
    http://www.rolandjohansson.se/
*/

const gConsoleOutput = document.querySelector("#console");
const gRollButton = document.querySelector("#roll");

const gPlayerDefaultName = "Brave";
let gPlayer = createPlayer(gPlayerDefaultName);
let gFoe = createFoe();

/* === OBJECTS === */

function createPlayer(playerName, hitPointsMax) {
  let player = {
    name: playerName,
    visible: true,
    hitPointsMax: 100,
    hitPontsNow: 100,
    pairMultiplier: 2,
    // armor: "0",
    basicDamage: 1,
    luck: 0
  };
  return player;
}

function createFoe() {
  const foeNames = [
    "Grognar",
    "Blurb",
    "Snortiborp",
    "Barfalot",
    "Sproknaar"
  ];
  const foeName = foeNames[getRandomInt(0, foeNames.length - 1)];
  const player = createPlayer(foeName);
  player.hitPointsMax = getRandomInt(75, 125);
  player.hitPointsNow = player.hitPointsMax;
  return player;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* === UI === */

function writeToConsole(content) {
  var element = document.createElement("p");
  var txt = document.createTextNode(content);
  element.innerHTML = txt.nodeValue;
  gConsoleOutput.appendChild(element);
  gConsoleOutput.scrollTop = gConsoleOutput.scrollHeight;
}

function fightRollOutput(attackerName, defenderName, result) {
  writeToConsole("Hit! " + defenderName + " took <span class='text-danger'>" + result.actualDamage + "</span> damage");

  // + attackerName +" rolled " + result.attackerDiceSum + " (" + result.attackerDie1 + " + " + result.attackerDie2  + "). " + defenderName + " rolled " + result.defenderDie1 + ". Damage: " + result.actualDamage + " (" + result.attackerDiceSum + " - " + result.defenderDie1)
}

/* === GAME ENGINE === */

function startGame() {
  writeToConsole("Oh no! Our brave adventurer <span class='text-primary'>" + gPlayer.name + "</span> has encountered the infamous monster <span class='text-danger'>" + gFoe.name + "</span>. Time to roll the dice and fight!");
}

// TODO: Create setPlayerName function

function fightRoll(attacker, defender) {
  var outcome = {
    attackerDie1: 0,
    attackerDie2: 0,
    defenderDie1: 0,
    attackerDiceSum: 0,
    actualDamage: 0
  };

  outcome.attackerDie1 = getRandomInt(1, 6);
  outcome.attackerDie2 = getRandomInt(1, 6);

  outcome.attackerDiceSum = outcome.attackerDie1 + outcome.attackerDie2;
  if (outcome.attackerDie1 == outcome.attackerDie2 ) {
      outcome.attackerDiceSum = outcome.attackerDiceSum * attacker.pairMultiplier;
  }

  outcome.defenderDie1 = getRandomInt(1, 6);

  outcome.actualDamage = outcome.attackerDiceSum  - outcome.defenderDie1;

  if (outcome.actualDamage < 0) {
      outcome.actualDamage = 0;
  }

  defender.hitPointsNow -= outcome.actualDamage;

  if (defender.hitPointsNow < 0) {
    defender.hitPointsNow = 0;
  }

  return outcome;

}

function playerTurn() { 
  var result = fightRoll(gPlayer, gFoe);
  fightRollOutput(gPlayer.name, gFoe.name, result)
}

function foeTurn() {
  var result = fightRoll(gFoe, gPlayer);
  fightRollOutput(gFoe.name, gPlayer.name, result)
}

function turn() {
    playerTurn();
    foeTurn();
}

startGame();
gRollButton.addEventListener("click", function() {
  turn();
});




// // const gGRAPHICSAREA = document.querySelector(".graphics")
// const gDICEIMAGESPATH = "assets/dice/"
// var console = {};

// console.log = function(text) {
//   var element = document.createElement("div");
//   var txt = document.createTextNode(text);
//   element.appendChild(txt);
//   gCONSOLEOUTPUT.appendChild(element);
// }

// function rollDice(numberOfDice) {
//   if (document.querySelector(".dice")) {
//     document.querySelectorAll('.dice').forEach(function(i) {
//       i.remove()
//     })
//   }

//   for (i = 0; i < numberOfDice; ++i) {
//     const DIEROLL = Math.floor(Math.random() * 6) + 1;
//     drawDice(DIEROLL);
//   }
// }

// function drawDice(DIEROLL) {
//   console.log("You rolled " + DIEROLL);
//   gCONSOLEOUTPUT.scrollTop = gCONSOLEOUTPUT.scrollHeight;
//   const DICE = document.createElement("img");
//   DICE.setAttribute("src", gDICEIMAGESPATH + DIEROLL + ".svg");
//   DICE.setAttribute("class", "dice");
//   DICE.setAttribute("id", "die" + (i + 1));
//   gGRAPHICSAREA.appendChild(DICE);
// }

// gROLLBTN.addEventListener("click", function() {
//   rollDice(2);
// });

// === Canvas == //

// function canvas_obj(ele) {
//   let returnable = {
//     canvas: ele,
//     ctx: ele.getContext("2d"),
//     dpi: window.devicePixelRatio
//   };
//   returnable.get = {
//     style: {
//       height() {
//         return +getComputedStyle(ele).getPropertyValue("height").slice(0, -2);
//       },
//       width() {
//         return +getComputedStyle(ele).getPropertyValue("width").slice(0, -2);
//       }
//     },
//     attr: {
//       height() {
//         return returnable.ele.getAttribute("height");
//       },
//       width() {
//         return returnable.ele.getAttribute("height");
//       }
//     }
//   };
//   returnable.set = {
//     style: {
//       height(ht) {
//         ele.style.height = ht + "px";
//       },
//       width(wth) {
//         ele.style.width = wth + "px";
//       }
//     },
//     attr: {
//       height(ht) {
//         ele.setAttribute("height", ht);
//       },
//       width(wth) {
//         ele.setAttribute("width", wth);
//       }
//     }
//   };
//   return returnable;
// }

// let canvas = canvas_obj(document.querySelector("#canvas"));
// let { ctx, dpi, set, get } = canvas;

// function dpiAdjust() {
//   set.attr.height(get.style.height() * dpi);
//   set.attr.width(get.style.width() * dpi);
// }

// dpiAdjust();

// ctx.fillStyle = "#FF0000";
// ctx.fillRect(0,0,750,500);