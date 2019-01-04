import Component from '@ember/component';
import { computed, set } from '@ember/object';
import { GifReader } from 'omggif';

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const arrayBuffer = e.target.result;
      resolve(new Uint8Array(arrayBuffer));
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export default Component.extend({
  reader: null,

  frames: computed('reader', function() {
    let frames = [];

    if (this.reader) {
      for(let i = 0; i < this.reader.numFrames(); i++) {
        frames.push(Object.assign(this.reader.frameInfo(i), { index: i }));
      }
    }

    return frames;
  }),

  globalPalette: computed('reader', function() {
    return this.reader.globalPalette() || [];
  }),

  backgroundColor: computed('reader', 'globalPalette', function() {
    if (!this.globalPalette) {
      return { r: 0, g: 0, b: 0, a: 0 };
    }

    return this.globalPalette[this.reader.background_index];
  }),

  loopCount: computed('reader', function() {
    return this.reader.loopCount();
  }),

  parseGif(array) {
    set(this, 'array', array);
    set(this, 'reader', new GifReader(array));
  },

  actions: {
    async processGif(e) {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];

        const array = await readFile(file);
        set(this, 'name', file.name);
        this.parseGif(array);
      }
    }
  }
});
