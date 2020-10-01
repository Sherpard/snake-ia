import {GameDirector} from './game-director';
import {CanvasController} from './canvas-controller';

let controller: CanvasController;

const gameDirector: GameDirector = new GameDirector(80, 50);

let lastTick: number;
const FPS = 4;
const tickRate = 1000 / FPS;

export class Game {
  public doStuff(): void {
    console.info(1);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  controller = new CanvasController('snake');

  lastTick = new Date().getTime();

  window.requestAnimationFrame(gameLoop);
});

function gameLoop(): void {
  const currentMs: number = new Date().getTime();
  if (currentMs - lastTick >= tickRate) {
    gameDirector.doTick(controller);
    lastTick = currentMs;
  }

  window.requestAnimationFrame(gameLoop);
}
