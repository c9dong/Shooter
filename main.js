var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;

var points = [[0,0], [300,50], [400,150], [500,250], [550,300], [600,550], [800,600]];
var pathModel = new PathModel(points);
var ballCollection = new BallCollection(pathModel);

var renderer = new PIXI.autoDetectRenderer(SCREEN_WIDTH, SCREEN_HEIGHT);
var content = new PIXI.Container();

var pathGraphics = new PIXI.Graphics();
var ballGraphics = new PIXI.Graphics();

function init() {
  document.body.appendChild(renderer.view);

  initPathGraphics();

  // Add the graphics to the stage
  content.addChild(pathGraphics);
  content.addChild(ballGraphics);
  render();
}

function initPathGraphics() {
  pathGraphics.lineStyle(1, RED);
  var x = Math.round(pathModel.xSpline.at(0));
  var y = Math.round(pathModel.ySpline.at(0));
  pathGraphics.moveTo(x,y);
  for (var i=0; i<pathModel.size; i+=1) {
    var x = Math.round(pathModel.xSpline.at(i));
    var y = Math.round(pathModel.ySpline.at(i));
    pathGraphics.lineTo(x, y);
  }
}

function drawBallCollection() {
  ballGraphics.clear();
  _.each(ballCollection.ballList, (ball) => {
    ballGraphics.lineStyle(2, ball.color);
    ballGraphics.drawCircle(ball.x, ball.y, ball.r);
  });
  ballCollection.moveAllForward();
}

function draw() {
  drawBallCollection();
}

function render() {
  draw();

  renderer.render(content);
  requestAnimationFrame(render);
}

window.onload = init();