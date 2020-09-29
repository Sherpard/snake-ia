export class DrawSnake {
  private canvas: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;

  constructor() {
    const canvas: HTMLCanvasElement = document.getElementById(
      'snake',
    ) as HTMLCanvasElement;

    if (canvas === null) {
      throw Error('Canvas is null');
    }
    this.canvas = canvas;

    const context = canvas.getContext('2d');
    if (context === null) {
      throw Error('Context is null');
    }

    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 1;

    //  _ctx.drawImage(this.img, 0, 0);
    context.fillStyle = 'black';
    context.fillRect(0, 0, 500, 500);
    context.save();
    context.strokeStyle = 'red';
    context.translate(150, 180);
    context.rotate(Math.PI * (Math.random() * 0.5 + 1.25));
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(160, 0);
    //_ctx.closePath();
    context.stroke();
    context.restore();

    // window.requestAnimationFrame(this.draw.bind(this));
  }
}

document.addEventListener('DOMContentLoaded', () => new DrawSnake());
