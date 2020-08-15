var testState = "California"
var testDate = "2020-4"
// create unpacking function
function unpack(rows, index) {
  return rows.map(function (row) {
    return row[index];
  });
}

//Create function to build plot

d3.json("mapdata2.json").then(function(covidData) {
  //console.log(covidData.features);
  var covidFeatures = covidData.features;
  //console.log(covidFeatures);
  covidFeatures.forEach(function(data) {
    var names = data.properties.name;
    var totalCases = data.properties.total_cases;
    var totalDeaths = data.properties.total_deaths;
    var unempt = data.properties.unempt_rate;
    var date = data.properties.date;
    // console.log(names);
    // console.log(totalCases);
    // console.log(totalDeaths);
    // console.log(unempt);
    // console.log(date);

    if (names === testState)  {
      var stateDates = date;
      var stateDeaths = totalDeaths;
      console.log(stateDates);
      stateDates.forEach(function(d, i){
        if (d === testDate){
          console.log(d);          
          var covidIndex = i;
          console.log(covidIndex);       
        }
      
      console.log(stateDeaths[covidIndex]);      
      })
      
    
   
    }
 
  })


});

 

