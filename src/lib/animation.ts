import {range, Motion} from "../interface/motion";
import {Ball} from "./ball";
import TWEEN from '@tweenjs/tween.js'


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

    isOutside(): Array<string> {
        // 判断是否碰撞边界
        let {x, y} = this.quadraticObject.site;
        let crash = [];
        if (x < this.crashX.from) {
            crash.push("left");
        }
        if (x > this.crashX.to) {
            crash.push("right");
        }
        if (y < this.crashY.from) {
            crash.push("top");
        }
        if (y > this.crashY.to) {
            crash.push("bottom");
        }
        return crash;
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
        // 设定：只受垂直
        this.quadraticObject.vx += 0;
        this.quadraticObject.vy += this.accelerate;
        super._beforeStep();
    }
}

export class BounceMotion extends AccelerateMotion {
    bounce: number = -0.5;

    protected _afterStep(): void {
        let crash = this.isOutside();
        // if (crash.includes("left")) {
        //     this.quadraticObject.site.x = this.crashX.from;
        //     this.quadraticObject.vx *= this.bounce;
        // }
        // if (crash.includes("right")) {
        //     this.quadraticObject.site.x = this.crashX.to;
        //     this.quadraticObject.vx *= this.bounce;
        // }
        if (crash.includes("top")) {
            this.quadraticObject.site.y = this.crashY.from;
            this.quadraticObject.vy *= this.bounce;
        }
        if (crash.includes("bottom")) {
            this.quadraticObject.site.y = this.crashY.to;
            this.quadraticObject.vy *= this.bounce;
        }
        super._afterStep();
    }
}

export class TweenMotion extends Motion<Ball> {

    ctx: CanvasRenderingContext2D | null;

    constructor(
        public canvas: HTMLCanvasElement,
        public boundaryX: range,
        public boundaryY: range,
        public createQuadraticObject: () => Ball
    ) {
        super(boundaryX, boundaryY, createQuadraticObject);

        this.ctx = canvas.getContext("2d");
    }

    loop(): void {
        if (this.ctx) {
            this.ctx.clearRect(this.boundaryX.from, this.boundaryY.from, this.boundaryX.to, this.boundaryY.to);
            TWEEN.update();
            this.quadraticObject.draw(this.ctx);
            if (this.isStop || this.isPause) {
                return;
            }
            requestAnimationFrame(this._loop);
        }
    }
}
