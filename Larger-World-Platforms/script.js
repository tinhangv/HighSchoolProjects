// global variables
let cnv = document.getElementById('c')
let ctx = cnv.getContext('2d')

cnv.width = 1000
cnv.height = 500

let a = false, d = false, space = false, shift = false
document.addEventListener('keydown', function (event) {
  if (event.code == 'KeyA') a = true
  if (event.code == 'KeyD') d = true
  if (event.code == 'Space') {
    space = true
    event.preventDefault()
  }
  if (event.code == 'ShiftLeft') {
    shift = true
    event.preventDefault()
  }
})
document.addEventListener('keyup', function (event) {
  if (event.code == 'KeyA') a = false
  if (event.code == 'KeyD') d = false
  if (event.code == 'Space') space = false
  if (event.code == 'ShiftLeft') shift = false
})

let edgeX = 0
let mapWidth = 2000
let v = 2
let g = 0.13
let p = {
  x: 100,
  y: 400,
  yv: 0,
  w: 30,
  h: 80,
  x1:100,  //transformed positions
  y1:400
}
let platformWidth = 45
let ground = [[0, 400, 390], [400, 800, 420], [1800, 2300, 370],[2300, 2700, 340]] //from, to, ground level
let platforms = [
  [840, 410],
  [900, 420],
  [1000, 425],
  [1120, 430],
  [1220, 400],
  [1420, 430],
  [1620, 430],
  [1700, 400]
]
for(var i=0; i<platforms.length; i++)ground.push([
  platforms[i][0], platforms[i][0]+platformWidth, platforms[i][1], 10
  ])

let groundLevel

function reset(){
  p = {
  x: 100,
  y: 400,
  yv: 0,
  w: 30,
  h: 80,
  x1:100,  //transformed positions
  y1:400
  }
  edgeX = 0
}

requestAnimationFrame(draw)
function draw() {
  // Clear the canvas to erase previous frame
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  fill('blue')  //ocean
  rect(0, 470, cnv.width, 30, 'fill')
  fill('green')  //grass
  rect(edgeX, 390, 400, 110, 'fill')
  fill('grey')  //stone
  rect(edgeX + 400, 420, 400, 80, 'fill')
  fill('grey')
  rect(edgeX+1800, 370, 500+p.w, 130, 'fill')
  fill('green')
  rect(edgeX + 2300+p.w, 340, 400-p.w, 160, 'fill')

  drawPlatforms()

  fill('yellow')
  circle(60, 40, 20, 'fill')

  fill('brown') //'tree'
  rect(edgeX + 30, 400, 10, -70, 'fill')

  drawPlayer(p.x, p.y)

  if (shift) v = 4
  else v = 2

  groundLevel = findGround(p.x)

  if (a &&findGround(p.x - v) >= p.y) {
    if (p.x >= 100) p.x -= v
    else if (p.x <= 100) edgeX += v
  }
  if (d && findGround(p.x  + v) >= p.y) {
    if (p.x <= 500) p.x += v
    if (p.x >= 500) edgeX -= v
  }

  if (p.y > groundLevel) {
    p.y = groundLevel
    p.yv = 0
  }
  if (space && p.y == groundLevel) p.yv = -3

  p.y += p.yv
  if(p.y < groundLevel) p.yv += g

  let coords = 'x: ' + (p.x - edgeX) + ' y: ' + Math.round(p.y)
  font('15px Sans-serif')
  fill('black')
  text(coords, 590, 30, 'fill')

  requestAnimationFrame(draw)
}

function findGround(x) {
  for (var i = 0; i < ground.length; i++) {
    if (x - edgeX + p.w >= ground[i][0] && x - edgeX < ground[i][1]) return ground[i][2]
  }
  return 520
}

function drawPlatforms() {
  fill('grey')
  for(var i=0; i<platforms.length; i++){
    rect(platforms[i][0]+edgeX, platforms[i][1], platformWidth, 10, 'fill')
  }
}

function drawPlayer(x, y) {
  circle(x + 15, y - 80, 10, 'stroke')
  line(x + 15, y - 70, x + 15, y - 20, 'stroke')
  line(x, y - 50, x + 30, y - 50, 'stroke')
  line(x + 15, y - 20, x, y, 'stroke')
  line(x + 15, y - 20, x + 30, y, 'stroke')
}






