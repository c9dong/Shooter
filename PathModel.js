/*
  Input: set of points
  Output: Cublic spline equation matrix for x and y
          Points for parametric curve with t evenly distributed by 1 seconds

  1. Calucate parametric curve for a set of points
  2. Sample points every 0.05 seconds
  3. Calculate distances between each sampled points
  4. Find total distance
  5. Create new set of points by interpolating points at distances at a constant rate
  6. Calculate new parametric curve given the new set of points
*/

"use strict";

class PathModel {

  constructor(pPoints) {
    // pPoints: array of points
    // xPoints: array of x coordinates of pPoints
    // yPoints: array of y coordinates of pPoints

    var size = pPoints.length;
    this.pPoints = pPoints;
    this.tPoints = numeric.linspace(0, size-1, size);
    this.xPoints = _.map(this.pPoints, _.head);
    this.yPoints = _.map(this.pPoints, _.last);

    this.xSpline = numeric.spline(this.tPoints, this.xPoints);
    this.ySpline = numeric.spline(this.tPoints, this.yPoints);

    // Sample Points
    var sampleArray = [];
    for (var i=0; i<=(size-1); i+=0.05) {
      var p = new PIXI.Point(this.xSpline.at(i), this.ySpline.at(i));
      sampleArray.push(p);
    }

    // Calc distances
    var distArray = [];
    distArray.push(0);
    var totalDist = 0;
    for (var i=0; i<sampleArray.length-1; i++) {
      var p1 = sampleArray[i];
      var p2 = sampleArray[i+1];
      var dist = calcDist(p1, p2);
      totalDist += dist;
      distArray.push(totalDist);
    }

    this.tPoints = [];
    this.xPoints = [];
    this.yPoints =[];
    var curIndex = 0;
    for (var i=0; i<totalDist; i++) {
      this.tPoints.push(i);
      while (i >= distArray[curIndex]) {
        curIndex ++;
      }
      var p1 = sampleArray[curIndex-1];
      var p2 = sampleArray[curIndex];
      var dist = distArray[curIndex] - distArray[curIndex-1];
      var distRatio = (i-distArray[curIndex-1]) / dist;
      this.xPoints.push(p1.x+(p2.x-p1.x)*distRatio);
      this.yPoints.push(p1.y+(p2.y-p1.y)*distRatio);
    }

    this.xSpline = numeric.spline(this.tPoints, this.xPoints);
    this.ySpline = numeric.spline(this.tPoints, this.yPoints);
  }

  /*
   * Return: number of points
  */
  get size() {
    return this.tPoints.length;
  }

  /*
   * Input: the distance of an object in the path
   * Return: the position of that object (x,y)
  */
  getPointAtDist(dist) {
    if (dist > this.size) {
      return null;
    }
    return new PIXI.Point(this.xSpline.at(dist), this.ySpline.at(dist));
  }
}