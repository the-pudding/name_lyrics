/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/

d3.selection.prototype.timeless = function init(options) {
	function createChart(el) {
		const $sel = d3.select(el);
		let data = $sel.datum();
		// dimension stuff
		let width = 0;
		let height = 0;
		const marginTop = 0;
		const marginBottom = 0;
		const marginLeft = 0;
		const marginRight = 0;
    let $vizCont = null
    let $blockCont = null
    let $meta = null
    let $name = null
    let $count = null
    let $decade = null
    let $artist = null

		// scales
		const scaleX = null;
		const scaleY = null;

		// dom elements
		let $svg = null;
		let $axis = null;
		let $vis = null;

		// helper functions

		const Chart = {
			// called once at start
			init() {
				// setting up viz section
        $vizCont = $sel.append('div')
          .attr('class', 'chart__container')

        // setting up metadata section
        $meta = $sel.append('div')
          .attr('class', 'meta__container')

        const $text = $meta.append('div')
          .attr('class', 'text-container')

        $decade = $text.append('h3')
          .attr('class', 'timeless-decade')

				Chart.resize();
				Chart.render();
			},
			// on resize, update new dimensions
			resize() {
				// defaults to grabbing dimensions from container element
				width = $sel.node().offsetWidth - marginLeft - marginRight;
				height = $sel.node().offsetHeight - marginTop - marginBottom;
				return Chart;
			},
			// update scales and render chart
			render() {
        $decade.text(`${data.key}s`)
        // $artist.text(data[0].artist)

        $vizCont.selectAll('.timelessName')
        .data(data.values, d => d.name)
        .join(
          enter => enter.append('p')
          .call(enter => enter
            .style('opacity', 0)
            .transition()
            .duration(250)
            .style('opacity', '1')

          ),
          update => update
            //.style('opacity', 0)
            // .call(update => update
            //   .transition()
            //   .delay(500)
            //   .duration(500)
            //   .style('color', 'red'))
            ,
          exit => exit
            .style('opacity', 1)
            .call(exit => exit
              .style('opacity', '0')
              .remove()
            )

        )
            .attr('class', d => `timelessName timelessName-${d.name}`)
            .text((d, i) => `${d.name}`)
          .on('mouseover', d => {
            Chart.highlight(d.name)
          })



				return Chart;
			},
			// get / set data
			data(val) {
				if (!arguments.length) return data;
				data = val;
				$sel.datum(data);
				Chart.render();
				return Chart;
			},
      highlight(name){
        d3.selectAll('.timelessName').classed('highlight', false)
        const highlight = d3.selectAll(`.timelessName-${name}`)
        highlight.classed('highlight', true)
      }
		};
		Chart.init();

		return Chart;
	}

	// create charts
	const charts = this.nodes().map(createChart);
	return charts.length > 1 ? charts : charts.pop();
};
