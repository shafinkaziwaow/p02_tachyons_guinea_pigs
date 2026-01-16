
// Shafin Kazi, Alvin Sze, Thamidur Rahman, Sean Takahashi
// Tachyons Guinea Pigs
// SoftDev pd4
// p02
// 2026-01-16f
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var blocksize = 50

const spike = new Image()
spike.src = "../static/images/spike.png"

const invspike = new Image()
invspike.src = "../static/images/invspike.png"

const logo = new Image()
logo.src = "https://media.tenor.com/ifD1GaekwpoAAAAj/uma-musume-agnes-tachyon.gif"

const tachywachy = new Image()
tachywachy.src = "../static/images/TachyWachy.png"

const tachyship = new Image()
tachyship.src = "../static/images/TachyShip.png"

const background = new Image()
background.src = "../static/images/Background.png"

var music = new Audio('../static/songs/tracen_ondo.mp3');
music.volume = 0.25

const one = new Audio('../static/songs/tracen_ondo.mp3')
const two = new Audio('../static/songs/umapyoi_densetsu.mp3')
const three = new Audio('../static/songs/next_frontier.mp3')

var floorLocation = canvas.height - blocksize

const levelonemap = [
  {tag: "spike", x: 600, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 650, y: floorLocation + 10, width: 12, height: 30},
  {tag: "orb", x: 675, y: floorLocation - 50, width: 30, height: 30},
  {tag: "block", x: 750, y: floorLocation - 50, width: 20, height: 100},
  {tag: "spike", x: 1000, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 1050, y: floorLocation + 10, width: 12, height: 30},
  {tag: "orb", x: 1075, y: floorLocation - 50, width: 30, height: 30},
  {tag: "block", x: 1150, y: floorLocation - 50, width: 20, height: 100},
  {tag: "block", x: 1250, y: floorLocation - 50, width: 100, height: 20},
  {tag: "down", x: 1425, y: floorLocation - 150, width: 30, height: 30},
  {tag: "block", x: 1485, y: floorLocation - 200, width: 20, height: 100},
  {tag: "spike", x: 1620, y: floorLocation + 10, width: 12, height: 30},
  {tag: "block", x: 3300, y: floorLocation - 30, width: 580, height: 20},
  {tag: "spike", x: 1850, y: floorLocation + 10, width: 12, height: 30},
  {tag: "orb", x: 1900, y: floorLocation - 50, width: 30, height: 30},
  {tag: "ship", x: 2025, y: floorLocation - 300, width: 20, height: 200},
  {tag: "block", x:2100, y: floorLocation - 100, width: 100, height: 600},
  {tag: "block", x:2100, y: floorLocation - 600, width: 100, height: 300},
  {tag: "block", x:2200, y: floorLocation - 150, width: 100, height: 600},
  {tag: "block", x:2200, y: floorLocation - 650, width: 100, height: 300},
  {tag: "block", x:2300, y: floorLocation - 100, width: 100, height: 600},
  {tag: "block", x:2300, y: floorLocation - 600, width: 100, height: 300},
  {tag: "block", x:2400, y: floorLocation - 150, width: 100, height: 600},
  {tag: "block", x:2400, y: floorLocation - 650, width: 100, height: 300},
  {tag: "block", x:2500, y: floorLocation - 100, width: 100, height: 600},
  {tag: "block", x:2500, y: floorLocation - 600, width: 100, height: 300},
  {tag: "cube", x: 2625, y: floorLocation - 300, width: 20, height: 200},
  {tag: "block", x: 2600, y: floorLocation - 100, width: 580, height: 20},
  {tag: "block", x: 2800, y: floorLocation - 175, width: 30, height: 75},
  {tag: "block", x: 2975, y: floorLocation - 225, width: 30, height: 125},
  {tag: "block", x: 3150, y: floorLocation - 275, width: 30, height: 175},
  {tag: "down", x: 3275, y: floorLocation - 375, width: 30, height: 30},
  {tag: "block", x: 3300, y: floorLocation - 30, width: 730, height: 20},
  {tag: "spike", x: 3475, y: floorLocation - 70, width: 12, height: 30},
  {tag: "block", x: 3825, y: floorLocation - 80, width: 50, height: 50},
  {tag: "orb", x: 3925, y: floorLocation - 170, width: 30, height: 30},
  {tag: "block", x: 4000, y: floorLocation - 120, width: 30, height: 90},
  {tag: "spike", x: 3995, y: floorLocation - 150, width: 12, height: 30},
  {tag: "orb", x: 4100, y: floorLocation - 250, width: 30, height: 30},
  {tag: "down", x: 4175, y: floorLocation - 350, width: 30, height: 30},
  {tag: "block", x: 4250, y: floorLocation - 500, width: 20, height: 200},
  {tag: "spike", x: 4100, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 4150, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 4200, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 4250, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 4300, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 4350, y: floorLocation + 10, width: 12, height: 30},
  {tag: "orb", x: 4300, y: floorLocation - 100, width: 30, height: 30},
  {tag: "spike", x: 4650, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 4900, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 5150, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 5190, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 5230, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 5375, y: floorLocation + 10, width: 12, height: 30},
  {tag: "orb", x: 5425, y: floorLocation - 50, width: 30, height: 30},
  {tag: "orb", x: 5600, y: floorLocation - 110, width: 30, height: 30},
  {tag: "orb", x: 5775, y: floorLocation - 170, width: 30, height: 30},
  {tag: "orb", x: 5950, y: floorLocation - 230, width: 30, height: 30},
  {tag: "spike", x: 5425, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 5475, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 5525, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 5475, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 5525, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 5575, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 5625, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 5675, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 5725, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 5775, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 5825, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 5875, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 5925, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 5975, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 6025, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 6075, y: floorLocation + 10, width: 12, height: 30},
  {tag: "block", x: 6100, y: floorLocation - 100, width: 680, height: 20},
  {tag: "spike", x: 6265, y: floorLocation - 140, width: 12, height: 30},
  {tag: "orb", x: 6290, y: floorLocation - 200, width: 30, height: 30},
  {tag: "block", x: 6365, y: floorLocation - 200, width: 20, height: 100},
  {tag: "spike", x: 6615, y: floorLocation - 140, width: 12, height: 30},
  {tag: "orb", x: 6640, y: floorLocation - 200, width: 30, height: 30},
  {tag: "block", x: 6715, y: floorLocation - 200, width: 20, height: 100},
  {tag: "ufo", x: 6750, y: floorLocation - 400, width: 20, height: 200},
  
  {tag: "finish", x: 7000, y: floorLocation - 900, width: 50, height: 1000},
]

