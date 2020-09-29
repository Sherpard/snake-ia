import {Point2D} from './point-2d.interface';
import {Board} from './board.class';

export class GameDirector {
  private readonly board: Board;
  private readonly apple: Point2D | null;

  private stopGame = false;

  constructor(width: number, heigth: number) {
    this.board = new Board(width, heigth);
    this.apple = null;
  }

  public shutdown(): void {
    this.stopGame = true;
  }
  public gameTick(): boolean {
    if (this.stopGame) {
      return false;
    }

    return true;
  }
}
