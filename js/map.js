function mapchart() {

    var test = document.getElementById('events');
    var width = 875,
        height = 501;
    var svg2 = d3.select("#map")
        .append("svg")
        // .attr("width", width)
        // .attr("height", height)
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('preserveAspectRatio', "none")
        .attr('viewBox', "0 0 " + (width + 25) + " " + (height + 49))
        // .attr('transform','translate(-75,0)')
        .attr("id", "mapchart");
    var projection = d3.geoAlbersUsa().translate([width / 2, height / 2])
    var path = d3.geoPath().projection(projection);
    var tooltip = d3.select("body").append("div")
        .attr("class", "hidden tooltip");
    // .attr("id", 'tooltip');
    // map

    var w = 300, h = 50;

    var key = d3.select("#legend2")
        .append("svg")
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('preserveAspectRatio', "none")
        .attr('viewBox', "0 0 " + (w + 33) + " " + (h));
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

    var z = d3.scaleBand().range([0, w])
        .domain(["Low damages","High damages"])

    var zAxis = d3.axisBottom()
        .scale(z)
        .ticks(0);

    key.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,30)")
        .call(zAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("z", 0)
        .attr("dy", ".71em")


    d3.json("./data/us_states.json", function (json) {
        // on récupère les valeurs de total_damages_scaled
        var values = [];
        for (var i = 0; i < json.features.length; i++) {
            values.push(Math.sqrt(json.features[i][test.value].total_damages_scaled));
        }
        var color = d3.scaleSequential(d3.interpolateYlOrRd)
            .domain([d3.min(values), d3.max(values)]);
        svg2.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("id", function (d) {
                return d.properties.name.replace(' ', '-') + 'map';
            })
            .attr("d", path)
            .style("fill", function (d) {
                var value = Math.sqrt(d[test.value].total_damages_scaled);
                if (value) { return color(value); } else { return "#ccc"; }
            })
            .on("mousemove", function (d) {
                d3.select(this).style("stroke", "#000000");
                // var mouse = d3.mouse(svg2.node()).map(function (d) { return parseInt(d); });
                tooltip.classed("hidden", false)
                    // .attr("style", "left:" + (mouse[0] + 15) + "px;top:" + (mouse[1] - 35) + "px")
                    .attr("style", "left:" + (d3.event.pageX + 10) + "px;top:" + (d3.event.pageY - 150) + "px")
                    .html("<center><b>" + d.properties.name + "</b></br><i>" + d[test.value].nb_event + " events</i></br>Injuries : " + d[test.value].total_injuries + "</br>" + "Deaths : " + d[test.value].total_deaths + "</br>" + "Damages : " + d[test.value].total_damages + " $ </center>");
                d3.select('#' + d.properties.name.replace(' ', '-') + 'wordcloud').classed('overwordcloud', true);
            })
            .on("mouseout", function (d) {
                d3.select(this).style("stroke", "");
                tooltip.classed("hidden", true);
                d3.select('#' + d.properties.name.replace(' ', '-') + 'wordcloud').classed('overwordcloud', false);
            }
            );
        d3.select('#events')
            .on("change", function () {
                // on recupere les valeurs de total_damages_scaled
                var values = [];
                for (var i = 0; i < json.features.length; i++) {
                    values.push(Math.sqrt(json.features[i][test.value].total_damages_scaled));
                }
                var color = d3.scaleSequential(d3.interpolateYlOrRd)
                    .domain([d3.min(values), d3.max(values)]);
                // svg
                svg2.selectAll("path")
                    .transition(duration = 500)
                    .style("fill", function (d) {
                        var value = Math.sqrt(d[test.value].total_damages_scaled);
                        if (value) { return color(value); } else { return "#ccc"; }
                    })
            });
    });
}
