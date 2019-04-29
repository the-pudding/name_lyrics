/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/

d3.selection.prototype.letters = function init(options) {
	function createChart(el) {
		const $sel = d3.select(el);
    let position = $sel.datum().key
		let data = $sel.datum().values;
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
    let $leftCont = null
    let $rightCont = null
    let $leftBar = null
    let $rightBar = null

		// scales
		const scaleX = d3.scaleLinear();
		const scaleY = null;

		// dom elements
		let $svg = null;
		let $axis = null;
		let $vis = null;

		// helper functions

		const Chart = {
			// called once at start
			init() {
        // setting up metadata section
        $meta = $sel.append('div')
          .attr('class', 'meta__container')

        const $title = $meta.append('h3')
          .attr('class', 'letters-title')
          .text(position === 'first' ? 'Names that start with...' : 'Names that end with...')

        const $legend = $meta.append('div')
          .attr('class', 'letters-legend')

        $legend.append('p')
          .attr('class', 'letters-legend letters-legend-society')
          .text('More common in society')

        $legend.append('p')
          .attr('class', 'letters-legend letters-legend-song')
          .text('More common in songs')


				// setting up viz section
        $vizCont = $sel.append('div')
          .attr('class', 'chart__container')



				Chart.resize();
				Chart.render();
			},
			// on resize, update new dimensions
			resize() {
				// defaults to grabbing dimensions from container element
				width = $sel.node().offsetWidth - marginLeft - marginRight;
				height = $sel.node().offsetHeight - marginTop - marginBottom;

        scaleX
          .range([0, 125])
          .domain([0, 8.2])

				return Chart;
			},
			// update scales and render chart
			render() {
        $vizCont.selectAll('.letter-details')
          .data(data, d => {
            return d.letter
          })
          .join(
            enter => {
              $letterDet = enter.append('div')
                .attr('class', d => `letter-details letter-details-${d.letter}`)

              $leftCont = $letterDet.append('div')
                .attr('class', 'left-container')

              $leftBar = $leftCont.append('div')
                .attr('class', 'left-bar')
                .style('width', d => {
                  if (d.dif < 0) return `${scaleX(Math.abs(d.dif))}px`
                  else return '0px'
                })

              $letterDet.append('p')
                .attr('class', 'letter')
                .text(d => d.letter)

              $rightCont = $letterDet.append('div')
                .attr('class', 'right-container')

              $rightBar = $rightCont.append('div')
                .attr('class', 'right-bar')
                .style('width', d => {
                  if (d.dif > 0) return `${scaleX(d.dif)}px`
                  else return '0px'
                })
            },
            update => {
             update.select('.left-bar')
                .transition()
                .duration(500)
                .style('width', d => {
                  if (d.dif < 0) return `${scaleX(Math.abs(d.dif))}px`
                  else return '0px'
                })

              update.select('.right-bar')
                .transition()
                .duration(500)
                .style('width', d => {
                  if (d.dif > 0) return `${scaleX(d.dif)}px`
                  else return '0px'
                })

            }
          )

				return Chart;
			},
			// get / set data
			data(val) {
				if (!arguments.length) return data;
        position = val.key
				data = val.values;
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
