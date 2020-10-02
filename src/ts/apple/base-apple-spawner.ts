import {Board} from '../board.class';
import {Point2D} from '../utils/point-2d.interface';

export abstract class BaseAppleSpawnStrategy {
  public spawnApple(board: Board, snake: Point2D[]): Point2D | null {
    return this.doAppleSpawn(board, snake);
  }

  protected abstract doAppleSpawn(
    board: Board,
    snake: Point2D[]
  ): Point2D | null;
}
