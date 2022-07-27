import {gsap} from 'gsap'

import type {Points} from '@/lib/common'
import {CanvasMotion} from '@/lib/CanvasMotion'
import {Ball} from '@/lib/Ball'
import {bezier} from '@/lib/utils'

// https://cubic-bezier.com/#.17,.67,.83,.67
export class BezierMoveAnimation extends CanvasMotion {
  public ball?: Ball
  private _time = 0

  constructor(
    canvas: HTMLCanvasElement,
    public points: Points,
    public handle: number[] = [0.5, 0.5, 0.5, 0.5],
    public duration = 3
  ) {
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

    // 旧版算法
    // const xRatio = this.points[1].x - this.points[0].x
    // const yRatio = this.points[1].y - this.points[0].y;
    // [ball.x, ball.y] = bezier.threeBezier(
    //   elapsedTime / this.duration,
    //   [this.points[0].x, this.points[0].y],
    //   [this.points[0].x + xRatio * this.handle[0], this.points[0].y + yRatio * this.handle[1]],
    //   [this.points[0].x + xRatio * this.handle[2], this.points[0].y + yRatio * this.handle[3]],
    //   [this.points[1].x, this.points[1].y]
    // )

    // gsap算法
    const handle: number[] = [0, 0, 0, 0]
    handle[0] = gsap.utils.mapRange(
      0, 1,
      this.points[0].x, this.points[1].x,
      this.handle[0]
    )
    handle[1] = gsap.utils.mapRange(
      0, 1,
      this.points[0].y, this.points[1].y,
      this.handle[1]
    )
    handle[2] = gsap.utils.mapRange(
      0, 1,
      this.points[0].x, this.points[1].x,
      this.handle[2]
    )
    handle[3] = gsap.utils.mapRange(
      0, 1,
      this.points[0].y, this.points[1].y,
      this.handle[3]
    );
    [ball.x, ball.y] = bezier.threeBezier(
      elapsedTime / this.duration,
      [this.points[0].x, this.points[0].y],
      [handle[0], handle[1]],
      [handle[2], handle[3]],
      [this.points[1].x, this.points[1].y]
    )
  }

  drawFrame(): void {
    // 实现该方法，当动画开始渲染和绘制一帧时要做的处理程序
    this.ball!.render(this.ctx)
  }
}