const leveltwomap = [
  {tag: "block", x: 800, y: floorLocation - 160, width: 300, height: 20},
  {tag: "invspike", x: 810, y: floorLocation - 140, width: 12, height: 30},
  {tag: "invspike", x: 850, y: floorLocation - 140, width: 12, height: 30},
  {tag: "invspike", x: 890, y: floorLocation - 140, width: 12, height: 30},
  {tag: "invspike", x: 930, y: floorLocation - 140, width: 12, height: 30},
  {tag: "invspike", x: 970, y: floorLocation - 140, width: 12, height: 30},
  {tag: "invspike", x: 1010, y: floorLocation - 140, width: 12, height: 30},
  {tag: "invspike", x: 1050, y: floorLocation - 140, width: 12, height: 30},
  {tag: "orb", x: 950, y: floorLocation - 50, width: 30, height: 30},
  {tag: "block", x: 1250, y: floorLocation - 30, width: 30, height: 80},
  {tag: "block", x: 1420, y: floorLocation - 80, width: 30, height: 160},
  {tag: "block", x: 1590, y: floorLocation - 130, width: 30, height: 240},
  {tag: "spike", x: 1620, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 1660, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 1700, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 1740, y: floorLocation + 10, width: 12, height: 30},
  {tag: "orb", x: 2000, y: floorLocation - 50 , width: 30, height: 30},
  {tag: "block", x: 2190, y: floorLocation - 80, width: 300, height: 160},
  {tag: "ship", x: 2500, y: floorLocation - 640, width: 15, height: 560},
  {tag: "block", x: 2700, y: floorLocation - 400, width: 80, height: 80},
  {tag: "block", x: 2800, y: floorLocation - 50, width: 80, height: 80},
  {tag: "block", x: 2850, y: floorLocation - 250, width: 80, height: 80},
  {tag: "block", x: 3000, y: floorLocation - 300, width: 80, height: 80},
  {tag: "block", x: 3140, y: floorLocation - 500, width: 80, height: 80},
  {tag: "block", x: 3220, y: floorLocation - 100, width: 80, height: 80},
  {tag: "block", x: 3310, y: floorLocation - 200, width: 80, height: 80},
  {tag: "block", x: 3380, y: floorLocation - 30, width: 80, height: 80},
  {tag: "block", x: 3500, y: floorLocation - 350, width: 80, height: 80},
  {tag: "block", x: 3700, y: floorLocation - 600, width: 80, height: 300},
  {tag: "block", x: 3700, y: floorLocation - 100, width: 80, height: 300},
  {tag: "cube", x: 3700, y: floorLocation - 300, width: 15, height: 200},
  {tag: "orb", x: 4200, y: floorLocation - 50 , width: 30, height: 30},
  {tag: "block", x: 4390, y: floorLocation - 80, width: 300, height: 160},


  {tag: "finish", x: 10000, y: floorLocation - 900, width: 50, height: 1000},
]

