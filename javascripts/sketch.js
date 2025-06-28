const {
  int,
  intersect,
  rndInt,
  getAngleBtwTwoPoints,
  Effector,
} = window.__lib;

const gWidth = window.innerWidth;
const gHeight = window.innerHeight;
const padd = 50;
let maskLayer = null;
let font = null;

function preload() {
  font = loadFont('/e24/RobotoSlab-Black.ttf');
}

const createMask = m => {
  maskLayer = createGraphics(gWidth, gHeight);
  maskLayer.background(255);
  maskLayer.erase();
  maskLayer.textFont(font);
  maskLayer.textSize(gWidth / 2);
  maskLayer.textAlign(CENTER, CENTER);
  maskLayer.text('1:0', gWidth / 2, ( gHeight / 2 ) + (m?m:0));
  maskLayer.noErase();
};

function setup() {
  createCanvas(gWidth, gHeight);
  angleMode(DEGREES);
  createMask(null);
}

const effector = new Effector({
  x: padd * 2,
  y: padd * 2,
  length: gWidth - ( padd * 4 ),
  height: gHeight - (padd  * 4),
  count: 13,
});

function draw() {
  background('rgba(255, 255, 255, 0.1)');
  if(rndInt(1, 100) % 33 === 0) createMask(rndInt(-50, 50));
  effector
    .mutate()
    .render();
  image(maskLayer, 0, 0);
}
