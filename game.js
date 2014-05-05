var Board = function() {
  // store the board state in this two dimensional array
  this.boardArray = new Array();

  // size of the board
  nVerticalElem = 80;
  nHorizontalElem = 80;

  // create the two dimensional array here
  // initialize everything to 0
  for(i = 0; i < nVerticalElem; i++) {
    this.boardArray[i] = new Array();
    for(j = 0; j < nHorizontalElem; j++) {
      this.boardArray[i][j] = 0;
    }
  }
}

function sketchProc(ps) {

  // Override draw function, by default it will be called 60 times per second
  ps.draw = function() {
    // set up the background and size
    ps.background(224);
    ps.size(800, 800);

    // now draw the board
  };
}

// check for condition here, we don't want to paint the canvas
// when we're unit testing
if (document.getElementById("canvas1") != null) {
  var canvas = document.getElementById("canvas1");
  var processingInstance = new Processing(canvas, sketchProc);
} 
// attaching the sketchProc function to the canvas
