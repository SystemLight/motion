import {LinerMoveAnimation} from './core/motion'

// 创建一个canvas画布
function createCanvas(canGroup: HTMLElement, w = 500, h = 500) {
  const can = document.createElement('canvas')
  can.width = w
  can.height = h
  canGroup.appendChild(can)
  return can
}

// =====开启描述动画=====
new LinerMoveAnimation(
  createCanvas(document.body),
  [{x: 200, y: 200}, {x: 100, y: 50}],
  1
).start()
