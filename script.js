// Get the API keys
const iQAirApiKey = 'b1645b13-fa2f-4d0c-8fa9-b98cbc41d7f1';
const bingMapsApiKey = 'Ar-x_oaZ5J-md-Wra2_LJEG3NJt2uG0-HyqDMad50QptHo52WOTGIJYrnl83_nZw';

// Create the map
var map = new Microsoft.Maps.Map(document.getElementById('map'), {
  credentials: bingMapsApiKey
});

// Create a layer to display the AQI data
var aqiLayer = new Microsoft.Maps.Layer();
map.layers.insert(aqiLayer);

// Function to get the AQI data from IQAir API
function getAQIData(location) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.iqair.com/v2/latest?city=${location}&key=${iQAirApiKey}`, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      var aqiValue = data.results[0].measurements[0].value;
      var aqiCategory = getAQICategory(aqiValue);

      // Add a pushpin to the map with the AQI data
      var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(data.results[0].coordinates.latitude, data.results[0].coordinates.longitude), {
        title: `AQI: ${aqiValue}`,
        description: `AQI Category: ${aqiCategory}`
      });
      aqiLayer.pushpins.push(pushpin);
    }
  };
  xhr.send();
}

// Function to get the AQI category
function getAQICategory(aqiValue) {
  if (aqiValue < 50) {
    return 'Good';
  } else if (aqiValue < 100) {
    return 'Moderate';
  } else if (aqiValue < 150) {
    return 'Unhealthy for sensitive groups';
  } else if (aqiValue < 200) {
    return 'Unhealthy';
  } else if (aqiValue < 300) {
    return 'Very unhealthy';
  } else {
    return 'Hazardous';
  }
}

// Add an event listener to the submit button
document.getElementById('submit').addEventListener('click', function() {
  var location = document.getElementById('location').value.trim();
  getAQIData(location);
});
