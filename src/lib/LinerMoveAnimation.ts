import type {Points} from '@/lib/common'
import {Ball} from '@/lib/Ball'
import {CanvasMotion} from '@/lib/CanvasMotion'

export class LinerMoveAnimation extends CanvasMotion {
  public ball?: Ball
  private _time = 0

  constructor(canvas: HTMLCanvasElement, public points: Points, public duration = 3) {
    super(canvas)
    this.initElement()
  }

  initElement(): void {
    // 实现该方法，用来初始化所有动画过程中产生的二维对象
    this.ball = new Ball()
  }

  public beforeStart() {
    super.beforeStart()
    this._time = Date.now()
  }

  stepFrame(): void {
    // 实现该方法，当动画步进一帧时要做的处理程序
    const elapsedTime = (Date.now() - this._time) / 1000
    if (elapsedTime > this.duration) {
      console.log('stop')
      this.stop()
    }

    const ball = this.ball!
    ball.x = (elapsedTime / this.duration) * (this.points[1].x - this.points[0].x) + this.points[0].x
    ball.y = (elapsedTime / this.duration) * (this.points[1].y - this.points[0].y) + this.points[0].y
  }

  drawFrame(): void {
    // 实现该方法，当动画开始渲染和绘制一帧时要做的处理程序
    this.ball!.render(this.ctx)
  }
}
