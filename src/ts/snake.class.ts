import {SnakeController} from './controller/controller.interface';
import {SNAKE_HEADING} from './enum/snake-heading.enum';
import {Point2D} from './point-2d.interface';
export class Snake {
  private readonly coordinates: Point2D[];

  private head: Point2D;
  private bearing: SNAKE_HEADING;
  private readonly controller: SnakeController;

  constructor(startPosition: Point2D, controller: SnakeController) {
    this.coordinates = [
      startPosition,
      {x: 0, y: 0},
      {x: 0, y: 0},
      {x: 0, y: 0},
      {x: 0, y: 0},
    ];
    this.head = startPosition;
    this.bearing = SNAKE_HEADING.WEST;
    this.controller = controller;
  }

  public getSnakeCoordinates(): Point2D[] {
    return [...this.coordinates];
  }

  public getHead(): Point2D {
    return this.getHead();
  }

  public doTick(): void {
    this.coordinates.pop();
    this.moveHead();
    this.bearing = this.controller.requestDirection();

    this.coordinates.unshift(this.head);
  }

  private moveHead(): void {
    const headPosition = {x: this.head.x, y: this.head.y};
    switch (this.bearing) {
      case SNAKE_HEADING.NORTH:
        headPosition.y--;
        break;
      case SNAKE_HEADING.SOUTH:
        headPosition.y++;
        break;
      case SNAKE_HEADING.WEST:
        headPosition.x++;
        break;
      case SNAKE_HEADING.EAST:
        headPosition.x--;
        break;
    }

    this.head = headPosition;
  }
}
