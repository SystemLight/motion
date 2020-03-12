import {Ball} from "./ball";


export function createMotion(canvasId, motion, ballOpt) {
    let opt = Object.assign({
        speed: 0.3,
        directionAngle: 90
    }, ballOpt);

    let canvas;
    if (typeof canvasId === "string") {
        canvas = document.getElementById(canvasId);
    } else {
        canvas = canvasId;
    }

    let ctx = canvas.getContext("2d");

    return new motion(ctx, canvas, function () {
        let ball = new Ball();
        ball.speed = opt.speed; // 设置小球速度，每毫秒0.3个像素
        ball.setDirectionAngle(opt.directionAngle);// 设置小球方向
        ball.x = canvas.width / 2 - ball.r; // 设置小球x起点坐标
        return ball;
    })
}

export class Motion {

    constructor(ctx, canvas, createBall) {
        this.createBall = createBall;
        this.ball = null;

        this.ctx = ctx;
        this.canvas = canvas;

        this.y = {
            origin: 0,
            end: canvas.height
        };
        this.x = {
            origin: 0,
            end: canvas.width
        };

        this.startTime = new Date().getTime();
        this.requesId = null;
        this._isStop = false;
        this._isPause = false;

        this._saveDiffTime = null;

        Reflect.defineProperty(this, "saveDiffTime", {
            set: (v) => {
                this._saveDiffTime = v;
            },
            get: () => {
                let diffTime = this._saveDiffTime;
                this._saveDiffTime = null;
                return diffTime;
            }
        });

        this._loop = this.loop.bind(this);
    }

    loop() {
        this.ctx.clearRect(this.x.origin, this.y.origin, this.x.end, this.y.end);
        let time = this.saveDiffTime || (new Date().getTime() - this.startTime);
        this.startTime = new Date().getTime();
        this.draw(time);
        if (!this._isStop) {
            this.requesId = requestAnimationFrame(this._loop);
        }
    }

    start(startTime) {
        this.stop();
        this.ball = this.createBall();
        this.startTime = startTime || new Date().getTime();
        this._isStop = false;
        this.loop();
    }

    stop() {
        this.ball = null;
        this._isStop = true;
        cancelAnimationFrame(this.requesId);
        this.ctx.clearRect(this.x.origin, this.y.origin, this.x.end, this.y.end);
    }

    pause() {
        this._isStop = true;
        this._isPause = true;
        this.saveDiffTime = new Date().getTime() - this.startTime;
        cancelAnimationFrame(this.requesId);
    }

    continue() {
        if (this._isPause) {
            this._isStop = false;
            this._isPause = false;
            this.loop();
        }
    }

    isCrossBorder() {
        if (this.ball.x < 0) {
            return 0;
        }

        if (this.ball.y < 0) {
            return 1;
        }

        if (this.ball.x > this.canvas.width - this.ball.r) {
            return 2;
        }

        if (this.ball.y > this.canvas.height - this.ball.r) {
            return 3;
        }

        return -1;
    }

    draw(time) {

    }

    _drawTitle(content) {
        this.ctx.save();
        this.ctx.font = "bold 50px arial";
        let {width} = this.ctx.measureText(content);
        this.ctx.fillStyle = "#00BFFF";
        this.ctx.fillText(content, this.x.end / 2 - width / 2, 50);
        this.ctx.restore();
    }
}

export class UniformMotion extends Motion {

    constructor(ctx, canvas, ball) {
        super(ctx, canvas, ball);

        this.beforeBallStep = null;
        this.afterBallStep = null;
    }

    drawTitle() {
        super._drawTitle("匀速运动");
    }

    _beforeBallStep() {
        // 想要改变ball的速度等有关位置的属性需要在beforeBallStep中实现
        this.beforeBallStep && this.beforeBallStep();
    }

    _afterBallStep() {
        // 想要直接改变ball的位置属性需要在afterBallStep中实现
        this.afterBallStep && this.afterBallStep();
    }

    draw(time) {
        this.drawTitle();
        this._beforeBallStep();
        this.ball.step(time);
        this._afterBallStep();
        this.ball.draw(this.ctx);
    }
}

export class AccelerateMotion extends UniformMotion {
    constructor(ctx, canvas, ball) {
        super(ctx, canvas, ball);

        this.accelerate = 0.01;
    }

    drawTitle() {
        super._drawTitle("加速运动")
    }

    _beforeBallStep() {
        super._beforeBallStep();
        this.ball.speed += this.accelerate;
    }
}

export class BounceMotion extends AccelerateMotion {
    constructor(ctx, canvas, ball) {
        super(ctx, canvas, ball);

        this.bounce = -0.8;
    }

    drawTitle() {
        super._drawTitle("弹性运动");
    }

    _afterBallStep() {
        super._afterBallStep();
        if (this.isCrossBorder() > -1) {
            // 当触碰边界时，让ball贴合边界
            this.ball.y = this.y.end - this.ball.r;
            this.ball.speed *= this.bounce;
            this.ball.speed > -0.03 && this.pause();
        }
    }
}