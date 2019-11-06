let datafile = "HISTHPI.csv";

let w = 1200;
let h = 800;

let viz = d3.select("#container")
  .append('svg')
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "pink")
;


function gotData(data) {
  console.log(data);


  let xDomain = d3.extent(data, function(datapoint){
    var parseTime = d3.timeParse("%Y-%m-%d");
    // console.log(parseTime(datapoint.DATE));
    return parseTime(datapoint.DATE)


  });


  let yDomain = d3.extent(data, function(datapoint){
    var y = parseFloat(datapoint.HISTHPI);
    return y

  });
  console.log(xDomain);
  console.log(yDomain);

  var xPadding = 50;

  let xScale = d3.scaleTime().domain(xDomain).range([xPadding,w - xPadding]);
  // create axis for this scale
  let xAxis = d3.axisBottom(xScale);
  // create a groyp to gold the axis elements
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  // tell d3 to fill the group with the axis elements
  xAxisGroup.call(xAxis);
  // position the axis at the bottom of the svg
  xAxisGroup.attr("transform", "translate(0, "+ (h-xPadding) +")");


  let yScale = d3.scaleLinear().domain(yDomain).range([h-xPadding, xPadding]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  yAxisGroup.call(yAxis);
  yAxisGroup.attr("transform", "translate("+xPadding+",0)");

  let vizgroup = viz.append("g").attr("class", "vizgroup");

  createViz();


  function createViz() {
    let datagroups = vizgroup.selectAll(".datagroup").data(data, function(d){
  // we return the value that should act as the datapoints key
    return d.DATE;
    });

    let incomingDataGroups = datagroups.enter()
      .append("g")
      .attr("class", "datagroup")
    ;

    // incomingDataGroups.append("circle")
    //     .attr("r", 5)
    //     .attr("fill", "white")
    // ;

    // incomingDataGroups.attr("transform", function(d, i){

    //   var parseTime = d3.timeParse("%Y-%m-%d");
    //   return "translate("+ xScale(parseTime(d.DATE)) + ", " + yScale(d.HISTHPI) + ")"
    // });



    function getX(d) {
      var parseTime = d3.timeParse("%Y-%m-%d");
      // console.log(parseTime(datapoint.DATE));
      // parseTime(d.DATE)
      console.log(xScale(parseTime(d.DATE)));
      return xScale(parseTime(d.DATE))
    }
    function getY(d) {

      var y = parseFloat(d.HISTHPI);
      console.log(y);
      return y
    }

    let lineMaker = d3.line()
                        .x(getX)
                        .y(getY)
    ;

    let theSituation = viz.datum(data);
    theSituation.append("path")
        .attr("d", lineMaker)
        .attr("fill", "none")
        .attr("stroke", "seagreen")
    ;


  }

}



d3.csv(datafile).then(gotData);
