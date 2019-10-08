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

// link elements to data
// creates empty place holders
  let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
    .append("g")
    // same as .attr("class", "name")
      .classed("datagroup", true)
  ;
  // timestamp (hour value) is being exported wrong from google sheet - json file
  let timestampToHour = d3.timeFormat("%I %p");

  // test
  let test = timestampToHour(incomingData[0].timestamp);
  console.log(test);
  console.log(typeof(test));

  }

}

d3.json("data.json").then(gotData);
