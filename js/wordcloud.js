// First define your cloud data, using `text` and `size` properties:
var widthcloud = 500;
var heightcloud = 500;  
var fill = d3.scaleOrdinal(d3.schemeCategory20);
function wordcloud() {
    var skillsToDraw = [{ "text": "Oklahoma", "size": 50 }, { "text": "Kansas", "size": 38 }, { "text": "Colorado", "size": 33 }, { "text": "Nebraska", "size": 33 }, { "text": "Arkansas", "size": 33 }, { "text": "Louisiana", "size": 33 }, { "text": "Texas", "size": 32 }, { "text": "Missouri", "size": 31 }, { "text": "Minnesota", "size": 31 }, { "text": "Rhode Island", "size": 30 }, { "text": "Mississippi", "size": 29 }, { "text": "Kentucky", "size": 29 }, { "text": "Connecticut", "size": 29 }, { "text": "South Dakota", "size": 28 }, { "text": "South Carolina", "size": 28 }, { "text": "Florida", "size": 27 }, { "text": "Alabama", "size": 27 }, { "text": "Wyoming", "size": 26 }, { "text": "North Dakota", "size": 26 }, { "text": "Georgia", "size": 25 }, { "text": "Tennessee", "size": 25 }, { "text": "North Carolina", "size": 24 }, { "text": "Montana", "size": 23 }, { "text": "New Jersey", "size": 22 }, { "text": "Massachusetts", "size": 21 }, { "text": "New York", "size": 21 }, { "text": "Indiana", "size": 20 }, { "text": "Illinois", "size": 20 }, { "text": "New Mexico", "size": 19 }, { "text": "Iowa", "size": 18 }, { "text": "Washington", "size": 18 }, { "text": "Maryland", "size": 17 }, { "text": "Ohio", "size": 16 }, { "text": "Idaho", "size": 16 }, { "text": "Virginia", "size": 15 }, { "text": "West Virginia", "size": 15 }, { "text": "Wisconsin", "size": 15 }, { "text": "Maine", "size": 14 }, { "text": "New Hampshire", "size": 14 }, { "text": "Pennsylvania", "size": 13 }, { "text": "Delaware", "size": 13 }, { "text": "Michigan", "size": 11 }, { "text": "Arizona", "size": 10 }, { "text": "Vermont", "size": 10 }, { "text": "Utah", "size": 10 }, { "text": "Hawaii", "size": 9 }, { "text": "Oregon", "size": 8 }, { "text": "Alaska", "size": 7 }, { "text": "California", "size": 3 }, { "text": "Nevada", "size": 2 }];
    // Next you need to use the layout script to calculate the placement, rotation and size of each word:
    d3.layout.cloud()
        .size([widthcloud, heightcloud])
        .words(skillsToDraw)
        .rotate(function () {
            return ~~(Math.random() * 2) * 90;
        })
        .font("Impact")
        .fontSize(function (d) {
            return d.size;
        })
        .on("end", drawSkillCloud)
        .start();
}
// Finally implement `drawSkillCloud`, which performs the D3 drawing:
// apply D3.js drawing API
function drawSkillCloud(words) {
    d3.select("#wordcloud").append("svg")
        // .attr("width", widthcloud)
        // .attr("height", heightcloud)
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('preserveAspectRatio', "none")
        .attr('viewBox', "0 0 "+ (widthcloud) + " " + (heightcloud) )
        // .attr('transform', 'translate(-75,0)')
        .attr('id', 'wordcloudsvg')
        .append("g")
        .attr("transform", "translate(" + ~~(widthcloud / 2) + "," + ~~(heightcloud / 2) + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function (d) {
            return d.size + "px";
        })
        .style("-webkit-touch-callout", "none")
        .style("-webkit-user-select", "none")
        .style("-khtml-user-select", "none")
        .style("-moz-user-select", "none")
        .style("-ms-user-select", "none")
        .style("user-select", "none")
        .style("cursor", "default")
        .style("font-family", "Impact")
        .style("fill", function (d, i) {
            return fill(i);
        })
        .attr("text-anchor", "middle")
        .attr("id",function (d) {
            return d.text.replace(' ','-') + 'wordcloud';
        })
        .attr("transform", function (d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d) {
            return d.text;
        })
        .on("mousemove", function (d) {
            d3.select('#' + d.text.replace(' ','-') + 'map').style("stroke", "#000000");
            d3.select(this).classed('overwordcloud', true);
            // d3.select('#' + d.properties.name + 'wordcloud').classed('overwordcloud', true);
        })
        .on("mouseout", function (d) {
            d3.select('#' + d.text.replace(' ','-') + 'map').style("stroke", "");
            d3.select(this).classed('overwordcloud', false);
            // tooltip.classed("hidden", true);
            // d3.select('#' + d.properties.name + 'wordcloud').classed('overwordcloud', false);
        });
}