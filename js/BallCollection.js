"use strict";

class BallCollection {
  constructor(pathModel) {
    this._pathModel = pathModel;
    this._ballList = [];
    this._ballRadius = 10;

    this._addNewBall();
  }

  /** Getter/Setter **/
  get ballRadius() {
    return this._ballRadius;
  }

  get ballDiameter() {
    return this.ballRadius*2;
  }

  get ballList() {
    return this._ballList;
  }

  /** Private methods **/
  _addNewBall() {
    var ball = new Ball(this.ballRadius);
    this._ballList.push(ball);
  }

  _removeFlaggedBalls() {
    this._ballList = _.filter(this._ballList, (ball) => {
      return ball.removeFlag != true;
    });
    this._reorderBalls();
  }

  _reorderBalls() {
    var lastBall = _.last(this._ballList);
    if (lastBall.t > this.ballDiameter) {
      lastBall.t -= this.ballDiameter;
    }

    for (var i=this._ballList.length-2; i>=0; i--) {
      var ball = this._ballList[i];
      ball.dist = lastBall.dist + this.ballDiameter;
      lastBall = ball;
    }
  }

  /** Public methods **/
  moveAllForward() {
    _.each(this._ballList, (ball) => {
      ball.dist = ball.dist+1;
    });

    this._removeFlaggedBalls();

    if (_.last(this._ballList).dist >= this.ballDiameter) {
      this._addNewBall();
    }
  }

  removeBallAt(point) {
    var ballIndex = -1;
    _.each(this._ballList, (ball, index) => {
      if (ball.checkPointIn(point)) {
        ballIndex = index;
        return;
      }
    });

    if (ballIndex == -1) {
      return;
    }

    var ballColor = this._ballList[ballIndex].color;
    // Check right side
    for (var i=ballIndex; i<this._ballList.length; i++) {
      var ball = this._ballList[i];
      if (ball.color == ballColor) {
        ball.removeFlag = true;
      } else {
        break;
      }
    }

    // Check left side
    for (var i=ballIndex; i>=0; i--) {
      var ball = this._ballList[i];
      if (ball.color == ballColor) {
        ball.removeFlag = true;
      } else {
        break;
      }
    }

    this._removeFlaggedBalls();
  }
}