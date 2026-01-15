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
var currentOrb = null

var jumping = false
var hasJumped = false

var gamemode = "Cube"

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
  {tag: "spike", x: 1500, y: floorLocation - 50, width: 60, height: 110},
  {tag: "orb", x: 1425, y: floorLocation - 40, radius: 30},
  {tag: "orb", x: 1600, y: floorLocation - 40, radius: 30},
  {tag: "orb", x: 1700, y: floorLocation - 100, radius: 30},
  {tag: "spike", x: 1600, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 1650, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 1700, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 1750, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 1800, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 1850, y: floorLocation + 10, width: 12, height: 30},
  {tag: "block", x: 1850, y: floorLocation - 150, width: 400, height: 20},
  {tag: "spike", x: 2000, y: floorLocation - 185, width: 12, height: 30},
  {tag: "orb", x: 2050, y: floorLocation - 220, radius: 30},
  {tag: "block", x: 2200, y: floorLocation - 200, width: 30, height: 60}
]

function update() {
  if (dead){
    return
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gamemode == "Cube") ctx.fillStyle = "cyan"
  if (gamemode == "Ship") ctx.fillStyle = "purple"
  if (gamemode == "UFO") ctx.fillStyle = "orange"
  ctx.fillRect(canvas.width/10, positionY, blocksize, blocksize);

  let positionX = canvas.width / 10
  let onBlock = false  

  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i]
    obj.x -= scrollSpeed

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

          if (currentOrb !== obj) { 
            orbing = true
            currentOrb = obj
          }
      }
    }

    if (obj.tag == "block") {
      ctx.fillStyle = "blue"
      ctx.fillRect(obj.x, obj.y, obj.width, obj.height)

      if (positionX + blocksize > obj.x &&
          positionX < obj.x + obj.width &&
          positionY + blocksize > obj.y &&
          positionY < obj.y + obj.height) {

        if (positionY + blocksize - velocityY <= obj.y) {
          onBlock = true
          positionY = obj.y - blocksize
          velocityY = 0
          accelerationY = 0
          grounded = true
        }

        else {
          endgame()
        }
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

  if (positionY < floorLocation && !onBlock) {
    accelerationY = gravity
    grounded = false
  }
  else if (!grounded && !onBlock){
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
else {
  startScreen();
}

function jump() {
  if (grounded || orbing) {
    velocityY = -12
    orbing = false
    currentOrb = null
  }
}

function restart() {
  dead = false
  positionY = 0
  velocityY = 0
  accelerationY = 0
  grounded = true
  orbing = false
  currentOrb = null

  objects = [
    {tag: "spike", x: 1000, y: floorLocation + 10, width: 12, height: 30},
    {tag: "spike", x: 1050, y: floorLocation + 10, width: 12, height: 30},
    {tag: "spike", x: 1500, y: floorLocation - 50, width: 60, height: 110},
    {tag: "orb", x: 1425, y: floorLocation - 40, radius: 30},
    {tag: "orb", x: 1600, y: floorLocation - 40, radius: 30},
    {tag: "orb", x: 1700, y: floorLocation - 100, radius: 30},
    {tag: "spike", x: 1600, y: floorLocation + 10, width: 12, height: 30},
    {tag: "spike", x: 1650, y: floorLocation + 10, width: 12, height: 30},
    {tag: "spike", x: 1700, y: floorLocation + 10, width: 12, height: 30},
    {tag: "spike", x: 1750, y: floorLocation + 10, width: 12, height: 30},
    {tag: "spike", x: 1800, y: floorLocation + 10, width: 12, height: 30},
    {tag: "spike", x: 1850, y: floorLocation + 10, width: 12, height: 30},
    {tag: "block", x: 1850, y: floorLocation - 150, width: 400, height: 20},
    {tag: "spike", x: 2000, y: floorLocation - 185, width: 12, height: 30},
    {tag: "orb", x: 2050, y: floorLocation - 220, radius: 30},
    {tag: "block", x: 2200, y: floorLocation - 200, width: 30, height: 60}
  ]
  
  update()
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


logo.addEventListener("load", () => {
  ctx.drawImage(logo, canvas.width/2, 0, blocksize * 10, blocksize * 10)
});


document.addEventListener("mousedown", e => {
  if (!dead && e.button === 0) jumping = true;
})

document.addEventListener("mouseup", e => {
  if (!dead && e.button === 0) {
    jumping = false;
    hasJumped = false;
  }
})

function endgame() {
  console.log("Game Over!");
  cancelAnimationFrame(update);
  dead = true
  
  ctx.fillStyle = "white"
  ctx.font = "48px Arial"
  ctx.textAlign = "center"
  ctx.fillText("Press R to Restart", canvas.width / 2, canvas.height / 2)
}

