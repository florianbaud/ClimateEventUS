function heatmap() {
    d3.json("./data/heat.json", (data) => {

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

        var svg = d3.select("body")
            .append("svg")
            .attr("width", width + 120)
            .attr("height", height + 200)
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

        // colors.forEach((color) => {

        //     legend.append("rect")
        //             .attr("width", 30)
        //             .attr("height", 30)
        //             .attr("x", padding)
        //             .attr("y", height)
        //             .style("fill", color)

        //     padding += 30;
        // });

        legend.append("text")
            .text("Legend")
            .attr("x", 0)
            .attr("y", height + 42)
            .attr("class", "legend-text")

        var type = [];
        var month = [];

        data.donnee.forEach((d) => {
            type.push(d.event);
            month.push(d.date);
        })

        var rectangleWidth = width / 12;
        var rectangleHeight = height / 49;
        var tooltip = d3.select("body").append("div").attr("class", "tooltip");
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
            .on("mouseover", function (d, i) {
                tooltip.style('opacity', 1)
                    .attr('data-year', d.event)
                    .style("display", "inline-block")
                    .style("left", d3.event.pageX + "px")
                    .style("top", d3.event.pageY + "px")
                    .html(`
                            Mois: ${d.date} <br />
                            Type: ${d.event}<br />
                            Nombre: ${d.count}
                        `)
            })
            .on("mouseout", (d) => tooltip.style("opacity", 0));

    });
}
