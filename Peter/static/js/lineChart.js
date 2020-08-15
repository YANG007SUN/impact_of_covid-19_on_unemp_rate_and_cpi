var testState = "Nevada"
// Do not actually need test date variable
var testDate = "2020-4"


//Create function to build plot

d3.json("mapdata2.json").then(function(covidData) {
  //console.log(covidData.features);
  var covidFeatures = covidData.features;
  //console.log(covidFeatures);
  covidFeatures.forEach(function(d) {
    var names = d.properties.name;
    var totalCases = d.properties.total_cases;
    var totalDeaths = d.properties.total_deaths;
    var unempt = d.properties.unempt_rate;
    var date = d.properties.date;
    var stateDates =[];
    var stateCases =[];
    var stateDates = [];
    var stateUnempt = [];
    // console.log(names);
    // console.log(totalCases);
    // console.log(totalDeaths);
    // console.log(unempt);
    // console.log(date);

    if (names === testState)  {
      var stateDates = date;
      var stateCases = totalCases;
      var stateDeaths = totalDeaths;
      var stateUnempt = unempt;
      console.log(stateDates);
      console.log(stateCases);
      console.log(stateDeaths);
      console.log(stateUnempt);
      
      var trace1 = {
        x: stateDates,
        y: stateCases,
        name: "Covid Cases",
        yaxis: 'y1',
        type: "scatter",          
          
      };
      
      var trace2= {
        x: stateDates,
        y: stateDeaths,
        name: "Covid Deaths",
        yaxis: 'y2',
        type: "scatter", 
      };
      
      var trace3 = {
        x: stateDates,
        y: stateUnempt,
        name: "Unemployement Rate (%)",
        yaxis: 'y3',
        type: "scatter",
      };
      
      var data = [trace1, trace2, trace3];

      var layout = {
        title: 'Covid Cases, Deaths and Unemployement Rate',
        autosize: false,
        width: 1500,
        height: 1500,
        xaxis: {
          range: [0,1],
        },       
        yaxis: {
          title: 'Covid Cases',
          titlefont: {color: '#1f77b4'},
          tickfont: {color: '#1f77b4'},
          
          side: 'left',         
        },
        
        yaxis2: {
          title: 'Covid Deaths',
          titlefont: {color: '#ff7f0e'},
          tickfont: {color: '#ff7f0e'},
          anchor: 'x',
          overlay: "y",        
          side: 'right',
          // position: 0.15,        
        },
        
        yaxis3: {
          title: 'Unemployement Rate (%)',
          titlefont: {color: 'green'},
          tickfont: {color: 'green'},
          //anchor: 'x',
          overlay: "n",
          side: 'left',
          position: 0.15
          
        }
      }; 
      

      Plotly.newPlot("plot", data, layout);
      
    }

    
   })
  


});

 

