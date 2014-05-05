test("check qunit is in working order", function() {
  ok(1 === 1, "qunit is working");
});

test("basic board functionality", function() {
  var board = new Board();
  ok(board.boardArray.length === 80, "correct verticle size");
  ok(board.boardArray[0].length === 80, "correct horizontal size");
});

test("board neighbour checking", function() {
  var board = new Board();
  ok(board.numOfLiveNeighbours(0, 0) === 0, "#0: correct empty neighbour size");

  board.boardArray[0][1] = 1;
  ok(board.numOfLiveNeighbours(0, 0) === 1, "#1: correct neighbour size");

  board.boardArray[1][0] = 1;
  ok(board.numOfLiveNeighbours(0, 0) === 2, "#2: correct neighbour size");
  ok(board.numOfLiveNeighbours(1, 1) === 2, "#3: correct neighbour size");


  board.boardArray[9][10] = 1;
  board.boardArray[11][10] = 1;
  board.boardArray[10][9] = 1;
  board.boardArray[10][11] = 1;
  ok(board.numOfLiveNeighbours(10, 10) === 4, "#4: correct neighbour size");
});
