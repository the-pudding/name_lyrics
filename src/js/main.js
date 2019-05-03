/* global d3 */
import debounce from 'lodash.debounce';
import isMobile from './utils/is-mobile';
import graphic from './graphic';
import footer from './footer';
import repeat from './repeat'
import unique from './unique'
import timeless from './timeless'
import letters from './letters'
import uniqueArtist from './uniqueArtist'

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

function setupToggle(){
  const $toggle = $body.select('.filter')


  $toggle.on('click', function(){
    const el = d3.select(this)
    const aria = el.attr('aria-checked')
    if (aria === "false") el.attr('aria-checked', 'true')
    else if (aria === "true") el.attr('aria-checked', 'false')


    // update data in charts
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
  graphic.init();
  footer.init();
  repeat.init();
  unique.init();
  uniqueArtist.init()
  timeless.init();
  letters.init()
}

init();
