import {Range} from '@/lib/common'

// 运动描述基类，所有运动必须实现Motion
export abstract class Motion {
  public isStop = false
  public isPause = false

  protected _diffTime: number | null = null
  protected _lastTime: number = new Date().getTime()

  protected _loop: () => void

  public constructor(
    public boundaryX: Range,
    public boundaryY: Range
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
