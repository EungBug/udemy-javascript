// 변수 선언 let 키워드,  상수는 const 키워드 사용
// 변수명은 camelCase로 작성
// $, _ 로 시작할 수 있음

// 초기화 되지 않은 변수 선언
// let currentResult
// 선언과 할당을 함께
const defaultResult = 0;
let currentResult = defaultResult;
// 빈 배열 생성
let logEntries = [];

// 사용자 입력 값을 가져오는 함수
function getUserNumberInput() {
  return parseInt(userInput.value);
}

// 계산기 함수 작성
function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription);
}

function writeToLog(operationIndentifier, prevResult, operationNumber, newResult) {
  // 로그 객체 생성
  const logEntry = {
    operation: operationIndentifier,
    prevResult: prevResult,
    number: operationNumber,
    result: newResult,
  };
  logEntries.push(logEntry);
  // 객체 데이터 접근
  console.log(logEntry.result);
  console.log(logEntries);
}

// 함수 공통으로 빼기
function calculateResult(calculationType) {
  const enteredNumber = getUserNumberInput();

  // 유효하지 않은 연산자인 경우 return
  if ((calculationType !== 'ADD' && calculationType !== 'SUBTRACT' && calculationType !== 'MULTIPLY' && calculationType !== 'DIVIDE') || enteredNumber === 0) {
    return;
  }

  // 유효한 연산자인 경우에만 코드 실행
  if (calculationType === 'ADD' || calculationType === 'SUBTRACT' || calculationType === 'MULTIPLY' || calculationType === 'DIVIDE') {
    const initalResult = currentResult;
    let mathOperator;
    if (calculationType === 'ADD') {
      currentResult += enteredNumber;
      mathOperator = '+';
    } else if (calculationType === 'SUBTRACT') {
      currentResult -= enteredNumber;
      mathOperator = '-';
    } else if (calculationType === 'MULTIPLY') {
      currentResult *= enteredNumber;
      mathOperator = '*';
    } else if (calculationType === 'DIVIDE') {
      currentResult /= enteredNumber;
      mathOperator = '/';
    }

    createAndWriteOutput(mathOperator, initalResult, enteredNumber);
    writeToLog(calculationType, initalResult, enteredNumber, currentResult);
  }
}

function add() {
  calculateResult('ADD');
}

function subtract() {
  calculateResult('SUBTRACT');
}

function multiply() {
  calculateResult('MULTIPLY');
}

function divide() {
  calculateResult('DIVIDE');
}

// 각 operator 버튼에 이벤트
addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);

// 함수 호출
// add(1, 2);

// 함수 호출 후 return 값을 변수에 할당
// currentResult = add(1, 2);

// ``을 통해 문자열을 정의하는 방법 : 템플릿 문자열 > 문자열 안에 변수 또는 표현식을 넣을 수 있음
// 템플릿 문자열 사용 시 줄바꿈도 가능
// let calculationDescription = `(${defaultResult} + 10) * 3 / 2 -1`;

// 문자열 줄바꿈을 하는 여러 방법
// 1. 이스케이프 문자 '\n'
let errorMessage = 'An error \noccurred!';
// 2. 템플릿 문자열
let errorMessage2 = `An error 
occurred!`;

console.log(errorMessage);
console.log(errorMessage2);
