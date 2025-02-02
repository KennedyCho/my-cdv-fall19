let w = 1200;
let h = 800;
let padding = 90

// SVG
let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "#BDF5F6")
;


// IMPORT DATA
d3.json("DATA/neighbourhoods.geojson").then(function(geoData){

  // PRINT DATA

  // SCALES (to translate data values to pixel values)
  // let xDomain = d3.extent(incomingData, function(d){ return Number(d.year); })
  // let xScale = d3.scaleLinear().domain(xDomain).range([padding,w-padding]);
  // let yDomain = d3.extent(incomingData, function(d){ return Number(d.birthsPerThousand); })
  // let yScale = d3.scaleLinear().domain(yDomain).range([h-padding,padding]);

  // GEO PROJECTION
  let projection = d3.geoEquirectangular()
      .center([20.991, -156.988])
      .translate([w/2, h/2])
      .fitExtent([[50, 50], [w-50, h-50]], geoData)
  ;

  // PATH (line) MAKER - gets points, returns one of those complicated looking path strings
  // let lineMaker = d3.line()
  //     .x(function(d){
  //       return xScale(Number(d.year));
  //     })
  //     .y(function(d){
  //       return yScale(Number(d.birthsPerThousand));
  //     })
  // ;

  // PATH MAKER
  let pathMaker = d3.geoPath(projection);

  // CREATE SHAPES ON THE PAGE!
  // viz.datum(incomingData)
  //   .append("path")
  //     .attr("class", "line")
  //     .attr("d", lineMaker)
  //     .attr("fill", "none")
  //     .attr("stroke", "black")
  //     .attr("stroke-width", 8)
  // ;

  // create shapes on the page
  // datum is for one line
  // data for multiple lines

  viz.selectAll("path").data(geoData.features).enter()
    .append("path")
      .attr("d", pathMaker)
      .attr("fill", "#6BA41C")
  ;


})
