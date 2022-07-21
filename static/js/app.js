const urls = [abc];

Promise.all(urls.map(url => d3.json(url))).then(run);

function run(dataset) {
   ew_chart1(dataset[0]);
};

function ew_chart1(a) {
  d3.json(a).then((incomingData) => {

    // Trace1 for the Greek Data


  //console.log(incomingData.map(row => row.Year).slice(0,10))

    var trace1 = {
      x: incomingData.map(row => row.Year).slice(0,10),
      y: incomingData.map(row => row.Releases).slice(0,10),
      text: incomingData.map(row => row.LY).slice(0,10),
      name: "Releases",
      type: "bar"
    };
  
  // Combining both traces
  var traceData = [trace1];
  
  // Apply the group barmode to the layout
  var layout = {
    title: "Number of Box office Release per year",
    barmode: "group",
    xaxis: {title: 'Year'},
    yaxis: {title: 'Number of Release'},
  };
  
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("chart-3", traceData, layout);


    //

    //console.log(incomingData[0]);

    //Object.keys(incomingData).forEach(key=> console.log(key.Year))

    //incomingData.forEach((data) => {
        // Get the entries for each object in the array
        //Object.entries(data).forEach(([key, value]) => {
            // Log the key and value
        //console.log(`Key: ${key} and Value ${value}`);
  //})
  })
}

ew_chart1(abc)

  // SECOND CHART

  

    //List of box office releases every year
    //var releases = incomingData.Releases;
    //var years = incomingData.Year;
    //var total_gross = incomingData.Total_gross;
    //var n01_movie = incomingData.N01_movie;

    // Create charts 

      var xSavings = incomingData.map(row => row.Year);
      var xNetworth = incomingData.map(row => row.Year);
    
      var ySavings = incomingData.map(row => row.Total_gross);
      var yNetworth = incomingData.map(row => row.Year);
      
      var trace1 = {
        x: incomingData.map(row => row.Year),
        y: incomingData.map(row => row.Releases),
        xaxis: 'x1',
        yaxis: 'y1',
        type: 'bar',
        marker: {
          color: 'rgba(50,171,96,0.6)',
          line: {
            color: 'rgba(50,171,96,1.0)',
            width: 2
          }
        },
        name: 'Household savings, percentage of household disposable income',
        orientation: 'h'
      };
      
      var trace2 = {
        x: incomingData.map(row => row.Year),
        y: incomingData.map(row => row.Releases),
        xaxis: 'x2',
        yaxis: 'y1',
        mode: 'lines+markers',
        line: {
          color: 'rgb(128,0,128)'
        },
        name: 'Household net worth, Million USD/capita'
      };
      
      var data = [trace1, trace2];
      
      var layout = {
        title: 'Years vs Revenue',
        xaxis1: {
          //range: [0, 20],
          domain: [0, 0.5],
          zeroline: false,
          showline: false,
          showticklabels: true,
          showgrid: true
        },
        xaxis2: {
          //range: [25000, 150000],
          domain: [0.5, 1],
          zeroline: false,
          showline: false,
          showticklabels: true,
          showgrid: true,
          side: 'top',
          //dtick: 25000
        },
        legend: {
          x: 0.029,
          y: 1.238,
          font: {
            size: 10
          }
        },
        margin: {
          l: 100,
          r: 20,
          t: 200,
          b: 70
        },
        width: 600,
        height: 600,
        paper_bgcolor: 'rgb(248,248,255)',
        plot_bgcolor: 'rgb(248,248,255)',
        annotations: [
          {
            xref: 'paper',
            yref: 'paper',
            x: 0,
            y: 100,
            text: 'OECD ' + '(2015), Household savings (indicator), ' + 'Household net worth (indicator). doi: ' + '10.1787/cfc6f499-en (Accessed on 05 June 2015)',
            showarrow: false,
            font:{
              family: 'Arial',
              size: 10,
              color: 'rgb(150,150,150)'
            }
          }
        ]
      };
      
      for ( var i = 0 ; i < xSavings.length ; i++ ) {
        var result = {
          xref: 'x1',
          yref: 'y1',
          x: xSavings[i],
          y: ySavings[i],
          text: xSavings[i] + '%',
          font: {
            family: 'Arial',
            size: 12,
            color: 'rgb(50, 171, 96)'
          },
           showarrow: false,
        };
        var result2 = {
          xref: 'x2',
          yref: 'y1',
          x: xNetworth[i],
          y: yNetworth[i],
          text: xNetworth[i] + ' M',
          font: {
            family: 'Arial',
            size: 12,
            color: 'rgb(128, 0, 128)'
          },
           showarrow: false
        };
        layout.annotations.push(result, result2);
      }
      
      Plotly.newPlot('chart-1', data, layout);

    })
  


// Wrap every letter in a span
var textWrapper = document.querySelector('.ml6 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml6 .letter',
    translateY: ["1.1em", 0],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i
  }).add({
    targets: '.ml6',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

