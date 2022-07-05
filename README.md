# Motion

简易的物体运动描述模型

# Installation

```
git clone https://github.com/SystemLight/motion.git
```

# User Guide
```
Motion核心提供两个抽象类：

Motion：描述运动，包含运动开始，运动暂停，运动停止的实现，及其需要继承实现的抽象方法
QuadraticObject：描述二维物体


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


// 通过继承QuadraticObject创造一个Ball类
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
```

# Note

- motion指示对运动和物体做了最基本描述，复杂运动和物体需要在两个基本抽象类基础上继承描述，以方便更加强大的使用
- motion适用于多个不同物体及不同运动场景，单一物体的运动反而会复杂逻辑

# Resources

You can read [Motion Documentation](https://github.com/SystemLight/motion) online for more information.

# License

Motion uses the MIT license, see LICENSE file for the details.
