import {Rectangle2D} from './rect-2d.interface';
import {Point2D} from './point-2d.interface';
export function comparePoints(p1: Point2D, p2: Point2D): boolean {
  return p1.x === p2.x && p1.y === p2.y;
}

export function isPointInsideRect(rect: Rectangle2D, point: Point2D): boolean {
  return (
    point.x > rect.x &&
    point.x < rect.width &&
    point.y > rect.y &&
    point.y < rect.height
  );
}
