
let w = 1200;
let h = 800;

// create svg with size
let viz = d3.select('#container')
  .append('svg')
    .attr('width', w)
    .attr('height', h)
    .style('background-color', 'lavender')
;

// console log data to view it
function gotData(incomingData) {
  console.log(incomingData);
  // filter method
  function filterFunction(d) {

    if(d.Code == 'CHN'){
      return true;
    }else {
      return false;
    }

  }

  let filteredData = incomingData.filter(filterFunction);
  console.log(filteredData);

  // change to js date object to know we talking about time
  let yearToDateObjectConverter = d3.timeParse("%Y");

  // test
  let test = yearToDateObjectConverter("2001");
  console.log(test);
  console.log(typeof(test));

  // // find the minimum and maximum year
  // function findMinMaxFunction(d) {
  //     let year = d.Year;
  //     let properlyFormattedYear = yearToDateObjectConverter(year);
  //     return properlyFormattedYear;
  // }
  // let minYear = d3.min(filteredData, findMinMaxFunction);
  // console.log(minYear);
  //
  // let maxYear = d3.max(filteredData, findMinMaxFunction);
  // console.log(maxYear);
  //
  // let domainArray = [minYear, maxYear];

  // // finds min and max (quicker)
  // let alternativeDomainArray = d3.extent(filteredData, findMinMaxFunction);
  // // console.log(domainArray);
  // console.log(alternativeDomainArray);


  // alternative formatting of alt domain array
  let alternativeDomainArray = d3.extent(filteredData, function (d) {
    return yearToDateObjectConverter(d.Year);

  })
  console.log(alternativeDomainArray);

  // what is the time being mapped to? the width b/c it is the x axis
  let xPadding = 50;
  let xScale = d3.scaleTime().domain(alternativeDomainArray).range([xPadding,w - xPadding])
  // returns pixel value ???? what idk
  console.log(xScale(yearToDateObjectConverter("2007")));

  // axisBottom refers to the text being below the line not above
  let xAxis = d3.axisBottom(xScale);
  // "xaxis" is string used to name the class of the group element
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  xAxisGroup.call(xAxis);

  let xAxisYPos = h - 30;
  xAxisGroup.attr("transform", "translate(0, "+ xAxisYPos +")");


  // if key has spaces must get it by formating this way
  let valueKey = "Incidence - HIV/AIDS - Sex: Both - Age: All Ages (Number) (new cases of HIV)";
  let yScale = d3.scaleLinear()
                    .domain(d3
                      .extent(filteredData, function(d) {
                        return d[valueKey]}))
                        // determines how much and how the numbers are shown on the y axis
                        .range([xAxisYPos , 30])
  ;

  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append('g').attr('class', 'yaxis');
  yAxisGroup.call(yAxis);
  // moves the y axis to the right
  yAxisGroup.attr('transform', 'translate('+ xPadding +',0)');

}




// function printIndexAndValue(d){
//   console.log(d);
//
// }
// // For each method
// incomingData.forEach(function (d,i) {
//   console.log("current: ", i);
//   console.log(d);
//
// })
//
// // map method
// function newDataPointBasedOnOldDataPoint(d){
//   let entity = d.Entity;
//   let year = d.Year;
//   return{firstValue: entity, secondValue: year}
// }
//
//
// // map iterates over array of data
// // calls function within argument
// let newArray = incomingData.map(newDataPointBasedOnOldDataPoint);






// load the csv file (data)
d3.csv('new-cases-of-hiv-infection.csv').then(gotData);
