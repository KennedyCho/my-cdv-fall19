// 1. find *real* data (array containing JS objects) in JSON format

// 2. load data (make it *console.loggable* (what a word!) in our script)

function randomNumber(whateverd3Passes, i) {
  // see what d3 is passing through this function
  // console.log(whateverd3Passes.location.length);
  // shows the position (index) of the datapoint in the array
  // console.log(i);
  //return Math.random()*500;
  return i * 60;
  // variable can be a data point that is an int
  // return whateverd3Passes.variable;

  return whateverd3Passes.location.length * 25;



}


function getColor(datapoint, i) {
  // map out datapoints

  console.log("ELEMENT: " + i);
  console.log(datapoint.location);
  console.log(datapoint.typeOfSurface);
  console.log(datapoint.withCompany);
  console.log("-----------");


  // now create if statements to change string data to int data 
}

function gotData(incomingData) {
  console.log(incomingData);

  // 4. make on circle for each datapoint (size and position doesn't matter)
  // 5. concept: functions that "return"
  // 6. use function to position circles randomly
  // 7. realize "who" calls this function / why is there no `()`?
  // 8. concept: "passing value into function"
  // 9. let's assume: "D3 passes value into the data function"

  // create svg
  let viz = d3.select("body")
    .append("svg")
      .attr("width", 500)
      .attr("height", 500)
  ;

  // bin data (the enter thing)
  viz.selectAll("circle").data(incomingData)
    .enter()
      .append("circle")
      .attr("cx", randomNumber)
      .attr("cy", 200)
      .attr("r", 20)
      .attr("fill", getColor)
  ;





}



d3.json("data.json").then(gotData);
// 3. concept: data and datapoint
// 10. if D3 passes a value, how can we receive it?
// 11. use *real* information to impact the x position
// 12. let's assume: "D3 passes another value!"
// 13. how can we receive that value?
// 14. in which ways is D3 making our live easy?
