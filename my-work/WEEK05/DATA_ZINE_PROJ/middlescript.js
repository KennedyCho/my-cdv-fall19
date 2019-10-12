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

  // filter data
  // company = yes medium = mirror
  function mirrorFilter(d) {

    if(d.typeOfSurface == 'mirror'){
      if(d.withCompany == 'yes'){
        return true;
      }

    }else {
      return false;
    }
  }
  let mirrorData = incomingData.filter(mirrorFilter);

  mirrorCircle = viz.append('circle')
                    .attr('cx', 100)
                    .attr('cy', 300)
                    .attr('r', mirrorData.length)
  ;

  // filter data
  // company = no medium = mirror
  function mirrorNoFilter(d) {

    if(d.typeOfSurface == 'mirror'){
      if(d.withCompany == 'no'){
        return true;
      }

    }else {
      return false;
    }
  }
  let mirrorNoData = incomingData.filter(mirrorNoFilter);

  mirrorCircle = viz.append('circle')
                    .attr('cx', 400)
                    .attr('cy', 300)
                    .attr('r', mirrorNoData.length)
  ;
  // filter data
  // company = yes medium = phone
  function phoneFilter(d) {

    if(d.typeOfSurface == 'phone mirror'){
      if(d.withCompany == 'yes'){
        return true;
      }

    }else {
      return false;
    }
  }
  let phoneData = incomingData.filter(phoneFilter);

  phoneCircle = viz.append('circle')
                    .attr('cx', 600)
                    .attr('cy', 300)
                    .attr('r', phoneData.length)
  ;

  function getColor(d) {

  }
// link elements to data
// creates empty place holders
  // let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
  //   .append("g")
  //   // same as .attr("class", "name")
  //     .classed("datagroup", true)
  // ;

  // let mirrorDataGroup = viz.selectAll(".mirrorDataGroup").data(mirrorData).enter()
  //   .append('g')
  //     .classed('mirrorDataGroup', true)
  // ;

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
