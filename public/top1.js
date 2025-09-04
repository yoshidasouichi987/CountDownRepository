let FileNames = [];//server.js から送られてくる
let currentIndex = 0;//画像インデックス/2を羅列したperm のインデックス
let timeCounter;//計測する時間
let timeCounter2;//計測する時間
let countDownId;//インスタンス
let countDownId2;
let underCounting;//カウントダウン中か

const img = document.getElementById("img");//問題画像
const button = document.getElementById("button");//進むボタン
let num = document.getElementById("num").textContent;//サーバに送る
const anim = document.getElementById("CountBar");
const display = document.getElementById("display");//何問目か表示
const BOOL_Button = document.getElementById("BOOL_Buttons");//音がなるボタン

//画像ファイルの取得
async function loadFiles(){
    if(num == 1)num = 1;
    if(num == 2){
        num = parseInt(Math.random()*3+1) + 1;
    }
  const response = await fetch(`/api/files/${num}`);
  FileNames = await response.json();
  
  if (FileNames.length % 2 === 1) {
    console.log("ファイルの数が奇数です");
    throw new Error("ファイルの数が奇数です");
  }
}
//10秒カウント（同期処理）
function countdown() {
new Promise((resolve) => {
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
      img.classList.remove('visible');
    }
    clearInterval(countDownId2);
    }
  },1000);
}
//--------------------------
const Length = 4;
//top1の場合---------
function generatePermutations() {
  const maxNumber = FileNames.length / 2 ;//半開半閉 maxNumberは不正
  const permutations = [];
  
  //画像の並べ方を羅列
  function nextPermutation(limit, arr) {
    if (arr.length === Length) {
      permutations.push([...arr]);
      return;
    }
    if ((maxNumber-1) - limit < Length - arr.length) return;//残り個数　< 作らなければならない個数 配列が作りきれない

    for (let i = limit + 1; i < maxNumber; i++) {
      arr.push(i);
      nextPermutation(i, arr);
      arr.pop();
    }
  }
  
  nextPermutation(-1, []);
  //ランダムに配列を選び返す
  return permutations[Math.floor(Math.random() * permutations.length)];
}

//カウント開始
async function startCountDown(permarr){
    //初期化
    timeCounter = 10;
    img.src = `slides1/${FileNames[permarr[currentIndex]*2]}`;
    button.classList.remove('visible');
    img.classList.add('visible');
    img.classList.add('imgh');//高めに表示
    anim.classList.add('visible');
    BOOL_Button.classList.remove('visible');
    
    //カウントダウン開始（同期処理 - 完了まで待機）
    await countdown();
    //10秒間以内画像を表示
    img.src = `slides1/${FileNames[permarr[currentIndex]*2+1]}`;
    img.classList.add('visible');
    img.classList.remove('imgh');
    anim.classList.remove('visible');
    button.classList.add('visible');
    BOOL_Button.classList.add('visible');
    countdown2(); //非同期処理 - 待機しない
    if(currentIndex+1 == Length){
      //終了
      button.textContent = "またのお越しを"
      alert("完答");
    }
}

document.addEventListener('DOMContentLoaded', async () => {
  //ぺーじが読まれたときの処理
  await loadFiles();
  var permarr = generatePermutations();
  //currentIndex = 0;
  //ボタンが押されたときの処理
  document.querySelector("button").addEventListener('click', async ()=>{
    //currentIndexは0=>maxNumber-1
    if(currentIndex == 0){
      //alert("最初の問題です");
    }
    display.textContent = `第${currentIndex+1}問目`;
    await startCountDown(permarr);
    currentIndex ++;
    if(currentIndex === Length){
      //終了
      //alert("リロードしてください");
      return;
    }
  });
});
//npm startで実行
//lsof -ti:3000
//pkill -f"node server.js"
//kill <表示される数字>でプロセスを終了
//Cでいい
