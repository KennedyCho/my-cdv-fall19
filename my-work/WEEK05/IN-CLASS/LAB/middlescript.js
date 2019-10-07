let w = 2400;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lightyellow")
;

let xPadding = 10;
let xScale = d3.scaleLinear().domain([0,100]).range([xPadding, 2400-xPadding]);

// calc x position of bar
function xPosition(d, i){
  // 40 px apart
  // return 20 + i * 40;
  return xScale(i);
}
// calc y position
function yPosition(d, i){
  // in middle of page height
  return h/2;
}

function getGroupTranslation(d, i){
  // calls position functions
  return "translate(" + xPosition(d,i) + "," + yPosition(d,i) + ")";
}

// passes in the labels variable
// names the data / labels
function getName(d, i){
  return d.name + " - " + d.height
}

// style bars
let padding = 10;

// allocate space for your scale
// unbox the scale
// domain([0, 828]) = input
// range([0, height/2]) = output
let yScale = d3.scaleLinear().domain([0, 828]).range([0, h/2 - (padding*2)]);

function getSize(d,i) {
  return yScale(d.height);
}

function getNegativeSize(d,i) {
  return -yScale(d.height)-padding;

}

let colorScale = d3.scaleLinear().domain([300, 400, 828]).range(['white','black','red']);
function getColor(d, i) {
  return colorScale(d.height);
}

function gotData(incomingData){
  console.log(incomingData);

// link elements to data
// creates empty place holders
  let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
    .append("g")
    // same as .attr("class", "name")
      .classed("datagroup", true)
  ;


// add a rectangle to each element with the class name datagroup
  let towers = datagroups.append("rect")
      .attr("x", 0)
      // .attr("y", 0)
      .attr("y", getNegativeSize)
      .attr("width", 20)
      // .attr("height", 20)
      .attr("height", getSize)
      // add color value with getColor function
      .attr("fill", getColor)
  ;
// adds text to each element with datargoup as class name
  let labels = datagroups.append("text")
      .text(getName)
      // .attr("fill", "red")
      .attr("fill", getColor)

      .attr("transform", "rotate(90)")
  ;

  datagroups.attr("transform", getGroupTranslation);

}

d3.json("buildings.json").then(gotData);
