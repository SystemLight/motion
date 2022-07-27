import {BezierMoveAnimation} from '@/lib/BezierMoveAnimation'

// 创建一个canvas画布
function createCanvas(canGroup: HTMLElement, w = 500, h = 500) {
  const can = document.createElement('canvas')
  can.width = w
  can.height = h
  canGroup.appendChild(can)
  return can
}

const canvas = createCanvas(document.body)

// =====开启描述动画=====
new BezierMoveAnimation(
  canvas,
  [
    {x: 10, y: 10},
    {x: 100, y: 100}
  ],
  [.91, .05, .97, .17],
  1
).start()
