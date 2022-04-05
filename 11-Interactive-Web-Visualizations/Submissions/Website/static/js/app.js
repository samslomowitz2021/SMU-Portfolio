$(document).ready(function() {
    console.log("Page Loaded");
    doWork();
});


var url = "static/data/samples.json"

function doWork() {
    // Problem 1: Can I read in the data and then print?
    // var url = "static/data/samples.json";
    requestAjax(url);
}

function requestAjax(url) {
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            console.log(data);
            createDropdown(data);
            createMetadata(data);
            createBarChart(data);
            createBubbleChart(data);
        },
        error: function(textStatus, errorThrown) {
            console.log("FAILED to get data");
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function requestD3(url) {
    d3.json(url).then(function(data) {
        console.log(data);

        createDropdown(data);
        createMetadata(data);
        createBarChart(data);
        createBubbleChart(data);
    });
}

function createDropdown(data) {
    var names = data.names;
    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        let html = `<option>${name}</option>`;
        $("#sample-metadata").empty();
        $("#selDataset").append(html);
    }
}

function createMetadata(data) {
    let id = $("#selDataset").val();
    let info = data.metadata.filter(x => x.id == id)[0];
    console.log(info);
    Object.entries(info).map(function(x) {
        let html = `<h6>${x[0]}: ${x[1]}</h6>`;
        $("#sample-metadata").append(html);
    });
}

function createBarChart(data) {
    let id = $("#selDataset").val();
    let sample = data.samples.filter(x => x.id == id)[0];

    var trace1 = {
        type: 'bar',
        x: sample.sample_values.slice(0, 10).reverse(),
        y: sample.otu_ids.map(x => `OTU ${x}`).slice(0, 10).reverse(),
        text: sample.otu_labels.slice(0, 10).reverse(),
        orientation: 'h',
        marker: {
            color: 'rgb(158,202,225)',
            opacity: 0.6}
    }

    var data1 = [trace1];
    // var layout = {
    //     "title": 
    // }

    var layout = {
        title: "Bacteria Type vs. Bacteria Quantity",
        margin: {
            l: 200,
            r: 50,
            b: 100,
            t: 100,
            pad: 4
          },
        xaxis: {
            title: 'Bacteria Quantity',
            tickfont: {
            size: 14,
            color: 'rgb(107, 107, 107)'
          }},
        yaxis: {
          title: 'Bacteria ID',
          titlefont: {
            size: 16,
            color: 'rgb(107, 107, 107)'
          },
          tickfont: {
            size: 14,
            color: 'rgb(107, 107, 107)'
          }
        }}

    Plotly.newPlot('bar', data1, layout);
}

function createBubbleChart(data) {
    let id = $("#selDataset").val();
    let sample = data.samples.filter(x => x.id == id)[0];

    var trace1 = {
        x: sample.otu_ids,
        y: sample.sample_values,
        text: sample.otu_labels.slice(0, 10).reverse(),
        mode: 'markers',
        marker: {
            size: sample.sample_values,
            color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)']
        }
        
            
    }

    var data1 = [trace1];
    var layout = {
        title: "Bacteria Quantity vs. Bacteria Type",
        margin: {
            l: 200,
            r: 50,
            b: 100,
            t: 100,
            pad: 4
          },
        xaxis: {
            title: 'Bacteria ID',
            tickfont: {
            size: 14,
            color: 'rgb(107, 107, 107)'
          }},
        yaxis: {
          title: 'Bacteria Quantity',
          titlefont: {
            size: 16,
            color: 'rgb(107, 107, 107)'
          },
          tickfont: {
            size: 14,
            color: 'rgb(107, 107, 107)'
          }
        }}

    Plotly.newPlot('bubble', data1, layout);
}


function StudentID(number) {
    console.log(number)
    d3.json(url).then(function(data) {
        console.log(data);

        createDropdown(data);
        createMetadata(data);
        createBarChart(data);
        createBubbleChart(data);

})}