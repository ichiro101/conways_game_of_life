var started = false;

var startPressed = function() {
  started = true;
}

var stopPressed = function() {
  started = false;
}

// this is where we process the backend logic
var Board = function() {
  // store the board state in this two dimensional array
  //
  // the value of the array 0 at position [x][y] means
  // that cell is DEAD
  // the value of 1 means the cell is ALIVE
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

  // count the number of live neighbours cell have
  // at position x and y
  this.numOfLiveNeighbours = function(x, y) {
    var count = 0;

    for(var i = x - 1; i <= x + 1; i++) {
      for(var j = y - 1; j <= y + 1; j++) {
        // if the cell is exactly x, y, we don't
        // want to count our own cell, so skip to the next
        // case
        if (i === x && j === y) {
          continue;
        }

        // x coordinates out of bounds, skip
        if (this.boardArray[i] === undefined) {
          continue;
        }
        // y coordinates out of bounds, skip
        if (this.boardArray[i][j] === undefined) {
          continue;
        }

        if (this.boardArray[i][j] === 1) {
          count++;
        }
      }
    }
    return count;
  }

  // go to the next state
  this.next = function() {
    // we need to create this array because
    // we have to apply the changes to the board simutaneously
    // to do that, we have to count the neighbours BEFORE
    // we toggle any value on the board
    this.neighboursCountArray = new Array();
    for(i = 0; i < this.boardArray.length; i++) {
      this.neighboursCountArray[i] = new Array();
      for(j = 0; j < this.boardArray[i].length; j++) {
        this.neighboursCountArray[i][j] = this.numOfLiveNeighbours(i, j);
      }
    }

    // now use the information we have from the count array, 
    // do the transformation
    for(i = 0; i < this.boardArray.length; i++) {
      for(j = 0; j < this.boardArray[i].length; j++) {
        if (this.boardArray[i][j] === 0) {
          // this cell is dead, check if there are 3 live neighbours
          // (Rule #4)
          if (this.neighboursCountArray[i][j] === 3) {
            this.boardArray[i][j] = 1;
          }
        }

        if (this.boardArray[i][j] === 1) {
          // (Rule #1)
          if (this.neighboursCountArray[i][j] < 2) {
            this.boardArray[i][j] = 0;
          }
          
          // (Rule #3)
          if (this.neighboursCountArray[i][j] > 3) {
            this.boardArray[i][j] = 0;
          }
        }
      }
    }
  }
}

// this is the function responsible for everything that is displayed
// on the canvas
function sketchProc(ps) {
  var board = new Board();
  var currentTime = 0;
  var lastTime = 0;

  // if mouse is clicked on one of the cells, we want to toggle its state
  // to allow the user to set any initial state they wish
  ps.mousePressed = function() {
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

    // check if we should toggle the next state
    var currentTime = ps.millis();
    // if enough time has passed, and we already started, then we toggle
    // the next state
    if (currentTime > lastTime + 500 && started) {
      board.next();
      lastTime = currentTime;
    }

    // now draw the board
    for(var i = 0; i < board.boardArray.length; i++) {
      for(var j = 0; j < board.boardArray[i].length; j++) {
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
