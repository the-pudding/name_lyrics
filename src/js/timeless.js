/* global d3 */
import './pudding-chart/timeless-template'

// selections
const $section = d3.select('#timeless')
const $figure = $section.selectAll('.section__figure-timeless')

let data = []
let charts = []
let highlightedName = 'Mary'

function update(state){
  const trim = data.filter(d => state === 'true' ? d.person === 'TRUE' : d.person === 'FALSE')

  const nested = d3.nest()
    .key(d => d.decade)
    .sortKeys(d3.ascending)
    .entries(trim)

  charts.forEach((d, i) => {
    d.data(nested[i])
  })

  highlight()

}

function highlight(){
  charts.forEach((d, i) => {
    d.highlight(highlightedName)
  })
}

function setup(){
  const trim = data.filter(d => d.person === 'TRUE')

  const nested = d3.nest()
    .key(d => d.decade)
    .sortKeys(d3.ascending)
    .entries(trim)



  const $sel = $figure

  // add number column
  const count = $sel.append('div')
    .attr('class', 'chart chart-count')

  count.selectAll('.rank')
    .data(d3.range(10))
    .enter()
    .append('p')
    .text(d => d + 1)
    .attr('class', 'timelessName')

  charts = $sel
    .selectAll('.chart')
    .data(nested)
    .enter()
    .append('div')
    .attr('class', 'chart')
    .timeless()

  highlight()
}

function resize() {}

function cleanData(arr){
	return arr.map((d, i) => {
		return {
			...d,
      n: +d.n
		}
	})
}

function loadData(){
	return new Promise((resolve, reject) => {
    d3.csv('assets/data/decade.csv')
      .then(response => {
          data = cleanData(response)
          resolve(data)
        })
      .catch(error => console.log("error loading data"))
		})
}

function init() {
  return new Promise((resolve) => {
    loadData()
      .then(response => {
        setup()

        resolve()
      })
  })
}

export default { init, resize, update };
