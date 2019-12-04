let weight = 0.7;
let wMap = 1200*weight;
let hMap = 800*weight;
let padding = 90

var active = d3.select(null);

// SVG MAP
let viz = d3.select("#mapContainer").append("svg")
    .style("width", wMap)
    .style("height", hMap)
    .style("background-color", "white")
;


// IMPORT DATA
d3.json("DATA/neighbourhoods.geojson").then(function(geoData){

  viz.append("rect")
    .attr("class", "background")
    .attr("fill", "white")
    .attr("width", wMap)
    .attr("height", hMap)
    .on("click", reset);

  // GEO PROJECTION
  let projection = d3.geoEquirectangular()
      .center([20.991, -156.988])
      .translate([wMap/2, hMap/2])
      .fitExtent([[30, 30], [wMap-30, hMap-30]], geoData)
  ;

  // PATH MAKER
  let pathMaker = d3.geoPath(projection);
  let zoom = d3.zoom().on("zoom", zoomed);
  // console.log(zoom);

  // create shapes on the page
  // datum is for one line
  // data for multiple lines



  let map = viz.selectAll("path").data(geoData.features).enter()
    .append("path")
      .attr("d", pathMaker)
      .attr("fill", "#6BA41C")
      .attr("stroke", "black")
      .attr("stroke-opacity", 0.5)
      .attr("opacity", 0.7)
      .on("mouseover", function(){d3.select(this).style("fill", "red").style("opacity", 1);})
      .on("mouseout", function(){d3.select(this).style("fill", "#6BA41C").style("opacity", 0.7);})
      .on("click", clicked)
  ;

  function clicked(d) {
  if (active.node() === this) return reset();
  active.classed("active", false);
  active = d3.select(this).classed("active", true);

  var bounds = pathMaker.bounds(d),
      dx = bounds[1][0] - bounds[0][0],
      dy = bounds[1][1] - bounds[0][1],
      x = (bounds[0][0] + bounds[1][0]) / 2,
      y = (bounds[0][1] + bounds[1][1]) / 2,
      scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / wMap, dy / hMap))),
      translate = [wMap / 2 - scale * x, hMap / 2 - scale * y];

  viz.transition()
      .duration(750)
      // .call(zoom.translate(translate).scale(scale).event); // not in d3 v4
      .call( zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) ); // updated for d3 v4
}

function reset() {
  active.classed("active", false);
  active = d3.select(null);

  viz.transition()
      .duration(750)
      // .call( zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1) ); // not in d3 v4
      .call( zoom.transform, d3.zoomIdentity ); // updated for d3 v4
}

  function zoomed() {
  map.style("stroke-width", 1.5 / d3.event.transform.k + "px");
  // g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"); // not in d3 v4
  map.attr("transform", d3.event.transform); // updated for d3 v4
  }


})


// housing index data
let vizHousingIndex = d3.select("#comparisonContainer").append("svg")
    .style("width", wMap)
    .style("height", hMap)
    .style("background-color", "white")
;

