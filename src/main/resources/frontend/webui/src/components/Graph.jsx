import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';

class Graph extends Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
   }
   componentDidMount() {
      this.createBarChart()
   }
   componentDidUpdate() {
      this.createBarChart()
   }
   createBarChart() {
      let data = [10, 20, 30, 25, 15, 55, 34];
      let maxHeight = 200;

      const node = this.node     
      const dataMax = max(data)

      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, maxHeight])

      select(node)
         .selectAll('rect')
         .data(data)
         .enter()
         .append('rect')
      
      select(node)
         .selectAll('rect')
         .data(data)
         .exit()
         .remove()
      
      select(node)
         .selectAll('rect')
         .data(data)
         .style('fill', '#fe9922')
         .attr('x', (d,i) => i * 25)
         .attr('y', d => maxHeight - yScale(d))
         .attr('height', d => yScale(d))
         .attr('width', 25)

      select(node)
            .attr("transform", "rotate(-45)");
   }
render() {
      return <svg ref={node => this.node = node}
      width={500} height={500}>
      </svg>
   }
}
export default Graph