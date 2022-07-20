// Chart Params
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
    .select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Param
var selectedgroup = "Theatres";

// function used for updating y-scale var upon click on axis label
function yScale(cinemadata, selectedgroup) {
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(cinemadata, d => d[selectedgroup]),
        d3.max(cinemadata, d => d[selectedgroup]) * 1.10])
        .range([height, 0]);
    
    return yLinearScale;

}

// function used for updating yAxis var upon click on axis label
function renderAxes(newYscale, yAxis) {
    var leftAxis = d3.axisLeft(newYscale);
    yAxis.transition()
        .duration(1000)
        .call(leftAxis);
    return yAxis;
}

function renderLine(valueline, yLinearScale, selectedgroup, xTimeScale) {
    valueline.transition()
        .duration(1000)
        .attr("d", d3.line()
            .x(d => xTimeScale(d.Year))
            .y(d => yLinearScale(d[selectedgroup])))
        .attr("stroke", "blue");
    return valueline;
}

// Import data from an external CSV file
d3.csv("Resources/cinema_data.csv").then(function (cinemadata) {
    console.log(cinemadata);
    var parseTime = d3.timeParse('%Y');

    cinemadata.forEach(function (data) {
        data.Year = parseTime(data.Year);
        data.Theatres = +data.Theatres;
        data.Screens = +data.Screens;
        data.Seats = +data.Seats
    });


    // Create scaling functions
    var xTimeScale = d3.scaleTime()
        .domain(d3.extent(cinemadata, d => d.Year))
        .range([0, width]);

    var yLinearScale = yScale(cinemadata, selectedgroup);


    // Create axis functions
    var bottomAxis = d3.axisBottom(xTimeScale)
        .tickFormat(d3.timeFormat("%Y"));
    var leftAxis = d3.axisLeft(yLinearScale);


    // Add x-axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // Add y1-axis to the left side of the display
    var yAxis = chartGroup.append("g")
        // Define the color of the axis text
        .classed("black", true)
        .call(leftAxis);


    // Line generator

    var valueline = d3.line()
        .x(d => xTimeScale(d.Year))
        .y(d => yLinearScale(d[selectedgroup]));

    var drawline = chartGroup.append("path")
        .data([cinemadata])
        .classed("line", true)
        .attr("d", valueline);



    // Append axes titles
    var labelsGroup = chartGroup.append("g")
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var theatreLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 15)
        .attr("value", "Theatres") // value to grab for event listener
        .classed("active", true)
        .text("Theatres");

    var screenLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 35)
        .attr("value", "Screens") // value to grab for event listener
        .classed("inactive", true)
        .text("Screens");

    var seatsLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 55)
        .attr("value", "Seats") // value to grab for event listener
        .classed("inactive", true)
        .text("Seats ('000)");

    //labels event listener
    labelsGroup.selectAll("text")
        .on("click", function () {
            var value = d3.select(this).attr("value");
            if (value != selectedgroup) {
                selectedgroup = value;
                yLinearScale = yScale(cinemadata, selectedgroup);
                yAxis = renderAxes(yLinearScale, yAxis);
                drawline = renderLine(drawline, yLinearScale, selectedgroup, xTimeScale);
                console.log(value);
            }
        });

}).catch(function (error) {
    console.log(error);
});

