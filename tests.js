test("check qunit is in working order", function() {
  ok(1 === 1, "qunit is working");
});

test("basic board functionality", function() {
  var board = new Board();
  ok(board.boardArray.length == 80, "correct verticle size");
  ok(board.boardArray[0].length == 80, "correct horizontal size");
});
