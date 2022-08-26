// 基于Canvas的运动描述
import {QuadraticObject} from '@/lib/QuadraticObject'
import {Motion} from '@/lib/Motion'

export abstract class CanvasMotion extends Motion {
  public ctx: CanvasRenderingContext2D

  public beforeStep?: () => void
  public afterStep?: () => void

  public constructor(public canvas: HTMLCanvasElement) {
    super({from: 0, to: canvas.width}, {from: 0, to: canvas.height})

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      // eslint-disable-next-line new-cap
      throw TypeError('无法获取CanvasRenderingContext2D对象')
    }
    this.ctx = ctx
  }

  public isOutside(qo: QuadraticObject): Array<string> {
    // 判断二维物体是否碰撞边界
    const {x, y, halfW, halfH} = qo
    const {boundaryX, boundaryY} = this
    const crash: string[] = []
    if (x - halfW < boundaryX.from) {
      crash.push('left')
    }
    if (x + halfW > boundaryX.to) {
      crash.push('right')
    }
    if (y - halfH < boundaryY.from) {
      crash.push('top')
    }
    if (y + halfH > boundaryY.to) {
      crash.push('bottom')
    }
    return crash
  }

  public beforeStart(): void {
    this.initElement()
  }

  protected _beforeStep(): void {
    // [钩子函数]，物体步进之前执行的函数
    this.beforeStep && this.beforeStep()
  }

  protected _afterStep(): void {
    // [钩子函数]，物体步进之后执行的函数
    this.afterStep && this.afterStep()
  }

  loop(): void {
    this.clearFrame()
    this.nextFrame()
    if (this.isStop || this.isPause) {
      return
    }
    requestAnimationFrame(this._loop)
  }

  public clearFrame() {
    this.ctx.clearRect(this.boundaryX.from, this.boundaryY.from, this.boundaryX.to, this.boundaryY.to)
  }

  public nextFrame() {
    this._beforeStep()
    this.stepFrame()
    this._afterStep()
    this.drawFrame()
  }

  abstract initElement(): void

  abstract stepFrame(): void

  abstract drawFrame(): void
}
