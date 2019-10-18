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
  let xPadding = 200;
  let yPadding = 100;

  let dataGroup = viz.selectAll(".datagroup").data(incomingData).enter()
    .append("g")
      .classed("datagroup", true)

  ;


  let mediums = ["Mirror","Phone","Laptop","Window"];
  let titles = viz.append("g").classed('titles', true);
  titles.selectAll('.medium').data(mediums).enter().append("text")
                      .text(function (d) {
                        return d
                      })
                      .attr('x', 80)
                      .attr('y', function (d,i) {
                        return i * 150 + 150
                      })
                      .attr('fill', 'black')
                      .attr('font-family', 'sans-serif')
  ;


  let xScale = d3.scaleLinear().domain([6,24]).range([xPadding, w-xPadding]);
  let xAxis = d3.axisBottom(xScale);

  let xAxisGroup = viz.append('g').attr('class', 'xaxis');
  xAxisGroup.call(xAxis);

  let xAxisPos = h - 30;
  xAxisGroup.attr('transform', 'translate(0, '+ xAxisPos +')');

  // let yScale = d3.scaleLinear().domain([0,4]).range([h - 30, 140]);
  // let yAxis = d3.axisLeft(yScale);
  //
  // let yAxisGroup = viz.append('g').attr('class', 'yaxis')
  //                                 .attr('transform', 'translate('+ xPadding+ ',0)')
  // ;
  //
  // yAxisGroup.call(yAxis);

  function getColor(d) {
    if (d.typeOfSurface == 'mirror') {
      console.log('color');
      return '#D3F8E2'
    }else if (d.typeOfSurface == 'phone mirror') {
      return '#E4C1F9'
    }else if (d.typeOfSurface == 'laptop screen') {
      return '#F694C1'
    }else if (d.typeOfSurface == 'window') {
      return '#EDE7B1'
    }
  }
  let ySpacing = [150,300,450,600];

  let circles = dataGroup.append("circle")
                            .attr('cx', function (d, i) {
                                let hour = new Date(d.timestamp);
                                let finalHour = hour.getHours();
                                console.log(hour.getHours());
                                return finalHour * 120 - 500
                            })
                            .attr('cy', function (d) {
                              if (d.typeOfSurface == 'mirror') {
                                return 150
                              }else if (d.typeOfSurface =='phone mirror') {
                                return 300
                              }else if (d.typeOfSurface =='window') {
                                return 450
                              }else if (d.typeOfSurface =='laptop screen') {
                                return 600
                              }

                            })
                            .attr('r', 30)

                            .attr('fill-opacity', 0.3)
                            .attr('fill', getColor)
  ;

  //       .attr("transform",
              // "translate(" + margin.left + "," + margin.top + ")")

  // x-axis is hours within day
  // y-axis is freq of use
  // freq calc avg use
  // line color denotes medium


  // returns china standard time in string format
  let localTime = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");


  let a = new Date(incomingData[1].timestamp);
  console.log(a.getHours());




  // console.log(domainArray);



}

d3.json("data.json").then(gotData);
