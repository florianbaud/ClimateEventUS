function filterJSON(json, key, value) {
    var result = [];
    json.forEach(function (val, idx, arr) {
        if (val[key] == value) {
            result.push(val)
        }
    })
    return result;
}
function linechart() {
    // Set the dimensions of the canvas / graph
    // var margin = { top: 50, right: 20, bottom: 30, left: 160 }
    var margin = { top: 50, right: 40, bottom: 30, left: 80 },
        width = 1000 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;
    // Parse the date / time
    // Set the ranges
    var x = d3v3.time.scale().range([0, width]);
    var y = d3v3.scale.linear().range([height, 0]);
    var Month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
    var z = d3v3.scale.ordinal().domain(Month).rangePoints([0, width]);
    // Define the axes
    // var xAxis = d3v3.svg.axis().scale(x)
    //     .orient("bottom").ticks(15)

    var xAxis = d3v3.svg.axis().scale(z)
        .orient("bottom").ticks(15)

    var yAxis = d3v3.svg.axis().scale(y)
        .orient("left").ticks(5);
    // Define the line
    var stateline = d3v3.svg.line()
        .interpolate("cardinal")
        .x(function (d) { return x(d.year); })
        .y(function (d) { return y(d.value); });
    // Adds the svg canvas
    var svg = d3v3.select("#linechart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "line")
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    var data;
    // Get the data
    d3v3.json("./data/data.json", function (error, json) {
        json.forEach(function (d) {
            d.value = +d.value;
        });
        d3v3.select('#events')
            .on("change", function () {
                var sect = document.getElementById("events");
                var section = sect.options[sect.selectedIndex].value;
                data = filterJSON(json, 'produce', section);
                //debugger
                data.forEach(function (d) {
                    d.value = +d.value;
                    //d.year = parseDate(String(d.year));
                    d.active = true;
                });
                //debugger
                updateGraph(data);
                jQuery('h1.page-header').html(section);
            });
        // generate initial graph
        data = filterJSON(json, 'produce', test.value);
        updateGraph(data);
    });
    var color = d3v3.scale.ordinal().range(["#48A36D", "#0096ff", "#ff007e"]);
    function updateGraph(data) {
        // Scale the range of the data
        x.domain(d3v3.extent(data, function (d) { return d.year; }));
        y.domain([d3v3.min(data, function (d) { return d.value; }), d3v3.max(data, function (d) { return d.value; })]);
        // Nest the entries by state
        dataNest = d3v3.nest()
            .key(function (d) { return d.state; })
            .entries(data);
        var result = dataNest.filter(function (val, idx, arr) {
            return $("." + val.key).attr("fill") != "#ccc"
            // matching the data with selector status
        })
        var state = svg.selectAll(".line")
            .data(result, function (d) { return d.key });
        state.enter().append("path")
            .attr("class", "line");
        state.transition()
            .style("stroke", function (d, i) { return d.color = color(d.key); })
            .attr("id", function (d) { return 'tag' + d.key.replace(/\s+/g, ''); }) // assign ID
            .attr("d", function (d) {
                return stateline(d.values)
            });
        state.exit().remove();
        var legend = d3v3.select("#legend")
            .selectAll("text")
            .data(dataNest, function (d) { return d.key });
        //checkboxes
        legend.enter().append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("x", 0)
            .attr("y", function (d, i) { return 0 + i * 15; }) // spacing
            .attr("fill", function (d) {
                return color(d.key);
            })
            .attr("class", function (d, i) { return "legendcheckbox " + d.key })
            .on("click", function (d) {
                d.active = !d.active;
                d3v3.select(this).attr("fill", function (d) {
                    if (d3v3.select(this).attr("fill") == "#ccc") {
                        return color(d.key);
                    } else {
                        return "#ccc";
                    }
                })
                var result = dataNest.filter(function (val, idx, arr) {
                    return $("." + val.key).attr("fill") != "#ccc"
                    // matching the data with selector status
                })
                // Hide or show the lines based on the ID
                svg.selectAll(".line").data(result, function (d) { return d.key })
                    .enter()
                    .append("path")
                    .attr("class", "line")
                    .style("stroke", function (d, i) { return d.color = color(d.key); })
                    .attr("d", function (d) {
                        return stateline(d.values);
                    });
                svg.selectAll(".line").data(result, function (d) { return d.key }).exit().remove()
            })
        // Add the Legend text
        legend.enter().append("text")
            .attr("x", 15)
            .attr("y", function (d, i) { return 10 + i * 15; })
            .attr("class", "legend");
        legend.transition()
            .style("fill", "#777")
            .text(function (d) { return d.key; });
        legend.exit().remove();
        svg.selectAll(".axis").remove();
        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - 80)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Nombre d'événements");
    };
}