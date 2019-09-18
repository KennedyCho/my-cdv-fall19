let data = [
    {
        "timestamp": "2019-09-10T09:52:40.914Z",
        "green": 5,
        "orange": 7,
        "purple": 4,
        "red": 8,
        "blue": 5
    },
    {
        "timestamp": "2019-09-10T09:53:16.856Z",
        "green": 7,
        "orange": 4,
        "purple": 2,
        "red": 8,
        "blue": 2
    },
    {
        "timestamp": "2019-09-10T09:53:41.524Z",
        "green": 7,
        "orange": 4,
        "purple": 4,
        "red": 1,
        "blue": 1
    },
    {
        "timestamp": "2019-09-10T09:55:27.263Z",
        "green": 2,
        "orange": 1,
        "purple": 1,
        "red": 0,
        "blue": 0
    },
    {
        "timestamp": "2019-09-10T09:55:59.255Z",
        "green": 7,
        "orange": 7,
        "purple": 2,
        "red": 9,
        "blue": 5
    },
    {
        "timestamp": "2019-09-10T10:08:13.090Z",
        "green": 7,
        "orange": 4,
        "purple": 1,
        "red": 8,
        "blue": 2
    },
    {
        "timestamp": "2019-09-10T10:09:43.171Z",
        "green": 7,
        "orange": 4,
        "purple": 4,
        "red": 9,
        "blue": 5
    },
    {
        "timestamp": "2019-09-10T10:12:28.094Z",
        2: "Lime",
        "orange": "Peach",
        "purple": 4,
        "red": "Cherry",
        "blue": 5
    },
    {
        "timestamp": "2019-09-10T10:14:37.799Z",
        "green": 7,
        "orange": 4,
        "purple": 4,
        "red": 8,
        "blue": 1
    },
    {
        "timestamp": "2019-09-10T10:18:03.035Z",
        "green": 7,
        "orange": 4,
        "purple": 4,
        "red": 9,
        "blue": 2
    },
    {
        "timestamp": "2019-09-10T10:30:26.866Z",
        "green": 7,
        "orange": 4,
        "purple": 4,
        "red": 8,
        "blue": 5
    },
    {
        "timestamp": "2019-09-10T10:46:35.175Z",
        "green": 7,
        "orange": 4,
        "purple": 1,
        "red": 8,
        "blue": 2
    },
    {
        "timestamp": "2019-09-10T11:00:34.735Z",
        "green": "Lime",
        "orange": 4,
        "purple": 2,
        "red": 4,
        "blue": 2
    },
    {
        "timestamp": "2019-09-10T11:38:03.425Z",
        "green": "Lime",
        "orange": 4,
        "purple": 4,
        "red": 1,
        "blue": 1
    },
    {
        "timestamp": "2019-09-10T11:40:35.501Z",
        "green": 7,
        "orange": 4,
        "purple": 2,
        "red": 9,
        "blue": 5
    },
    {
        "timestamp": "2019-09-10T12:42:20.126Z",
        "green": 7,
        "orange": 2,
        "purple": 2,
        "red": 8,
        "blue": 5
    }
]

// the function dates a data
// arrayn as an argument
function averageData(data){
  // new empty array to be filled
  // with data in new structure
  let newData = [];
  // assuming each data point has the same
  // keys/categories, we extract an array of them from the
  // first data point in the array
  let keys = Object.keys(data[data.length - 1]);
  // now we loop over the keys/categories
  for(let i = 0; i < keys.length; i++){
    // store the current key/category in
    // a variable:
    let key = keys[i];
    // now we will loop over each data point
    // in the data set, check if it has a value
    // for the key/category and add them to
    // a total sum variable
    // as well as count the occurences in order to
    // calulate the averae in the end
    let sum = 0;
    let num = 0;
    for(let j = 0; j < data.length; j++){
      let datum = data[j];
      // check if the key exists
      // for this datapoint
      if(key in datum){
        // add to sum
        sum += datum[key];
        // increase count
        num++;
      }
    }
    // now calculate the average
    let avg = sum/num;
    // make sure the value is a number
    // (some value might be strings)
    if(!isNaN(avg)){
      // create an object with both the average
      // and also the number of measurements that
      // went into the average
      let newDataPoint = {"name": key, "average": avg, 'numMeasurements': num};
      // add the new datapoint to the new data array
      newData.push(newDataPoint);
    }
  }
  // return everything when it is done
  return newData;
}


let transformedData = averageData(data);

console.log(transformedData);


// loop over transformedData

for(let i=0; i < transformedData.length; i++){

  let datapoint = transformedData[i];
  //console.log('i right now is ' + i);

  //datapoint is a dictionary NOT array
  let food = datapoint.name;

  let average = datapoint.average;

  //console.log(datapoint);
  //console.log(food);
  //console.log(average);

  //create & modify style of div

  let bar = document.createElement("div");

  let barname = document.createElement("p");
  barname.innerHTML = food;
  // bar = bar graph
  bar.className = "bar";
  bar.style.width = (average * 100) + 'px';
  //append div to the page

  //adds food name to the bar
  bar.appendChild(barname);
  document.body.appendChild(bar);
}
