import PIXI from 'pixi.js';
import GridNode from './GridNode';

class Grid extends PIXI.Container{
  constructor(){
    super();

    this.gridContainer = new PIXI.Container();
    this.gridContainer.hitArea = new PIXI.Rectangle(-10000, -10000, 10000, 10000);
    this.gridContainer.interactive = true;
    // this.gridContainer.mousemove = this.gridContainer.touchmove = this.onMouseMove.bind(this);
    this.addChild(this.gridContainer);


    this.gridElements = [];
    this.gridNodePool = [];

  }

  /**
   * グリッドの更新処理
   * this.camera.x,y が動くのでその位置にグリッドを移動する
   */
  updateGrid(){
    //console.log('updateGrid');
    this.county += 0.03;
    // this.updateMovement();
    const len = 32;
    const gridSizeX = this.squareWidth * this.gridWidth;
    const gridSizeY = this.squareHeight * this.gridHeight;
    const gridCenterX = -gridSizeX / 2;
    const gridCenterY = -gridSizeY / 2;

    //console.log(gridSizeX, gridSizeY, gridCenterX, gridCenterY);

    //
    // グリッドを移動
    for(let i = 0; i < this.gridTotal; i++){
      const grid = this.gridElements[i];
      const xPos = grid.point.x * this.squareWidth; //+ this.camera.x;
      const yPos = grid.point.y * this.squareHeight; // + this.camera.y;
      //console.log(i, grid.point.x, '*', this.squareWidth, '+',this.camera.x, xPos);
      //console.log(i, grid.point.y, '*', this.squareHeight, '+',this.camera.y,  yPos);
      // 塊での移動量
      let pageX = Math.floor(xPos / gridSizeX);
      //console.log(xPos, gridSizeX, xPos / gridSizeX);
      pageX *= this.gridWidth;
      pageX *= -1;

      let pageY = Math.floor(yPos / gridSizeY);
      pageY *= this.gridHeight;
      pageY *= -1;
      pageX += grid.point.x;
      pageY += grid.point.y;
      let x = 0, y = 0;
      // X位置を設定
      grid.position.x = xPos - x;

      //if(i === 0){console.log('================='); console.log(grid.position.x);}
      grid.position.x %= gridSizeX;
      //if(i === 0){console.log(grid.position.x);}
      // ここで元に戻す
      if(grid.position.x < 0){
        grid.position.x += gridSizeX;
      }
      //if(i === 0){console.log(grid.position.x);}
      grid.position.x += gridCenterX;
      //if(i === 0){console.log(grid.position.x);}

      // X位置を設定
      grid.position.y = yPos - y;
      grid.position.y %= gridSizeY;
      if(grid.position.y < 0){
        grid.position.y += gridSizeY;
      }

      grid.position.y += gridCenterY;

      grid.position.x += x;
      grid.position.y += y;
      // console.log(grid.position);
      // debugger;
    }

    for(let r = 0; r < this.gridTotal; r++){
      const grid = this.gridElements[r];
      grid.update();
    }
    結局３角形を作らないといけない・・・
    /*
    if(window.WEBGL){
      for(const r = 0; r < this.gridTotal; r++){
        const node = this.gridElements[r];
        node.updateTriangles();
      }
    }else if(!this.shut){
      for(const r = 0; r < this.gridTotal; r++){
        const node = this.gridElements[r];
        node.updateTrianglesCanvas();
      }
    }
    this.gridRenderer.light.x = 0;
    this.gridRenderer.light.y = 0;
    this.gridRenderer.light.z = 200 + this.camera.z;

    GridNode.targetPoint.x = this.camera.x;
    GridNode.targetPoint.y = this.camera.y;
    this.camera.z = this.realCameraZ - 1400 * this.zoom;
    */
  }

  updateTransform(){
    // console.log('updateTransform');
    this.updateGrid();
  }

  rebuildGrid(){
    console.log('rebuild');

    const w = window.innerWidth;
    const h = window.innerHeight;
    //  this.gridRenderer.w = w;
    // this.gridRenderer.h = h;
    this.screenWidth = w / window.DEVICE_SCALE;
    this.screenHeight = h / window.DEVICE_SCALE;
    this.squareWidth = 300;
    this.squareHeight = 300;
    // 縦横の個数を定義
    let columnSize = Math.ceil(this.screenWidth / this.squareWidth) + 1 + 4 + 2;
    let rowSize = Math.ceil(this.screenHeight / this.squareHeight) + 4 + 2;
    // 偶数になるようにする
    if(columnSize % 2){
      columnSize--;
    }
    if(rowSize % 2){
      rowSize--;
    }
    // （隠れている部分も含め）表示するグリッドの数？
    this.gridWidth = columnSize;
    this.gridHeight = rowSize;

    console.log(columnSize, rowSize);
    // 元のグリッドを削除
    for(let j = 0; j < this.gridTotal; j++){
      const item = this.gridElements[j];
      this.gridContainer.removeChild(item);
      this.gridNodePool.push(item);
    }
    // gridElementsを初期化
    this.gridElements = [];
    this.gridTotal = this.gridWidth * this.gridHeight;
    // 中心点を設定
    this.gridContainer.position.x = w / 2;
    this.gridContainer.position.y = h / 2;
    this.gridContainer.scale.set(window.DEVICE_SCALE);
    // 行x列分のグリッドの生成
    for(let i = 0; i < this.gridTotal; i++){
      // 前回のgridデータから取得
      let grid = this.gridNodePool.pop();
      // 足りない場合は新たに生成
      if(!grid){
        grid = new GridNode();
        grid.label = new PIXI.Text('hi');
        grid.label.anchor.set(.5);
        grid.label.position.set(100, 100);
        grid.label.scale.set(.5);
        // grid.click = grid.tap = this.onGridItemSelected.bind(this);
      }

      // グリッドの位置を設定
      grid.point = new PIXI.Point(i % this.gridWidth, Math.floor(i / this.gridWidth));

      this.gridElements.push(grid);
      // ここでaddしている
      this.gridContainer.addChild(grid);

    }
    console.log(this.gridElements.length);
  }
}
export default Grid;
