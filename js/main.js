function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("container"); // appends the container
  background(0);

  noStroke()


  //
  const gui = new dat.GUI()
  gui.add(controls, 'velocityScale', -1, 1)
  gui.add(controls, 'gravity', -1, 1)
  gui.add(controls, 'lifetime', -1, 1)
  // Change the color we use to specify the colors;
  colorMode(HSB, 255);


  // stroke(random(255));
  // fill(0,100,100);
  // strokeWeight(2);
  // ellipse(windowWidth/2, windowHeight/2, 400, 400) // first is x, then y, then width, then height;
  //
  // fill(0, 100, 100);
  //
  // line(400, 150, 800, 700)
  //
  // fill(255, 0 , 170)
  // rect(800,100,200,400)
  //
  // fill(142,80,90)
  // triangle(250,350, 150, 100, 600, 500)


}


// function draw(){
//   const x = random(windowWidth);
//
//   const y = random(windowHeight);
//   fill(random(255), random(255), random(255), 80);
//   ellipse(x, y, random(400), random(400))
// }

// function draw() {
//   background(255);
//   const x = mouseX;
//   const y = mouseY;
//
//   const size = 100;
//
//   fill(random(255),random(255), random(255))
//   circle(x,y,size,size);
// }

// function draw() {
//   background(255);
//   const x = mouseX;
//   const y = mouseY;
//   const size = 80;
//
//   colorMode(HSB, 255);
//   fill(frameCount % 255, 255, 255);
//
//   if (mouseIsPressed || keyIsDown(SHIFT)) {
//     ellipse(x, y, size, size)
//   }
//
// }


// function draw () {
// background(255);
// const x = random(windowWidth);
// const y = random(windowHeight);
//
// const size = 80;
//
// colorMode(HSB, 255);
//
// const hue = map(x, y, windowWidth, 0, 255);
//
// fill(hue, 255, 255)
//
// if (mouseIsPressed || keyIsDown(SHIFT)){
//   ellipse(x, y, size, size)
// }
// }

function draw() {
  background(255);
  const x = mouseX;
  const y = mouseY;

  const xVel = Math.abs(x - pwinMouseX)

  const h = Math.floor(Math.sqrt(x*x + y*y))

  colorMode(HSB, 255);

  const xPercent = x / windowWidth;
  // const yPercent = y / windowHeight

  const hue = map(x, 0 ,windowWidth, 0, 255)

  const size = xVel

  fill(hue, 255, 255);

  if (mouseIsPressed || keyIsDown(SHIFT)) {
    ellipse(x, y, size, size)
  }
}

const controls = {
  velocityScale: 0.1,
  gravity: 0.0,
  lifetime: 0
}

let particles = [];

function draw() {
  background(255);
  const x = mouseX;
  const y = mouseY;

  const xVel = (x - pwinMouseX) + 4
  const yVel = (y - pwinMouseY) + 4

  const hue = frameCount % 255;

  const size = Math.abs(xVel) + 50;

  fill(hue, 255, 255);
  if (mouseIsPressed || keyIsDown(SHIFT)) {
    // ellipse(x, y, size, size)
  particles.push({x, y, xVel, yVel, hue, size, life: 1.0})
  }
updateParticles()
}

function updateParticles() {
  let outputParticles = [];

  for (var i = 0; i < particles.length; i++) {
    const p = particles[i]

    p.x += (p.xVel * controls.velocityScale);
    p.y += (p.yVel * controls.velocityScale);

    p.yvel += controls.gravity;

    if(p.x >= windowHeight || p.x <= 0){
      p.xVel *= -1
    }

    if(p.y >= windowHeight || p.y <= 0){
      p.yVel *= -1
    }
    p.life += (0.001 * controls.lifetime)

    if (p.life > 0) {
      outputParticles.pop(p)
    }

    fill(p.hue, 255, 255, p.life*50)
    ellipse(p.x, p.y, p.size, p.size)
  }
}
