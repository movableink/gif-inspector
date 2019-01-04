import Component from '@ember/component';
import { computed } from '@ember/object';

const disposals = ['unspecified', 'do not dispose', 'restore to background', 'restore to previous'];

export default Component.extend({
  localPalette: computed('reader', 'frame', function() {
    return this.reader.framePalette(this.frame.index);
  }),

  frameDelay: computed('frame.delay', function() {
    return this.frame.delay * 10;
  }),

  disposalName: computed('frame.disposal', function() {
    return disposals[this.frame.disposal];
  })
});
