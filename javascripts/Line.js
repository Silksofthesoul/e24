'use strict';
(function () {
  if(!window.__lib) window.__lib = {};
  const {
    getCoordsByAngle,
  } = window.__lib;

  class Line {

    x        = 0;
    y        = 0;
    length   = 0;
    #angle   = 0;


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
    }

    render () {
      line(this.x, this.y, this.x2, this.y2);
    }

    set angle(angle) { this.#angle = ( angle % 360 ); }
    get angle() { return this.#angle; }
    get x2() { return getCoordsByAngle(this.x, this.y, this.angle, this.length).x; }
    get y2() { return getCoordsByAngle(this.x, this.y, this.angle, this.length).y; }

  };

  window.__lib.Line = Line;

})();
