import {CanvasMotion} from "../interface/motion";
import {Ball} from "./ball";
import {angle2radian} from "../tool/utils";


// 实现CanvasMotion的动画类，Animation不是一个通用类，它的实现即代表实际业务情况
export class Animation extends CanvasMotion {

    public ball?: Ball;

    initElement(): void {
        // 实现该方法，用来初始化所有动画过程中产生的二维对象
        this.ball = new Ball();
        this.ball.setDirection(angle2radian(90), 0.2);
        this.ball.x = 100;
        this.ball.y = 100;
    }

    stepFrame(): void {
        // 实现该方法，当动画步进一帧时要做的处理程序
        let ball = (this.ball as Ball);
        ball.step(this.diffTime);
        if (this.isOutside(ball).length > 0) {
            ball.vx *= -1;
            ball.vy *= -1;
        }
    }

    drawFrame(): void {
        // 实现该方法，当动画开始渲染和绘制一帧时要做的处理程序
        let ball = (this.ball as Ball);
        ball.render(this.ctx);
    }

}
