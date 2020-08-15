var testState = "Washington"
// Do not actually need test date variable
var testDate = "2020-4"


//Create function to build plot

d3.json("mapdata2.json").then(function(covidData) {
  
  var covidFeatures = covidData.features;
  
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
        type: "scatter",          
          
      };
      
      var trace2= {
        x: stateDates,
        y: stateDeaths,
        name: "Covid Deaths",
        xaxis: 'x2',
        yaxis: 'y2',
        type: "scatter", 
      };
      
      var trace3 = {
        x: stateDates,
        y: stateUnempt,
        name: "Unemployement Rate (%)",
        xaxis: 'x3',
        yaxis: 'y3',
        type: "scatter",
      };
      
      var data = [trace1, trace2, trace3];

      var layout = {
        grid: {
            rows: 3,
            columns: 1,
            pattern: 'independent',
            roworder: 'top to bottom'}
        };
      // Commented out, but can be used if want to use multi y axis on same plot.
      // var layout = {
      //   title: 'Covid Cases, Deaths and Unemployement Rate',
      //   xaxis: {
      //     anchor: 'y1',
      //   },
      //   yaxis: {
      //     title: 'Covid Cases',
      //     titlefont: {color: '#1f77b4'},
      //     tickfont: {color: '#1f77b4'},
      //     anchor: 'x1'         
      //   },
      //   xaxis2: {
      //     anchor: 'y2',
      //   },
      //   yaxis2: {
      //     title: 'Covid Deaths',
      //     titlefont: {color: '#ff7f0e'},
      //     tickfont: {color: '#ff7f0e'},
      //     anchor: 'x2',         
      //   },
      //   xaxis3: {
      //     anchor: 'y3'
      //   },
      //   yaxis3: {
      //     title: 'Unemployement Rate (%)',
      //     titlefont: {color: 'green'},
      //     tickfont: {color: 'green'},
      //     anchor: 'x3',      
      //   }
      // }; 
      

      Plotly.newPlot("plot", data, layout);
      
    }

    
   })
  


});

 

