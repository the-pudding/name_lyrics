/* global d3 */
/* usage
	import loadData from './load-data'
	loadData().then(result => {

	}).catch(console.error)
*/

function cleanData(arr){
	return arr.map((d, i) => {
		return {
			...d,
      year: +d.year
		}
	})
}

function loadA(file) {
  return new Promise((resolve, reject) => {
    d3.csv(`assets/data/${file}`)
      .then(result => {
        // clean here
        let data = cleanData(result)
        resolve(data);
      })
      .catch(reject);
  });
}

export default function loadData() {
  const loads = [loadA('popular.csv')];
  return Promise.all(loads);
}
