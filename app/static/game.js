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

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var blocksize = 75

var floorLocation = canvas.height - blocksize

var grounded = true

ctx.fillStyle = "green";



function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillRect(canvas.width/10, positionY, blocksize, blocksize);

  if (positionY  < floorLocation) {
    accelerationY = gravity
    grounded = false
  }
  else if (!grounded){
    accelerationY = 0
    positionY = floorLocation
    velocityY = 0
    grounded = true
  }

  positionY += velocityY
  velocityY += accelerationY

  // console.log(grounded);

  requestAnimationFrame(update);
}

if (!dead){
  update();
}

function jump() {
  if (grounded) {
    velocityY = -12
  }
}

document.addEventListener("keydown", e => {
  if (e.code === "Space" || e.code === "KeyW" || e.code === "ArrowUp") jump();
});

document.addEventListener("mousedown", e => { 
  if (e.button === 0) jump();
})

function endgame() { ///////////////////////////////////////// FIX
  console.log("pop1111111111111111111");
  cancelAnimationFrame(update);
  dead = true
}
