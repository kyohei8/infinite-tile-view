import PIXI from 'pixi.js';
import Grid from './Grid';

class RootApp{
  constructor(){
    this.setupPixi();
  }

  setupPixi(){
    // const backgroundColor = 0xff00ff;
    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
      backgroundColor: 0xeeeeee,
      antialias      : true
    });
    this.view = this.renderer.view;
    this.view.style.position = 'absolute';
    this.stage = new PIXI.Container();
    // start animating
    this.animate();

    // grid
    this.grid = new Grid();
    this.stage.addChild(this.grid);
    this.grid.rebuildGrid();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.stage);
  }

  resize(){
    const dpr = window.devicePixelRatio;
    const w = window.innerWidth;
    const h = window.innerHeight;

    if((this.renderer.width !== w || this.renderer.height !== h)){
      this.renderer.resize(w * dpr, h * dpr);
    }

    this.renderer.view.style.width = w + 'px';
    this.renderer.view.style.height = h + 'px';
  }
}
export default RootApp;
