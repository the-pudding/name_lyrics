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
		let count = $sel.datum().value.count

		let selSection = $sel.attr('data-section')

		let colorScale = d3.scaleThreshold()
			.range(['#ffffff','#ffdcd9','#ffbab4','#ff938d','#fd6767'])
			.domain([3, 6, 9])
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

		let colors = ['']

		let playSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>'


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



				if (selSection == 'uniqueArtist'){
					$title = $text.append('p')
						.attr('class', 'unique-meta')
				} else {
					$title = $text.append('h3')
						.attr('class', 'unique-title')
				}

        $artist = $text.append('p')
          .attr('class', 'unique-artist')

				if (selSection != "uniqueArtist"){
					let $buttonCont = $meta.append('div')
	          .attr('class', 'playlist-button')

	        const $button = $buttonCont.append('button')
	          .attr('class', 'play')
	          .attr('role', 'switch')
	          .attr('aria-checked', 'false')
	          .attr('aria-labelledby', 'play-song')

					$button.node().disabled = true

					const file = data[0].song.toLowerCase().replace(/\s/g, '_').replace(/[^\w\s]/gi, '')

					 $button.html(playSVG)
						 .attr('data-file', file)
				}

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
				$artist.text(data[0].artist)
				if (selSection == 'uniqueArtist'){
					let ex = data[0]
					$title.text(`${count} names across ${ex.songs} songs`)
				} else {
					$title.text(data[0].song)
				}


        $vizCont.selectAll('.uniqueName')
          .data(data, d => d.name)
          .join(
            enter => enter.append('p')
            .call(enter => enter
              .style('opacity', 0)
              .transition()
              .duration(250)
              .style('opacity', '1')
              .style('color', '#FD6767')
              .transition()
              .duration(500)
              .style('color', d => {
								if (selSection == 'uniqueArtist'){
									return colorScale(d.names)
								} else return '#FFFFFF'
							})
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