const levelthreemap = [
  {tag: "orb", x: 400, y: floorLocation - 100, width: 30, height: 30},
  {tag: "block", x:550, y: floorLocation - 100, width: 100, height: 600},
  {tag: "down", x:700, y: floorLocation - 200, width: 30, height: 30},
  {tag: "block", x:770, y: floorLocation - 700, width: 50, height: 600},
  {tag: "spike", x: 850, y: floorLocation + 10, width: 12, height: 30},
  {tag: "spike", x: 900, y: floorLocation + 10, width: 12, height: 30},
  {tag: "block", x:1000, y: floorLocation - 700, width: 50, height: 600},
  {tag: "ship", x: 1000, y: floorLocation - 100, width: 20, height: 200},
  {tag: "block", x:1200, y: floorLocation - 30, width: 40, height:300},
  {tag: "spike", x: 1200, y: floorLocation - 70, width: 12, height: 30},
  {tag: "block", x:1200, y: floorLocation - 800, width: 40, height: 600},
  {tag: "invspike", x: 1200, y: floorLocation - 200, width: 12, height: 30},
]

var objects = []

var dead = true

var positionY = 0
var velocityY = 0
var accelerationY = 0

var gravity = 1

var grounded = true
var orbing = false
var currentOrb = null

var jumping = false
var hasJumped = false

var gamemode = "Cube"

var scrollSpeed = 8
var totalDistance = 0

var buttons = []

var progress = 0
var diffLocation = 0
var endLocation = 6500

var level = 1

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

function start(level){
  music = level
  music.volume = 0.18
  music.play()
  buttons = []
  dead = false;
  progress = 0
  if (level == one){
    objects = levelonemap
  }
  else if (level == two){
    objects = leveltwomap
  }
  else{
    objects = levelthreemap
  }
  update()
}

function startScreen(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var level1 = new button("levelOne", "orange", canvas.width/10, canvas.height/10, 80, 45)
  level1.onClick = function () {return start(one)}
  buttons.push(level1)
  var level2 = new button("levelTwo", "orange", canvas.width/10, canvas.height/10 + 55, 80, 45)
  level2.onClick = function () {return start(two)}
  buttons.push(level2)
  var level3 = new button("levelThree", "orange", canvas.width/10, canvas.height/10 + 110, 80, 45)
  level3.onClick = function () {return start(three)}
  buttons.push(level3)
  logo.src = "https://media.tenor.com/ifD1GaekwpoAAAAj/uma-musume-agnes-tachyon.gif"

  for (var i = 0; i < buttons.length; i ++) {
    buttons[i].draw(ctx)
  }

}

