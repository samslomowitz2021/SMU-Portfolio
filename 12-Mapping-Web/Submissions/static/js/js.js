// $(document).ready(function() {
//     doWork();
// });



// function doWork() {
//     var url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`;

//     getData(url);
// }

// function doWork2() {
//     var plates = "static/data/plates.json";

//     getData2(plates);
// }

// function getData(url) {
//     $.ajax({
//         type: "GET",
//         url: url,
//         contentType: "application/json; charset=utf-8",
//         success: function(info) {
//             console.log(info);
//             Map(info);
//         },
//         error: function(textStatus, errorThrown) {
//             console.log("FAILED to get data");
//             console.log(textStatus);
//             console.log(errorThrown);
//         }
//     });
// }


// function getData2(plates) {
//     $.ajax({
//         type: "GET",
//         url: plates,
//         contentType: "application/json; charset=utf-8",
//         success: function( plates) {
//             console.log( plates);
//             Map( plates);
//         },
//         error: function(textStatus, errorThrown) {
//             console.log("FAILED to get data");
//             console.log(textStatus);
//             console.log(errorThrown);
//         }
//     });
// }

// window.$ = window.jQuery = require('jquery'); // not sure if you need this at all
// window.Bootstrap = require('bootstrap');

// var plates = "static/data/plates.json";
// $(document).ready(function() {
//     // AJAX
//     jquery.getJSON(`static/data/earthquakes.geojson`, function(info) {
//     // JSON result in `data` variable
//     });
    
// });






$(document).ready(function() {
    // AJAX
    $.ajax({
        type: "GET",
        url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
        contentType: "application/json",
        dataType: "json",
        success: function(info) {
            // NESTED AJAX
            $.ajax({
                type: "GET",
                url: "static/data/plates.json",
                contentType: "application/json",
                dataType: "json",
                success: function(plates) {
                    myMap(info, plates);

                },
                error: function() {
                    console.log("YOU BROKE IT!!");
                },
                complete: function() {
                    console.log("Request finished");
                }
            });

        },
        error: function() {
            console.log("YOU BROKE IT!!");
        },
        complete: function() {
            console.log("Request finished");
        }
    });
});

function marker(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
        layer.bindPopup(`<h3>${ feature.properties.title }</h3><hr><p>${new Date(feature.properties.time)}</p >`);
    }
// }
// 3.
// createMap() takes the earthquake data and incorporates it into the visualization:
function myMap(info,plates) {
    console.log(plates)

    // apply the filter (if necessary)
    var events = info.features

    var earthquakes =  plates.features.filter(x => x.geometry.coordinates);

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
    var plateLayer = L.geoJSON(earthquakes, {
        // marker: marker
    });
    // A SECOND OVERLAY OBJECT
    var circles = [];
    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        let circle_color = getColor(event.properties.mag);

        let location = [event.geometry.coordinates[1], event.geometry.coordinates[0]]

        let circle = L.circle(location, {
            color: circle_color,
            fillColor: circle_color,
            fillOpacity: 0.75,
            radius: getRadius(event.properties.mag)
            
        }).bindPopup(`<h3><strong>${ event.properties.title }</strong></h3><hr><p><em>${new Date(event.properties.time)}</em></p >`);
        circles.push(circle);
    }
        

    var circleLayer = L.layerGroup(circles);


    // Create a baseMaps object.
    var baseMaps = {
        "Dark": dark,
        "Light": light,
        "Street": street,
        "Outdoors": outdoors,
        worldCopyJump: true
    };

    // Overlays that can be toggled on or off
    var overlayMaps = {
        Markers: earthquakeLayer,
        Circles: circleLayer,
        worldCopyJump: true
    };

    var overlayMaps2 = {
        Earthquake: plateLayer
    };


    // Create a new map.
    // Edit the code to add the earthquake data to the layers.
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [dark, circleLayer],
        worldCopyJump: true
    });

    // Create a layer control that contains our baseMaps.
    // Be sure to add an overlay Layer that contains the earthquake GeoJSON.
    var legend = L.control({ position: "bottomleft" });

    L.control.layers(baseMaps, overlayMaps, overlayMaps2).addTo(myMap);

    legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += "<h4>Richter Scale</h4>";
        div.innerHTML += '<i style="background: #EE8434"></i><span>-10 to 10</span><br>';
        div.innerHTML += '<i style="background: #C95D63"></i><span>10 to 30</span><br>';
        div.innerHTML += '<i style="background: #AE8799"></i><span>30 to 50</span><br>';
        div.innerHTML += '<i style="background: #717EC3"></i><span>50 to 70</span><br>';
        div.innerHTML += '<i style="background: #496DDB"></i><span>70 to 90</span><br>';
        div.innerHTML += '<i style="background: #3E505B"></i><span>90+</span><br>';
        
        
        
      
        return div;
      };
      
      legend.addTo(myMap);


function getRadius(mag) {
        return mag * 10000
}

function getColor(mag) {
    let color2 = '#3E505B';

    if (mag <= 1.0) {
        color2 = "#EE8434";
    } else if (mag <= 3.0) {
        color2 = "#C95D63";
    } else if (mag <=5.0) {
        color2 = "#AE8799";
    } else if (mag <= 7.0) {
        color2 = "#717EC3";
    } else if (mag <= 9.0) {
        color2 = "#496DDB";
    } else {
        color2 = '#3E505B';
    }

    return (color2);
}

}
}