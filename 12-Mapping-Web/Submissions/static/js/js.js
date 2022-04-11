$(document).ready(function() {
    doWork();
});

function doWork() {
    var url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`;

    getData(url);
}

function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        success: function(info) {
            console.log(info);
            Map(info);
        },
        error: function(textStatus, errorThrown) {
            console.log("FAILED to get data");
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function marker(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
        layer.bindPopup(`<h3>${ feature.properties.title }</h3><hr><p>${new Date(feature.properties.time)}</p >`);
    }
}


// 3.
// createMap() takes the earthquake data and incorporates it into the visualization:
function Map(info) {

    // apply the filter (if necessary)
    var events = info.features

    // Base Layers
    var dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/dark-v10',
        accessToken: API_KEY
    });

    var light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/light-v10',
        accessToken: API_KEY
    });

    var street = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        accessToken: API_KEY
    });

    var outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/outdoors-v11',
        accessToken: API_KEY
    });


    // Create an overlays object.
    var earthquakeLayer = L.geoJSON(events, {
        marker: marker
    });

    // A SECOND OVERLAY OBJECT
    var circles = [];
    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        let circle_color = "#4E878C";

        let location = [event.geometry.coordinates[1], event.geometry.coordinates[0]]

        let circle = L.circle(location, {
            color: circle_color,
            fillColor: circle_color,
            fillOpacity: 0.75,
            radius: 50000
        }).bindPopup(`<h3><strong>${ event.properties.title }</strong></h3><hr><p><em>${new Date(event.properties.time)}</em></p >`);
        circles.push(circle);
    }

    var circleLayer = L.layerGroup(circles);


    // Create a baseMaps object.
    var baseMaps = {
        "Dark": dark,
        "Light": light,
        "Street": street,
        "Outdoors": outdoors
    };

    // Overlays that can be toggled on or off
    var overlayMaps = {
        Markers: earthquakeLayer,
        Circles: circleLayer
    };

    // Create a new map.
    // Edit the code to add the earthquake data to the layers.
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [dark, circleLayer]
    });

    // Create a layer control that contains our baseMaps.
    // Be sure to add an overlay Layer that contains the earthquake GeoJSON.
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
}
