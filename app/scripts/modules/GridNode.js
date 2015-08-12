import PIXI from 'pixi.js';
const GridNodeRatio = 1;
const GridNodeCounty = 0;
const GridNodeSize = 600;

class GridNode extends PIXI.Container{
  constructor(){
    super();

    this.points = [];

    const ratio = 1;
    const height = 300;
    for(var i = 0; 4 > i; i++){
      var graphics = new PIXI.Graphics();
      graphics.x = i % 2 * height * ratio;
      graphics.y = (i / 2 | 0) * height * ratio;
      // 第三引数のｚは深さをランダムで定義
      this.points.push(new Point(graphics.x, graphics.y, 10 * Math.random()));
    }

    let g = new PIXI.Graphics();
    g.lineStyle(2, 0xFF00FF, 1);
    g.beginFill(0xFF44BB, 0.25);
    g.drawRoundedRect(0, 0, 100, 100, 15);
    g.endFill();
    this.addChild(g);
  }
  /**
   * グリッドを移動
   */
  update(){
    // this.spring.update();
    for(let i = 0; i < this.points.length; i++){
      const point = this.points[i];
      point.x = point.home.x + this.position.x;
      point.y = point.home.y + this.position.y;
      point.z = point.home.z - 100 + (Math.sin(.003 * (point.x + GridNodeCounty) + Math.PI / 4) * Math.cos(.003 * (point.y + GridNodeCounty)) * 50 - 25) * GridNodeRatio * 1;
      // console.log(point);
    }
    // var centerY = (this.points[1].z + this.points[2].z) / 2;
    // if(this.isOpen){
    // MeshAnimator.applyAnimation(window.blend, this.openRatio);
    // this.points[7].z = centerY + this.spring.x;
    // this.updateHitArea();
    // }
  }

}
export default GridNode;

/**
 * x, z, y の座標を設定
 * @param x
 * @param y
 * @param z
 * @param opt_d
 * @constructor
 */
var Point = function(x, y, z, opt_d){
  if(!opt_d){
    x += 30 * (Math.random() - 0.5);
    y += 30 * (Math.random() - 0.5);
  }
  this.x = x;
  this.y = y;
  this.z = z;
  this.connections = [];
  this.offset = Math.random();
  this.home = new PIXI.Point(x, y);
  this.home.z = z;
};
