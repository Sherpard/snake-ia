import {Board, BOARD_TILE} from './board.class';
import {Point2D} from './point-2d.interface';
import {Rectangle2D} from './rect-2d.interface';
import {Snake} from './snake.class';

export class CanvasController {
  private canvas: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;
  private readonly DRAW_COORDINATES = false;
  private readonly DRAW_BORDERS = false;
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

    return {x: Math.round(width / wTiles), y: Math.round(height / hTiles)};
  }

  public drawFrame(board: Board, snake: Snake, apple: Point2D | null): void {
    this.resize();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const tileSize: Point2D = this.getTileSize(board);

    this.drawBoard(board, tileSize);
    this.drawApple(apple, tileSize);
    this.drawSnake(snake, tileSize);
  }

  private getTilePosition(location: Point2D, tileSize: Point2D): Rectangle2D {
    return {
      x: location.x * tileSize.x,
      y: location.y * tileSize.y,
      width: tileSize.x,
      height: tileSize.y,
    };
  }

  private drawSnake(snake: Snake, tileSize: Point2D): void {
    snake
      .getSnakeCoordinates()
      .map(x => this.getTilePosition(x, tileSize))
      .forEach(x => this.drawTile('#00AA00', x));
  }

  private drawApple(apple: Point2D | null, tileSize: Point2D) {
    if (apple === null) {
      return;
    }
    this.drawTile('#FF0000', this.getTilePosition(apple, tileSize));
  }

  private drawBoard(board: Board, tileSize: Point2D): void {
    this.context.clearRect(0, 0, window.innerHeight, window.innerWidth);

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
          tile === BOARD_TILE.EMPTY_SPACE ? '#333' : '#000',
          tileLocation
        );
      }
    }
  }

  private drawTile(color: string, tileLocation: Rectangle2D): void {
    this.context.fillStyle = color;
    this.context.strokeStyle = '#00FF00';

    this.context.beginPath();

    this.context.rect(
      tileLocation.x,
      tileLocation.y,
      tileLocation.width,
      tileLocation.height
    );
    this.context.fill();
    if (this.DRAW_BORDERS) {
      this.context.stroke();
    }
    this.context.closePath();

    this.drawCordinates(tileLocation);
  }

  private drawCordinates(tileLocation: Rectangle2D): void {
    if (!this.DRAW_COORDINATES) {
      return;
    }
    this.context.font = '16px sans-serif';
    const text = `${tileLocation.x}x${tileLocation.y}`;

    this.context.strokeText(text, tileLocation.x, tileLocation.y + 25);
    this.context.strokeText(text, tileLocation.x, tileLocation.y + 50);
  }
}
