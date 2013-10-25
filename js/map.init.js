jQuery(function($) {
  var inDetails = false;
  var container = $("#map");
  var r = Raphael('map', container.width(), container.height());
  var panZoom = r.panzoom({
    initialZoom: 0,
    initialPosition: {
      x: container.width() / 2,
      y: container.height() / 2
    }
  });
  var isHandling = false;

  panZoom.enable();
  r.safari();

  var attributes = {
    fill: '#bada55',
    stroke: '#FFFFFF',
    'stroke-linejoin': 'round',
    'stroke-width': '1.5',
    'transform': 's0.05,0.05,60,0' // Scales the path to a useful size
  };

  //var arr = [];

  var overlay = r.rect(0, 0, r.width, r.height);
  overlay.attr({
    fill: '#ffffff',
    'fill-opacity': 0,
    'stroke-width': 0,
    stroke: '#ffffff'
  });

  for (var country in paths) {

    var obj = r.path(paths[country].path);

    obj.attr(attributes);
    obj.click(tapHandler);
    obj.data("hoverFill", "#3e5f43");
    obj.data("fill", "#bada55");
    obj.hover(animateOver, animateOut);
    obj.name = paths[country].name;
  }

  var hammertime = Hammer($("#container"), {
    transform_always_block: true,
    transform_min_scale: 1,
    drag_block_horizontal: true,
    drag_block_vertical: true,
    drag_min_distance: 0
  });

  var posX=0, posY=0,
      lastPosX=0, lastPosY=0,
      bufferX=0, bufferY=0,
      scale=1, last_scale,
      rotation= 1, last_rotation, dragReady=0;

  $("#mapContainer #up").click(function(e) {
    panZoom.zoomIn(1);
    e.preventDefault();
  });

  $("#mapContainer #down").click(function(e) {
    panZoom.zoomOut(1);
    e.preventDefault();
  });

  $("#others #moveTopLeft").click(function(e) {
    panZoom.pan(1, 1);
  });

  function animateOver() {
    if (this.data("hoverFill")) {
      this.attr("fill", this.data("hoverFill"));
    }
  }

  function animateOut() {
    if (this.data("fill")) {
      this.attr("fill", this.data("fill"));
    }
  }

  function tapHandler() {
    console.log("tapped", this.name);
    // if (panZoom.isDragging() || isHandling) {
    //   return;
    // }
    // isHandling = true;
    // var anim;
    // var box = this.getBBox();

    // if (inDetails) {
    //   console.log('..inDetails');
    //   inDetails = false;
    //   panZoom.enable();
    //   this.hover(animateOver, animateOut);
    //   anim = overlay.animate({
    //     'fill-opacity': 0
    //   }, 300, function() {
    //     this.toBack();
    //     isHandling = false;
    //   });
    //   this.animateWith(overlay, anim, {
    //     transform: ""
    //   }, 300);
    //   this.attr("fill", this.data("fill"));
    // } else {
    //   console.log('NOT......inDetails');
    //   inDetails = true;
    //   panZoom.disable();
    //   this.unhover(animateOver, animateOut);
    //   overlay.toFront();
    //   this.toFront();

    //   var currPaperPosition = panZoom.getCurrentPosition();
    //   var currPaperZoom = panZoom.getCurrentZoom();

    //   var currHeight = r.height * (1 - currPaperZoom * 0.1);

    //   var zoomDif = (currHeight / 2) / box.height;

    //   var xdif = currPaperPosition.x - box.x + ((box.width * zoomDif) - box.width) / 2;
    //   var ydif = (currPaperPosition.y + ((currHeight / 2) - (box.height / 2))) - box.y;

    //   console.log("xdif", xdif);
    //   console.log("ydif", ydif);


    //   anim = overlay.animate({
    //     'fill-opacity': 0.2
    //   }, 300, function() {
    //     isHandling = false;
    //   });
    //   this.animateWith(overlay, anim, {
    //     transform: "t" + xdif + "," + ydif + "s" + zoomDif
    //   }, 3000);
    // }
  }

});