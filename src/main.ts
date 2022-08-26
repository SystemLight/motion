import {HeartAnimation} from '@/lib/HeartAnimation'

// 创建一个canvas画布
function createCanvas(canGroup: HTMLElement, w = 500, h = 500) {
  const can = document.createElement('canvas')
  can.width = w
  can.height = h
  canGroup.appendChild(can)
  return can
}

const canvas = createCanvas(document.body)

// =====开启动画描述=====
new HeartAnimation(
  canvas
).start()
