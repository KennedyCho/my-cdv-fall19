// data we work with
let data = [
  {
    "laughs": 0,
    "mood": 0
  },
  {
    "laughs": 3,
    "mood": 6
  },
  {
    "laughs": 4,
    "mood": 3
  },
  {
    "laughs": 8,
    "mood": 9
  }
];


let w = 900;
let h = 500;
let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
    .style("outline", "solid black")
;

function getX(d) {
  return d.laughs*50
}

function getY(d) {
  return d.mood*50
}

// bind data
// append circles
// let theSituation = viz.selectAll("circle").data(data);

// let circles = theSituation.enter().append("circle")
//     // using an anonymous function makes it so that you can
//     // access the individual datapoint and its attributes (ex. laughs, moods)
//     .attr("cx", getX)
//     .attr("cy", getY)
//     .attr("r", 10)
//
// ;


// define lineMaker as a function using the line method
// define the elements of the line method (x and y)
// x and y can use anonymous functions accessing the data array
// but only if the data array is passed through
let lineMaker = d3.line()
                    .x(getX)
                    .y(getY)
;

// pass the data array through the function
let test = lineMaker(data);
console.log(test);

// non dynamic and not really what we're gonna use
// viz.append("path").attr("d", test)
//       .attr("fill", "none")
//       .attr("stroke", "seagreen")
// ;

// bind the viz to one datum (1 data)
let theSituation = viz.datum(data);
theSituation.append("path")
    // all the data is going through lineMaker
    // not by each datapoint but the entire data object
    // this has the line method create one string
    // that details the line properties
    .attr("d", lineMaker)
    .attr("fill", "none")
    .attr("stroke", "seagreen")

;
