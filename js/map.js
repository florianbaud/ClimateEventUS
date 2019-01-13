function mapchart() {
    var width = 875,
        height = 501;
    var svg2 = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        // .attr('transform','translate(-75,0)')
        .attr("id", "mapchart");
    var projection = d3.geoAlbersUsa().translate([width / 2, height / 2])
    var path = d3.geoPath().projection(projection);
    var tooltip = d3.select("body").append("div")
        .attr("class", "hidden tooltip")
        .attr("id", 'tooltip');
    // map
    d3.json("./data/us_states.json", function (json) {
        // on r�cup�re les valeurs de sum_scaled
        var values = [];
        for (var i = 0; i < json.features.length; i++) {
            values.push(json.features[i][test.value + "_scaled"].sum_scaled);
        }
        var color = d3.scaleSequential(d3.interpolateYlOrRd)
            .domain([d3.min(values), d3.max(values)]);
        svg2.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function (d) {
                var value = d[test.value + "_scaled"].sum_scaled;
                if (value) { return color(value); } else { return "#ccc"; }
            })
            .on("mousemove", function (d) {
                d3.select(this).style("stroke", "#000000");
                var mouse = d3.mouse(svg2.node()).map(function (d) { return parseInt(d); });
                tooltip.classed("hidden", false)
                    .attr("style", "left:" + (mouse[0] + 15) + "px;top:" + (mouse[1] - 35) + "px")
                    .html("<center><b>" + d.properties.name + "</b></br><i>" + d[test.value].nb_event + " events</i></br>Injuries : " + d[test.value].total_injuries + "</br>" + "Deaths : " + d[test.value].total_deaths + "</br>" + "Damages : " + d[test.value].total_damages + " $ </center>");
            })
            .on("mouseout", function () {
                d3.select(this).style("stroke", "");
                tooltip.classed("hidden", true);
            }
            );
        d3.select('#events')
            .on("change", function () {
                // on r�cup�re les valeurs de sum_scaled
                var values = [];
                for (var i = 0; i < json.features.length; i++) {
                    values.push(json.features[i][test.value + "_scaled"].sum_scaled);
                }
                var color = d3.scaleSequential(d3.interpolateYlOrRd)
                    .domain([d3.min(values), d3.max(values)]);
                // svg
                svg2.selectAll("path")
                    .transition(duration = 500)
                    .style("fill", function (d) {
                        var value = d[test.value + "_scaled"].sum_scaled;
                        if (value) { return color(value); } else { return "#ccc"; }
                    })
            });
    })
}