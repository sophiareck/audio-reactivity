function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0,0,0);
  frameRate(7);
    let r = random(255);
    let g = random(255);
    let b = random(255);
  fill(r, g, b)
  textSize(40);
  textAlign(CENTER);
  text("I want this class \n to END", width/2, height/2);
  textSize(10);
  text("please", width/2, 300);
}
