var fall6 = function (s) {

var data = [];
var ready = false;

var projection = null;
var rScale = d3.scaleLinear();

var one;
var hover = false;

  s.setup = function() {
  s.createCanvas(1700, 700);
  s.textSize(13);
  //noLoop();
  s.pixelDensity(8);
  //uxNoStroke();

  projection = d3.geoMercator() //Projektionsart, Auflistung von Projektionen:https://github.com/d3/d3-geo#projections
  .center([16.62878166, 9.995240903]) //Kartenmittelpunkt
  .translate([s.width / 2, s.height / 2]) //Screen Position des Kartenmittelpunktes
  .scale(160);

  d3.csv("csv/waste.csv", function (d) {
    return {
      Entity: d.Entity,
      waste: +d.waste,
      capital: d.capital,
      lat: +d.lat,
      long: +d.long,
    };
  }).then(function (csv) {
    data = csv;
    ready = true;
    s.redraw();
  });
}

s.draw = function()  {
  if (!ready) {
    s.background(255, 0, 0);
    s.noStroke();
    return;
  } else {
    s.background(255);
  }

  var wasteMin = d3.min(data, function(d){
  return d.waste;
  });

  var wasteMax = d3.max(data, function(d){
  return d.waste;
  });

  rScale.domain([wasteMin, wasteMax]).range([1, 300]);

  for (var i = 0; i < data.length; i++) {
  var d = data[i];
  var lon = data[i].long;
  var lat = data[i].lat;
  var pos = projection([lon, lat]);
  s.noStroke();

  if(d.waste < 0.2){
  var r = rScale(d.waste);
  s.ellipse(pos[0], pos[1], r, r);
  s.fill(85,107,47, 100);
  }

  if(d.waste > 0.2){
  var r = rScale(d.waste);
  s.ellipse(pos[0], pos[1], r, r);
  s.fill(85,107,47, 30);
  }

  //text(d.Entity, pos[0], pos[1]-100);


}

    one = uxRect(100, 100, 100, 100);
    one.uxEvent('hover', s.trigger);


    if (hover) {
      for (var i = 0; i < data.length; i++) {
      var d = data[i];
      var lon = data[i].long;
      var lat = data[i].lat;
      var pos = projection([lon, lat]);
      //var rot = map(d.waste, 0, 300, 255, 0);

      if(d.waste < 0.2){
      var r = rScale(d.waste);
      s.fill(255,0,0, 200);
      //stroke("black");
      s.ellipse(pos[0], pos[1], r, r);
      }

      if(d.waste > 0.2){
      var r = rScale(d.waste);
      s.fill(255,0,0, 80);
          //stroke("black");
      s.ellipse(pos[0], pos[1], r, r);
      }
    }
    one.uxFill = '#79c65d';
     hover = false;
    } else {
      for (var i = 0; i < data.length; i++) {
      var d = data[i];
      var lon = data[i].long;
      var lat = data[i].lat;
      var pos = projection([lon, lat]);
      //var rot = map(d.waste, 0, 300, 255, 0);

      if(d.waste < 0.2){
      var r = rScale(d.waste);
      s.fill(85,107,47, 100);
      //stroke("black");
      s.ellipse(pos[0], pos[1], r, r);
      }

      if(d.waste > 0.2){
      var r = rScale(d.waste);
      s.fill(85,107,47, 30);
      //stroke("black");
      s.ellipse(pos[0], pos[1], r, r);
      }
    }
     one.uxFill = '#C65D5D';
      }

}

s.trigger = function() {
  s.hover = true;
}

}

new p5(fall6,'grafik6');
