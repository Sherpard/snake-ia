import {GameDirector} from './game-director';
import {CanvasController} from './canvas-controller';

let controller: CanvasController;

const gameDirector: GameDirector = new GameDirector(128, 64);

let lastTick: number;
const FPS = 16;
const tickRate = 1000 / FPS;

export class Game {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      controller = new CanvasController('snake');
      lastTick = new Date().getTime();
      window.requestAnimationFrame(() => this.gameLoop());
    });
  }
  private gameLoop(): void {
    const currentMs: number = new Date().getTime();
    if (currentMs - lastTick >= tickRate) {
      gameDirector.doTick(controller);
      lastTick = currentMs;
    }

    window.requestAnimationFrame(() => this.gameLoop());
  }
}

new Game();
