var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bird = new Image();
var bg = new Image();
var pipeUp = new Image();
var pipeDown = new Image();
var floor = new Image();

var bullet = new Image();

var gap = 100;
var xPos = 10;
var yPos = 150;
var yPosBullet = yPos;
var gravity = 1.5;
var score = 0;
var audio = new Audio();
var theme = new Audio();
var gameOver = new Audio();

bird.src = "bird.png";
bg.src = "bg.png";
pipeUp.src = "pipeUp.png";
pipeDown.src = "pipeDown.png";
floor.src = "floor.png";
bullet.src = "bullet.png";

var num = Math.floor(Math.random() * 2 + 1);
theme.src = "SoundMain" + num + ".mp3"; //change music theme
theme.volume = 0.3;

// document.addEventListener("keydown", moveUp);
// document.addEventListener("keydown", shoot);

audio.src = "SoundCoin.mp3";
gameOver.src = "gameOverSound.wav";



var checker = true;
var bulletA = [];
var pipe = [];

pipe[0] = {
  x: canvas.width,
  y: 0
}

function draw() {

  ctx.drawImage(bg, 0, 0);
if(checker == true){
  for (var i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;


    if (pipe[i].x == 110) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      })
    }
    if (pipe[i].x == 10) {
      score++;
    }
    if (pipe[i].x == 30) {
      audio.play();
    }
    if (xPos + bird.width - 5 >= pipe[i].x &&
      xPos + 5 <= pipe[i].x + pipeUp.width &&
      (yPos + 5 <= pipe[i].y + pipeUp.height ||
        yPos + bird.height - 5 >= pipe[i].y + pipeUp.height + gap) ||
      yPos + bird.height >= canvas.height - floor.height ||
      yPos <= -bird.height) {
      // alert({
      // icon:'fa fa-warning',
      // title:'Game Over',
      // animation:'bottom',
      // content:'Press enter to restart the game.'
      // });
      theme.volume = 0;
      gameOver.play();
      checker = false;
      swal({
             title: "Аида",
             text: "Го встречаться?",
             type: "warning",
             },
          )
          }


      // alert("Game over. Press enter to restart");
      // location.reload();
      // clearInterval(interval);
    }
}
  ctx.drawImage(floor, 0, canvas.height - floor.height);
  ctx.drawImage(bird, xPos, yPos);
if(checker == true){
  yPos += gravity;
}
  // yPosBullet = yPos;

  ctx.fillStyle = "black";
  ctx.font = "24px Verdana"
  ctx.fillText("Score: " + score, 10, canvas.height - 20);
  // ctx.fillText("yPos: " + yPos, 10, canvas.height - 40);  //проверка
  // ctx.fillText("yPosBullet: " + yPosBullet, 10, canvas.height - 60);

    requestAnimationFrame(draw);
}

function jump(){
  yPos -= 30;
  theme.play();
}

document.addEventListener('keydown', (event) => {
  // if (event.code = "Space") {
  //   bulletA.push({
  //     x: xPos,
  //     y: yPosBullet
  //   })
  //   for (var i = 0; i < bulletA.length; i++) {
  //     ctx.drawImage(bullet, bulletA[i].x, bulletA[i].y);
  //     for (var j = 0; j < 270; j++) {
  //       bulletA[i].x += 1.5;
  //     }
  //   }
  // }
  if(checker == false){
    location.reload();
    clearInterval(interval);
  }
  if (event.code == "ArrowUp") {
    yPos -= 30;
    theme.play();
  }
})


// if (xPos + bird.width - 5 >= pipe[i].x && //для удаления пуль при ударе
//   xPos + 5 <= pipe[i].x + pipeUp.width &&
//   (yPos + 5 <= pipe[i].y + pipeUp.height ||
//     yPos + bird.height - 5 >= pipe[i].y + pipeUp.height + gap) ||
//     yPos + bird.height >= canvas.height - floor.height

floor.onload = draw;
