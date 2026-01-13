// Shafin Kazi, Alvin Sze, Thamidur Rahman, Sean Takahashi
// Tachyons Guinea Pigs
// SoftDev pd4
// p02
// 2026-01-16f

var dead = false

var positionY = 0
var velocityY = 0
var accelerationY = 0

var gravity = 1

var floorLocation = 0

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "green";

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillRect(canvas.width/2, canvas.height/2 + positionY, 75, 75);

  if (positionY < floorLocation) {
    accelerationY = gravity
  }
  else {
    accelerationY = 0
    positionY = 0
  }

  positionY += velocityY
  velocityY += accelerationY

  console.log(positionY);

  requestAnimationFrame(update);
}

if (!dead){
  update();
}

function jump() {
  if (positionY >= floorLocation) {
    velocityY = -12
  }
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") jump();
});


function endgame() { ///////////////////////////////////////// FIX
  console.log("pop1111111111111111111");
  cancelAnimationFrame(update);
  dead = true
}
