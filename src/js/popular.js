/* global d3 */

// selections
const $section = d3.select('#popular')
const $spark = $section.selectAll('.section__figure-popularSpark')
const $figure = $section.selectAll('.section__figure-popular')
const $uiChart = $figure.select('.chart__search')

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

    console.log({nested, sliced})
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
  console.log({dat})


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
  console.log({dat, mapped})
}

function hideResult() {
	$resultSel.classed('is-visible', false);
	$resultSel.html('');
}

function handleResult(d){
  let uniqData = d.value.values
  uniqueArtist.classed('is-visible', true)
  uniqueArtist.text(d.value.values[0].artist)

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
        .style('color', '#FFFFFF')
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
      year: +d.year
		}
	})
}

function loadData(){
	return new Promise((resolve, reject) => {
    d3.csv('assets/data/popular.csv')
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
