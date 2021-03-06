/*
    Thorn2.js
    Author: Roland Johansson, October 2018
    http://www.rolandjohansson.se/
*/

// TODO: Local store player highscore

"use strict";

const gConsoleOutput = document.querySelector("#console");
const gFoeNameOutput = document.querySelector("#player-two-name");
const gRollButton = document.querySelector("#roll");

const gPlayerNameModal = document.querySelector('#player-name-modal');
const gPlayerNameInput = document.querySelector("#player-name-input");
const gPlayerNameOutput = document.querySelector("#player-one-name");
const gPlayerNameForm = document.querySelector("#player-name-form");

let gPlayerDefaultName = "Brave";
let gWins = 0;

let gPlayer = createPlayer(gPlayerDefaultName);
gPlayer.healthbar = document.querySelector('#healthbar-one-progress');
gPlayer.health = document.querySelector("#healthbar-one-output");
let gFoe = createFoe();

/* ================= OBJECTS ================= */

function createPlayer(playerName, hitPointsMax) {
  let player = {
    name: playerName,
    visible: true,
    hitPointsMax: 100,
    hitPointsNow: 100,
    pairMultiplier: 2,
    // armor: "0",
    basicDamage: 1,
    luck: 0,
    healthbar: null,
    health: null,
    isAlive: function() {
      return this.hitPointsNow > 0;
    }
  };
  return player;
}

function createFoe() {
  const foeNames = [
    "Grognar",
    "Blurb",
    "Snortiborp",
    "Count Barfalot",
    "Sproknaar"
  ];
  const foeName = foeNames[getRandomInt(0, foeNames.length - 1)];
  const player = createPlayer(foeName);
  player.hitPointsMax = getRandomInt(1, 10);
  player.hitPointsNow = player.hitPointsMax;
  player.healthbar = document.querySelector('#healthbar-two-progress');
  player.health = document.querySelector("#healthbar-two-output");
  return player;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ================= GAME ENGINE ================= */

function startGame() {
  updatePlayerNames();
  updateHealthBars();
  updateWinsCounter();
  writeToConsole("Oh no! Our brave adventurer <span class='text-primary'>" + gPlayer.name + "</span> has encountered the infamous monster <span class='text-danger'>" + gFoe.name + "</span>. Time to roll the dice and fight!");
  gRollButton.addEventListener("click", function () {
    turn();
  });
}

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
  if (outcome.attackerDie1 == outcome.attackerDie2) {
    outcome.attackerDiceSum = outcome.attackerDiceSum * attacker.pairMultiplier;
  }

  outcome.defenderDie1 = getRandomInt(1, 6);

  outcome.actualDamage = outcome.attackerDiceSum - outcome.defenderDie1;

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
  // gFoe.hitPointsNow -= result.actualDamage;
  fightRollOutput(gPlayer.name, gFoe.name, result);
}

function foeTurn() {
  var result = fightRoll(gFoe, gPlayer);
  // gFoe.hitPointsNow -= result.actualDamage;
  fightRollOutput(gFoe.name, gPlayer.name, result);
  if (!gFoe.isAlive()) {
    endRound();
  }
}

function turn() {
  if (gPlayer.isAlive()) {
    playerTurn();
  } else {
    endRound();
  }

  if (gFoe.isAlive()) {
    gRollButton.setAttribute("disabled", true);
    window.setTimeout(function() {
      foeTurn();
      gRollButton.removeAttribute("disabled");
    }, 2000);
  } else {
    gWins++
    endRound();
  }
  
}

function endRound() {
  updateWinsCounter();
  writeToConsole("End of round!");
  /* 
  PLAYER WINS:
  1. Change roll button to "next round"
  2. Add 1 to wins counter
  3. Console output win message
  4. "Next round" restarts round on click

  PLAYER LOSES:
  1. Modal with game over message, highscore and retry button
  2. Add wins count to highscore
  3. show local storage highscore
  */

}

function updateWinsCounter() {
  document.querySelector("#wins").innerHTML = gWins;
}

gPlayerNameForm.addEventListener("submit", function(e) {
  e.preventDefault();
  gPlayer.name = gPlayerNameInput.value;
  startGame();
  gPlayerNameModal.style.display = "none";
});



/* ================= UI ================= */

function updateHealthBars() {
  [gPlayer, gFoe].forEach(player => {
    player.healthbar.setAttribute("max", player.hitPointsMax);
    player.healthbar.setAttribute("value", player.hitPointsNow); 
    player.health.innerHTML = player.hitPointsNow + " / " + player.hitPointsMax;
  });
}
  
function updatePlayerNames() {
  gPlayerNameOutput.innerHTML = gPlayer.name;
  gFoeNameOutput.innerHTML = gFoe.name;
}

function writeToConsole(content) {
  var element = document.createElement("p");
  var txt = document.createTextNode(content);
  element.innerHTML = txt.nodeValue;
  gConsoleOutput.appendChild(element);
  gConsoleOutput.scrollTop = gConsoleOutput.scrollHeight;
}

function fightRollOutput(attackerName, defenderName, result) {
  updateHealthBars();
  writeToConsole(attackerName + " (<span class=\"dice\">" + result.attackerDie1 + result.attackerDie2 + "</span>) hit " + defenderName + "(<span class=\"dice\">" + result.defenderDie1 + "</span>) with <span class='text-danger'>" + result.actualDamage + "</span> damage");
  // + attackerName +" rolled " + result.attackerDiceSum + " (" + result.attackerDie1 + " + " + result.attackerDie2  + "). " + defenderName + " rolled " + result.defenderDie1 + ". Damage: " + result.actualDamage + " (" + result.attackerDiceSum + " - " + result.defenderDie1)
}

/* ==== Modal ==== */



























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