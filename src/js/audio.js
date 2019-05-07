import {Howl, Howler} from 'howler';

const $buttons = d3.selectAll('button.play')

let songs = {}
let prevButton = null
let prevSong = null
let currentButton = null
let currentSong = null

let playSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>'
let pauseSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>'

const song = new Howl({
  src: ['assets/songs/baby.mp3', 'assets/songs/mary_mary.mp3'],
  autoplay: false,
  loop: false,
  volume: 0.5
})

const test = ['baby', 'barbara_ann', 'bennie_and_the_jets', 'cocktales', 'do_the_john_wall', 'dreams',
 'help_me_rhonda', 'floy_joy', 'going_back_to_cali', 'hello_kitty', 'i_do_the_rock', 'london_bridge', 'marco_polo', 'martians_vs_goblins',
'mary_mary', 'mickey', 'molly', 'scotty_doesnt_know', 'smooth_criminal', 'vogue', 'we_didnt_start_the_fire', 'wild_wild_west']

function loadFiles(){
  return new Promise((resolve, reject) => {
    const path = 'assets/songs'
    const loadNext = () => {
      const f = test.pop()
      const t = new Howl({
        src: `${path}/${f}.mp3`,
        onload: () => {
          songs[f] = t
          advance();
        },
        onloaderror: advance,
        onend: () => uncheckAria(currentButton)
      })
    }

    const advance = err => {
      if (test.length) loadNext()
      else resolve()
    }

    loadNext();
  })
}

function setupButtons(){
  const $buttons = d3.selectAll('button.play')
    $buttons.on('click', function(){
      prevButton = currentButton
      // if at least one song has already been played
      if (prevButton) {
        prevSong = prevButton.attr('data-file')
      }

      // if another song is still playing, pause it
      if (prevSong && songs[prevSong].playing()) {
        songs[prevSong].stop()
        uncheckAria(prevButton)
      }

      currentButton = d3.select(this)
      currentSong = currentButton.attr('data-file')
      const aria = currentButton.attr('aria-checked')

      if (prevSong == currentSong || songs[currentSong].playing()){
        songs[currentSong].stop()
        uncheckAria(currentButton)
      }
      else {
        songs[currentSong].play()
        checkAria()
      }
  })
}

function uncheckAria(btn){
  btn.attr('aria-checked', false)
    .html(playSVG)
}

function checkAria(){
  currentButton.attr('aria-checked', true)
    .html(pauseSVG)
}

function play(){
  songs.barbara_ann.play()
  console.log(songs)
}

function pause(){}

function init(){
  return new Promise((resolve) => {
    loadFiles()
      .then(setupButtons)
  })
}

export default {init, play, pause}
