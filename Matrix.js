import * as _ from "lowdash.js"

/*
  Full matrix object
*/

class Matrix {

  /*
    Immutable: rows, columns
    Mutable: matrix
  */

  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;

    this.matrix = new Array(this.rows)
    for (int i=0; i<this.matrix.length; i++) {
      this.matrix[i] = new Array(this.columns).fill(0);
    }
  }

  setCell(row, column, val) {
    if (!inRange(row, column)) {
      return;
    }
    this.matrix[row][column] = val;
  }

  getCell(row, column) {
    if (!inRange(row, column)) {
      return undefined;
    }
    return this.matrix[row][column];
  }

  inRange(row, column) {
    if (row < 0 || row > this.row || column < 0 || column > this.column) {
      return false;
    }
    return true;
  }
}

/*
  Full vector object
*/

class Vector extends Matrix {
  constructor(size) {
    super(size, 1);
  }

  setCell(index, val) {
    super.setCell(index, 0, val);
  }

  getCell(index, val) {
    return super.getCell(index, 0);
  }
}