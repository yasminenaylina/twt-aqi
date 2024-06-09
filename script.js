function GetMap() {
  var map = new Microsoft.Maps.Map(document.getElementById('map'), {
    credentials: 'Ar-x_oaZ5J-md-Wra2_LJEG3NJt2uG0-HyqDMad50QptHo52WOTGIJYrnl83_nZw'
  });

  // Add a layer to display the AQI data
  var aqiLayer = new Microsoft.Maps.Layer();
  map.layers.insert(aqiLayer);

  // Fetch AQI data from IQAir API
  fetch(`http://api.waqi.info/feed/${location}/?token=${your_api_token}`)
   .then(response => response.json())
   .then(data => {
      // Add a pushpin to the map with the AQI data
      var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(data.results[0].coordinates.latitude, data.results[0].coordinates.longitude), {
        title: `AQI: ${data.results[0].measurements[0].value}`,
        description: `AQI Category: ${getAQICategory(data.results[0].measurements[0].value)}`
      });
      aqiLayer.pushpins.push(pushpin);
    });
}

function getAQICategory(aqiValue) {
  // Implement AQI category logic here
if (aqiValue < 50) {
        return 'Good';
      } else if (aqiValue < 100) {
        return 'Moderate';
      } else {
        return 'Unhealthy';
      }
    }
}
