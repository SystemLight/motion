import {QuadraticObject} from "./quadraticObject";

export type range = {
    from: number,
    to: number
};

// 运动描述基类，所有运动必须实现Motion
export abstract class Motion {
    public isStop: boolean = false;
    public isPause: boolean = false;

    protected _diffTime: number | null = null;
    protected _lastTime: number = new Date().getTime();

    protected _loop: () => void;

    public constructor(
        public boundaryX: range,
        public boundaryY: range
    ) {
        this._loop = this.loop.bind(this);
    }

    set diffTime(v: number) {
        this._diffTime = v;
    }

    get diffTime(): number {
        let diffTime;
        if (this._diffTime) {
            diffTime = this._diffTime;
            this._diffTime = null;
        } else {
            diffTime = new Date().getTime() - this._lastTime;
        }
        this._lastTime = new Date().getTime();
        return diffTime;
    }

    public beforeStart(): void {
        // [钩子函数]，开始之前调用的函数
    }

    public beforeStop(): void {
        // [钩子函数]，停止之前调用的函数
    }

    public beforePause(): void {
        // [钩子函数]，暂停之前调用的函数
    }

    public beforeContinue(): void {
        // [钩子函数]，继续之前调用的函数
    }

    start(): void {
        // 开始运动
        this.beforeStart();
        this.stop();
        this.isStop = false;
        this._lastTime = new Date().getTime();
        this.loop();
    }

    stop(): void {
        // 停止运动
        this.beforeStop();
        this.isStop = true;
    }

    pause(): void {
        // 暂停运动
        this.beforePause();
        this.isPause = true;
        this.diffTime = new Date().getTime() - this._lastTime;
    }

    continue(): void {
        // 继续运动
        if (this.isPause) {
            this.beforeContinue();
            this.isPause = false;
            this.loop();
        }
    }

    // 主循环实现方法
    abstract loop(): void
}

// 基于Canvas的运动描述
export abstract class CanvasMotion extends Motion {
    public ctx: CanvasRenderingContext2D;

    public beforeStep?: () => void;
    public afterStep?: () => void;

    public constructor(
        public canvas: HTMLCanvasElement
    ) {
        super({from: 0, to: canvas.width}, {from: 0, to: canvas.height});

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            // eslint-disable-next-line new-cap
            throw TypeError("无法获取CanvasRenderingContext2D对象");
        }
        this.ctx = ctx;

        this.initElement();
    }

    public isOutside(qo: QuadraticObject): Array<string> {
        // 判断二维物体是否碰撞边界
        const {x, y, halfW, halfH} = qo;
        const {boundaryX, boundaryY} = this;
        const crash = [];
        if (x - halfW < boundaryX.from) {
            crash.push("left");
        }
        if (x + halfW > boundaryX.to) {
            crash.push("right");
        }
        if (y - halfH < boundaryY.from) {
            crash.push("top");
        }
        if (y + halfH > boundaryY.to) {
            crash.push("bottom");
        }
        return crash;
    }

    public beforeStart(): void {
        this.initElement();
    }

    protected _beforeStep(): void {
        // [钩子函数]，物体步进之前执行的函数
        this.beforeStep && this.beforeStep();
    }

    protected _afterStep(): void {
        // [钩子函数]，物体步进之后执行的函数
        this.afterStep && this.afterStep();
    }

    loop(): void {
        this.clearFrame();
        this.nextFrame();
        if (this.isStop || this.isPause) {
            return;
        }
        requestAnimationFrame(this._loop);
    }

    public clearFrame() {
        this.ctx.clearRect(this.boundaryX.from, this.boundaryY.from, this.boundaryX.to, this.boundaryY.to);
    }

    public nextFrame() {
        this._beforeStep();
        this.stepFrame();
        this._afterStep();
        this.drawFrame();
    }

    abstract initElement(): void;

    abstract stepFrame(): void;

    abstract drawFrame(): void;
}
