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
  var parseDate = d3.timeFormat('%H');

  // let date = parseDate(new Date(incomingData[0].timestamp));
  // console.log(parseInt(date.substring(11,13)));
  let xPadding = 50;

  let alternativeXDomain = d3.extent(incomingData, function(d){
    console.log(parseDate(d.timestamp));
    return parseDate(d.timestamp);
  })


  console.log(parseDate);
  let xScale = d3.scaleTime().domain(alternativeXDomain).range([xPadding, w-(xPadding*2)]);
  var xAxis = d3.axisBottom(xScale)
                  .tickFormat(customTimeFormat);
  ;

  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  xAxisGroup.call(xAxis);

  let xAxisYPos = h - 30;
  xAxisGroup.attr("transform", "translate(0,"+xAxisYPos+")");
}

d3.json("data.json").then(gotData);
