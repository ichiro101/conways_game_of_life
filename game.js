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
  var board = new Board();

  // Override draw function, by default it will be called 60 times per second
  ps.draw = function() {
    // set up the background and size
    ps.background(224);
    ps.size(801, 801);

    // now draw the board
    for(i = 0; i < board.boardArray.length; i++) {
      for(j = 0; j < board.boardArray[i].length; j++) {
        if(board.boardArray[i][j] === 0) {
          // paint dead cell white
          ps.fill(255);
        } else if (board.boardArray[i][j] === 1) {
          // paint alive cell black
          ps.fill(0);
        }
        ps.rect(i*10, j*10, 10, 10);
      }
    }
  };
}

// check for condition here, we don't want to paint the canvas
// when we're unit testing
if (document.getElementById("canvas1") != null) {
  var canvas = document.getElementById("canvas1");
  var processingInstance = new Processing(canvas, sketchProc);
} 
// attaching the sketchProc function to the canvas
