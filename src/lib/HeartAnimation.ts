import {Ball} from '@/lib/Ball'
import {CanvasMotion} from '@/lib/CanvasMotion'
import {getHeartVectors} from '@/lib/utils'

export class HeartAnimation extends CanvasMotion {
  public ball?: Ball
  public track: { x: number, y: number }[]
  public step = 0 // 步进一帧时增加的速度，即加速度

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.initElement()
    this.track = getHeartVectors(60 * 5, 10, 200, -200)
  }

  initElement(): void {
    // 实现该方法，用来初始化所有动画过程中产生的二维对象
    this.ball = new Ball()
    this.ball.color = '#FF00FF'
  }

  stepFrame(): void {
    // 实现该方法，当动画步进一帧时要做的处理程序
    const ball = this.ball!
    this.step++
    if (this.step > this.track.length - 1) {
      this.stop()
      console.log('stop')
      this.fillHeart()
    } else {
      ball.x = this.track[this.step].x
      ball.y = this.track[this.step].y
    }
  }

  drawFrame(): void {
    // 实现该方法，当动画开始渲染和绘制一帧时要做的处理程序
    this.ball!.render(this.ctx)
  }

  fillHeart() {
    let {ctx} = this
    let data = getHeartVectors(60, 10, 200, -200)

    ctx.save()
    ctx.beginPath()
    data.forEach((v) => {
      ctx.lineTo(v.x, v.y)
    })
    ctx.fillStyle = '#00FF00'
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }

  loop(): void {
    this.nextFrame()
    if (this.isStop || this.isPause) {
      return
    }
    requestAnimationFrame(this._loop)
  }
}
