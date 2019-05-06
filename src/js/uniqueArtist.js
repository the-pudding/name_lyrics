/* global d3 */
import './pudding-chart/unique-template'

// selections
const $section = d3.select('#unique')
const $figure = $section.selectAll('.section__figure-uniqueArtist')
const $uiChart = $figure.select('.chart__search')

let $resultSel = $uiChart.select('.search__result')
let $inputSel = $uiChart.select('.search__input')
let uniqueArtist = $uiChart.select('.unique-meta')
let $chartCont = null

let colorScale = d3.scaleThreshold()
  .range(['#ffffff','#ffdcd9','#ffbab4','#ff938d','#fd6767'])
  .domain([3, 6, 9])

let data = []
let lookup = []
let charts = []
let nested = []

function update(state){
  const trim = data.filter(d => state === 'true' ? d.person === 'TRUE' : d)

  nested = d3.nest()
    .key(d => d.artist)
    .rollup(leaves => {
      let count = leaves.length
      let sorted = leaves.sort((a, b) => d3.descending(a.names, b.names))
      return {count: count, values: sorted}
    })
    .entries(trim)
    .sort((a, b) => d3.descending(a.value.count, b.value.count))

  const sliced = nested
    .slice(0, 5)

  charts.forEach((d, i) => {
    d.data(sliced[i])
  })

}

function setup(){
  const trim = data.filter(d => d.person === 'TRUE')

  nested = d3.nest()
    .key(d => d.artist)
    .rollup(leaves => {
      let count = leaves.length
      let sorted = leaves.sort((a, b) => d3.descending(a.names, b.names))
      return {count: count, values: sorted}
    })
    .entries(trim)
    .sort((a, b) => d3.descending(a.value.count, b.value.count))

  const sliced = nested
    .slice(0, 5)

  const $sel = $figure
  charts = $sel
    .selectAll('.chart')
    .data(sliced)
    .enter()
    .append('div')
    .attr('class', 'chart')
    .attr('data-section', 'uniqueArtist')
    .unique()

  setupSearch()
}

function hideResult() {
	$resultSel.classed('is-visible', false);
	$resultSel.html('');
}

function handleResult(d){
  let uniqData = d.value.values
  uniqueArtist.classed('is-visible', true)
  uniqueArtist.text(`${d.value.count} names across ${d.value.values[0].songs} songs`)

  $chartCont.selectAll('.uniqueName')
    .data(uniqData, d => d.name)
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
        .style('color', d => colorScale(d.names))
      ),
      update => update
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

}

function handleSearch(){
  const value = this.value
  if (value.length > 1){
    const text = value.trim().toLowerCase()
    const re = new RegExp(`\\b${text}`)


    const results = nested
      .filter(d => d.key.toLowerCase().match(re))
      .slice(0, 5)


      uniqueArtist.classed('is-visible', false)

      if (!results.length) results.push({ key: 'No matches', empty: true });
  		const li = $resultSel.selectAll('li').data(results);

  		li.enter().append('li').merge(li).text(d => d.key).on('click', d => {
  			hideResult();

  			$inputSel.node().value = d.key;
  			if (!d.empty) handleResult(d);
  		});

  		li.exit().remove();
  		$resultSel.classed('is-visible', true);
  } else {
    hideResult()
  }
}

function setupSearch(){

  $inputSel.on('input', handleSearch)
  // add chart

  $chartCont = $uiChart.append('div')
    .attr('class', 'chart__container')

}

function resize() {}

function cleanData(arr){
	return arr.map((d, i) => {
		return {
			...d,
      names: +d.names,
      songs: +d.songs,
		}
	})
}

function loadData(){
	return new Promise((resolve, reject) => {
    d3.csv('assets/data/artist.csv')
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
        data = cleanData(response)
        setup()
        resolve()
      })
  })
}

export default { init, resize, update };
