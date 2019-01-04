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

    this.currentFrame = this.frameNumber;
    this.previousFrameInfo = null;

    this.draw();
  },

  draw() {
    if (!this.reader) {
      return;
    }

    const { reader, image, context } = this;
    const { width, height } = image;

    const frameInfo = reader.frameInfo(this.currentFrame);

    if (this.currentFrame === 0) {
      // always clear canvas to start
      context.clearRect(0, 0, width, height);
    } else if (this.previousFrameInfo && this.previousFrameInfo.disposal === 2) {
      // disposal was "restore to background" which is essentially "restore to transparent"
      context.clearRect(this.previousFrameInfo.x,
                        this.previousFrameInfo.y,
                        this.previousFrameInfo.width,
                        this.previousFrameInfo.height);
    }

    // draw frame on top of existing canvas data
    const imageData = context.getImageData(0, 0, width, height);
    reader.decodeAndBlitFrameRGBA(this.currentFrame, imageData.data);
    context.putImageData(imageData, 0, 0);

    if (this.drawOnce) {
      // highlight the frame
      context.strokeStyle = '#FF0000';
      context.rect(frameInfo.x, frameInfo.y, frameInfo.width, frameInfo.height);
      context.stroke();
    } else {
      // get ready to draw next frame
      this.previousFrameInfo = frameInfo;
      this.currentFrame = (this.currentFrame + 1) % reader.numFrames();
      const draw = this.draw.bind(this);
      setTimeout(draw, frameInfo.delay * this.speed);
    }
  }
});
