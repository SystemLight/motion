import {Ball, QuadraticObject} from './quadraticObject'
import {angle2radian, bezier} from './utils'

export type range = {
  from: number,
  to: number
}

export type Point = {
  x: number,
  y: number
}

export type Points = Point[]

// 运动描述基类，所有运动必须实现Motion
export abstract class Motion {
  public isStop = false
  public isPause = false

  protected _diffTime: number | null = null
  protected _lastTime: number = new Date().getTime()

  protected _loop: () => void

  public constructor(
    public boundaryX: range,
    public boundaryY: range
  ) {
    this._loop = this.loop.bind(this)
  }

  set diffTime(v: number) {
    this._diffTime = v
  }

  get diffTime(): number {
    let diffTime
    if (this._diffTime) {
      diffTime = this._diffTime
      this._diffTime = null
    } else {
      diffTime = new Date().getTime() - this._lastTime
    }
    this._lastTime = new Date().getTime()
    return diffTime
  }

  public beforeStart(): void {
    // [钩子函数]，开始之前调用的函数
  }

  public beforeStop(): void {
    // [钩子函数]，停止之前调用的函数
  }

  public beforePause(): void {
    // [钩子函数]，暂停之前调用的函数
  }

  public beforeContinue(): void {
    // [钩子函数]，继续之前调用的函数
  }

  start(): void {
    // 开始运动
    this.beforeStart()
    this.stop()
    this.isStop = false
    this._lastTime = new Date().getTime()
    this.loop()
  }

  stop(): void {
    // 停止运动
    this.beforeStop()
    this.isStop = true
  }

  pause(): void {
    // 暂停运动
    this.beforePause()
    this.isPause = true
    this.diffTime = new Date().getTime() - this._lastTime
  }

  continue(): void {
    // 继续运动
    if (this.isPause) {
      this.beforeContinue()
      this.isPause = false
      this.loop()
    }
  }

  // 主循环实现方法
  abstract loop(): void
}

// 基于Canvas的运动描述
export abstract class CanvasMotion extends Motion {
  public ctx: CanvasRenderingContext2D

  public beforeStep?: () => void
  public afterStep?: () => void

  public constructor(
    public canvas: HTMLCanvasElement
  ) {
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

  abstract initElement(): void;

  abstract stepFrame(): void;

  abstract drawFrame(): void;
}

// 实现CanvasMotion的动画类，Animation不是一个通用类，它的实现即代表实际业务情况
export class BounceAnimation extends CanvasMotion {
  public ball?: Ball
  public accelerate = 0.02 // 步进一帧时增加的速度，即加速度
  public bounce = -0.8 // 弹力要在0-1之间，符号代表方向，-1即代表反方向全反射，无力衰减

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.initElement()
  }

  initElement(): void {
    // 实现该方法，用来初始化所有动画过程中产生的二维对象
    this.ball = new Ball()
    this.ball.setDirection(angle2radian(90), 0.2)
    this.ball.x = 100
    this.ball.y = 100
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
    (this.ball as Ball).vy += this.accelerate // 模拟垂直向下的重力加速度，根据加速度改变物体速度
  }

  stepFrame(): void {
    // 实现该方法，当动画步进一帧时要做的处理程序
    const ball = (this.ball as Ball)
    ball.step(this.diffTime)
  }

  protected _afterStep() {
    super._afterStep()
    const ball = (this.ball as Ball)
    if (this.isOutside(ball).length > 0) {
      // 边界触碰，让物体还原到边界边缘，阻止模型穿透
      ball.y = this.crashPosition(ball)[2]
      ball.vy *= this.bounce
    }
  }

  drawFrame(): void {
    // 实现该方法，当动画开始渲染和绘制一帧时要做的处理程序
    const ball = (this.ball as Ball)
    ball.render(this.ctx)
  }
}

export class CircleAnimation extends CanvasMotion {
  public ball?: Ball
  public accelerate = 1 // 步进一帧时增加的速度，即加速度
  public origin = {x: 150, y: 150}
  public motionRadius = 100 // 运动半径
  public xDomain = [
    this.origin.x - this.motionRadius,
    this.origin.x + this.motionRadius
  ]
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
    ball.y = this.direction * Math.sqrt(
      Math.pow(this.motionRadius, 2) -
      Math.pow(ball.x - this.origin.x, 2)
    ) + this.origin.y
  }

  drawFrame(): void {
    // 实现该方法，当动画开始渲染和绘制一帧时要做的处理程序
    this.ball!.render(this.ctx)
  }
}

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
    ball.x = elapsedTime / this.duration * (this.points[1].x - this.points[0].x) + this.points[0].x
    ball.y = elapsedTime / this.duration * (this.points[1].y - this.points[0].y) + this.points[0].y
  }

  drawFrame(): void {
    // 实现该方法，当动画开始渲染和绘制一帧时要做的处理程序
    this.ball!.render(this.ctx)
  }
}

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
    const xRatio = this.points[1].x - this.points[0].x
    const yRatio = this.points[1].y - this.points[0].y;
    [ball.x, ball.y] = bezier.threeBezier(
      elapsedTime / this.duration,
      [this.points[0].x, this.points[0].y],
      [this.points[0].x + xRatio * this.handle[0], this.points[0].y + yRatio * this.handle[1]],
      [this.points[0].x + xRatio * this.handle[2], this.points[0].y + yRatio * this.handle[3]],
      [this.points[1].x, this.points[1].y]
    )
  }

  drawFrame(): void {
    // 实现该方法，当动画开始渲染和绘制一帧时要做的处理程序
    this.ball!.render(this.ctx)
  }
}
