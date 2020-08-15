var testState = "Nevada"

//Create function to build plot
function buildPlot() {
  d3.json("election_parsed_data.json").then(function(electData) {
    

  // Print the tvData
    console.log(electData);
    
  

  // Cast the hours value to a number for each piece of election Data
    electData.forEach(function(data) {
    
      var State = data.State;
      var PV_Dem = +data.PV_Dem;
      var PV_Rep = +data.PV_Rep;
      var PV_Other = +data.PV_Other;
      var PV_total = +data.PV_Total;
      console.log(State);

      if (State === testState) {
        console.log("State:", State);
        console.log("Pop Vote Dems:", PV_Dem);
        console.log("Popular Vote Reps:", PV_Rep);
        console.log("Pop Vote Other:", PV_Other);
        console.log("Total Votes:", PV_total);
        var electionResults = [PV_Dem, PV_Rep, PV_Other];
        var electionLabels = ["Pop Vote Dems", "Pop Vote Reps", "Pop Vote Others"];
        var resultColors = ["blue", "red", "gray"];
        console.log(electionResults);
        console.log(electionLabels);
        console.log(resultColors);

        // Create chart
        var data = [{
          values: electionResults,
          labels: electionLabels,
          type: 'pie',
          name: 'State',
          marker: {
            colors: resultColors
          },
          domain: {
            row: 0,
            column: 0
          },
          hoverinfo: 'label+percent+name',
          textinfo: 'none'
          }];
        
        var layout = {
          height: 1000,
          width: 1500,
          };
        
        Plotly.newPlot('plot', data, layout);
        
      };
    }); 
  });
      
}


  
buildPlot();
