import currentBox from "./leonScroller.js";
// imports just one function from a different file
// more info, import: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
// more info, export: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export

// we don't hardcode w and h this time
// but keep them responsive
// (see adjustVizHeight and resized function
// that are defined at the bottom)
let w, h;
let heightRatio = 1;
let padding = 90;

let viz = d3.select("#visualization")
    .append("svg")
  .style("background-color", "lavender")
;
// function to adjust viz height dynamically
// in order to keep the heightRatio at any given
// width of the browser window
// (function definition at the bottom)
adjustVizHeight();


// your script starts here, e.g. load data here.
let dataFile = "DATA/HISTHPI.csv"


d3.csv(dataFile).then(function (incomingData) {
  console.log(incomingData);
  let xDomain = d3.extent(incomingData, function(datapoint){
    var parseTime = d3.timeParse("%Y-%m-%d");
    // console.log(parseTime(datapoint.DATE));
    return parseTime(datapoint.DATE)


  });


  let yDomain = d3.extent(incomingData, function(datapoint){
    var y = parseFloat(datapoint.HISTHPI);
    return y

  });

  console.log(yDomain);

  var xPadding = 40;

  let xScale = d3.scaleTime().domain(xDomain).range([xPadding,w - xPadding]);
  // create axis for this scale
  let xAxis = d3.axisBottom(xScale);
  // create a groyp to gold the axis elements
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  // tell d3 to fill the group with the axis elements
  xAxisGroup.call(xAxis);
  // position the axis at the bottom of the svg
  xAxisGroup.attr("transform", "translate(0, "+ (h-xPadding) +")");

  var yPadding = 10;
  let yScale = d3.scaleLinear().domain(yDomain).range([h-xPadding, yPadding]);

  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  yAxisGroup.call(yAxis);
  yAxisGroup.attr("transform", "translate("+xPadding+",0)");

  let vizgroup = viz.append("g").attr("class", "vizgroup");

  createViz();

  function createViz() {
    let datagroups = vizgroup.selectAll(".datagroup").data(incomingData, function(d){
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
      return h-y
    }

    let lineMaker = d3.line()
                        .x(getX)
                        .y(getY)
    ;

    let theSituation = viz.datum(incomingData);
    theSituation.append("path")
        .attr("d", lineMaker)
        .attr("fill", "none")
        .attr("stroke", "black")
    ;


  }


})


// scrolling event listener
// you might move this block into the part of your code
// in which your data is loaded/available
let previousSection;
d3.select("#textboxes").on("scroll", function(){
  // the currentBox function is imported on the
  // very fist line of this script
  currentBox(function(box){
    console.log(box.id);

    if(box.id=="two" && box.id!=previousSection){
      console.log("changing viz");
      // trigger a new transition
      previousSection = box.id;

      createViz();
    }

  })
})







// function to adjust viz height dynamically
// in order to keep the heightRatio at any given
// width of the browser window
function adjustVizHeight(){
  viz.style("height", function(){
    w = parseInt(viz.style("width"), 10);
    h = w*heightRatio;
    return h;
  })
}
function resized(){
  adjustVizHeight()
}
window.addEventListener("resize", resized);
