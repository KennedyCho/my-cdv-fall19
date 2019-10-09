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

  // filter data - typeOfSurface = mirror
  function mirrorFilter(d) {

    if(d.typeOfSurface == 'mirror'){
      return true;

    }else {
      return false;
    }
  }
  let mirrorData = incomingData.filter(mirrorFilter);

  mirrorCircle = viz.append('circle')
                    .attr('cx', w/4)
                    .attr('cy', 300)
                    .attr('r', (mirrorData.length)*5)
                    .attr('fill', '#E4C1F9')

  ;

  // filter data - typeOfSurface = phone mirror
  function phoneFilter(d) {

    if(d.typeOfSurface == 'phone mirror'){
      return true;
    }else {
      return false;
    }
  }
  let phoneData = incomingData.filter(phoneFilter);

  phoneCircle = viz.append('circle')
                    .attr('cx', w/2)
                    .attr('cy', h-h/4)
                    .attr('r', phoneData.length*5)
                    .attr('fill', '#F694C1')

  ;

  // filter data - typeOfSurface = laptop screen
  function laptopFilter(d) {

    if(d.typeOfSurface == 'laptop screen'){
      return true;
    }else {
      return false;
    }
  }
  let laptopData = incomingData.filter(laptopFilter);

  latopCircle = viz.append('circle')
                    .attr('cx', w - w/2)
                    .attr('cy', h/4)
                    .attr('r', laptopData.length*5)
                    .attr('fill', '#EDE7B1')

  ;



  // filter data - typeOfSurface = laptop screen
  function windowFilter(d) {

    if(d.typeOfSurface == 'window'){
      return true;
    }else {
      return false;
    }
  }
  let windowData = incomingData.filter(windowFilter);

  windowCircle = viz.append('circle')
                    .attr('cx', w - w/3)
                    .attr('cy', h/2)
                    .attr('r', windowData.length*5)
                    .attr('fill', '#D3F8E2')
  ;

}

d3.json("data.json").then(gotData);
