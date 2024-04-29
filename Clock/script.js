// global variables
let cnv = document.getElementById('c')
let ctx = cnv.getContext('2d')
const pi = Math.PI

canvasSize(500, 500)
background('grey')

setInterval(draw, 1000)

function draw() {
  // Clear the canvas to erase previous frame
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  //clock face
  fill('beige')
  circle(250, 250, 250, 'fill')
  stroke('black')
  lineWidth(2)
  circle(250, 250, 250, 'stroke')

  let d = new Date();
  let hours = { r: 210 }
  let hrH = { th: -d.getHours() * pi / 6 - d.getMinutes() * pi / 360 - d.getSeconds() * pi / 21600 + pi / 2, r: 130 }
  let minH = { th: -d.getMinutes() * pi / 30 - d.getSeconds() * pi / 1800 + pi / 2, r: 190 }
  let secH = { th: -d.getSeconds() * pi / 30 + pi / 2, r: 190 }

  //hours
  fill('black')
  font('bold 50px sans-serif')
  ctx.textAlign = "center";
  ctx.textBaseline = 'middle';
  for (var i = 1; i <= 12; i++) {
    text(i, Math.cos((i - 3) * pi / 6) * hours.r + 250, Math.sin((i - 3) * pi / 6) * hours.r + 250, 'fill')
    // //reference position
    // line(250, 250, Math.cos((i - 3) * pi / 6) * hours.r + 250, Math.sin((i - 3) * pi / 6) * hours.r + 250)
  }

  //hour hand
  lineWidth(7)
  stroke('black')
  line(250, 250, Math.cos(hrH.th) * hrH.r + 250, -Math.sin(hrH.th) * hrH.r + 250)

  //minute hand
  lineWidth(5)
  stroke('slategrey')
  line(250, 250, Math.cos(minH.th) * minH.r + 250, -Math.sin(minH.th) * minH.r + 250)

  //second hand
  lineWidth(3)
  stroke('red')
  line(250, 250, Math.cos(secH.th) * secH.r + 250, -Math.sin(secH.th) * secH.r + 250)

  // //update variables
  // secH.th -= pi/30
  // minH.th -= pi/1800
  // hrH.th -= pi/108000
}