function update() {
  if (dead){
    return
  }
  ctx.drawImage(background, 0, 0);

  if (gamemode == "Cube") ctx.drawImage(tachywachy, canvas.width/10 - 30, positionY - (119 - blocksize));
  if (gamemode == "Ship") ctx.drawImage(tachyship, canvas.width/10 - 30, positionY - (119 - blocksize));
  if (gamemode == "UFO") ctx.fillStyle = "orange"

  // ctx.fillRect(canvas.width/10, positionY, blocksize, blocksize)
  // ctx.fillRect(canvas.width/10, positionY, blocksize, blocksize);

  totalDistance += scrollSpeed

  let positionX = canvas.width / 10
  let onBlock = false

  //console.log(objects.length)
  for (let i = 0; i < objects.length; i++) {
    //console.log(objects[i])
    let obj = objects[i]
    obj.x -= scrollSpeed

    if (obj.tag == "down") {
      ctx.fillStyle = "black"
      ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
      
      if (positionX + blocksize > obj.x + 14 &&
          positionX < obj.x + 14 + obj.width + 2 &&
          positionY + blocksize > obj.y + 10 &&
          positionY < obj.y + 10 + obj.height) {
            
            if (jumping && currentOrb !== obj) {
              velocityY = 30
              currentOrb = obj 
            }
          }
          else if (currentOrb === obj) {
            currentOrb = null
          }
    }

    if (obj.tag == "spike") {
      ctx.drawImage(spike, obj.x, obj.y, blocksize / 1.2, blocksize / 1.2)

      if (positionX + blocksize > obj.x + 14 &&
          positionX < obj.x + 14 + obj.width + 2 &&
          positionY + blocksize > obj.y + 10 &&
          positionY < obj.y + 10 + obj.height) {
        endgame()
      }
    }

    if (obj.tag == "invspike") {
      ctx.drawImage(invspike, obj.x, obj.y, blocksize / 1.2, blocksize / 1.2)

      if (positionX + blocksize > obj.x + 14 &&
          positionX < obj.x + 14 + obj.width + 2 &&
          positionY + blocksize > obj.y + 4 &&
          positionY < obj.y + 4 + obj.height) {
        endgame()
      }
    }

    if (obj.tag == "orb") {
      ctx.fillStyle = "gold"
      ctx.fillRect(obj.x, obj.y, obj.width, obj.height)

      if (positionX + blocksize > obj.x &&
          positionX < obj.x + obj.width &&
          positionY + blocksize > obj.y &&
          positionY < obj.y + obj.height) {

          if (currentOrb !== obj) {
            orbing = true
            currentOrb = obj
          }
      }
    }

    if (obj.tag == "finish") {
      ctx.fillStyle = "green"
      ctx.fillRect(obj.x, obj.y, obj.width, obj.height)

      diffLocation = obj.x - 150

      if (positionX + blocksize > obj.x &&
          positionX < obj.x + obj.width &&
          positionY + blocksize > obj.y &&
          positionY < obj.y + obj.height) {
        wingame()
      }
    }

    if (obj.tag == "block") {
        ctx.fillStyle = "black"
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height)

        if (positionX + blocksize > obj.x &&
            positionX < obj.x + obj.width &&
            positionY + blocksize > obj.y &&
            positionY < obj.y + obj.height) {

            const tolerance = 8

            if (previousPositionY + blocksize - velocityY <= obj.y + tolerance) {
                onBlock = true
                positionY = obj.y - blocksize
                velocityY = 0
                accelerationY = 0
                grounded = true
            }
            // else if (velocityY < 0 && previousPositionY + blocksize - velocityY > obj.y + obj.height) {
            else if (previousPositionY >= obj.y + obj.height - tolerance && velocityY < 0) {
                positionY = obj.y + obj.height
                velocityY = 0
                accelerationY = 0
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
  previousPositionY = positionY

  if (gamemode == "Cube") {
    if ((grounded == true && jumping == true) || (orbing == true && jumping == true && hasJumped == false)) {
      velocityY = -12
      gravity = 1
      hasJumped = true
      orbing = false
    }
  }
  else if (gamemode == "Ship") {
    if ((jumping == true) || (orbing == true && jumping == true && hasJumped == false)) {
      velocityY = -5
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

  progress = 1 - diffLocation / endLocation
  if (progress < 0) progress = 0;
  ctx.fillStyle = "grey"
  ctx.fillRect(canvas.width / 3, 30, canvas.width / 3, canvas.height / 15);
  ctx.fillStyle = "yellow"
  ctx.fillRect(canvas.width / 3 + canvas.width / 150, 30 + canvas.height / 75, progress * (canvas.width / 3 - canvas.width / 75), canvas.height / 25);

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
  totalDistance = 0
  positionY = 0
  velocityY = 0
  accelerationY = 0
  grounded = true
  orbing = false
  currentOrb = null
  jumping = false
  hasJumped = false
  music.currentTime = 0

  startScreen()
}

document.addEventListener("keydown", e => {
  if (!dead && (e.code === "Space" || e.code === "KeyW" || e.code === "ArrowUp")) jumping = true;
  else if (dead && e.code === "KeyR") restart()
});

document.addEventListener("keyup", e => {
  if (!dead && (e.code === "Space" || e.code === "KeyW" || e.code === "ArrowUp")) {
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
  music.pause()

  ctx.fillStyle = "white"
  ctx.font = "48px Arial"
  ctx.textAlign = "center"
  ctx.fillText("Press R to return to Level Select", canvas.width / 2, canvas.height / 2)
  submitScore(totalDistance)
}

function submitScore(score) {
  document.getElementById('scoreInput').value = score;
  document.getElementById('levelInput').value = level;
  document.getElementById('scoring').submit();
  document.getElementById('level').submit();
}

function wingame() {
  console.log("You win!");
  cancelAnimationFrame(update);
  dead = true
  music.pause()

  totalDistance += 10000
  submitScore(totalDistance)
}

