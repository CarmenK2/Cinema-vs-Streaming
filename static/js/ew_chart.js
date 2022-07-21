d3.json("/test").then((incomingData) => {


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

});

/*
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
  })
*/
