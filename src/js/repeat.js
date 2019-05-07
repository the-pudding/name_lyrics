/* global d3 */
import './pudding-chart/repeat-template'

// selections
const $section = d3.select('#repeat')
const $figureCont = $section.selectAll('.section__figure-repeat')
const $figure = $figureCont.selectAll('.section__figure-chart')
const $uiChart = $figure.select('.chart__search')

let $resultSel = $uiChart.select('.search__result')
let $inputSel = $uiChart.select('.search__input')
let $chartCont = $uiChart.select('.block-container')
let $name = $uiChart.select('.name')
let $count = $uiChart.select('.count')
let $artist = $uiChart.select('.repeat-artist')

let data = []
let charts = []
let trim = []

function update(state){
  trim = data.filter(d => state === 'true' ? d.person === 'TRUE' : d)

  const sliced = trim
    .slice(0, 12)

  charts.forEach((d, i) => {
    d.data(sliced[i])
  })

  setupSearch()
}

function setup(){
  trim = data.filter(d => d.person === 'TRUE')

  const sliced = trim
    .slice(0, 11)


  const $sel = $figure
  charts = $sel
    .selectAll('.chart')
    .data(sliced)
    .enter()
    .append('div')
    .attr('class', 'chart')
    .repeats()

  setupSearch()
}

function resize() {}

function hideResult() {
	$resultSel.classed('is-visible', false);
	$resultSel.html('');
}

function handleResult(d){
  $name.text(d.name)
  $count.text(d.n)
  $artist.text(d.artist)
    .classed('is-visible', true)
  const range = d3.range(d.n)

  $chartCont.selectAll('.repeat-block')
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
}

function handleSearch(){
  const value = this.value
  if (value.length > 1){
    const text = value.trim().toLowerCase()
    const re = new RegExp(`\\b${text}`)

    // hide artist
    $artist.classed('is-visible', false)


    const results = trim
      .filter(d => d.song.toLowerCase().match(re))
      .slice(0, 5)

      if (!results.length) results.push({ key: 'No matches', empty: true });
  		const li = $resultSel.selectAll('li').data(results);

  		li.enter().append('li').merge(li).text(d => d.song).on('click', d => {
  			hideResult();

  			$inputSel.node().value = d.song;
  			if (!d.empty) handleResult(d);
  		});

  		li.exit().remove();
  		$resultSel.classed('is-visible', true);
  } else {
    hideResult()
  }
}

function setupSearch(){
  // setup search
  $inputSel.on('input', handleSearch)
}

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

export default { init, resize, update };
