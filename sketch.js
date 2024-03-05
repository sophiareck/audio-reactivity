var colors = ['#e6261f', '#eb7532', '#f7d038', '#a3e048', '#49da9a', '#34bbe6', '#4355db', '#d23be7'];
var sounds = [];
var soundNames = ['lead', 'backup', 'guitar', 'bass', 'drums', 'organ', 'strings', 'congas'];
var FFTs = [];
var checks = [];

function preload() {
  soundFormats('mp3', 'ogg');
  soundNames.forEach((name, index) => {
    sounds[index] = loadSound(`${name}.mp3`);
  });
}

function setup() {
  createCanvas(900, 550);
  background(0);

  sounds.forEach((sound, index) => {
    FFTs[index] = new p5.FFT();
    FFTs[index].setInput(sound);
  });

  setupControls();
}

function setupControls() {
  playButton = createButton('play/pause');
  playButton.position(1020, 550);
  playButton.mousePressed(playAll);
  stylize(playButton);

  soundNames.forEach((name, index) => {
    checks[index] = createCheckbox(name.charAt(0).toUpperCase() + name.slice(1), true);
    checks[index].position(1020, 140 + 50 * index);
    stylize(checks[index], colors[index]);
  });
}

function stylize(control, color = '') {
  control.style('font-size', '15pt');
  control.style('font-weight', 'bold');
  control.style('border', 'solid');
  control.style('padding', '5px');
  if (color) control.style('background-color', color);
}

function draw() {
  background(0);
  FFTs.forEach((fft, index) => {
    displayPitch(fft, colors[index]);
    sounds[index].amp(checks[index].checked() ? 1 : 0);
  });
}

function displayPitch(sound, color) {
  let spectrum = sound.analyze();
  noStroke();
  fill(color);
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h)
  }
}

function playAll() {
  sounds.forEach(sound => {
    sound.isPlaying() ? sound.pause() : sound.loop();
  });
}
