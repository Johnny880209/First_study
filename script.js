// 랜덤 번호 지정
// 유저가 번호를 입력한다. 그리고 GO라는 버튼을 누름
// 만약 유저가 랜덤 번호를 맞추면, 맞췄습니다.
// 랜덤번호 < 유저번호 DOWN!
// 랜덤번호 > 유저번호 UP!
// Reset 버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다쓰면 게임이 끝난다. (더이상 추측불가, 버튼 Disable)
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. (기회를 깎지 않는다.)
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. (기회를 깎지 않는다.)

let computerNum = 0;
let playBtn = document.getElementById("play_button");
let userInput = document.getElementById("user_input");
let resultArea = document.getElementById("result_area");
let resetBtn = document.getElementById("reset_button");
let chanceArea = document.getElementById("chance_area");
let sameValue = [];
let chances = 5;

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
userInput.addEventListener("focus", function(){userInput.value = ""});

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100 + 1);

  console.log(computerNum);
}

function play() {
  let userValue = userInput.value;

  if (sameValue.includes(userValue)) {
    resultArea.textContent = "이미 입력한 숫자 입니다!";

    return;
  };

  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1에서 100사이의 숫자를 입력해 주세요!";

    return;
  };

  chances--;

  chanceArea.textContent = `${chances}회 남았습니다!`;

  sameValue.push(userValue);

  if (userValue > computerNum) {
    resultArea.textContent = "DOWN!!";
  } else if (userValue < computerNum) {
    resultArea.textContent = "UP!!";
  } else {
    resultArea.textContent = "정답 입니다!!";
    playBtn.disabled = true;
    return;
  }

  if (chances < 1) {
    gameOver();
  }
}

function reset() {
  pickRandomNum();
  resultArea.textContent = "결과가 나온다.";
  userInput.value = "";
  playBtn.disabled = false;
  chances = 5;
  chanceArea.textContent = `${chances}회 남았습니다!`;
}

function gameOver() {
  resultArea.textContent = "실패하셨습니다!";
  playBtn.disabled = true;
}

pickRandomNum();
