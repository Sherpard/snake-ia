import {SNAKE_HEADING} from '../enum/snake-heading.enum';
import {SnakeController} from './controller.interface';
export class HumanController implements SnakeController {
  private currentHeading: SNAKE_HEADING = SNAKE_HEADING.NORTH;

  constructor() {
    window.onkeydown = (e: KeyboardEvent) => this.onKeyDown(e);
  }

  public requestDirection(): SNAKE_HEADING {
    return this.currentHeading;
  }

  private onKeyDown(evt: KeyboardEvent): void {
    switch (evt.key) {
      case 'a':
        if (this.currentHeading === SNAKE_HEADING.WEST) {
          return;
        }
        this.currentHeading = SNAKE_HEADING.EAST;
        break;
      case 's':
        if (this.currentHeading === SNAKE_HEADING.NORTH) {
          return;
        }
        this.currentHeading = SNAKE_HEADING.SOUTH;
        break;
      case 'd':
        if (this.currentHeading === SNAKE_HEADING.EAST) {
          return;
        }
        this.currentHeading = SNAKE_HEADING.WEST;
        break;
      case 'w':
        if (this.currentHeading === SNAKE_HEADING.SOUTH) {
          return;
        }
        this.currentHeading = SNAKE_HEADING.NORTH;
        break;
    }
  }
}
