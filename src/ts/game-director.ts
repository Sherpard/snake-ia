import {RandomAppleSpawner} from './apple/random-apple-spawner';
import {BaseAppleSpawnStrategy} from './apple/base-apple-spawner';
import {Board} from './board.class';
import {CanvasController} from './canvas-controller';
import {HumanController} from './controller/human-controller.class';
import {Point2D} from './utils/point-2d.interface';
import {Snake} from './snake.class';
import {comparePoints} from './utils/point-2d.functions';

export class GameDirector {
  private readonly board: Board;
  private apple: Point2D | null;
  private snake: Snake;
  private appleSpawner: BaseAppleSpawnStrategy;
  private stopGame = false;

  constructor(width: number, heigth: number) {
    this.board = new Board(width, heigth);
    this.snake = new Snake(
      {x: width / 2, y: heigth / 2},
      new HumanController()
    );
    this.appleSpawner = new RandomAppleSpawner();
    this.apple = null;
    this.spawnApple();
  }

  public shutdown(): void {
    this.stopGame = true;
  }
  public doTick(controller: CanvasController): boolean {
    if (this.stopGame) {
      return false;
    }
    this.snake.doTick();

    if (
      this.apple !== null &&
      comparePoints(this.snake.getHead(), this.apple)
    ) {
      this.snake.grow();
      this.spawnApple();
    }

    controller.drawFrame(this.board, this.snake, this.apple);

    return true;
  }

  private spawnApple() {
    this.apple = this.appleSpawner.spawnApple(
      this.board,
      this.snake.getSnakeCoordinates()
    );
  }
}
