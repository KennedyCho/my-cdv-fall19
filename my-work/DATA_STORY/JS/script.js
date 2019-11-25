let weight = 0.7;
let wMap = 1200*weight;
let hMap = 800*weight;
let padding = 90

// SVG
let viz = d3.select("#mapContainer").append("svg")
    .style("width", wMap)
    .style("height", hMap)
    .style("background-color", "#BDF5F6")
;


// IMPORT DATA
d3.json("DATA/neighbourhoods.geojson").then(function(geoData){

  // GEO PROJECTION
  let projection = d3.geoEquirectangular()
      .center([20.991, -156.988])
      .translate([wMap/2, hMap/2])
      .fitExtent([[50, 50], [wMap-50, hMap-50]], geoData)
  ;

  // PATH MAKER
  let pathMaker = d3.geoPath(projection);

  // create shapes on the page
  // datum is for one line
  // data for multiple lines

  viz.selectAll("path").data(geoData.features).enter()
    .append("path")
      .attr("d", pathMaker)
      .attr("fill", "#6BA41C")
  ;

  let pinMaker = d3.geoCircle()
    .center([21.492, -157.966])
    .radius(5);

  var circle = d3.geoCircle().center([21.492, -157.966]).radius(5)
  viz.beginPath();
  viz.strokeStyle = 'red';
  geoGenerator(circle());
  viz.stroke();

})
