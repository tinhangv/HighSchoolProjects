/* FUNCTIONS MODULE ASSIGNMENT
Demonstrating knowledge of functions with parameters and return values using the myCanvas
*/

// *** Don't forget to add your graphics and random libraries! *** 

// Canvas setup
let cnv = document.getElementById('c');
let ctx = cnv.getContext('2d');
cnv.width = window.innerWidth;
cnv.height = window.innerHeight;
//dectect mouse location
cnv.addEventListener('mousemove', function (event) {
  let mouseX = event.clientX - cnv.getBoundingClientRect().left;
  let mouseY = event.clientY - cnv.getBoundingClientRect().top;
  console.log('X:' + mouseX + '  Y:' + mouseY)
})
//user control
let keyAdown = false;
let keyDdown = false
let keyWdown = false;
let keySdown = false
document.addEventListener('keydown', function (event) {
  if (event.code == 'KeyA') keyAdown = true;
  if (event.code == 'KeyD') keyDdown = true;
  if (event.code == 'KeyW') keyWdown = true;
  if (event.code == 'KeyS') keySdown = true;
});
document.addEventListener('keyup', function (event) {
  if (event.code == 'KeyA') keyAdown = false;
  if (event.code == 'KeyD') keyDdown = false;
  if (event.code == 'KeyW') keyWdown = false;
  if (event.code == 'KeyS') keySdown = false;
});

//global variables
let c = ['ctb', 'kmb']
let busLane = [280, 350]
let station = { x: randomDec(20, cnv.width - 190), v: 3, a: 0.07, color: randomHex() }
let bus = { x: randomDec(20, cnv.width - 520), y: busLane[randomInt(0, 2)], company: c[randomInt(0, 2)], v: 1, a: 0.02 }
let lanes = { x: -80, v: 3, a: 0.05 }
let controlledBus = { y: 350, company: c[randomInt(0, 2)] }
let cloud = { x: 250, y: 60, v: 0.2 }

requestAnimationFrame(draw)
function draw() {
  // Clear the canvas to erase previous frame
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  // Draw your scene backdrop here
  background('lightblue') //background color
  fill('green') //ground color
  rect(0, 300, cnv.width, cnv.height, 'fill') //ground
  fill('yellow') //sun
  circle(70, 40, 25, 'fill')
  drawCloud() //cloud
  fill('grey') //road
  rect(0, 325, cnv.width, 125, 'fill')
  fill('white')// lane markings
  for (var i = -1; i <= cnv.width + 80; i += 80) {
    rect(i + lanes.x, 380, 70, 10, 'fill')
  }

  //animate

  cloud.x += cloud.v
  if (cloud.x > cnv.width) cloud.x = -50

  //user controls
  if (keyAdown) {
    station.v += station.a
    bus.v += bus.a
    lanes.v += lanes.a
  }
  if (keyDdown) {
    if (station.v >= 0) station.v -= station.a
    if (bus.v >= 0) bus.v -= bus.a
    if (lanes.v >= 0) lanes.v -= lanes.a
  }
  if (keyWdown && controlledBus.y >= 280) controlledBus.y -= 3
  if (keySdown && controlledBus.y <= 350) controlledBus.y += 3

  //update variables
  station.x += station.v
  bus.x += bus.v
  lanes.x += lanes.v
  //teleport elements to front
  if (station.x > cnv.width ) {
    station.color = randomHex()
    station.x = - cnv.width
  }
  if (bus.x > cnv.width + 20) {
    bus.company = c[randomInt(0, 2)]
    bus.y = busLane[randomInt(0, 2)]
    bus.x = -280
  }
  if (lanes.x >= 0) lanes.x = -80

  // Add your draw functions here

  drawStation(station.x, station.color, 'MTR')
  switch (bus.y) {
    case 280:
      drawBus(bus.x, bus.y, bus.company)
      //controlled bus
      drawBus(cnv.width - 300, controlledBus.y, controlledBus.company)
    break;
    case 350:
      //controlled bus
      drawBus(cnv.width - 300, controlledBus.y, controlledBus.company)
      drawBus(bus.x, bus.y, bus.company)
  }
  
  //example station
  // drawStation(100, 'orange', 'Station')

  requestAnimationFrame(draw)
}

