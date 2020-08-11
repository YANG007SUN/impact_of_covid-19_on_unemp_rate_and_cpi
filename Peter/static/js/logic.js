// Store API endpoint as variable to pass into d3.json
var stateMap = "../../gz_2010_us_040_00_500k.json"

// Perform a get request to query url and pull json data
d3.json(stateMap, function(data) {
    createFeatures(data.features);
});

function createFeatures(states) {
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.name + "</h3");
    }
    var stateBound = L.geoJSON(states, {
        onEachFeature: onEachFeature
    });
    createMap(stateBound);
}


var myMap = L.map("map", {
    center: [
        37.09, -95.71
    ],
    zoom: 5,
    layers: [stateBound]
});

L.control.layers(statBound, {
    collapsed: false
}).addto(myMap);


   