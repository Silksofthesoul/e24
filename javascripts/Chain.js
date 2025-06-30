'use strict';
(function () {
  if(!window.__lib) window.__lib = {};
  const {
    getCoordsByAngle,
    Line,
    rndInt,
  } = window.__lib;

  class Chain {

    x        = 0;
    y        = 0;
    length   = 0;
    count    = 30;
    #angle   = 0;
    segments = [];
    angleMutationFactor = 10;


    constructor(options) {
      const {
        angle  = 0,
        length = 0,
        x      = 0,
        y      = 0,
      } = options;

      this.x      = x;
      this.y      = y;
      this.length = length;
      this.#angle  = angle;
      this.init();
    }

    init() {
      this.segments = [];
      const length = this.length / this.count;
      let line = null
      for (let i = 0; i < this.count; i++) {
        const x = line ? line.x2 : this.x;
        const y = line ? line.y2 : this.y;
        line = this.addSegment({x, y, length, angle: rndInt( this.angle - this.angleMutationFactor, this.angle + this.angleMutationFactor )});
      }
      return this;
    }

    addSegment(options) {
      const line = new Line(options);
      this.segments.push(line);
      return line;
    }

    mutateChain() {
      let [nextX, nextY] = [null, null];
      this.segments.forEach(segment => {
        if(nextX && nextY) {
          segment.x = nextX;
          segment.y = nextY;
        }
        if(rndInt(1, 100) % 33 === 0) this.angleMutationFactor = rndInt(10, 45);
        segment.angle = rndInt( this.angle - this.angleMutationFactor, this.angle + this.angleMutationFactor);
        nextX = segment.x2;
        nextY = segment.y2;
      });
      return this;
    }

    render () {
      this.renderSegments();
      return this;
    }
    
    renderSegments() {
      this.segments.forEach(segment => segment.render());
    }

    set angle(angle) { this.#angle = ( angle % 360 ); }
    get angle() { return this.#angle; }
    get x2() { return getCoordsByAngle(this.x, this.y, this.angle, this.length).x; }
    get y2() { return getCoordsByAngle(this.x, this.y, this.angle, this.length).y; }

  };

  window.__lib.Chain = Chain;

})();
