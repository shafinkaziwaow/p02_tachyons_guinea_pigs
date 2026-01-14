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

var objects = [
  {tag: "block", x: 1000, y: floorLocation, width: 40, height: 60},
  {tag: "block", x: 1500, y: floorLocation - 50, width: 60, height: 110},
  {tag: "orb", x: 1425, y: floorLocation - 30, radius: 50}
]

function update() {
  if (dead) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "cyan"
  ctx.fillRect(canvas.width/10, positionY, blocksize, blocksize);

  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i]
    obj.x -= scrollSpeed
    let positionX = canvas.width / 10

    if (obj.tag == "block") {
      ctx.fillStyle = "red"
      ctx.fillRect(obj.x, obj.y, obj.width, obj.height)

      if (positionX + blocksize > obj.x && 
          positionX < obj.x + obj.width &&
          positionY + blocksize > obj.y &&
          positionY < obj.y + obj.height) {
        endgame()
      }
    }

    if (obj.tag == "orb") {
      ctx.fillStyle = "gold"
      ctx.fillRect(obj.x, obj.y, obj.radius, obj.radius)

      if (positionX + blocksize > obj.x && 
          positionX < obj.x + obj.radius &&
          positionY + blocksize > obj.y &&
          positionY < obj.y + obj.radius) {

        orbing = true
      } else {
        orbing = false
      }
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

