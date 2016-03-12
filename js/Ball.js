"use strict";

class Ball {
  constructor(r) {
    this._r = r;
    this._removeFlag = false;

    this.dist = 0;
    this.color = getRandomColor(2);
  }

  /** Getter/Setter **/
  get color() {
    return this._color;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get radius() {
    return this._r;
  }

  get dist() {
    return this._dist;
  }

  get removeFlag() {
    return this._removeFlag;
  }

  set color(color) {
    this._color = color;
  }

  set radius(r) {
    this._r = r;
  }

  set dist(dist) {
    this._dist = dist;
    var point = pathModel.getPointAtDist(dist);
    if (point == null) {
      this.removeFlag = true;
      return;
    }

    this._x = point.x;
    this._y = point.y;
  }

  set removeFlag(flag) {
    this._removeFlag = flag;
  }

  /** Public methods **/
  checkPointIn(point) {
    var center = new PIXI.Point(this.x, this.y);
    var dist = calcDist(center, point);
    return dist <= this.radius;
  }
}