let w = 1200;
let h = 800;


let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "white")
;

function gotData(incomingData, i){
  console.log(incomingData);



  // filter data - typeOfSurface = mirror,
  function mirrorFilter(d) {

    if(d.typeOfSurface == 'mirror'){
      return true;

    }else {
      return false;
    }
  }
  // filter data - typeOfSurface = phone mirror
  function phoneFilter(d) {

    if(d.typeOfSurface == 'phone mirror'){
      return true;
    }else {
      return false;
    }
  }
  // filter data - typeOfSurface = window
  function windowFilter(d) {

    if(d.typeOfSurface == 'window'){
      return true;
    }else {
      return false;
    }
  }
  // filter data - typeOfSurface = laptop screen
  function laptopFilter(d) {

    if(d.typeOfSurface == 'laptop screen'){
      return true;
    }else {
      return false;
    }
  }

  let windowData = incomingData.filter(windowFilter);
  let mirrorData = incomingData.filter(mirrorFilter);
  let phoneData = incomingData.filter(phoneFilter);
  let laptopData = incomingData.filter(laptopFilter);


  function getXPos(d, i) {

    return Math.floor(Math.random() * (w-100))+100
    if (d.typeOfSurface == 'mirror') {
      return Math.floor(Math.random() * (w-100))+100
    }else if (d.typeOfSurface =='phone mirror') {
      return Math.floor(Math.random() * w/2)+50
    }else if (d.typeOfSurface =='window') {
      // console.log(Math.floor(Math.random() * w) + w/2);
      return Math.floor(Math.random() * (w-50)) + w/2
    }else if (d.typeOfSurface =='laptop screen') {
      return Math.floor(Math.random() * (w-50)) + w/2
    }

  }

  function getYPos(d) {
    if (d.typeOfSurface == 'mirror') {
      return Math.floor(Math.random() * h/4) + 50
    }else if (d.typeOfSurface =='phone mirror') {
      return Math.floor(Math.random() * (h/4)) + 300
    }else if (d.typeOfSurface =='window') {
      // console.log(Math.floor(Math.random() * h) + h/2);
      return Math.floor(Math.random() * (h/4)) + 500
    }else if (d.typeOfSurface =='laptop screen') {
      return Math.floor(Math.random() * (100)) + 650
    }
  }
  function getR(d) {
    if (d.typeOfSurface == 'mirror') {
      return mirrorData.length * 2
    }else if (d.typeOfSurface =='phone mirror') {
      return phoneData.length * 2
    }else if (d.typeOfSurface =='window') {
      return windowData.length * 2
    }else if (d.typeOfSurface =='laptop screen') {
      return laptopData.length *2
    }
  }
  function getColor(d) {
    if (d.typeOfSurface == 'mirror') {
      return '#E4C1F9'
    }else if (d.typeOfSurface =='phone mirror') {
      return '#D3F8E2'
    }else if (d.typeOfSurface =='window') {
      return '#EDE7B1'
    }else if (d.typeOfSurface =='laptop screen') {
      return '#F694C1'
    }
  }

  let circleGroup = viz.selectAll('.circleGroup').data(incomingData).enter()
                        .append("g")
                          .classed("circleGroup", true)
                          .attr("width", 100)
                          .attr("height", 100)
  ;

  circleGroup.append("circle")
                .attr('cx', getXPos)
                .attr('cy', getYPos)
                .attr('r', getR)
                .attr('fill', getColor)
                .attr('fill-opacity', 0.6)
  ;

  circleGroup.append("circle")
                .attr('cx', getXPos)
                .attr('cy', getYPos)
                .attr('r', getR)
                .attr('fill', getColor)
                .attr('fill-opacity', 0.4);


  let key = ["Mirror","Phone","Laptop","Window"]
  let keyGroup = viz.append("g").classed('keyGroup',  true);
  let keySections = keyGroup.selectAll('.keySections').data(key).enter().append("g").classed('keySections',  true);
  var circX = 20;

  let keyCircle = keySections.append("circle")
                                      .attr('cx', function (d, i) {
                                        return circX + i* 100

                                      })
                                      .attr('cy', h-circX)
                                      .attr('r', 10)
                                      .attr('fill', function (d, i) {
                                        let colors = ['#E4C1F9', '#D3F8E2', '#F694C1', '#EDE7B1']
                                        return colors[i]
                                      })
                                      // .attr('fill-opacity', 0.6)
  ;

  let name = keySections.append("text")

                        .text(function (d, i) {
                          return d
                        })
                        .attr('x', function (d, i) {
                          return i * 100 + 40

                        })
                        .attr('y', h-15)
                        .attr('fill', 'black')
                        .attr('font-family', 'sans-serif')
                        ;

}

  // keyGroup.append("text")


d3.json("data.json").then(gotData);
