import {Ball} from '@/lib/Ball'
import {CanvasMotion} from '@/lib/CanvasMotion'

export class InertialAnimation extends CanvasMotion {
  public ball?: Ball
  public inertance = 1.2
  private _fv = 28 // 如果使用鼠标事件，这是move的两次触发间距差
  private _friction = 0
  private _absFriction = 0

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.initElement()
  }

  initElement(): void {
    // 实现该方法，用来初始化所有动画过程中产生的二维对象
    this.ball = new Ball()
    this.ball.x = 20
    this.ball.y = 20
  }

  public beforeStart() {
    super.beforeStart()
    this._friction = ((this._fv >> 31) * 2 + 1) * this.inertance // 根据力度套用公式计算出惯性大小,公式要记住
    this._absFriction = Math.abs(this._friction)
  }

  stepFrame(): void {
    this._fv -= this._friction // 力度按 惯性的大小递减
    this.ball!.x = this._fv + this.ball!.x
    if (Math.abs(this._fv) < this._absFriction) { // 如果力度减小到小于1了,结束,或者边界弹回
      console.log('stop')
      this.stop()
    }
  }

  drawFrame(): void {
    // 实现该方法，当动画开始渲染和绘制一帧时要做的处理程序
    this.ball!.render(this.ctx)
  }
}
