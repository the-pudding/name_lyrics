/* global d3 */
import './pudding-chart/letters-template'

// selections
const $section = d3.select('#letters')
const $figure = $section.selectAll('.section__figure-letters')

let data = []
let charts = []

function update(state){
  const trim = data.filter(d => state === 'true' ? d.person === 'TRUE' : d.person === 'FALSE')

  const nested = d3.nest()
    .key(d => d.pos)
    .entries(trim)

    console.log({state, trim, nested})

  charts.forEach((d, i) => {
    d.data(nested[i])
  })

}

function setup(){
  const trim = data.filter(d => d.person === 'TRUE')

  const nested = d3.nest()
    .key(d => d.pos)
    .entries(trim)

  const $sel = $figure
  charts = $sel
    .selectAll('.chart')
    .data(nested)
    .enter()
    .append('div')
    .attr('class', 'chart')
    .letters()
}

function resize() {}

function cleanData(arr){
	return arr.map((d, i) => {
		return {
			...d,
      dif: +d.dif
		}
	})
}

function loadData(){
	return new Promise((resolve, reject) => {
    d3.csv('assets/data/letters.csv')
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
