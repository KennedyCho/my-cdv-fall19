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
  }else {
    return '#F9CD05'
  }

}


// function getShape(d) {
//   // console.log(d);
//   if (d.withCompany == 'yes') {
//     shape = document.createElement("circle")
//     return shape
//   }else if (d.withCompany == 'no') {
//     shape = document.createElement("rect")
//     return shape
//   }
// }

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
                        .attr("transform", "translate(100, 100)")
  ;

  let shapeGroups = gridGroup.append('g')
                                  .classed('shapeGroup', true)

                                  // .attr("tranlate", "translate(80,0)")
  ;
  var counter = 0;
  function getX(d, i) {
    if (counter < 10) {
      counter = counter + 1;
      return counter * 100;
    }else {
      counter = 0;
      console.log(counter);
      return counter * 100;
    }


  }

  function getY(d, i) {
    if (counter < 6) {
      counter = counter + 1;
      return counter * 100;
    }else {
      counter = 0;
      console.log(counter);
      return counter * 100;
    }
  }

  let circles = shapeGroups.append("circle")
                            .style("fill", getColor)
                            .attr("cx", getX)
                            .attr("cy", getY )
                            .attr("r", 30)

  ;

  // let rectangles = gridGroup.selectAll("rect")
  //                             .style("fill", getColor)
  //                             .attr("x", 200)
  //                             .attr("y", 200)
  //                             .attr("width", 100)
  //                             .attr("height", 100)
  //
  // ;

  let accentGroups = gridGroup.append('g')
                              .classed('accentGroup', true)

  ;


  function getTranslate(d) {
    let x = getX();
    let y = getY();
    let position = "translate(" + x + ', ' + y + ")";
    return position
    // "translate(getX, getY)"
  }

  accentGroups.html(getSVG);
  accentGroups.selectAll("path").attr('transform', getTranslate)
                                  .attr("transform", "scale(1)")


  ;




}

d3.json("data.json").then(gotData);
let svgPhone = '<path d="m 25 25 L 75 75 M 75 25 L 25 75" fill="none" stroke="#000000" stroke-width="1" />'
let svgMirror = '<path d="m 50 10 l 0 30 M 45 10 l 0 30 M 55 10 l 0 30 M 50 60 l 0 30 M 45 60 l 0 30 M 55 60 l 0 30" fill="#ffff00" stroke="#000000" stroke-width="1" />';
let svgWindow = '<path d="m 75 10 L 25 75 M 80 15 L 30 80 M 70 5 L 20 70 m 0 0 m 0 0 m 0 0 m 0 0" fill="#ffff00" stroke="#000000" stroke-width="1" />';
let svgLaptop = '<path d="m 10 50 L 30 50 m 40 0 l 20 0 m -10 -10 l -60 0 m 0 20 l 60 0 m 0 0 m 0 0" fill="#ffff00" stroke="#000000" stroke-width="1" />';


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
