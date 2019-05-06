import {Howl, Howler} from 'howler';

const $buttons = d3.selectAll('button.play')

let songs = {}

const song = new Howl({
  src: ['assets/songs/baby.mp3', 'assets/songs/mary_mary.mp3'],
  autoplay: false,
  loop: false,
  volume: 0.5
})

const test = ['barbara_ann', 'bennie_and_the_jets', 'help_me_rhonda']

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
      })
    }

    const advance = err => {
      if (test.length) loadNext()
      else resolve()
    }

    loadNext();
  })
}

function play(){
  songs.barbara_ann.play()
  console.log(songs)
}

function pause(){}

function init(){
  return new Promise((resolve) => {
    loadFiles()
      .then(play)
  })
}

export default {init, play, pause}
