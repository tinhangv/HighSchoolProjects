let cEl = document.getElementById('c')
let c = cEl.getContext('2d')

cEl.width = 500
cEl.height = 500

//user input (control up down)
document.addEventListener('keydown', keydownEvent);
document.addEventListener('keyup', keyupEvent);
let keyWdown = false;
let keySdown = false;
let keyUpDown = false;
let keyDownDown = false;
function keydownEvent(event) {
  if (event.code == 'KeyS') keySdown = true;
  if (event.code == 'KeyW') keyWdown = true;
  if (event.code == 'ArrowUp') {keyUpDown = true; event.preventDefault()}
  if (event.code == 'ArrowDown') {keyDownDown = true; event.preventDefault()}
}
function keyupEvent(event) {
  if (event.code == 'KeyS') keySdown = false;
  if (event.code == 'KeyW') keyWdown = false;
  if (event.code == 'ArrowUp') keyUpDown = false;
  if (event.code == 'ArrowDown') keyDownDown = false;
}

//block, player, bot positions
let s = { x: 250, y: 250, xv: 4, yv: Math.random()*6 -3}
let py = 250
let by = 250
let score = {p: 0 , b:0}

requestAnimationFrame(draw)
function draw() {
  // Clear the canvas to erase previous frame
  c.clearRect(0, 0, cEl.width, cEl.height);
  c.fillStyle = 'white'
  //square
  c.fillRect(s.x - 10, s.y - 10, 20, 20)
  //player
  c.fillRect(20, py - 35, 10, 70)
  //bot
  c.fillRect(480, by - 35, 10, 70)

  //move square
  s.x += s.xv;
  s.y += s.yv;

  //player
  /*if (s.x - 10 < 30 && s.x - 10 > 20 && s.y + 10 > py - 35 && s.y - 10 < py + 35) {
    s.v += 1
  }*/

  //move player
  if (keyWdown || keyUpDown) py -= 7
  if (keySdown || keyDownDown) py += 7
  if (py <= 35) py = 35
  else if (py >= 465) py = 465

  //move bot
  if (s.y > by ) by += 4
  else if (s.y < by ) by -= 4

  //new game
  if (s.x > 510 || s.x < -10) {
    if(s.x > 510) score.p ++
    else score.b ++
    s.x = 250
    s.y = 250
    s.xv = 3
    s.yv = Math.round(Math.random())*3 -1.5
  }

  //display score
  c.fillStyle='red'
  c.font='20px Arial'
  c.fillText('Score: ' + score.p + ':' + score.b , 360,35)

  // vertical wall collision
  if (hitTopBottom(s.y, 10, cEl.height)) {
    s.yv *= -1;
  }
  //bot and player collision
  if (collidePlayerBot(s.x, s.y, 10, 35)) {
    s.xv *= -1
    s.xv += s.xv / 12
    s.yv += s.yv / 12
  }

  requestAnimationFrame(draw)
}



// Function returns true if the ball hits the top or bottom
function hitTopBottom(yPos, blockRadius, canvHeight) {
  if (yPos - blockRadius <= 0 || yPos + blockRadius >= canvHeight) return true;
  return false;
}

function collidePlayerBot(xPos, yPos, blockRadius, playerbotRadius) {
  if (xPos + blockRadius >= 480 &&
    yPos + blockRadius >= by - playerbotRadius &&
    yPos - blockRadius <= by + playerbotRadius) return true;
  else if (xPos - blockRadius <= 30 &&
    yPos + blockRadius >= py - playerbotRadius &&
    yPos - blockRadius <= py + playerbotRadius) return true;
  return false;
}