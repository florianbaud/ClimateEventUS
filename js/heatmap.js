function heatmap() {
    d3.json("./data/heat.json", (data) => {

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        var colors = d3.scaleSequential(d3.interpolateYlOrRd)
            .domain([0, 500]);

        var width = 1200,
            height = 800;
        var x = d3.scaleBand().range([0, width])
            .domain(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);;

        var y = d3.scaleBand().range([0, height])
            .domain(["Thunderstorm Wind"
                , "Tornado"
                , "Flood"
                , "Hail"
                , "Flash Flood"
                , "Marine Thunderstorm Wind"
                , "Marine Strong Wind"
                , "Marine High Wind"
                , "Winter Weather"
                , "Waterspout"
                , "Heavy Rain"
                , "Lightning"
                , "Funnel Cloud"
                , "High Wind"
                , "Heavy Snow"
                , "Debris Flow"
                , "Drought"
                , "Strong Wind"
                , "Winter Storm"
                , "Cold/Wind Chill"
                , "Hurricane"
                , "Coastal Flood"
                , "Wildfire"
                , "Frost/Freeze"
                , "Blizzard"
                , "Ice Storm"
                , "Marine Hail"
                , "Dense Fog"
                , "Extreme Cold/Wind Chill"
                , "Lake-Effect Snow"
                , "Rip Current"
                , "High Surf"
                , "Marine Tropical Storm"
                , "Avalanche"
                , "Astronomical Low Tide"
                , "Sleet"
                , "Sneakerwave"
                , "Excessive Heat"
                , "Heat"
                , "Dust Storm"
                , "Freezing Fog"
                , "Dust Devil",
                "Lakeshore Flood"
                , "Tropical Storm"
                , "Storm Surge/Tide"
                , "Marine Hurricane/Typhoon"
                , "Tropical Depression"
                , "Dense Smoke"
                , "Marine Tropical Depression"]);;

        var xAxis = d3.axisBottom(x);
        var yAxis = d3.axisLeft(y);

        var svg = d3.select("#heatmap")
            .append("svg")
            // .attr("width", width + 120)
            // .attr("height", height + 200)
            .attr("width", '100%')
            .attr("height", '100%')
            .attr('preserveAspectRatio', "none")
            .attr('viewBox', "-100 0 " + (width + 200) + " " + (height + 100))
            .append("g")
            .attr("transform", "translate(" + 60 + "," + 50 + ")")

        svg.append("g")
            .attr("class", "axis")
            .attr("id", "x-axis")
            .call(xAxis)
            .attr("transform", "translate(0," + height + ")")

        svg.append("g")
            .attr("class", "axis")
            .attr("id", "y-axis")
            .call(yAxis)

        var legend = svg.append("g")
            .attr("id", "legend")
            .attr("transform", "translate(" + (14) + "," + (50) + ")");

        var padding = 0;

        var w = 300, h = 50;

        var key = d3.select("#legend1")
            .append("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            .attr('preserveAspectRatio', "none")
            .attr('viewBox', "0 0 " + (w + 50) + " " + (h));
            // .attr("width", '100%')
            // .attr("height", '100%');

        var legend = key.append("defs")
            .append("svg:linearGradient")
            .attr("id", "gradient")
            .attr("x1", "0%")
            .attr("y1", "100%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        legend.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", d3.interpolateYlOrRd(0))
            .attr("stop-opacity", 1);

        legend.append("stop")
            .attr("offset", "33%")
            .attr("stop-color", d3.interpolateYlOrRd(0.33))
            .attr("stop-opacity", 1);

        legend.append("stop")
            .attr("offset", "66%")
            .attr("stop-color", d3.interpolateYlOrRd(0.66))
            .attr("stop-opacity", 1);

        legend.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", d3.interpolateYlOrRd(1))
            .attr("stop-opacity", 1);

        key.append("rect")
            .attr("width", w)
            .attr("height", h - 30)
            .style("fill", "url(#gradient)")
            .attr("transform", "translate(0,10)");

        var z = d3.scaleBand().range([0, w + 30])
            .domain(["100", "200", "300", "400", ">500"])

        var zAxis = d3.axisBottom()
            .scale(z)
            .ticks(5);

        key.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(0,30)")
            .call(zAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("z", 0)
            .attr("dy", ".71em")

        var type = [];
        var month = [];

        data.donnee.forEach((d) => {
            type.push(d.event);
            month.push(d.date);
        })

        var rectangleWidth = width / 12;
        var rectangleHeight = height / 49;
        var tooltip = d3.select("body").append("div").attr("id", "tooltip2").attr("class", "hidden tooltip");
        // var tooltip = d3.select("body").append("div")
        //     .attr("class", "hidden tooltip")
        //     .attr("id", 'tooltip2');
        svg.selectAll('rect')
            .data(data.donnee)
            .enter()
            .append('rect')
            .attr("class", "cell")
            .attr('height', rectangleHeight)
            .attr('width', rectangleWidth)
            .attr('y', d => y(d.event))
            .attr('x', d => (d.date - 1) * rectangleWidth)
            .attr('transform', 'translate(' + 1 + ',' + 0 + ')')
            .attr('data-month', d => [d.date])
            .attr('data-year', d => d.event)
            .attr('data-temp', d => d.count)
            .style('fill', d => {
                return colors(d.count);
            })
            .on("mousemove", function (d, i) {
                current_month = months[parseInt(d.date) - 1]
                d3.select(this).style("stroke", "#000000");
                tooltip//.style('opacity', 1)
                    .classed("hidden", false)
                    // .attr('data-year', d.event)
                    // .style("display", "inline-block")
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 100) + "px")
                    .html(`
                            <b>${d.event}</b><br />
                            <i>${current_month}</i> - ${d.count} events
                        `)
            })
            .on("mouseout", function (d) {
                d3.select(this).style("stroke", "");
                tooltip.classed("hidden", true)//.style("opacity", 0);
            });

    });
}
