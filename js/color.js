var RED = 0xFF0000;
var GREEN = 0x00FF00;
var BLUE = 0x0000FF;
var WHITE = 0xFFFFFF;
var BLACK = 0x000000;

function getRandomColor(max) {
  var rand = Math.floor(Math.random()*max);
  switch (rand) {
    case 0:
      return RED;
    case 1:
      return GREEN;
    case 2:
      return BLUE;
    default:
      return WHITE;
  }
}