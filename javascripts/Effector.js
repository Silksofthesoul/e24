'use strict';
(function () {
  if(!window.__lib) window.__lib = {};
  const {
    Chain,
    rndInt,
  } = window.__lib;

  class Effector {

    x        = 0;
    y        = 0;
    length   = 0;
    height   = 0;
    count    = 30;
    chains   = [];


    constructor(options) {
      const {
        length = 0,
        height = 0,
        x      = 0,
        y      = 0,
        count  = 30,
      } = options;

      this.x      = x;
      this.y      = y;
      this.height = height;
      this.length = length;
      this.count  = count;
      this.init();
    }

    init() {
      this.chains = [];
      let y = this.y;
      for (let i = 0; i < this.count; i++) {
        const angle = i % 2 ? 90 : -90;
        const x = i % 2 ? this.x : this.x + this.length;
        y = i === 0 ? y : y + ( this.height / this.count );
        const chain = new Chain({x, y, length: this.length, angle});
        this.chains.push(chain);
      }
      return this;
    }

    mutate() {
      this.chains.forEach(chain => {
        stroke('black');
        chain.mutateChain() 
        if(rndInt(1, 100) % 33 == 0) stroke(`rgba(0, 0, ${ rndInt(0, 255) }, 1)`);
        if(rndInt(1, 100) % 66 == 0) stroke(`rgba(${ rndInt(0, 255) }, 0, 0, 1)`);
      });
      return this;
    }

    render () {
      this.chains.forEach(chain => chain.render());
      return this;
    }

  };

  window.__lib.Effector = Effector;

})();
