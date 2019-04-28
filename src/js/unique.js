/* global d3 */
import './pudding-chart/unique-template'

// selections
const $section = d3.select('#unique')
const $figure = $section.selectAll('.section__figure-unique')

let data = []
let charts = []

function update(state){
  const trim = data.filter(d => state === 'true' ? d.person === 'TRUE' : d)

  const nested = d3.nest()
    .key(d => d.song)
    .rollup(leaves => {
      let count = leaves.length
      return {count: count, values: leaves}
    })
    .entries(trim)
    .sort((a, b) => d3.descending(a.value.count, b.value.count))
    .slice(0, 8)

  charts.forEach((d, i) => {
    d.data(nested[i])
  })

}

function setup(){
  const trim = data.filter(d => d.person === 'TRUE')

  const nested = d3.nest()
    .key(d => d.song)
    .rollup(leaves => {
      let count = leaves.length
      return {count: count, values: leaves}
    })
    .entries(trim)
    .sort((a, b) => d3.descending(a.value.count, b.value.count))
    .slice(0, 8)

  const $sel = $figure
  charts = $sel
    .selectAll('.chart')
    .data(nested)
    .enter()
    .append('div')
    .attr('class', 'chart')
    .unique()
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
    d3.csv('assets/data/unique.csv')
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
