"use strict";

class BallCollection {
  constructor(pathModel) {
    this.pathModel = pathModel;
    this.ballList = [];
    this.ballRadius = 10;

    this.addNewBall();
  }

  addNewBall() {
    var point = this.pathModel.getPointAtDist(0);
    var ball = new Ball(point.x, point.y, this.ballRadius);
    ball.t = 0;
    this.ballList.push(ball);
  }

  moveAllForward() {
    _.each(this.ballList, (ball) => {
      var point = this.pathModel.getPointAtDist(ball.t);
      if (point != null) {
        ball.t++;
        ball.x = point.x;
        ball.y = point.y;
      } else {
        ball.removeFlag = true;
      }
    });

    this.ballList = _.filter(this.ballList, (ball) => {
      return ball.removeFlag != true;
    });

    if (_.last(this.ballList).t >= this.ballRadius*2) {
      this.addNewBall();
    }
  }
}