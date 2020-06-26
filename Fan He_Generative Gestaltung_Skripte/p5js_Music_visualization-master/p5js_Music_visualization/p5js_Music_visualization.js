let slider;
let mySound;
let volhistory = [];
var amplitude;
let button;
let cnv;



function preload() {
  soundFormats('mp3', 'ogg');
  //mySound = loadSound('data/QS');
  //img=loadImage("HearthStone.png");
  mySound = loadSound('data/QS');

}
function setup() {
  slider = createSlider(0,1,0.5,0.1);
  slider.position(10, 10);

  angleMode(DEGREES);
  //slider.style('width', '80px');
  button = createButton("play");
  button.position(150.10);
  button.mousePressed(canvasPressed);
  //button.mousePressed(canvasPressed);
  cnv = createCanvas(windowWidth, windowHeight);
  //mySound.play();
  //点击停止
  //cnv.mousePressed(canvasPressed);
  amplitude = new p5.Amplitude();

}
function loaded(){
  mySound.play();
}

function draw() {
  //let val = slider.value();
  background(32,42,59);
  // slider滑块控制音量
  mySound.setVolume(slider.value());
  // imageMode(CENTER);


  //image(img,200,200);
  //getLevel振幅0.0-1之间
  let level = amplitude.getLevel();
  //map映射
  let size = map(level, 0, 1, 30, 500);
  //fill 颜色
  fill(245,181,78);
  //圆，位置X,Y，大小X,Y
  ellipse(width/2, height/2,200,size);

  fill(32,42,59);
  ellipse(width/2, height/2, size, size);

 //puch开始，pop结束
  volhistory.push(level);
  //边框颜色定义
  stroke(245,181,78);
  strokeWeight(3);
  noFill();
  translate(width/2,height/2);
  beginShape();
  for (var i = 0;i< 360; i++){
    var r = map(volhistory[i],0,1,100,800);
    var x = r * cos(i);
    var y = r * sin(i);

    vertex(x,y);
  }
  endShape();


  if (volhistory.length > 360){
    volhistory.splice(0,1);
  }

}
function canvasPressed() {
  if ( mySound.isPlaying() ) { // .isPlaying() returns a boolean
    mySound.pause();
    button.html("play");
    //background(255, 0, 0);
  } else {
    mySound.play(); // playback will resume from the pause position
    button.html("pause");
    //background(0, 255, 0);

  }
}