d3.csv("DATA/HISTHPI.csv").then(function (housingIndexData) {
  // console.log(housingIndexData);

  let xDomain = d3.extent(housingIndexData, function(datapoint){
    var parseTime = d3.timeParse("%Y-%m-%d");
    // console.log(parseTime(datapoint.DATE));
    return parseTime(datapoint.DATE)
  });


  let yDomain = d3.extent(housingIndexData, function(datapoint){
    var y = parseFloat(datapoint.HISTHPI);
    return y

  });
  console.log(xDomain);
  console.log(yDomain);


  var xPadding = 50;

  let xScale = d3.scaleTime().domain(xDomain).range([xPadding,wMap - xPadding]);
  // create axis for this scale
  let xAxis = d3.axisBottom(xScale);
  // create a groyp to gold the axis elements
  let xAxisGroup = vizHousingIndex.append("g").attr("class", "xaxis");
  // tell d3 to fill the group with the axis elements
  xAxisGroup.call(xAxis);
  // position the axis at the bottom of the svg
  xAxisGroup.attr("transform", "translate(0, "+ (hMap-xPadding) +")");


  let yScale = d3.scaleLinear().domain(yDomain).range([hMap-xPadding, xPadding]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = vizHousingIndex.append("g").attr("class", "yaxis");
  yAxisGroup.call(yAxis);
  yAxisGroup.attr("transform", "translate("+xPadding+",0)");

  let vizgroup = vizHousingIndex.append("g").attr("class", "vizgroup");

  createViz();


  function createViz() {
    let datagroups = vizgroup.selectAll(".datagroup").data(housingIndexData, function(d){
  // we return the value that should act as the datapoints key
    return d.DATE;
    });

    let incomingDataGroups = datagroups.enter()
      .append("g")
      .attr("class", "datagroup")
    ;

    function getX(d) {
      var parseTime = d3.timeParse("%Y-%m-%d");
      // console.log(parseTime(datapoint.DATE));
      // parseTime(d.DATE)
      // console.log(xScale(parseTime(d.DATE)));
      return xScale(parseTime(d.DATE))
    }
    function getY(d) {

      var y = parseFloat(d.HISTHPI);
      // console.log(y);
      return hMap-y
    }

    let lineMaker = d3.line()
                        .x(getX)
                        .y(getY)
    ;

    let theSituation = vizHousingIndex.datum(housingIndexData);
    theSituation.append("path")
        .attr("d", lineMaker)
        .attr("fill", "none")
        .attr("stroke", "black")
    ;


  }

  setTimeout(function () {
    console.log('look');
  }, 4000);
})

// location pin
// <svg class="svg-icon" viewBox="0 0 20 20">
//   <path d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589"></path>
// </svg>

// map back button
// <svg class="svg-icon" viewBox="0 0 20 20">
//   <path d="M18.092,5.137l-3.977-1.466h-0.006c0.084,0.042-0.123-0.08-0.283,0H13.82L10,5.079L6.178,3.671H6.172c0.076,0.038-0.114-0.076-0.285,0H5.884L1.908,5.137c-0.151,0.062-0.25,0.207-0.25,0.369v10.451c0,0.691,0.879,0.244,0.545,0.369l3.829-1.406l3.821,1.406c0.186,0.062,0.385-0.029,0.294,0l3.822-1.406l3.83,1.406c0.26,0.1,0.543-0.08,0.543-0.369V5.506C18.342,5.344,18.242,5.199,18.092,5.137 M5.633,14.221l-3.181,1.15V5.776l3.181-1.15V14.221z M9.602,15.371l-3.173-1.15V4.626l3.173,1.15V15.371z M13.57,14.221l-3.173,1.15V5.776l3.173-1.15V14.221z M17.547,15.371l-3.182-1.15V4.626l3.182,1.15V15.371z"></path>
// </svg>

// info
// <svg class="svg-icon" viewBox="0 0 20 20">
//   <path d="M18.344,16.174l-7.98-12.856c-0.172-0.288-0.586-0.288-0.758,0L1.627,16.217c0.339-0.543-0.603,0.668,0.384,0.682h15.991C18.893,16.891,18.167,15.961,18.344,16.174 M2.789,16.008l7.196-11.6l7.224,11.6H2.789z M10.455,7.552v3.561c0,0.244-0.199,0.445-0.443,0.445s-0.443-0.201-0.443-0.445V7.552c0-0.245,0.199-0.445,0.443-0.445S10.455,7.307,10.455,7.552M10.012,12.439c-0.733,0-1.33,0.6-1.33,1.336s0.597,1.336,1.33,1.336c0.734,0,1.33-0.6,1.33-1.336S10.746,12.439,10.012,12.439M10.012,14.221c-0.244,0-0.443-0.199-0.443-0.445c0-0.244,0.199-0.445,0.443-0.445s0.443,0.201,0.443,0.445C10.455,14.021,10.256,14.221,10.012,14.221"></path>
// </svg>
