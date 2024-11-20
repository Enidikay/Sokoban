export default class Drawer {
    private ctx: CanvasRenderingContext2D;
    private scale: number;
  
    constructor(width: number, height: number, scale: number = 10) {
      this.scale = scale;
      const canvas = document.createElement('canvas');
      canvas.width = width * this.scale;
      canvas.height = height * this.scale;
      this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      document.body.appendChild(canvas);
    }
  
    public clear():void {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  
    public drawRectangle(x: number, y: number, color: string):void {
      this.ctx.beginPath();
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);
    }
  
    public drawCircle(x: number, y: number, color: string):void {
      this.ctx.beginPath();
      this.ctx.fillStyle = color;
      this.ctx.arc(x * this.scale + this.scale / 2, y * this.scale + this.scale / 2, this.scale / 2, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }