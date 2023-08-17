//숫자게임 (컴퓨터가 생각한 3자리 숫자를 정확하게 맞추면 되는 게임)

// 1. 랜덤 숫자 만들기 (랜덤, 소수점 변환) (조건1 랜덤 숫자 출력)
function answerNum() {
  let arrNum = [];
  for (let i = 0; i < 3; i++) {
    let ranNum = Math.floor(Math.random() * 10);
    if (arrNum.includes(ranNum)) {
      i--;
    } else {
      arrNum.push(ranNum);
    }
  }
  return arrNum;
}
//console.log("answerNum :",answerNum());

// 2. 한자리 숫자에 대해 볼, 스크라이크 판단 하는 부분 구현하기
// 3. 볼, 스트라이크를 표현하는 부분 구현하기
// (조건2 규칙 a.숫자의 값과 위치가 모두 일치하면 S  규칙 b.숫자의 값은 일치하지만 위치가 틀렸으면 B 출력)

//let inputNum = [1, 4, 9] for문의 quest자리에 먼저 넣어놓고 테스트.
function sbCheck(quest, gameStart) {
  let strike = 0;
  let ball = 0;
  for (let i = 0; i < 3; i++) {
    if (quest[i] == gameStart[i]) strike++;
    else if (gameStart.includes(quest[i])) ball++;
  }
  return { strike, ball };
}
//console.log(sbCheck());

// 4. 게임 종료하는 부분 구현하기
// (조건3 기회는 무제한이며, 몇번의 시도후 맞췄는지 출력)
const readline = require("readline"); //콘솔창 입력받기

function game() {
  console.log("컴퓨터가 숫자를 생성하였습니다. 답을 맞춰보세요!");

  const gameStart = answerNum();
  //console.log("answerNum :", gameStart); // 랜덤 숫자 함수
  let count = 0;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function round() {
    count++;
    rl.question(`${count}번째 시도 : `, (input) => {
      const quest = input.split("").map(Number);
      const score = sbCheck(quest, gameStart);

      console.log(`${score.ball}B${score.strike}S`);

      if (quest.length !== 3) {
        console.log("입력 숫자가 3이 아닙니다.");
        round();
      } else if (score.strike == 3) {
        console.log(`${count}번만에 맞히셨습니다.`);
        console.log("게임을 종료합니다.");
        rl.close();
      } else {
        round();
      }
    });
  }
  round();
}
game();