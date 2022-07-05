import {accuracy} from './utils'

// 定义一个二维物体的基类
export abstract class QuadraticObject {
  public vx = 0
  public vy = 0

  protected constructor(
    public x: number = 0,
    public y: number = 0,
    public halfW: number = 0,
    public halfH: number = 0
  ) {
  }

  setDirection(radian: number, speed: number) {
    // 拖过物体角度设置方向，角度可选范围0-360度
    this.vx = accuracy(Math.cos(radian) * speed)
    this.vy = accuracy(Math.sin(radian) * speed)
  }

  setXY(val: number) {
    this.x = val
    this.y = val
  }

  setHalfWH(val: number) {
    this.halfW = val
    this.halfH = val
  }

  abstract step(...args: any[]): void

  abstract render(...args: any[]): void
}

// 通过继承QuadraticObject创造一个Ball类
export class Ball extends QuadraticObject {
  color = '#333333'

  constructor(
    x = 0, y = 0,
    r = 10
  ) {
    super(x, y, r, r)
  }

  set r(val: number) {
    this.setHalfWH(val)
  }

  get r(): number {
    return this.halfW
  }

  step(diffTime: number): void {
    // 速度：每毫秒多少像素
    this.x += this.vx * diffTime
    this.y += this.vy * diffTime
  }

  render(ctx: CanvasRenderingContext2D): void {
    const {x, y, r} = this
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}
