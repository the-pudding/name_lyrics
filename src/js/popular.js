/* global d3 */
import loadData from './load-data'

// selections
const $section = d3.select('#popular')
const $spark = $section.selectAll('.section__figure-popularSpark')
const $figure = $section.selectAll('.section__figure-popular')
const $uiChart = $figure.select('.ui__search')

let $resultSel = $uiChart.select('.search__result')
let $inputSel = $uiChart.select('.search__input')
let uniqueArtist = $uiChart.select('.unique-artist')
let $chartCont = null

let data = []
let charts = []
let nested = []

let scaleX = d3.scaleLinear()
  .range([0, 150])
  .domain([0, 169])

function update(state){
  const trim = data.filter(d => state === 'true' ? d.person === 'TRUE' : d)

  nested = d3.nest()
    .key(d => d.name)
    .rollup(leaves => {
      let count = leaves.length
      return {count: count, values: leaves}
    })
    .entries(trim)
    .sort((a, b) => d3.descending(a.value.count, b.value.count))

  const sliced = nested
    .slice(1, 11)

  setupSpark(sliced)

  // check to see if name has been entered
  const enteredName = $inputSel.node().value
  if (enteredName) {
    const filtered = nested.filter(d => d.key === enteredName)
    console.log({filtered})
    handleResult(filtered[0])
  }


}

function setup(){
  const trim = data.filter(d => d.person === 'TRUE')


  nested = d3.nest()
    .key(d => d.name)
    .rollup(leaves => {
      let count = leaves.length
      return {count: count, values: leaves}
    })
    .entries(trim)
    .sort((a, b) => d3.descending(a.value.count, b.value.count))

  const sliced = nested
    .slice(1, 11)

  setupSpark(sliced)
  //
  // const $sel = $figure
  // charts = $sel
  //   .selectAll('.chart')
  //   .data(sliced)
  //   .enter()
  //   .append('div')
  //   .attr('class', 'chart')
  //   .unique()

  setupSearch()
}

function setupSpark(dat){
  const mapped = dat.map(d => {
    return {key: d.key, count: d.value.count}
  })


  $spark.selectAll('.g-bar')
    .data(mapped)
    .join(
      enter => {
        const g = enter.append('div')
          .attr('class', 'g-bar')

        g.append('p')
          .attr('class', 'spark-name')
          .text(d => d.key)

        g.append('div')
          .attr('class', 'spark-bar')
          .style('width', d => `${scaleX(d.count)}px`)

        g.append('p')
          .attr('class', 'spark-count')
          .text(d => d.count)

      },
      update => {
        update.select('.spark-name')
          .text(d => d.key)

        update.select('.spark-bar')
          .transition()
          .duration(500)
          .style('width', d => `${scaleX(d.count)}px`)

        update.select('.spark-count')
          .text(d => d.count)
      }

    )
}

function hideResult() {
	$resultSel.classed('is-visible', false);
	$resultSel.html('');
}

function highlightName(name, text){
  const pattern = new RegExp(`((\\b)(${name})(\\b))`)
  const replaceWith = '<span>$1</span>'

  const rep = text.replace(pattern, replaceWith)
  return rep
}

function handleResult(d){
  let uniqData = d.value.values
  console.log(uniqData)

  $chartCont.selectAll('.playlist-item')
    .data(uniqData, d => d.name)
    .join(
      enter => {
        const g = enter.append('div')
          .attr('class', 'playlist-item')

        g.append('p')
          .attr('class', 'pop-lyrics')
          .html(d => `"${highlightName(d.name, d.sentence)}"`)

        const meta = g.append('div')
          .attr('class', 'pop-meta')

        meta.append('p')
          .attr('class', 'pop-song')
          .text(d => d.song)

        meta.append('p')
          .attr('class', 'pop-artist')
          .text(d => d.artist)

        meta.append('p')
          .attr('class', 'pop-year')
          .text(d => d.year)
      },
      update => {
        update.select('pop-lyrics')
          .html(d => `"${highlightName(d.name, d.sentence)}"`)

        update.select('pop-song')
          .text(d => d.song)

        update.select('pop-artist')
          .text(d => d.artist)

        update.select('pop-year')
          .text(d => d.year)
      },
      exit => exit.remove()

    )


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
        console.log({d})

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


function init() {
  return new Promise((resolve) => {
    loadData()
      .then(response => {
        data = response[0]
        setup()
        resolve()
      })
  })
}

export default { init, resize, update };
