let FileNames = [];
let currentIndex = 0;
let timeCounter = 10;
let countDownId;
//画像ファイルの取得
async function loadFiles() {
  const num = document.getElementById("num").textContent;
  const response = await fetch(`/api/files/${num}`);
  FileNames = await response.json();
  
  if (FileNames.length % 2 === 1) {
    console.log("ファイルの数が奇数です");
    throw new Error("ファイルの数が奇数です");
  }
}

function generatePermutations() {
  const maxLength = FileNames.length / 2;
  const maxNumber = 2;
  const permutations = [];
  
  //画像の並べ方を羅列
  function nextPermutation(limit, arr) {
    if (arr.length === maxLength) {
      permutations.push([...arr]);
      return;
    }
    if (maxNumber - limit < maxLength - arr.length) return;
    
    for (let i = limit + 1; i <= maxNumber; i++) {
      arr.push(i);
      nextPermutation(i, arr);
      arr.pop();
    }
  }
  
  nextPermutation(0, []);
  //ランダムに配列を選ぶ
  return permutations[Math.floor(Math.random() * permutations.length)];
}

function startCountdown() {
  //初期化
  const img = document.getElementById("img");
  const button = document.querySelector("button");
  const anim = document.querySelector(".animation");
  
  const num = document.getElementById("num").textContent;
  currentIndex++;
  img.src = `slides${num}/${FileNames[currentIndex]}`;
  
  button.classList.add('visible');
  anim.classList.remove('visible');

  countDownId = setInterval(() => {
    timeCounter--;
      //終わったらタイマーリセット
    if (timeCounter === 0) {
      clearInterval(countDownId);
      button.classList.toggle('visible');
      anim.classList.toggle('visible');
      currentIndex++;
      img.src = `slides${num}/${FileNames[currentIndex]}`;
  
      if (currentIndex < FileNames.length / 2) {
        timeCounter = 10;
      }
    }
  }, 1000);//1秒おきに行う
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadFiles();
  generatePermutations();
  document.querySelector("button").addEventListener('click', startCountdown);
});
//npm startで実行
//lsof -ti:3000
//kill <表示される数字>でプロセスを終了