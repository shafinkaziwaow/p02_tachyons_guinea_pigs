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

var jumping = false
var hasJumped = false

var gamemode = "Cube"

var objects = [
  {tag: "spike", x: 1000, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 1050, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 1500, y: floorLocation - 50, width: 60, height: 110},
  {tag: "orb", x: 1425, y: floorLocation - 30, radius: 50},
  {tag: "ship", x: 2000, y: floorLocation - 50, width: 20, height: 110},
  {tag: "cube", x: 2500, y: floorLocation - 50, width: 20, height: 110},
  {tag: "ufo", x: 3000, y: floorLocation - 50, width: 20, height: 110}
]

function update() {
  if (dead) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gamemode == "Cube") ctx.fillStyle = "cyan"
  if (gamemode == "Ship") ctx.fillStyle = "purple"
  if (gamemode == "UFO") ctx.fillStyle = "orange"
  ctx.fillRect(canvas.width/10, positionY, blocksize, blocksize);

  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i]
    obj.x -= scrollSpeed
    let positionX = canvas.width / 10

    if (obj.tag == "spike") {
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

    if (obj.tag == "ship") {
      ctx.fillStyle = "purple"
      ctx.fillRect(obj.x, obj.y, obj.width, obj.height)

      if (positionX + blocksize > obj.x &&
          positionX < obj.x + obj.width &&
          positionY + blocksize > obj.y &&
          positionY < obj.y + obj.height) {
        gamemode = "Ship"
      }
    }

    if (obj.tag == "cube") {
      ctx.fillStyle = "green"
      ctx.fillRect(obj.x, obj.y, obj.width, obj.height)

      if (positionX + blocksize > obj.x &&
          positionX < obj.x + obj.width &&
          positionY + blocksize > obj.y &&
          positionY < obj.y + obj.height) {
        gamemode = "Cube"
      }
    }

    if (obj.tag == "ufo") {
      ctx.fillStyle = "orange"
      ctx.fillRect(obj.x, obj.y, obj.width, obj.height)

      if (positionX + blocksize > obj.x &&
          positionX < obj.x + obj.width &&
          positionY + blocksize > obj.y &&
          positionY < obj.y + obj.height) {
        gamemode = "UFO"
      }
    }
  }


  if (positionY  < floorLocation) {
    accelerationY = gravity
    grounded = false
  }
  else if (!grounded) {
    accelerationY = 0
    positionY = floorLocation
    velocityY = 0
    grounded = true
  }

  if (velocityY > 20) {
    velocityY = 20
  }

  positionY += velocityY
  velocityY += accelerationY

  if (gamemode == "Cube") {
    if ((grounded == true && jumping == true) || (orbing == true && jumping == true && hasJumped == false)) {
      velocityY = -12
      gravity = 1
      hasJumped = true
    }
  }
  else if (gamemode == "Ship") {
    if ((jumping == true) || (orbing == true && jumping == true && hasJumped == false)) {
      velocityY = -7
      gravity = 0.4
      hasJumped = true
    }
  }
  else if (gamemode == "UFO") {
    if ((jumping == true && hasJumped == false) || (orbing == true && jumping == true && hasJumped == false)) {
      velocityY = -8
      gravity = 0.3
      hasJumped = true
    }
  }

  console.log(hasJumped);

  requestAnimationFrame(update);
}

if (!dead) {
  update();
}

document.addEventListener("keydown", e => {
  if (e.code === "Space" || e.code === "KeyW" || e.code === "ArrowUp") jumping = true;
});

document.addEventListener("keyup", e => {
  if (e.code === "Space" || e.code === "KeyW" || e.code === "ArrowUp") {
    jumping = false;
    hasJumped = false;
  }
});

document.addEventListener("mousedown", e => {
  if (e.button === 0) jumping = true;
})

document.addEventListener("mouseup", e => {
  if (e.button === 0) {
    jumping = false;
    hasJumped = false;
  }
})

function endgame() { ///////////////////////////////////////// FIX
  console.log("pop1111111111111111111");
  cancelAnimationFrame(update);
  dead = true
}

// function makeSpike(x, y) {
//   base_image = new Image();
//   base_image.src = 'images/spike.png';
//   base_image.onload = function() {
//     ctx.drawImage(base_image, x, y, 100, 100);
//   }
// }
