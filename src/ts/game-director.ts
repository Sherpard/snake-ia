import {Board} from './board.class';
import {CanvasController} from './canvas-controller';
import {HumanController} from './controller/human-controller.class';
import {Point2D} from './point-2d.interface';
import {Snake} from './snake.class';

export class GameDirector {
  private readonly board: Board;
  private readonly apple: Point2D | null;
  private snake: Snake;

  private stopGame = false;

  constructor(width: number, heigth: number) {
    this.board = new Board(width, heigth);
    this.snake = new Snake(
      {x: width / 2, y: heigth / 2},
      new HumanController()
    );
    this.apple = null;
  }

  public shutdown(): void {
    this.stopGame = true;
  }
  public doTick(controller: CanvasController): boolean {
    if (this.stopGame) {
      return false;
    }
    this.snake.doTick();
    controller.drawFrame(this.board, this.snake, null);

    return true;
  }
}
