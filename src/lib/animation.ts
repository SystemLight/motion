import {range, Motion} from "../interface/motion";
import {Ball} from "./ball";


export class UniformMotion extends Motion<Ball> {

    ctx: CanvasRenderingContext2D | null;

    beforeStep?: () => void;
    afterStep?: () => void;

    constructor(
        public canvas: HTMLCanvasElement,
        public boundaryX: range,
        public boundaryY: range,
        public createQuadraticObject: () => Ball
    ) {
        super(boundaryX, boundaryY, createQuadraticObject);

        this.ctx = canvas.getContext("2d");
    }

    get crashX(): range {
        let {from, to} = this.boundaryX;

        return {
            from: from + this.quadraticObject.r,
            to: to - this.quadraticObject.r,
        }
    }

    get crashY(): range {
        let {from, to} = this.boundaryY;

        return {
            from: from + this.quadraticObject.r,
            to: to - this.quadraticObject.r,
        }
    }

    isOutside(): string {
        // 判断是否碰撞边界
        let {x, y} = this.quadraticObject.site;
        if (x < this.crashX.from) {
            return "left";
        }
        if (x > this.crashX.to) {
            return "right";
        }
        if (y < this.crashY.from) {
            return "top";
        }
        if (y > this.crashY.to) {
            return "bottom";
        }
        return "";
    }

    protected _beforeStep(): void {
        this.beforeStep && this.beforeStep();
    }

    protected _afterStep(): void {
        this.afterStep && this.afterStep();
    }

    loop(): void {
        if (this.ctx) {
            this.ctx.clearRect(this.boundaryX.from, this.boundaryY.from, this.boundaryX.to, this.boundaryY.to);
            this._beforeStep();
            this.quadraticObject.step(this.diffTime);
            this._afterStep();
            this.quadraticObject.draw(this.ctx);
            if (this.isStop || this.isPause) {
                return;
            }
            requestAnimationFrame(this._loop);
        } else {
            this.stop();
        }
    }
}

export class AccelerateMotion extends UniformMotion {

    accelerate: number = 0.03;

    protected _beforeStep(): void {
        this.quadraticObject.speed += this.accelerate;
        super._beforeStep();
    }
}

export class BounceMotion extends AccelerateMotion {
    bounce: number = -0.8;

    protected _afterStep(): void {
        if (this.isOutside()) {
            this.quadraticObject.site.y = this.crashY.to;
            if (this.quadraticObject.speed < 0.02) {
                this.pause();
            }
            this.quadraticObject.speed *= this.bounce;
        }
        super._afterStep();
    }
}
