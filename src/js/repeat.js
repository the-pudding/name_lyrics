/* global d3 */
import './pudding-chart/repeat-template'

// selections
const $section = d3.select('#repeat')
const $figure = $section.selectAll('.section__figure-repeat')

let data = []

function update(){

}

function setup(){
  const trim = data.slice(0, 12)
  console.log({trim})
  const $sel = $figure
  const charts = $sel
    .selectAll('.chart')
    .data(trim)
    .enter()
    .append('div')
    .attr('class', 'chart')
    .repeats()
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
    d3.csv('assets/data/repeats.csv')
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

export default { init, resize };
