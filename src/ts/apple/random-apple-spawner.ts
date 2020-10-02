import {Board} from '../board.class';
import {Point2D} from '../utils/point-2d.interface';
import {BaseAppleSpawnStrategy} from './base-apple-spawner';

export class RandomAppleSpawner extends BaseAppleSpawnStrategy {
  private readonly MAX_ATEMPTS = 10;

  protected doAppleSpawn(board: Board, snake: Point2D[]): Point2D | null {
    const maxX = board.getWidth() - 2; // Account for borders
    const maxY = board.getHeight() - 2; // Account for borders
    const snakeTiles: {[key: number]: {[key: number]: number}} = {};

    snake.forEach(segment => {
      if (snakeTiles[segment.x] === undefined) {
        snakeTiles[segment.x] = {};
      }
      snakeTiles[segment.x][segment.y] = 1;
    });

    let newX: number;
    let newY: number;
    let attempts = 0;
    do {
      newX = Math.floor(Math.random() * maxX) + 1;
      newY = Math.floor(Math.random() * maxY) + 1;
      attempts++;

      if (attempts > this.MAX_ATEMPTS) {
        return null;
      }
    } while (snakeTiles[newX] !== undefined && snakeTiles[newX][newY] === 1);
    return {x: newX, y: newY};
  }
}
