var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#chart-cs")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.json("/cs_data").then(function(streamingData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    streamingData.forEach(function(data) {
      data.Monthly_sub_fee = +data.Monthly_sub_fee;
      data.Simultaneous_streams = +data.Simultaneous_streams;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([1, d3.max(streamingData, d => d.Monthly_sub_fee)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0.5, d3.max(streamingData, d => d.Simultaneous_streams)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(streamingData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.Monthly_sub_fee))
    .attr("cy", d => yLinearScale(d.Simultaneous_streams))
    .attr("r", "15")
    .attr("fill", "seagreen")
    .attr("opacity", ".4");

 
    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([100, 70])
      .html(function(d) {
        return (`${d.Provider}<hr>Fee: $${d.Monthly_sub_fee}<br> Simultaneous streams: ${d.Simultaneous_streams}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("mouseover", function(data) {
      d3.select(this)
      .transition()
      .duration(1000)
      .attr("r", 22)
      .attr("fill", "red")
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        d3.select(this)
        .transition()
        .duration(1000)
        .attr("r", 15)
        .attr("fill", "seagreen")
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Number of Simultaneous Streams");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Admission fee ($)");
  }).catch(function(error) {
    console.log(error);
  });
