let w = 2400;
let h = 800;


let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "white")
;

function gotData(incomingData){
  console.log(incomingData);

  // x-axis is hours within day
  // y-axis is freq of use
  // freq calc avg use
  // line color denotes medium
  let xPadding = 10;
  let yPadding = 10;

  let xScale = d3.scaleLinear().domain([0,100]).range([xPadding, 2400-xPadding]);
  let yScale = d3.scaleLinear().domain([0,100]).range([xPadding, 2400-xPadding]);

  let xAxis = d3.axisBottom(xScale);
  let yAxis = d3.axisLeft(yScale);
}

d3.json("data.json").then(gotData);
