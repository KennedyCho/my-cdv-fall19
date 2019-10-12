let w = 1200;
let h = 800;


let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "white")
;

function getColor(datapoint) {
  // console.log(datapoint);
  if (datapoint.location == 'home') {
    return '#D3F8E2'
  }else if (datapoint.location == 'bathroom') {
    return '#E4C1F9'
  }else if (datapoint.location == 'cafe') {
    return '#F694C1'
  }else if (datapoint.location == 'subway') {
    return '#EDE7B1'
  }else if (datapoint.location == 'restaurant') {
    return '#A9DEF9'
  }else if (datapoint.location == 'library') {
    return '#FDB70E'
  }

}


function getShape(d) {
  // console.log(d);
  if (d.withCompany == 'yes') {
    shape = document.createElement("circle")
    return shape
  }else if (d.withCompany == 'no') {
    shape = document.createElement("rect")
    return shape
  }
}
function gotData(incomingData){
  console.log(incomingData);
  // top group - holds all sub groups
  let gridGroup = viz.selectAll('.gridGroup').data(incomingData).enter()
                      .append('g')
                        .classed('gridGroup', true)
  ;

  let shapeGroups = gridGroup.append('g')
                                  .classed('shapeGroup', true)
                                  // .attr("tranlate", "translate(80,0)")
                                    .append(getShape)
  ;

  let circles = gridGroup.selectAll("circle")
                            .attr("cx", 200)
                            .attr("cy", 200 )
                            .attr("r", 300)
                            .style("fill", getColor)
  ;

  let rectangles = gridGroup.selectAll("rect")
                              .style("fill", getColor)
                              .attr("x", 200)
                              .attr("y", 200)
                              .attr("width", 100)
                              .attr("height", 100)
                              .style("fill", getColor)
;

let accentGroups = gridGroup.append('g')
                            .classed('accentGroup', true)
                              .append()
;













}

d3.json("data.json").then(gotData);


let svgPhone = '<g id="Layer_1"><path class="st0" d="M100,200"/><path class="st0" d="M85.5,198c25.1-24,24.1-65.3,0-87.2C61.4,89,21.8,93.3,2,122"/><path class="st0" d="M105,1"/><path class="st0" d="M113.5,2c-25.1,24-24.1,65.3,0,87.2C137.6,111,177.2,106.7,197,78"/></g><g id="Layer_2"></g>';
let svgMirror = '<g id="Layer_3"><line class="st2" x1="35" y1="196" x2="190" y2="36"/><line class="st2" x1="6" y1="167" x2="161" y2="7"/></g>';
let svgWindow = '<g id="Layer_4" class="st0"><polyline class="st1" points="111,13 111,95 10,95 	"/><polyline class="st1" points="91,187 91,105 187.5,105 	"/></g>';
let svgLaptop = '<g id="Layer_5" class="st0"><polyline class="st1" points="50,4 100,84 150,4 	"/><polyline class="st1" points="150,196 101,117 50,196 	"/></g>';
