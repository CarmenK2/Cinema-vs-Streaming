d3.json("/test").then((incomingData) => {

  //console.log(incomingData.map(row => row.Year).slice(0,10))

    var trace1 = {
      x: incomingData.map(row => row.Year).slice(0,10),
      y: incomingData.map(row => row.Releases).slice(0,10),
      text: incomingData.map(row => row.LY).slice(0,10),
      name: "Releases",
      type: "bar"
    };

    var trace2 = {
      x: incomingData.map(row => row.Year).slice(0,10),
      y: incomingData.map(row => row.AsiaPacific_Subscribers).slice(0,10),
      text: incomingData.map(row => row.Cinema_attendance_perc).slice(0,10),
      name: "Subscribers",
      yaxis: 'y2',
      type: "scatter"
    };

    var trace3 = {
      x: incomingData.map(row => row.Year).slice(0,10),
      y: incomingData.map(row => row.cinema_freq).slice(0,10),
      text: incomingData.map(row => row.Cinema_attendance_perc).slice(0,10),
      name: "frequency",
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
    yaxis: {title: 'Number of Release'},
    yaxis2: {title: 'Number of AsiaPacific Subscriber',
              overlaying: 'y',
              side: 'right'
  },
    yaxis3: {title: 'hello',
              overlaying: 'y',
              side: 'left',
              anchor: 'x'
  }
  };
  
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("chart-ew", traceData, layout);

});

