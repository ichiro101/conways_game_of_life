function sketchProc(ps) {

  // Override draw function, by default it will be called 60 times per second
  ps.draw = function() {
    ps.background(224);
    ps.size(800, 800);

  };
}

var canvas = document.getElementById("canvas1");
// attaching the sketchProc function to the canvas
var processingInstance = new Processing(canvas, sketchProc);
