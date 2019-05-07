/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/

d3.selection.prototype.repeats = function init(options) {
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
    let $title = null
    let $artist = null
		let $button = null

		// scales
		const scaleX = null;
		const scaleY = null;

		// dom elements
		let $svg = null;
		let $axis = null;
		let $vis = null;

    let playSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>'

		// helper functions

		const Chart = {
			// called once at start
			init() {
				// setting up viz section
        $vizCont = $sel.append('div')
          .attr('class', 'chart__container')

        const $nameDet = $vizCont.append('div')
          .attr('class', 'name-details')

        $name = $nameDet.append('p')
          .attr('class', 'name')

        $count = $nameDet.append('p')
          .attr('class', 'count')

        $blockCont = $vizCont.append('div')
          .attr('class', 'block-container')

        // setting up metadata section
        $meta = $sel.append('div')
          .attr('class', 'meta__container')

        const $text = $meta.append('div')
          .attr('class', 'text-container')

        $title = $text.append('h3')
          .attr('class', 'repeat-title')

        $artist = $text.append('p')
          .attr('class', 'repeat-artist')

        let $buttonCont = $meta.append('div')
          .attr('class', 'playlist-button')

        $button = $buttonCont.append('button')
          .attr('class', 'play')
          .attr('role', 'switch')
          .attr('aria-checked', 'false')
          .attr('aria-labelledby', 'play-song')

				$button.node().disabled = true

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
        $title.text(data.song)
        $artist.text(data.artist)
        $name.text(data.name)
        $count.text(data.n)

				const file = data.song.toLowerCase().replace(/\s/g, '_').replace(/[^\w\s]/gi, '')

         $button.html(playSVG)
           .attr('data-file', file)

        const range = d3.range(data.n)

        $blockCont.selectAll('.repeat-block')
          .data(range, d => d)
          .join(enter => enter.append('div')
            .call(enter => enter
              .style('opacity', 0)
              .transition()
              .duration(250)
              .style('opacity', '1')
              .style('backgroundColor', '#FD6767')
              .transition()
              .duration(500)
              .style('backgroundColor', '#FFFFFF')
            ),
            update => update,
            exit => exit
              .style('opacity', 1)
              .call(exit => exit
                .transition()
                .duration(250)
                .style('opacity', '0')
                .remove()
              ))
            .attr('class', 'repeat-block')

				return Chart;
			},
			// get / set data
			data(val) {
				if (!arguments.length) return data;
				data = val;
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
