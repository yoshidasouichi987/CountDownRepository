import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const FileNames1 = fs.readdirSync("slides1");
const FileNames2 = fs.readdirSync("slides2");
const FileNames3 = fs.readdirSync("slides3");

let FileNames;

const num = document.getElementById("num").textContent();//id = numの要素の中身

switch(num){
    case "1":
        FileNames = FileNames1;
    case "2":
        FileNames = FileNames2;
    case "3":
        FileNames = FileNames3;
}
//順列を羅列
const max_length = FileNames.length/2;
if(FileNames.length%2 == 1){
    console.log("ファイルの数が奇数です");
    num = "ファイルの数が奇数です";
    throw new Error(num);
}
const max_number = 2;
var permunations = [];
const arr0 = [];
nextPermunation(0,arr0);
function nextPermunation(limit,arr){
    if(arr.length == max_length){//羅列し終えていたら
        permunations.push([...arr]);//値をコピー
        return;
    }
    if(max_number - limit < max_length - arr.length){//これから羅列できる数 < これから羅列しなければならない数
        return;
    }
    for(var i = limit+1;i<=max_number;i++){
        arr.push(i);
        nextPermunation(i,arr);
        arr.pop();//バックトラック
    }
}
//使用するpermunationを決める
var ransuu;
ransuu = Math.random() * permunations.length;
ransuu = Math.floor(ransuu);
const permunation = permunations[ransuu];
//ボタンが押されたら カウントバーの状態をリセット カウントダウンを行う 画面を切り替える
const img = document.getElementById("img");
const buttons = document.querySelectorAll("button");
const anim = document.querySelectorAll("animation") 
//クラスリストの状態・・・button：visible anim:animation img:
for(var ind_counter = 0;ind_counter<max_length;ind_number++){//画像を入れ替えていく
    var time_counter = 10//制限時間
    img.getAttribute('src') = FileNames[ind_counter];
    buttons[0].addEventListener('click',()=>{
        const counrDownId = setInterval(counting,1000);
        //関数定義
        function counting(){
            if(time_counter == 10||time_counter == 0){
                buttons[0].classList.toggle('visible');
                anim[0].classList.toggle('visible');
                img.classList.toggle('visible');
                if(time_counter == 0)clearInterval(countDownId);
            }
            time_counter--;
        }
    });  
}
