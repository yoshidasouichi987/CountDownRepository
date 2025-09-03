let FileNames = [];//server.js から送られてくる
let currentIndex = 0;//画像インデックス/2を羅列したperm のインデックス
let timeCounter;//計測する時間
let timeCounter2;
let countDownId;//インスタンス
let countDownId2;
let underCounting;//カウントダウン中か

const img = document.getElementById("img");
const button = document.getElementById("button");
const anim = document.getElementById("CountBar");
const num = document.getElementById("num").textContent;//サーバに送る

const Length = 2;
//画像ファイルの取得
async function loadFiles() {
  const response = await fetch(`/api/files/${num}`);
  FileNames = await response.json();
  
  if (FileNames.length % 2 === 1) {
    console.log("ファイルの数が奇数です");
    throw new Error("ファイルの数が奇数です");
  }
}

function generatePermutations() {
  const maxNumber = FileNames.length / 2;//半開半閉
  const permutations = [];
  
  //画像の並べ方を羅列
  function nextPermutation(limit, arr) {
    if (arr.length === Length) {
      permutations.push([...arr]);
      return;
    }
    if (maxNumber - limit < Length - arr.length) return;

    for (let i = limit + 1; i <= maxNumber; i++) {
      arr.push(i);
      nextPermutation(i, arr);
      arr.pop();
    }
  }
  
  nextPermutation(-1, []);
  //ランダムに配列を選び返す
  return permutations[Math.floor(Math.random() * permutations.length)];
}
//10秒カウント（同期処理）
function countdown() {
  return new Promise((resolve) => {
    underCounting = true;
    countDownId = setInterval(() => {
      timeCounter--;
      if (timeCounter === 0) {
        clearInterval(countDownId);
        underCounting = false;
        resolve();
      }
    }, 1000);
  });
}
function countdown2(){
  timeCounter2 = 10;
  countDownId2 = setInterval(()=>{
    timeCounter2--;
    if(timeCounter2===0){
    if(!underCounting){
      console.log("countDown2できてる");
      img.classList.remove('visible');
    }
    clearInterval(countDownId2);
    }
  },1000);
}
//カウント開始
async function startCountDown(permarr){
    //初期化
    timeCounter = 10;
    img.src = `slides${num}/${FileNames[permarr[currentIndex]*2]}`;
    button.classList.remove('visible');
    img.classList.add('visible');
    img.classList.add('imgh');
    anim.classList.add('visible');
    
    //カウントダウン開始（同期処理 - 完了まで待機）
    await countdown();
    //10秒間以内画像を表示
    img.src = `slides${num}/${FileNames[permarr[currentIndex]*2+1]}`;
    img.classList.add('visible');
    img.classList.remove('imgh');
    anim.classList.remove('visible');
    button.classList.add('visible');
    countdown2(); //非同期処理 - 待機しない
}

document.addEventListener('DOMContentLoaded', async () => {
  //ぺーじが読まれたときの処理
  await loadFiles();
  var permarr = generatePermutations();
  currentIndex = 0;

  //ボタンが押されたときの処理
  document.querySelector("button").addEventListener('click', async ()=>{
    //currentIndexは0=>maxNumber-1
    if(currentIndex == 0){
      alert("最初の問題です");
    }
    await startCountDown(permarr);
    currentIndex ++;
    if(currentIndex === Length){
      //終了
      alert("リロードしてください");
      return;
    }
  });
});
//npm startで実行
//lsof -ti:3000
//pkill -f"node server.js"
//kill <表示される数字>でプロセスを終了
//Cでいい