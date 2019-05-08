/* global d3 */
import debounce from 'lodash.debounce';
import EnterView from 'enter-view'
import isMobile from './utils/is-mobile';
import graphic from './graphic';
import footer from './footer';
import repeat from './repeat'
import unique from './unique'
import timeless from './timeless'
import letters from './letters'
import uniqueArtist from './uniqueArtist'
import popular from './popular'
import audio from './audio'

const $body = d3.select('body');
let previousWidth = 0;

function resize() {
  // only do resize on width changes, not height
  // (remove the conditional if you want to trigger on height change)
  const width = $body.node().offsetWidth;
  if (previousWidth !== width) {
    previousWidth = width;
    graphic.resize();
  }
}

function setupSectionEnter(){
	EnterView({
		selector: 'section',
		enter: el => {
      let id = el.id
      d3.selectAll('.section-link').classed('is-active', false)
      d3.select(`.section-link-${id}`).classed('is-active', true)
    },
    exit: el => {
      const active = d3.select('.section-link.is-active').node()
      const all = d3.selectAll('.section-link')

      all.classed('is-active', false)
      const nodes = all.nodes()
      const ar = nodes.indexOf(active) - 1
      const sel = d3.select(nodes[ar]).classed('is-active', true)
    },
		offset: 0.1,
		once: false
	})
}

function setupStickyHeader() {
  const $header = $body.select('header');
  if ($header.classed('is-sticky')) {
    const $menu = $body.select('.header__menu');
    const $toggle = $body.select('.header__toggle');
    $toggle.on('click', () => {
      const visible = $menu.classed('is-visible');
      $menu.classed('is-visible', !visible);
      $toggle.classed('is-visible', !visible);
    });
  }
}

function setupSidebarDrawer(){
  const $sidebar = d3.select('.sidebar')
  const $toggle = d3.select('.drawer__toggle')

  $sidebar.classed('is-visible', false)

  $toggle.on('click', () => {
    const visible = $sidebar.classed('is-visible')
    $sidebar.classed('is-visible', !visible)
    $toggle.classed('is-visible', !visible)
  })
}

function setupToggle(){
  const $toggle = $body.select('.filter')


  $toggle.on('click', function(){
    const el = d3.select(this)
    const aria = el.attr('aria-checked')
    if (aria === "false") el.attr('aria-checked', 'true')
    else if (aria === "true") el.attr('aria-checked', 'false')


    // update data in charts
    popular.update(aria);
    repeat.update(aria);
    unique.update(aria);
    uniqueArtist.update(aria);
    timeless.update(aria);
    letters.update(aria);
  })

}

function init() {
  // add mobile class to body tag
  $body.classed('is-mobile', isMobile.any());
  // setup resize event
  window.addEventListener('resize', debounce(resize, 150));
  // setup sticky header menu
  //setupStickyHeader();
  // kick off graphic code
  // setup data filtering toggle
  setupToggle()
  setupSidebarDrawer()
  setupSectionEnter()

  repeat.init();
  popular.init()
  unique.init();
  uniqueArtist.init()
  timeless.init();
  letters.init();
  audio.init();
  footer.init();

}

init();
