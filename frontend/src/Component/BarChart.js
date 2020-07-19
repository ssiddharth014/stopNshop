









import React, { Component } from 'react'
import * as d3 from 'd3'
class BarChart extends Component {
    componentDidMount() {
        //const data = [ 2, 4, 2, 6, 8 ]
       





        
    const data=[    {"Brand":"Coco Cola",	"val_1":4000,	"val_2":2000	,"mark_val":3000},
    {"Brand":"Fanta",	"val_1":700,	"val_2":900	,"mark_val":800},
    {"Brand":"Sprite",	"val_1":400,	"val_2":500	,"mark_val":900},
    {"Brand":"Cappy",	"val_1":500,	"val_2":500	,"mark_val":500}]
	
        this.drawBarChart(data)
    }



    
    drawBarChart(data)  {
    	


         const canvasHeight = 400
const canvasWidth = 600
const scale = 20
const svgCanvas = d3.select(this.refs.canvas)
    .append("svg")
    .attr("height", canvasHeight)
    .attr("width", canvasWidth)
    .style("border", "1px solid black")
svgCanvas.selectAll("rect")
    .data(data).enter()
        .append("rect")
        .attr("height", 40)
        .attr("width", (datapoint) => datapoint * scale)
        .attr("fill", "orange")
        .attr("y", (datapoint, iteration) => iteration * 45)
        .attr("x", (datapoint) => canvasWidth - datapoint * scale)
    }
    render() { return <div ref="canvas"></div> }
}
export default BarChart;
