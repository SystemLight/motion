import {QuadraticObject} from "../interface/quadraticObject";


export class Ball extends QuadraticObject {

    color: string = "#333333";

    constructor(
        x: number = 0, y: number = 0,
        r: number = 10
    ) {
        super(x, y, r, r);
    }

    set r(val: number) {
        this.setHalfWH(val);
    }

    get r(): number {
        return this.halfW;
    }

    step(diffTime: number): void {
        // 速度：每毫秒多少像素
        this.x += this.vx * diffTime;
        this.y += this.vy * diffTime;
    }

    render(ctx: CanvasRenderingContext2D): void {
        let {x, y, r} = this;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

}
