import {boundary, Motion} from "../interface/motion";
import {Ball} from "./ball";


export class UniformMotion extends Motion<Ball> {

    ctx: CanvasRenderingContext2D | null;

    beforeStep?: () => void;
    afterStep?: () => void;

    constructor(
        public canvas: HTMLCanvasElement,
        public sizeX: boundary,
        public sizeY: boundary,
        public createQuadraticObject: () => Ball
    ) {
        super(sizeX, sizeY, createQuadraticObject);

        this.ctx = canvas.getContext("2d");
    }

    isOutside(): string {
        // 判断是否碰撞边界
        let {x, y} = this.quadraticObject.site;
        let r = this.quadraticObject.r;
        let _minX = this.sizeX.from + r;
        let _maxX = this.sizeX.to - r;
        let _minY = this.sizeY.from + r;
        let _maxY = this.sizeY.to - r;
        if (x < _minX) {
            return "left";
        }
        if (x > _maxX) {
            return "right";
        }
        if (y < _minY) {
            return "top";
        }
        if (y > _maxY) {
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
            this.ctx.clearRect(this.sizeX.from, this.sizeY.from, this.sizeX.to, this.sizeY.to);
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
            this.quadraticObject.site.y = this.sizeY.to - this.quadraticObject.r;
            if (this.quadraticObject.speed < 0.02) {
                this.pause();
            }
            this.quadraticObject.speed *= this.bounce;
        }
        super._afterStep();
    }
}
