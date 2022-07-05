import {BezierMoveAnimation} from './core/motion'

// 创建一个canvas画布
function createCanvas(canGroup: HTMLElement, w = 500, h = 500) {
  const can = document.createElement('canvas')
  can.width = w
  can.height = h
  canGroup.appendChild(can)
  return can
}

// =====开启描述动画=====
new BezierMoveAnimation(
  createCanvas(document.body),
  [{x: 0, y: 0}, {x: 100, y: 100}],
  [0, 0, 1, 1],
  1
).start()
