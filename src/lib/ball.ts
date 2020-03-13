import {QuadraticObject} from "../interface/quadraticObject";


export class Ball extends QuadraticObject {

    color: string;

    constructor(x: number = 0, y: number = 0, r: number = 10) {
        super(x, y, 2 * r, 2 * r);

        this.color = "#333333";
    }

    set r(v: number) {
        this.size = {
            w: v * 2,
            h: v * 2
        };
    }

    get r(): number {
        return this.size.w / 2;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        let {x, y} = this.site;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(x, y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    step(diffTime: number): void {
        // 速度：每毫秒多少像素
        let {x, y} = this.site;
        this.site = {
            x: x + this.vx * diffTime,
            y: y + this.vy * diffTime
        };
    }

}
