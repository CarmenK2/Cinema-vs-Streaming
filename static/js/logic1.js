// Add a tile layer
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
    OPEN_2022: new L.LayerGroup(),
    CLOSED_2022: new L.LayerGroup()

};

// Create the map with our layers
var map = L.map("map", {
    center: [-25.27, 133.77],
    zoom: 5,
    layers: [
      layers.OPEN_2022,
      layers.CLOSED_2022
    ]
});

  
// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
    "Cinema Open 2022": layers.OPEN_2022,
    "Cinema Closed 2022": layers.CLOSED_2022
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
      icon: "ion-android-glyphicon-cog",
      iconColor: "white",
      markerColor: "green",
      shape: "circle"
    }),
    CLOSED_2022: L.ExtraMarkers.icon({
      icon: "ion-android-fa-spinner",
      iconColor: "white",
      markerColor: "red",
      shape: "star"
    })
};

// When the first API call is complete, perform another call mongo db extracting cinema2022 collection
d3.json("/ah_data").then(function(twentyTwo) {

    // Create an object to keep the number of markers in each layer
    var cinemaCount = {
        OPEN_2022: 0,
        CLOSED_2022: 0
    };

    // Initialize a cinemaStatusCode, which will be used as a key to access the appropriate layers, icons, and cinema count for layer group
    var cinemaStatusCode;

    // Loop through the cinema_type in cinema2022
    for (var i = 0; i < twentyTwo.length; i++) {
 
        // Filter for "open"
        if (opening = twentyTwo.filter(cinema => cinema.cinema_type == "open")) {
            
            cinemaStatusCode = "OPEN_2022";
        }

        // Loop through the cinema_type in cinema2022
        for (var i = 0; i < twentyTwo.length; i++) {

        // Filter for "closed"
            if (closing = twentyTwo.filter(cinema => cinema.cinema_type == "closed")){
                cinemaStatusCode = "CLOSED_2022";
            }

        // Update the cinema count
        cinemaCount[cinemaStatusCode]++;

        // Map cinema latitude 'open'
        var cinemaOpenLat = (opening.map(cinema => cinema.latitude))
        console.log(cinemaOpenLat);

        // Map cinema longitude 'open'
        var cinemaOpenLong = (opening.map(cinema => cinema.longitude))
        console.log(cinemaOpenLong);

        // Map cinema latitude 'closed'
        var cinemaClosedLat = (closing.map(cinema => cinema.latitude))
        console.log(cinemaClosedLat);
        
        // Map cinema longitude 'closed'
        var cinemaClosedLong = (closing.map(cinema => cinema.longitude))
        console.log(cinemaClosedLong);

        //var cinemaLat = (cinemaOpenLat, cinemaOpenLong)
        //console.log(openLatLong);

        // Create a new cinema object combining open and closed latitude
        var cinemaLat = Object.assign(cinemaOpenLat, cinemaClosedLat);
        console.log(cinemaLat);

        // Create a new cinema object combining open and closed longitude
        var cinemaLong = Object.assign(cinemaOpenLong, cinemaClosedLong);
        console.log(cinemaLong);

        // Create a new marker with the appropriate icon and coordinates
        var newMarker = L.marker(L.latLng(parseFloat(cinemaLat), parseFloat(cinemaLong)), {
            icon: icons[cinemaStatusCode]
        });
        // var newMarker = L.marker([cinematestlat, cinematestlong], {
        //     icon: icons[cinemaStatusCode]
        // });

        // Add the new marker to the appropriate layer
        newMarker.addTo(layers[cinemaStatusCode]); 

        // Map cinema name
        var cinemaName = twentyTwo.map((cinema => cinema.cinema_name))
        console.log(cinemaName);

        // Map cinema name
        var cinemaStreet = twentyTwo.map((cinema => cinema.street))
        console.log(cinemaStreet);

        // Map cinema name
        var cinemaSuburb = twentyTwo.map((cinema => cinema.suburb))
        console.log(cinemaSuburb);

        // Bind a popup to the marker that will  display on click. This will be rendered as HTML
        newMarker.bindPopup(cinemaName + "<br> Street: " + cinemaStreet + "<br> Suburb:" + cinemaSuburb);
    }

    // Call the updateLegend function, which will... update the legend!
    updateLegend(cinemaCount);
}
});

// Update the legend's innerHTML with cinema count
function updateLegend(cinemaCount) {
    document.querySelector(".legend").innerHTML = [
        "<p class='open-2022'>Cinema Open 2022: " + cinemaCount.OPEN_2022 + "</p>",
        "<p class='closed-2022'>Cinema Closed 2022: " + cinemaCount.CLOSED_2022 + "</p>"
    ].join("");
}