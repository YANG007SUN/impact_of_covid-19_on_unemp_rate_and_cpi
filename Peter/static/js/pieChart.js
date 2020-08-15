// Create variable "testState".  This will ultimately be equal to event lister state response.
var testState = "Oregon"

//Create function to build plot
function buildPlot() {
  d3.json("election_parsed_data.json").then(function(electData) {
     

  // Print the tvData
    //console.log(electData);
    
    var State = Object.values(electData.State);
    var PV_Dem = Object.values(electData.PV_Dem);
    var PV_Rep = Object.values(electData.PV_Rep);
    var PV_Other = Object.values(electData.PV_Other);
    
    // Grab index equal to "testState" variable that we will use to filter
    var stateIndex = State.indexOf(testState);
    //console.log(stateIndex)
    
  
    
   
    
    var electionResults = [PV_Dem[stateIndex], PV_Rep[stateIndex], PV_Other[stateIndex]];
    var electionLabels = ["Democratic Votes", "Republican Votes", "Other Party Votes"];
    var resultColors = ["blue", "red", "gray"];
     

    // Create chart
    var data = [{
      values: electionResults,
      labels: electionLabels,
      type: 'pie',
      name: testState,
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
     
   

  }); 
};
    




buildPlot();