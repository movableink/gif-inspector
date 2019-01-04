import Component from '@ember/component';

export default Component.extend({
  speed: 10,
  tagName: 'span',

  didInsertElement() {
    this.image = this.element.querySelector('.gif-player');
    this.context = this.image.getContext('2d');

    if (typeof(this.frameNumber) !== 'undefined') {
      this.drawOnce = true;
    } else {
      this.frameNumber = 0;
    }

    this.draw();
  },

  draw() {
    if (!this.reader) {
      return;
    }

    const { reader, image, context } = this;
    const { width, height } = image;

    const frameNum = ++this.frameNumber % reader.numFrames();
    const frameInfo = reader.frameInfo(frameNum);

    if (frameNum === 0 || frameInfo.disposal === 2 /* restore to bg */) {
      context.clearRect(0, 0, width, height);
    }

    const imageData = context.getImageData(0, 0, width, height);
    reader.decodeAndBlitFrameRGBA(frameNum, imageData.data);
    context.putImageData(imageData, 0, 0);

    if (this.drawOnce) {
      context.strokeStyle = '#FF0000';
      context.rect(frameInfo.x, frameInfo.y, frameInfo.width, frameInfo.height);
      context.stroke();
    } else {
      const draw = this.draw.bind(this);
      setTimeout(draw, frameInfo.delay * this.speed);
    }
  }
});
