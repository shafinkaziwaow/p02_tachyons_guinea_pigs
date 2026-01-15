// Shafin Kazi, Alvin Sze, Thamidur Rahman, Sean Takahashi
// Tachyons Guinea Pigs
// SoftDev pd4
// p02
// 2026-01-16f

const spike = new Image()
spike.src = "../static/images/spike.png"

const logo = new Image()
logo.src = "https://media.tenor.com/ifD1GaekwpoAAAAj/uma-musume-agnes-tachyon.gif"

var dead = true

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

var buttons = []

var button = (function () {
  function button(text, color, x, y, width, height){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.text = text
  }

  button.prototype.draw = function(ctx){
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.fillStyle = "black"
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '16px arial';
    ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2, this.width);
  }

  button.prototype.mousehover = function(mouseX, mouseY){
    return !(mouseX < this.x || mouseX > this.x + this.width || mouseY > this.y + this.height || mouseY < this.y)
  }

  return button
}())

function reset(){
  buttons = []
  dead = false;
  update()
}

function startScreen(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var level1 = new button("levelOne", "orange", canvas.width/10, canvas.height/10, 80, 45)
  level1.onClick = function () {return reset()}
  buttons.push(level1)

  for (var i = 0; i < buttons.length; i ++) {
    return buttons[i].draw(ctx)
  }

}

var objects = [
  {tag: "spike", x: 1000, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 1050, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 1100, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 1500, y: floorLocation - 50, width: 60, height: 110},
  {tag: "orb", x: 1425, y: floorLocation - 30, radius: 50}
]

function update() {
  if (dead){
    return
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "cyan"
  ctx.fillRect(canvas.width/10, positionY, blocksize, blocksize);

  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i]
    obj.x -= scrollSpeed
    let positionX = canvas.width / 10

    if (obj.tag == "spike") {
      ctx.drawImage(spike, obj.x, obj.y, blocksize/2, blocksize/2)

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

if (!dead) {
  update();
}
else {
  startScreen();
}

function jump() {
  if (grounded || orbing) {
    velocityY = -12
  }
}

document.addEventListener("keydown", e => {
  if (e.code === "Space" || e.code === "KeyW" || e.code === "ArrowUp") jump();
});

canvas.addEventListener("click", function(e) {
  if (dead){
    var mouseX = e.pageX - (canvas.clientLeft + canvas.offsetLeft)
    var mouseY = e.pageY - (canvas.clientTop + canvas.offsetTop)
    for (var i = 0; i < buttons.length; i ++){
      if (buttons[i].mousehover(mouseX, mouseY)){
        buttons[i].onClick()
      }
    }
  }
})

function endgame() { ///////////////////////////////////////// FIX
  cancelAnimationFrame(update);
  dead = true
}

logo.addEventListener("load", () => {
  ctx.drawImage(logo, canvas.width/2, 0, blocksize * 10, blocksize * 10)
});


// function makeSpike(x, y) {
//   base_image = new Image();
//   base_image.src = 'images/spike.png';
//   base_image.onload = function() {
//     ctx.drawImage(base_image, x, y, 100, 100);
//   }
// }
