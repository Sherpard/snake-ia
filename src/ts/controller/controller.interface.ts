import {SNAKE_HEADING} from '../enum/snake-heading.enum';

export interface SnakeController {
  requestDirection(): SNAKE_HEADING;
}
