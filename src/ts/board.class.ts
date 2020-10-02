import {Point2D} from './utils/point-2d.interface';

export class Board {
  private readonly width: number;
  private readonly height: number;

  private readonly tiles: BOARD_TILE[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.tiles = [];
    this.setupBoard();
  }

  private setupBoard(): void {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        if (j === 0) {
          this.tiles[i] = [];
        }
        if (
          i === 0 ||
          i === this.width - 1 ||
          j === 0 ||
          j === this.height - 1
        ) {
          this.tiles[i][j] = BOARD_TILE.WALL;
        } else {
          this.tiles[i][j] = BOARD_TILE.EMPTY_SPACE;
        }
      }
    }
  }

  public getHeight(): number {
    return this.height;
  }
  public getWidth(): number {
    return this.width;
  }

  public getTile(point: Point2D): BOARD_TILE {
    if (
      this.tiles[point.x] === undefined ||
      this.tiles[point.x][point.y] === undefined
    ) {
      throw Error('Invalid Tile');
    }
    return this.tiles[point.x][point.y];
  }
}

export enum BOARD_TILE {
  EMPTY_SPACE,
  WALL,
}
