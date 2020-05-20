import {CanvasMotion} from "../interface/motion";
import {Ball} from "./ball";
import {angle2radian} from "../tool/utils";


// 实现CanvasMotion的动画类，Animation不是一个通用类，它的实现即代表实际业务情况
export class Animation extends CanvasMotion {

    public ball?: Ball;
    public accelerate = 0.02; // 步进一帧时增加的速度，即加速度
    public bounce = -0.8; // 弹力要在0-1之间，符号代表方向，-1即代表反方向全反射，无力衰减

    initElement(): void {
        // 实现该方法，用来初始化所有动画过程中产生的二维对象
        this.ball = new Ball();
        this.ball.setDirection(angle2radian(90), 0.2);
        this.ball.x = 100;
        this.ball.y = 100;
    }

    crashPosition(ball: Ball) {
        return [
            this.boundaryY.from + ball.r,
            this.boundaryX.to - ball.r,
            this.boundaryY.to - ball.r,
            this.boundaryX.from + ball.r
        ]
    }

    protected _beforeStep() {
        super._beforeStep();
        (this.ball as Ball).vy += this.accelerate; // 模拟垂直向下的重力加速度，根据加速度改变物体速度
    }

    stepFrame(): void {
        // 实现该方法，当动画步进一帧时要做的处理程序
        let ball = (this.ball as Ball);
        ball.step(this.diffTime);
    }

    protected _afterStep() {
        super._afterStep();
        let ball = (this.ball as Ball);
        if (this.isOutside(ball).length > 0) {
            // 边界触碰，让物体还原到边界边缘，阻止模型穿透
            ball.y = this.crashPosition(ball)[2];
            ball.vy *= this.bounce;
        }
    }

    drawFrame(): void {
        // 实现该方法，当动画开始渲染和绘制一帧时要做的处理程序
        let ball = (this.ball as Ball);
        ball.render(this.ctx);
    }

}