function colorScheme(x, y, company) {
  switch (company) {
    case 'kmb':
      fill('#FF3115') //red background
      rect(x, y, 250, 90, 'fill')
      fill('silver')
      font('bold 20px sans-serif ')
      text('KMB', x + 115, y + 85, 'fill')
      break;
    case 'ctb':
      fill('#FFF000') //yellow background
      rect(x, y, 250, 90, 'fill')
      fill('#0165C5') //blue stripe
      rect(x, y + 84, 250, 6, 'fill')
      fill('#F8171A') //red stripe
      rect(x, y + 78, 250, 6, 'fill')
      fill('white')
      rect(x, y, 250, 5, 'fill')
      image('ctb-logo', x + 120, y + 67, 40, 12)
  }
}
function drawBus(x, y, company) {
  //x = 100, y=350
  colorScheme(x, y, company)

  fill('lightgrey') //doors
  rect(x + 5, y + 45, 25, 40, 'fill')
  rect(x + 80, y + 45, 25, 40, 'fill')
  stroke('black')
  lineWidth(1)
  rect(x + 5, y + 45, 25, 40, 'stroke')
  rect(x + 80, y + 45, 25, 40, 'stroke')
  line(x + 17.5, y + 45, x + 17.5, y + 85, 'stroke')
  line(x + 92.5, y + 45, x + 92.5, y + 85, 'stroke')
  function drawWindow(x, y) { //windows
    rect(x, y, 30, 20, 'fill')
    rect(x, y, 30, 20, 'stroke')
  }
  for (var i = 0; i < 7; i++) { //top windows
    drawWindow(x + 5 + 35 * i, y + 5)
  }
  for (var i = 0; i < 6; i++) { //bottom windows
    if (i != 1)
      drawWindow(x + 40 + 35 * i, y + 45)
  }
  fill('black') //wheels
  circle(x + 50, y + 85, 12, 'fill')
  circle(x + 180, y + 85, 12, 'fill')
  circle(x + 220, y + 85, 12, 'fill')
  fill('grey')
  circle(x + 50, y + 85, 7, 'fill')
  circle(x + 180, y + 85, 7, 'fill')
  circle(x + 220, y + 85, 7, 'fill')
}

function drawStation(x, color, stationName) {
  //x = 120
  fill(color)
  rect(x, 270, 90, 30, 'fill')
  triangle(x, 270, x + 90, 250, x + 90, 270, 'fill')
  rect(x + 90, 250, 80, 50, 'fill')
  fill('grey')
  rect(x, 285, 170, 15, 'fill')
  fill('blue') //sign
  rect(x + 100, 258, 60, 10, 'fill')

  fill('white')
  font('lighter 9px sans-serif ')
  text(stationName, x + 103, 265.5, 'fill')

  fill('darkgrey') //entrance
  rect(x + 100, 275, 60, 25, 'fill')
  //logo
  lineWidth(3)
  line(x + 150, 250, x + 150, 245)
  let logoWidth = 15
  rect(x + 150 - logoWidth / 2, 245 - logoWidth, logoWidth, logoWidth, 'fill')
  fill('red')
  circle(x + 150, 245 - logoWidth / 2, 6, 'fill')
  lineWidth(2)
  stroke('white')
  arc(x + 150, 233, 3.5, 0, Math.PI, 'stroke')
  arc(x + 150, 242, 3.5, Math.PI, 0, 'stroke')
  line(x + 150, 233, x + 150, 242)
}
function drawCloud() {
  //cloud
  ctx.beginPath()
  ctx.fillStyle = 'white'
  rect(cloud.x, cloud.y + 5, 80, 30, 'fill')
  circle(cloud.x + 80, cloud.y + 20, 15, 'fill')
  circle(cloud.x + 60, cloud.y + 5, 20, 'fill')
  circle(cloud.x + 30, cloud.y, 25, 'fill')
  circle(cloud.x, cloud.y + 17, 18, 'fill')
}
