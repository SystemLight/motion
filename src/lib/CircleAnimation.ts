import {Ball} from '@/lib/Ball'
import {CanvasMotion} from '@/lib/CanvasMotion'

export class CircleAnimation extends CanvasMotion {
  public ball?: Ball
  public accelerate = 1 // 步进一帧时增加的速度，即加速度
  public origin = {x: 150, y: 150}
  public motionRadius = 100 // 运动半径
  public xDomain = [this.origin.x - this.motionRadius, this.origin.x + this.motionRadius]
  public motionX = this.xDomain[0]
  public direction = 1

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.initElement()
  }

  initElement(): void {
    // 实现该方法，用来初始化所有动画过程中产生的二维对象
    this.ball = new Ball()
  }

  stepFrame(): void {
    // 实现该方法，当动画步进一帧时要做的处理程序
    const ball = this.ball!
    this.motionX += this.accelerate
    if (this.motionX >= this.xDomain[1] || this.motionX <= this.xDomain[0]) {
      this.direction *= -1
      this.accelerate *= -1
      this.motionX += this.accelerate
    }
    ball.x = this.motionX
    //（x-a）²+（y-b）²= r²
    ball.y =
      this.direction * Math.sqrt(Math.pow(this.motionRadius, 2) - Math.pow(ball.x - this.origin.x, 2)) + this.origin.y
  }

  drawFrame(): void {
    // 实现该方法，当动画开始渲染和绘制一帧时要做的处理程序
    this.ball!.render(this.ctx)
  }
}
