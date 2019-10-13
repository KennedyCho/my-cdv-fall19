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

function getSVG(d) {
  if (d.typeOfSurface == 'mirror') {
    return svgMirror;
  }else if (d.typeOfSurface == 'phone mirror') {
    return svgPhone;
  }else if (d.typeOfSurface == 'window') {
    return svgWindow;
  }else if (d.typeOfSurface == 'laptop screen') {
    return svgLaptop;
  }
}
function gotData(incomingData){
  console.log(incomingData);
  // top group - holds all sub groups
  let gridGroup = viz.selectAll('.gridGroup').data(incomingData).enter()
                      .append('g')
                        .classed('gridGroup', true)
                        .attr("transform", "translate(320, 320)")
  ;

  let shapeGroups = gridGroup.append('g')
                                  .classed('shapeGroup', true)
                                  .attr('width', 100 )
                                  .attr('height', 100)
                                  .attr("transform", "translate(320, 320)")
                                  // .attr("tranlate", "translate(80,0)")

                                    .append(getShape)
  ;

  let circles = gridGroup.selectAll("circle")
                            .style("fill", getColor)
                            .attr("cx", 200)
                            .attr("cy", 200 )
                            .attr("r", 300)

  ;

  let rectangles = gridGroup.selectAll("rect")
                              .style("fill", getColor)
                              .attr("x", 200)
                              .attr("y", 200)
                              .attr("width", 100)
                              .attr("height", 100)

;

  let accentGroups = gridGroup.append('g')
                              .classed('accentGroup', true)
                                .append("path")
                                  .html(getSVG)
                                  .selectAll("path")
                                    .attr("transform", "scale(0.1)")
  ;




}

d3.json("data.json").then(gotData);

let svgPhone = '<g id="Layer_1"><path class="st0" d="M100,200"/><path class="st0" d="M85.5,198c25.1-24,24.1-65.3,0-87.2C61.4,89,21.8,93.3,2,122"/><path class="st0" d="M105,1"/><path class="st0" d="M113.5,2c-25.1,24-24.1,65.3,0,87.2C137.6,111,177.2,106.7,197,78"/></g><g id="Layer_2"></g>';
let svgMirror = '<g id="Layer_3"><line class="st2" x1="35" y1="196" x2="190" y2="36"/><line class="st2" x1="6" y1="167" x2="161" y2="7"/></g>';
let svgWindow = '<g id="Layer_4" class="st0"><polyline class="st1" points="111,13 111,95 10,95 	"/><polyline class="st1" points="91,187 91,105 187.5,105 	"/></g>';
let svgLaptop = '<g id="Layer_5" class="st0"><polyline class="st1" points="50,4 100,84 150,4 	"/><polyline class="st1" points="150,196 101,117 50,196 	"/></g>';


// function publicGridCellPositions() {
//
//                 // We store the top left positions of a 7 by 5 grid. These positions will be our reference points for drawing
//                 // various objects such as the rectangular grids, the text indicating the date etc.
//                 var cellPositions = [];
//                 for (y = 0; y < 5; y++) {
//                     for (x = 0; x < 7; x++) {
//                         cellPositions.push([x * publicCellWidth(), y * publicCellHeight()]);
//                     }
//                 }
//
//                 return cellPositions;
//             }
