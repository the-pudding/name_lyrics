/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/

d3.selection.prototype.unique = function init(options) {
	function createChart(el) {
		const $sel = d3.select(el);
		let data = $sel.datum().value.values;
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
    let $title = null
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

        $title = $text.append('h3')
          .attr('class', 'unique-title')

        $artist = $text.append('p')
          .attr('class', 'unique-artist')

        const $play = $meta.append('button')
          .attr('class', 'play')

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
        $title.text(data[0].song)
        $artist.text(data[0].artist)

        $vizCont.selectAll('.uniqueName')
          .data(data)
          .join('p')
            .attr('class', 'uniqueName')
            .text(d => d.name)

				return Chart;
			},
			// get / set data
			data(val) {
				if (!arguments.length) return data;
				data = val.value.values;
				$sel.datum(data);
				Chart.render();
				return Chart;
			}
		};
		Chart.init();

		return Chart;
	}

	// create charts
	const charts = this.nodes().map(createChart);
	return charts.length > 1 ? charts : charts.pop();
};
