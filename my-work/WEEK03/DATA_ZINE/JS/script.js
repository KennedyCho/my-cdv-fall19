let w = 600;
let h = 600

// x position of circle
function getX(datapoint, i) {
  if (datapoint.timestamp[9] == 1){
    return w/7;
  }else if (datapoint.timestamp[9] == 2) {
    return w/7 * 2;
  }else if (datapoint.timestamp[9] == 3) {
    return w/7 * 3;
  }else if (datapoint.timestamp[9] == 4) {
    return w/7 * 4;
  }else if (datapoint.timestamp[9] == 5) {
    return w/7 * 5;
  }else if (datapoint.timestamp[9] == 6) {
    return w/7 * 6;
  }else if (datapoint.timestamp[9] == 7) {
    return w - w/50;
  }

}

// y position of circle = with company
function getY(datapoint, i) {
  if (datapoint.withCompany == "Yes"){
    return w/2 ;

  }else {
    return (h/2) ;
  }


}


function getSurface(datapoint, i) {
  if (datapoint.typeOfSurface == 'mirror'){
    return 'red';
  }else if (datapoint.typeOfSurface == 'window') {
    return 'blue';
  }else if (datapoint.typeOfSurface == 'phone mirror') {
    return 'green';
  }else if (datapoint.typeOfSurface == 'laptop screen') {
    return 'yellow';
  }else if (datapoint.typeOfSurface == 'glass case') {
    return 'purple';
  }
}

// console.log(data);
function getData(datapoint, i){
  console.log("ELEMENT: " + i);
  console.log(datapoint.location);
  console.log(datapoint.typeOfSurface);
  console.log(datapoint.withCompany);
  console.log("-----------");

}

function gotData(incomingData, i) {
  let viz = d3.select("body")
    .append("svg")
      .attr("width", w)
      .attr("height", h)

  ;

  viz.selectAll("circle").data(incomingData)
    .enter()
      .append("circle")
      .attr("cx", getX)
      .attr("cy", getY)
      .attr("r", w/50)
      .attr("fill", getSurface)
  ;
}

d3.json("data.json").then(gotData);
