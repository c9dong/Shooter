"use strict";

class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this._dist = 0;
    this._removeFlag = false;

    this.color = getRandomColor(3);
  }

  checkPointIn(point) {
    var center = new PIXI.Point(this.x, this.y);
    var dist = calcDist(center, point);
    return dist <= this.r;
  }

  set dist(dist) {
    this._dist = dist;
    var point = pathModel.getPointAtDist(dist);
    if (point == null) {
      this.removeFlag = true;
      return;
    }

    this.x = point.x;
    this.y = point.y;
  }

  get dist() {
    return this._dist;
  }

  get removeFlag() {
    return this._removeFlag;
  }

  set removeFlag(flag) {
    this._removeFlag = flag;
  }
}