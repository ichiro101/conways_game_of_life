// this is where we process the backend logic
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

  this.numOfLiveNeighbours = function(x, y) {
    return 0;
  }

  // go to the next state
  this.next = function() {
    for(i = 0; i < this.boardArray.length; i++) {
      for(j = 0; j < this.boardArray[i].length; j++) {
        if (this.boardArray[i][j] === 0) {
          // this cell is dead, check if there are 3 live neighbours
          // (Rule #4)

        }
      }
    }
  }
}

// this is the function responsible for everything that is displayed
// on the canvas
function sketchProc(ps) {
  var board = new Board();

  // if mouse is clicked on one of the cells, we want to toggle its state
  // to allow the user to set any initial state they wish
  ps.mousePressed = function() {
    console.log("X: " + ps.mouseX + " Y:" + ps.mouseY);
    // calculate the logical coordinates based on the position of the mouse
    var x = Math.floor(ps.mouseX / 10);
    var y = Math.floor(ps.mouseY / 10);

    // bound checking
    if (x <= 80 && y <= 80 &&
        x >= 0 && y >= 0) {

      // toggle the state
      if (board.boardArray[x][y] === 0) {
        board.boardArray[x][y] = 1;
      } else if (board.boardArray[x][y] === 1) {
        board.boardArray[x][y] = 0;
      }
    }

  }

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

  // attaching the sketchProc function to the canvas
  var processingInstance = new Processing(canvas, sketchProc);
} 
