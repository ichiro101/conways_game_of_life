function sketchProc(ps) {

  // Override draw function, by default it will be called 60 times per second
  ps.draw = function() {
    ps.background(224);
    ps.size(800, 800);

  };
}

// check for condition here, we don't want to paint the canvas
// when we're unit testing
if (document.getElementById("canvas1") != null) {
  var canvas = document.getElementById("canvas1");
  var processingInstance = new Processing(canvas, sketchProc);
} 
// attaching the sketchProc function to the canvas
