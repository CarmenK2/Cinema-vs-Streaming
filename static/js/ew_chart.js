d3.json("/test").then((incomingData) => {

  //console.log(incomingData.map(row => row.Year).slice(0,10))

    var trace1 = {
      x: incomingData.map(row => row.Year).slice(0,10),
      y: incomingData.map(row => row.Releases).slice(0,10),
      //text: incomingData.map(row => row.LY).slice(0,10),
      name: "Releases",
      type: "bar"
    };

    var trace2 = {
      x: incomingData.map(row => row.Year).slice(0,10),
      y: incomingData.map(row => row.AsiaPacific_Subscribers).slice(0,10),
      //text: incomingData.map(row => row.Cinema_attendance_perc).slice(0,10),
      name: "Subscribers",
      yaxis: 'y2',
      type: "scatter"
    };

    var trace3 = {
      x: incomingData.map(row => row.Year).slice(0,10),
      y: incomingData.map(row => row.cinema_freq).slice(0,10),
      //text: incomingData.map(row => row.Cinema_attendance_perc).slice(0,10),
      name: "Frequency",
      yaxis: 'y3',
      type: "scatter"
    };
    

    console.log(trace3)
  
  // Combining both traces
  var traceData = [trace1,trace2,trace3];

  
  // Apply the group barmode to the layout
  var layout = {
    title: "Do More Boxoffice bring in more Subscribers?",
    barmode: "group",
    xaxis: {title: 'Year'},
    yaxis: {title: 'Number of Release',
            titlefont: {color: '#1f77b4'},
            tickfont: {color: '#1f77b4'}},

    yaxis2: {title: 'Number of AsiaPacific Subscriber',
              titlefont: {color: '#ff7f0e'},
              tickfont: {color: '#ff7f0e'},
              anchor: 'right',
              overlaying: 'y',
              side: 'left',
              position: 1,
  },

    yaxis3: {title: 'Frequency of Cinema attendance/person/Year',
            titlefont: {color: '#d62728'},
            tickfont: {color: '#d62728'},
            anchor: 'x',
            overlaying: 'y',
            side: 'right',
            position: 2
              },
    margin: {
                l: 50,
                r: 150,
                b: 100,
                t: 100,
                pad: 5
              },

    legend: {"orientation": "h"},
  };
  
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("chart-ew", traceData, layout);
  

});

