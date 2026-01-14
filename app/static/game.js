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

var blocksize = 50

var floorLocation = canvas.height - blocksize

var grounded = true
var orbing = false

var scrollSpeed = 8

var obstacles = [
  {x: 1000, y: floorLocation, width: 40, height: 60},
  {x: 1500, y: floorLocation - 50, width: 60, height: 110}
]

var orbs = [
  {x: 1425, y: floorLocation - 30, radius: 25}
]


function update() {
  if (dead) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "cyan"
  ctx.fillRect(canvas.width/10, positionY, blocksize, blocksize);

  ctx.fillStyle = "red"
  for (let i = 0; i < obstacles.length; i++) {
    let obst = obstacles[i]
    obst.x -= scrollSpeed
    ctx.fillRect(obst.x, obst.y, obst.width, obst.height)

    let positionX = canvas.width / 10
    if (positionX + blocksize > obst.x && 
        positionX < obst.x + obst.width &&
        positionY + blocksize > obst.y &&
        positionY < obst.y + obst.height) {
      endgame()
    }
  }

  ctx.fillStyle = "gold"
  for (let i = 0; i < orbs.length; i++) {
    let orb = orbs[i]
    orb.x -= scrollSpeed
    ctx.fillRect(orb.x, orb.y, orb.radius, orb.radius)

    let positionX = canvas.width / 10
    if (positionX + blocksize > orb.x && 
        positionX < orb.x + orb.radius &&
        positionY + blocksize > orb.y &&
        positionY < orb.y + orb.radius) {
      orbing = true
    }
  }


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
  if (grounded || orbing) {
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

