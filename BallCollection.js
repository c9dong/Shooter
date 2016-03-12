"use strict";

class BallCollection {
  constructor(pathModel) {
    this.pathModel = pathModel;
    this.ballList = [];
    this.ballRadius = 10;

    this.addNewBall();
  }

  addNewBall() {
    var ball = new Ball(0, 0, this.ballRadius);
    ball.dist = 0;
    this.ballList.push(ball);
  }

  removeFlaggedBalls() {
    this.ballList = _.filter(this.ballList, (ball) => {
      return ball.removeFlag != true;
    });
    this.reorderBalls();
  }

  reorderBalls() {
    var lastBall = _.last(this.ballList);
    if (lastBall.t > this.ballDiameter) {
      lastBall.t -= this.ballDiameter;
    }

    for (var i=this.ballList.length-2; i>=0; i--) {
      var ball = this.ballList[i];
      ball.dist = lastBall.dist + this.ballDiameter;
      console.log(ball.dist);
      lastBall = ball;
    }
  }

  get ballDiameter() {
    return this.ballRadius*2;
  }

  moveAllForward() {
    _.each(this.ballList, (ball) => {
      ball.dist = ball.dist+1;
    });

    this.removeFlaggedBalls();

    if (_.last(this.ballList).dist >= this.ballDiameter) {
      this.addNewBall();
    }
  }

  removeBallAt(point) {
    var ballIndex = -1;
    _.each(this.ballList, (ball, index) => {
      if (ball.checkPointIn(point)) {
        ballIndex = index;
        return;
      }
    });

    if (ballIndex == -1) {
      return;
    }

    var ballColor = this.ballList[ballIndex].color;
    // Check right side
    for (var i=ballIndex; i<this.ballList.length; i++) {
      var ball = this.ballList[i];
      if (ball.color == ballColor) {
        ball.removeFlag = true;
      }
    }

    // Check left side
    for (var i=ballIndex; i>=this.ballList.length; i--) {
      var ball = this.ballList[i];
      if (ball.color == ballColor) {
        ball.removeFlag = true;
      }
    }

    this.removeFlaggedBalls();
  }
}