//ボタンを押したら画像が表示される
//音も流れる
//const BOOL_Button = document.getElementById("BOOL_Buttons");
//const BOOL_img = document.getElementById("BOOL_img");
const BOOL_img = document.getElementById("BOOL_img");
const button0 = document.getElementById("button0");
const button1 = document.getElementById("button1");
const audio0 = new Audio('');
const audio1 = new Audio('');
var isPushing = false;
var pushed = null;

button0.addEventListener('click',()=>{
    if(!isPushing){
      BOOL_img.src = "";
      BOOL_img.classList.add("visible");
      audio0.play();
      isPushing = true;
      pushed = 0;
    }else if(pushed === 0){
      BOOL_img.classList.remove("visible");
      isPushing = false;
    }
});
button1.addEventListener('click',()=>{
    if(!isPushing){
      BOOL_img.src = "";
      BOOL_img.classList.add("visible");
      audio1.play();
      isPushing = true;
      pushed = 1;
    }else if(pushed === 1){
      BOOL_img.classList.remove("visible");
      isPushing = false;
    }
});
