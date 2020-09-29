import {CanvasController} from './canvas-controller';
import {Board} from './board.class';

let board: Board;
let controller: CanvasController;

export class Game {
  public doStuff(): void {
    console.info(1);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  controller = new CanvasController('snake');
  board = new Board(15, 15);

  window.requestAnimationFrame(gameLoop);
});

function gameLoop(): void {
  controller.drawFrame(board, {}, null);

  window.requestAnimationFrame(gameLoop);
}
