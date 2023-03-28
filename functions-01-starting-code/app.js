const startGameBtn = document.getElementById('start-game-btn');
const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_CHOICE = 'ROCK';

const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PALYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER_WINS';

let gameIsRunning = false;

const getPlayerChoice = function () {
  const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}?`, '').toUpperCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(`Invalid choice! We chose ${DEFAULT_CHOICE} for you!`);
    return DEFAULT_CHOICE;
  }
  return selection;
};

const getComputerChoice = function () {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

// 화살표 함수로 전환
const getWinner = (cChoice, pChoice) => {
  return cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === ROCK && pChoice === PAPER) || (cChoice === PAPER && pChoice === SCISSORS) || (cChoice === SCISSORS && pChoice === ROCK)
    ? RESULT_PLAYER_WINS
    : RESULT_COMPUTER_WINS;

  // if (cChoice === pChoice) {
  //   return RESULT_DRAW;
  // } else if ((cChoice === ROCK && pChoice === PAPER) || (cChoice === PAPER && pChoice === SCISSORS) || (cChoice === SCISSORS && pChoice === ROCK)) {
  //   return RESULT_PLAYER_WINS;
  // } else {
  //   return RESULT_COMPUTER_WINS;
  // }
};

startGameBtn.addEventListener('click', () => {
  if (gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  console.log('Game is Starting...');
  const playerChocie = getPlayerChoice();
  const computerChoice = getComputerChoice();

  console.log(`computer : ${computerChoice}`);
  console.log(`player : ${playerChocie}`);

  const winner = getWinner(computerChoice, playerChocie);
  console.log(winner);

  let message = `You picked ${playerChocie}, computer picked ${computerChoice}, therefore you `;
  if (winner === RESULT_DRAW) {
    message = message + 'had a draw.';
  } else if (winner === RESULT_PLAYER_WINS) {
    message = message + 'won.';
  } else {
    message = message + 'lost.';
  }

  alert(message);
  gameIsRunning = false;
});

const showResult = (result, messageText) => {
  alert(messageText + ' ' + result);
};

const combine = (resultHandler, operation, ...numbers) => {
  // 함수 내부에 함수 생성
  const validateNumber = number => {
    return isNaN(number) ? 0 : number;
  };

  let sum = 0;
  for (const num of numbers) {
    if (operation === 'ADD') {
      sum += validateNumber(num);
    } else {
      sum -= validateNumber(num);
    }
  }
  // return sum;
  resultHandler(sum, '합계 :');
};

const subtractUp = function (resultHandler, ...numbers) {
  let sum = 0;
  for (const num of numbers) {
    sum -= num;
  }
  // return sum;
  resultHandler(sum);
};

// console.log(sumUp(showResult, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
// console.log(subtractUp(showResult, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
combine(showResult.bind(this, '결과 : '), 'ADD', 1, 2, 3, 4, 5);
console.log(combine(showResult, 'ADD', 1, 2, 3, 4, 5));
