"use strict";

class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.t = 0;

    this.color = getRandomColor(3);
  }
}