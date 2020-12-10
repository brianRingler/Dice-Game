"use strict";

// Create element
const diceEl = document.querySelector(".dice");
const diceAreaEl = document.querySelector(".dice-area");

const diceTotalEl = document.querySelector("#dice-total");
const numRollsEl = document.querySelector("#number-rolls");

// Keep track of individual games played to win/lose
const gamesTotalEl = document.querySelector("#ind-game-count");
const startPointsEl = document.querySelector("#start-points");

// TODO build out logic for points
let pointsToWin = 20; // To win individual game must hit 20
let winningPoints = 20; // if player hits 20 they and  winningPoints is added to startingPoints
let losingPoints = 5;

// Returns a random integer between 1 and 6 inclusive
function randNum() {
  let rand = Math.trunc(Math.random() * 6) + 1;
  return rand;
}

function rollDice() {
  let randomNumber = randNum();
  let clsName = "";
  let divOutput = "";
  // Get the second class name "dice-x" with slice and replace with dice value rolled
  divOutput = `<div class="dice dice--${randomNumber}">`;

  // create line for each dot
  for (let i = 1; i <= randomNumber; i++) {
    // Create class name for element
    clsName = `dot dot-${i}`;
    divOutput += `<div class='${clsName}'></div>`;
  }
  divOutput += "</div>";
  diceAreaEl.innerHTML = divOutput;
  // Update the Total Score
  keepScore(randomNumber);
  // Update rolls remaining
  rollsRemaining();

  // Get current rolls and score
  const score = parseInt(diceTotalEl.value);
  const rolls = parseInt(numRollsEl.value);

  // Player wins. Add winning points to starting points
  if (score == 20) {
    alert(
      `You WON! ${winningPoints} will be added to added to your starting points`
    );
    addStartPoints(winningPoints);
    restart();
    // Player lost subtract losing points from starting points
  } else if (score > 20) {
    alert(
      `Game Over, your score ${score} is > 20. Starting points will be reduced by ${losingPoints}`
    );
    subStartPoints(losingPoints);
    wonLoss();
    restart();
  } else if (rolls == 0) {
    // Out of rolls, points is < 20. Subtract difference between points to win and points scored
    alert(
      `You are out of rolls. Target score to win is 20 and your score is ${score}. ${
        pointsToWin - score
      } points will be subtracted from starting points.`
    );
    subStartPoints(pointsToWin - score);
    wonLoss();
    restart();
  } else {
    console.log("There is a bug. This line should never run");
  }
}

// When user decides to take loss before roll count = 0
function newGame() {
  // Points to win individual game less total of dice based at time of Restart
  subStartPoints(pointsToWin - parseInt(diceTotalEl.value));
  updateGamesPlayed();
  // reset the Total Score to zero
  diceTotalEl.value = 0;
  // reset rolls remaining to 6
  numRollsEl.value = 6;

  // Check if player won or loss game
  wonLoss();
}

// Check if player won/loss based on starting points
// 0 or less lost >= 100 win
function wonLoss() {
  let totalStartPoints = parseInt(startPointsEl.value);
  alert(totalStartPoints);
  if (totalStartPoints <= 0) {
    alert("Bummer, your starting points are all gone. Game over.");
    alert("line 99");
    // TODO log results to db
  } else if (totalStartPoints >= 100) {
    alert(
      `You have won the game! Total points: ${startPointsEl.value} with a total of ${gamesTotalEl.value} games played.`
    );
    resetGame();
    // TODO log results to db
  }
}

// If player wins add winning points to starting points
function addStartPoints(addPoints) {
  let curPoints = startPointsEl.value;
  curPoints = parseInt(curPoints); // TODO check if I can use parseInt() above
  startPointsEl.setAttribute("value", curPoints + addPoints);
}

function subStartPoints(subPoints) {
  let curPoints = startPointsEl.value;
  curPoints = parseInt(curPoints); // TODO check if I can use parseInt() above
  startPointsEl.setAttribute("value", curPoints - subPoints);
}

function keepScore(diceVal) {
  // Get current value Total Score
  let currentTotal = diceTotalEl.value;
  currentTotal = parseInt(currentTotal);
  diceTotalEl.setAttribute("value", (currentTotal += diceVal));
}

// reduce Rolls Remaining
function rollsRemaining() {
  let rollsRemain = numRollsEl.value;
  numRollsEl.setAttribute("value", rollsRemain - 1);
}

// Keep track of total games played
// Player who reaches 100 points with lowest number of games played wins
function updateGamesPlayed() {
  let games = gamesTotalEl.value;
  games = parseInt(games);
  gamesTotalEl.setAttribute("value", (games += 1));
}

function exitGame() {
  confirm(
    'Are you sure you want to EXIT game? If you want to start a new individual game then select cancel and hit "Restart" button.'
  );
}

// Use when player starting points reaches <= 0 || >= 100
function resetGame() {
  gamesTotalEl.setAttribute("value", "0");
  startPointsEl.setAttribute("value", "50");
}

// Use when player wins or loses individual game
function restart() {
  diceTotalEl.value = 0;
  numRollsEl.value = 0;
}
