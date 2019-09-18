
// document.getElementbyId("viz-container")
// this is pretty much the same
// selects <div id="viz-container"></div>

// save selection by putting it into a variable
let viz = d3.select("#viz-container")
                  .append('svg')
                  // changes the attributes
                  // attr(a, b)
                  // a is the attributes
                  // b is the value
                    .attr('id', "viz")
                    .attr('width',800)
                    .attr('height',800)

;


// .append('svg') adds the element svg


// viz.attr('height', 500);
//
// let myCircle = viz.append("circle")
//             .attr('cx', 200)
//             .attr('cy', 200)
//             .attr("r", 100)
//
// ;
//
// myCircle.attr("fill", "white");
// myCircle.attr("stroke", "red");
//
//
// let myRect = viz.append("rect")
//             .attr("x", 400)
//             .attr("y", 40)
//             .attr("width", 300)
//             .attr("height", 400)
//             //.attr("fill", 24)
//
//
// ;

let myData = [3, 6, 8, 1, 5];


// 
viz.selectAll("Circle").data(myData).enter().append('circle')
                                            .attr('cx', 120)
                                            .attr('cy', 400)
                                            .attr('r', 20)

;
