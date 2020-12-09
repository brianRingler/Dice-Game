"use strict";

// Create element
const diceEl = document.querySelector(".dice");
const diceAreaEl = document.querySelector(".dice-area");

const diceTotalEl = document.querySelector("#dice-total");
const numRollsEl = document.querySelector("#number-rolls");

// TODO build out logic for points
let pointsToWin = 20; // To win game must hit 20
let startingPoints = 50; // Will keep track of points
let winningPoints = 10; // if player hits 20 they and  winningPoints is added to startingPoints
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
  // BUG BUG TODO - This section is not working correctly. When score is > or == 20 evaluates to false
  const rolls = parseInt(diceTotalEl.value);
  const score = parseInt(numRollsEl.value);
  console.log(rolls);
  console.log(score);

  if (score == 20) {
    alert(
      `You WON! ${winningPoints} will be added to added to your starting points`
    );
    startingPoints += winningPoints;
  } else if (score > 20) {
    alert(`Game Over, your score is > 20 => ${score}`);
    startingPoints -= losingPoints;
    newGame();
  } else if (rolls == 0) {
    alert(
      `You are out of rolls. Target score to win is 20 and your score is ${score}. ${
        pointsToWin - score
      } will be subtracted starting points.`
    );
    newGame();
  } else {
    console.log("Everything skipped");
    console.log(typeof score);
    console.log(typeof rolls);
    console.log(score > 20);
  }
}

function keepScore(diceVal) {
  // Get current value Total Score
  let currentTotal = diceTotalEl.value;
  currentTotal = parseInt(currentTotal);
  diceTotalEl.setAttribute("value", (currentTotal += diceVal));
}

function rollsRemaining() {
  let rollsRemain = numRollsEl.value;
  numRollsEl.setAttribute("value", rollsRemain - 1);
}

// TODO when user selects refresh button of presses F5
function newGame() {
  // reset the Total Score to zero
  diceTotalEl.value = 0;
  // reset rolls remaining to 6
  numRollsEl.value = 6;
}
