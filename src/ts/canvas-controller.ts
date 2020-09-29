import {Board, BOARD_TILE} from './board.class';
import {Point2D} from './point-2d.interface';
import {Rectangle2D} from './rect-2d.interface';

export class CanvasController {
  private canvas: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;

  constructor(canvasId: string) {
    const canvas: HTMLCanvasElement = document.getElementById(
      canvasId
    ) as HTMLCanvasElement;
    if (canvas === null) {
      throw Error('Canvas is null');
    }
    this.canvas = canvas;

    const context = canvas.getContext('2d');
    if (context === null) {
      throw Error('Context is null');
    }
    this.context = context;
  }

  private resize(): void {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
  }

  private getTileSize(board: Board): Point2D {
    const hTiles = board.getHeight();
    const wTiles = board.getWidth();
    const height = this.canvas.height;
    const width = this.canvas.width;

    return {x: width / wTiles, y: height / hTiles};
  }

  public drawFrame(board: Board, snake: any, apple: Point2D | null) {
    this.resize();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const tileSize: Point2D = this.getTileSize(board);

    this.drawBoard(board, tileSize);
  }

  private getTilePosition(location: Point2D, tileSize: Point2D): Rectangle2D {
    return {
      x: location.x * tileSize.x,
      y: location.y * tileSize.y,
      width: (location.x + 1) * tileSize.x,
      height: (location.y + 1) * tileSize.y,
    };
  }

  private drawBoard(board: Board, tileSize: Point2D) {
    this.drawTile('#000', {
      x: 0,
      y: 0,
      height: window.innerHeight,
      width: window.innerWidth,
    });
    const h = board.getHeight();
    const w = board.getWidth();

    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        const tile = board.getTile({x, y});
        const tileLocation: Rectangle2D = this.getTilePosition(
          {x, y},
          tileSize
        );
        this.drawTile(
          tile === BOARD_TILE.EMPTY_SPACE ? '#000' : '#333',
          tileLocation
        );
      }
    }
  }

  private drawTile(color: string, tileLocation: Rectangle2D) {
    this.context.fillStyle = color;
    this.context.stroke();
    this.context.fillRect(
      tileLocation.x,
      tileLocation.y,
      tileLocation.width,
      tileLocation.height
    );
  }
}
