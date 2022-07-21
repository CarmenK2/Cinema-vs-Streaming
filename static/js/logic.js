// Create a map object
//var myMap = L.map("map", {
    //center: [-25.27, 133.77],
    //zoom: 5
  //});
  
  // Add a tile layer
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  })
  
  // Initialize all of the LayerGroups we'll be using
var layers = {
    OPEN_2022: new L.LayerGroup(),
    CLOSED_2022: new L.LayerGroup(),
    DRIVE_IN_1948: new L.LayerGroup(),
    DRIVE_IN_OPEN_AIR_1948: new L.LayerGroup(),
    INDOOR_OPEN_AIR_1948: new L.LayerGroup(),
    INDOOR_1948: new L.LayerGroup(),
    OPEN_AIR_1948: new L.LayerGroup(),
    TOURING_CIRCUIT_1948: new L.LayerGroup()
  };
  
  // Create the map with our layers
  var map = L.map("map", {
    center: [-25.27, 133.77],
    zoom: 5,
    layers: [
      layers.OPEN_2022,
      layers.CLOSED_2022,
      layers.DRIVE_IN_1948,
      layers.DRIVE_IN_OPEN_AIR_1948,
      layers.INDOOR_OPEN_AIR_1948,
      layers.INDOOR_1948,
      layers.OPEN_AIR_1948,
      layers.TOURING_CIRCUIT_1948
    ]
  });
  
  // Add our 'lightmap' tile layer to the map
  lightmap.addTo(map);
  
  // Create an overlays object to add to the layer control
  var overlays = {
    "Cinema Open 2022": layers.OPEN_2022,
    "Cinema Closed 2022": layers.CLOSED_2022,
    "Drive-In Cinema 1948-1971": layers.DRIVE_IN_1948,
    "Drive-In/Open Air Cinema 1948-1971": layers.DRIVE_IN_OPEN_AIR_1948,
    "Indoor Open Air Cinema 1948-1971": layers.INDOOR_OPEN_AIR_1948,
    "Indoor Cinema 1948-1971": layers.INDOOR_1948,
    "Open Air Cinema 1948-1971": layers.OPEN_AIR_1948,
    "Touring Circuit Cinema 1948-1971": layers.TOURING_CIRCUIT_1948
  };
  
  // Create a control for our layers, add our overlay layers to it
  L.control.layers(null, overlays).addTo(map);
  
  // Create a legend to display information about our map
  var info = L.control({
    position: "topright"
  });
  
  // When the layer control is added, insert a div with the class of "legend"
  info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };
  // Add the info legend to the map
  info.addTo(map);
  
  // Initialize an object containing icons for each layer group
  var icons = {
    OPEN_2022: L.ExtraMarkers.icon({
      icon: "ion-android-aperture",
      iconColor: "white",
      markerColor: "green",
      shape: "circle"
    }),
    CLOSED_2022: L.ExtraMarkers.icon({
      icon: "ion-android-aperture",
      iconColor: "white",
      markerColor: "red",
      shape: "circle"
    }),
    DRIVE_IN_1948: L.ExtraMarkers.icon({
      icon: "ion-android-car",
      iconColor: "white",
      markerColor: "blue-dark",
      shape: "circle"
    }),
    DRIVE_IN_OPEN_AIR_1948: L.ExtraMarkers.icon({
      icon: "ion-android-car",
      iconColor: "white",
      markerColor: "orange",
      shape: "circle"
    }),
    INDOOR_OPEN_AIR_1948: L.ExtraMarkers.icon({
      icon: "ion-android-film",
      iconColor: "white",
      markerColor: "blue-light",
      shape: "circle"
    }),
    INDOOR_1948: L.ExtraMarkers.icon({
        icon: "ion-android-film",
        iconColor: "white",
        markerColor: "orange",
        shape: "circle"
    }),
    OPEN_AIR_1948: L.ExtraMarkers.icon({
        icon: "ion-android-videocam",
        iconColor: "white",
        markerColor: "purple",
        shape: "circle"
    }),
    TOURING_CIRCUIT_1948: L.ExtraMarkers.icon({
        icon: "ion-android-videocam",
        iconColor: "white",
        markerColor: "green-light",
        shape: "circle"
    })
  };
  
  // Perform an API call to the Citi Bike Station Information endpoint
  d3.json("static/data/cinema1948.json").then(function(fourtyEight) {
  
    // When the first API call is complete, perform another call to the Citi Bike Station Status endpoint
    d3.json("static/data/cinema2022.json").then(function(twentyTwo) {
      //var updatedAt = infoRes.last_updated;
      var cinemaStatus = fourtyEight._id;
      var cinemaInfo = twentyTwo._id;
  
      // Create an object to keep of the number of markers in each layer
      var cinemaCount = {
        OPEN_2022: 0,
        CLOSED_2022: 0,
        DRIVE_IN_1948: 0,
        DRIVE_IN_OPEN_AIR_1948: 0,
        INDOOR_OPEN_AIR_1948: 0,
        INDOOR_1948: 0,
        OPEN_AIR_1948: 0,
        TOURING_CIRCUIT_1948: 0
      };
  
      // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
      var cinemaStatusCode;
  
      // Loop through the stations (they're the same size and have partially matching data)
      for (var i = 0; i < cinemaInfo.length; i++) {
  
        // Create a new station object with properties of both station objects
        var cinema = Object.assign({}, cinemaInfo[i], cinemaStatus[i]);
        // If a station is listed but not installed, it's coming soon
        if (!cinema.cinema_type) {
          cinemaStatusCode = "OPEN_2022";
        }
        // If a station has no bikes available, it's empty
        else if (!cinema.cinema_type) {
          cinemaStatusCode = "CLOSED_2022";
        }
        // If a station is installed but isn't renting, it's out of order
        else if (cinema.cinema_type) {
          cinemaStatusCode = "DRIVE_IN_1948";
        }
        // If a station has less than 5 bikes, it's status is low
        else if (cinema.cinema_type) {
          cinemaStatusCode = "DRIVE_IN_OPEN_AIR_1948";
        }
        // If a station has less than 5 bikes, it's status is low
        else if (cinema.cinema_type) {
            cinemaStatusCode = "INDOOR_OPEN_AIR_1948";
        }
        // If a station has less than 5 bikes, it's status is low
        else if (cinema.cinema_type) {
            cinemaStatusCode = "INDOOR_1948";
        }
        // If a station has less than 5 bikes, it's status is low
        else if (cinema.cinema_type) {
            cinemaStatusCode = "OPEN_AIR_1948";
        }
        // Otherwise the station is normal
        else {
          cinemaStatusCode = "TOURING_CIRCUIT_1948";
        }
  
        // Update the station count
        cinemaCount[cinemaStatusCode]++;
        // Create a new marker with the appropriate icon and coordinates
        var newMarker = L.marker([cinema.latitude, cinema.longitude], {
          icon: icons[cinemaStatusCode]
        });
  
        // Add the new marker to the appropriate layer
        newMarker.addTo(layers[cinemaStatusCode]);
  
        // Bind a popup to the marker that will  display on click. This will be rendered as HTML
        newMarker.bindPopup(cinema.cinema_name + "<br> Street: " + cinema.street + "<br> Suburb:" + cinema.suburb);
      }
  
      // Call the updateLegend function, which will... update the legend!
      updateLegend(cinemaCount);
    });
  });
  
  // Update the legend's innerHTML with the last updated time and station count
  function updateLegend(cinemaCount) {
    document.querySelector(".legend").innerHTML = [
      //"<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
      "<p class='open-2022'>Cinema Open 2022: " + cinemaCount.OPEN_2022 + "</p>",
      "<p class='closed-2022'>Cinema Closed 2022: " + cinemaCount.CLOSED_2022 + "</p>",
      "<p class='drive-in-1948'>Drive-In Cinema 1948-1971: " + cinemaCount.DRIVE_IN_1948 + "</p>",
      "<p class='drive-in-open-air-1948'>Drive-In/Open Air Cinema 1948-1971: " + cinemaCount.DRIVE_IN_OPEN_AIR_1948 + "</p>",
      "<p class='indoor-open-air-1948'>Indoor Open Air Cinema 1948-1971: " + cinemaCount.INDOOR_OPEN_AIR_1948 + "</p>",
      "<p class='indoor-1948'>Indoor Cinema 1948-1971: " + cinemaCount.INDOOR_1948 + "</p>",
      "<p class='open-air-1948'>Open Air Cinema 1948-1971: " + cinemaCount.OPEN_AIR_1948 + "</p>",
      "<p class='touring-circuit-1948'>Touring Circuit Cinema 1948-1971: " + cinemaCount.TOURING_CIRCUIT_1948 + "</p>"
    ].join("");
  }
  