import RootApp from './modules/RootApp';

window.DEVICE_SCALE = window.devicePixelRatio || 1;

class App {
  constructor(){
    const rootApp = new RootApp();
    const container = document.getElementById('container');
    // メインのcanvasを差し込む
    container.appendChild(rootApp.view);
    container.style.background = 'white';
    rootApp.view.style.position = 'absolute';
    rootApp.view.style.top = 0;
    rootApp.view.style.left = 0;

    // リサイズイベント
    window.addEventListener('resize', function(){
      // なぜか２回動くようになっている
      setTimeout(rootApp.resize.bind(rootApp), 100);
      setTimeout(rootApp.resize.bind(rootApp), 200);
    });

  }
}

const app = new App();

