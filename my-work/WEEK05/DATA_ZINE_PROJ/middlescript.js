let w = 2400;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "white")
;


function gotData(incomingData, i){
  console.log(incomingData);


// link elements to data
// creates empty place holders
  // let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
  //   .append("g")
  //   // same as .attr("class", "name")
  //     .classed("datagroup", true)
  // ;

  // filter data to only have entries with no company
  function mirrorFilter(d) {

    if(d.typeOfSurface == 'mirror'){
      return true;
    }else {
      return false;
    }

  }
  let mirrorData = incomingData.filter(noCompFilter);
  console.log(filteredData);

  let mirrorDataGroup = viz.selectAll(".mirrorDataGroup").data(mirrorData).enter()
    .append('g')
      .classed('mirrorDataGroup', true)
  ;


  // // timestamp (hour value) is being exported wrong from google sheet - json file
  // let timestampToHour = d3.timeFormat("%Y");
  // // d3.timeFormat("%I %p");
  //
  // // test
  // let test = timestampToHour(incomingData[5].location);
  // console.log(test);
  // console.log(typeof(test));



}

d3.json("data.json").then(gotData);
