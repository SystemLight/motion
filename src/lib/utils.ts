export function accuracy(number: number, fractionDigits = 2): number {
  return parseFloat(number.toFixed(fractionDigits))
}

export function angle2radian(angle: number): number {
  return (Math.PI / 180) * angle
}

/*
    运动方式参考：https://echarts.apache.org/examples/zh/editor.html?c=line-easing
 */

export const easingFunc = {
  linear: function (k: number) {
    return k
  },
  quadraticIn: function (k: number) {
    return k * k
  },
  quadraticOut: function (k: number) {
    return k * (2 - k)
  },
  quadraticInOut: function (k: number) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k
    }
    return -0.5 * (--k * (k - 2) - 1)
  },
  cubicIn: function (k: number) {
    return k * k * k
  },
  cubicOut: function (k: number) {
    return --k * k * k + 1
  },
  cubicInOut: function (k: number) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k
    }
    return 0.5 * ((k -= 2) * k * k + 2)
  },
  quarticIn: function (k: number) {
    return k * k * k * k
  },
  quarticOut: function (k: number) {
    return 1 - --k * k * k * k
  },
  quarticInOut: function (k: number) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k * k
    }
    return -0.5 * ((k -= 2) * k * k * k - 2)
  },
  quinticIn: function (k: number) {
    return k * k * k * k * k
  },
  quinticOut: function (k: number) {
    return --k * k * k * k * k + 1
  },
  quinticInOut: function (k: number) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k * k * k
    }
    return 0.5 * ((k -= 2) * k * k * k * k + 2)
  },
  sinusoidalIn: function (k: number) {
    return 1 - Math.cos((k * Math.PI) / 2)
  },
  sinusoidalOut: function (k: number) {
    return Math.sin((k * Math.PI) / 2)
  },
  sinusoidalInOut: function (k: number) {
    return 0.5 * (1 - Math.cos(Math.PI * k))
  },
  exponentialIn: function (k: number) {
    return k === 0 ? 0 : Math.pow(1024, k - 1)
  },
  exponentialOut: function (k: number) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k)
  },
  exponentialInOut: function (k: number) {
    if (k === 0) {
      return 0
    }
    if (k === 1) {
      return 1
    }
    if ((k *= 2) < 1) {
      return 0.5 * Math.pow(1024, k - 1)
    }
    return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2)
  },
  circularIn: function (k: number) {
    return 1 - Math.sqrt(1 - k * k)
  },
  circularOut: function (k: number) {
    return Math.sqrt(1 - --k * k)
  },
  circularInOut: function (k: number) {
    if ((k *= 2) < 1) {
      return -0.5 * (Math.sqrt(1 - k * k) - 1)
    }
    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1)
  },
  elasticIn: function (k: number, direction = 0) {
    let s
    let a = 0.1
    const p = 0.4
    if (k === 0) {
      return 0
    }
    if (k === 1) {
      return 1
    }
    if (!a || a < 1) {
      a = 1
      s = p / 4
    } else {
      s = (p * Math.asin(1 / a)) / (2 * Math.PI)
    }
    if (direction === 0) {
      return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin(((k - s) * (2 * Math.PI)) / p))
    } else if (direction === 1) {
      return a * Math.pow(2, -10 * k) * Math.sin(((k - s) * (2 * Math.PI)) / p) + 1
    } else if (direction === 2) {
      if ((k *= 2) < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin(((k - s) * (2 * Math.PI)) / p))
      }
      return a * Math.pow(2, -10 * (k -= 1)) * Math.sin(((k - s) * (2 * Math.PI)) / p) * 0.5 + 1
    }
  },
  elasticOut: function (k: number) {
    return this.elasticIn(k, 1)
  },
  elasticInOut: function (k: number) {
    this.elasticIn(k, 2)
  },

  // 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
  backIn: function (k: number) {
    const s = 1.70158
    return k * k * ((s + 1) * k - s)
  },
  backOut: function (k: number) {
    const s = 1.70158
    return --k * k * ((s + 1) * k + s) + 1
  },
  backInOut: function (k: number) {
    const s = 1.70158 * 1.525
    if ((k *= 2) < 1) {
      return 0.5 * (k * k * ((s + 1) * k - s))
    }
    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2)
  },

  // 创建弹跳效果
  bounceIn: function (k: number) {
    return 1 - easingFunc.bounceOut(1 - k)
  },
  bounceOut: function (k: number) {
    if (k < 1 / 2.75) {
      return 7.5625 * k * k
    } else if (k < 2 / 2.75) {
      return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75
    } else if (k < 2.5 / 2.75) {
      return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375
    } else {
      return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375
    }
  },
  bounceInOut: function (k: number) {
    if (k < 0.5) {
      return easingFunc.bounceIn(k * 2) * 0.5
    }
    return easingFunc.bounceOut(k * 2 - 1) * 0.5 + 0.5
  }
}

/**
 * @desc 贝塞尔曲线算法，包含了3阶贝塞尔
 */
class Bezier {
  /**
   * @desc 获取点，这里可以设置点的个数
   * @param {number} num 点个数
   * @param {Array} p1 点坐标
   * @param {Array} p2 点坐标
   * @param {Array} p3 点坐标
   * @param {Array} p4 点坐标
   * 如果参数是 num, p1, p2 为一阶贝塞尔
   * 如果参数是 num, p1, c1, p2 为二阶贝塞尔
   * 如果参数是 num, p1, c1, c2, p2 为三阶贝塞尔
   */
  getBezierPoints(num = 100, p1, p2, p3, p4) {
    let func: any = null
    const points: any[] = []
    if (!p3 && !p4) {
      func = this.oneBezier
    } else if (p3 && !p4) {
      func = this.twoBezier
    } else if (p3 && p4) {
      func = this.threeBezier
    }
    for (let i = 0; i < num; i++) {
      points.push(func(i / num, p1, p2, p3, p4))
    }
    if (p4) {
      points.push([...p4])
    } else if (p3) {
      points.push([...p3])
    }
    return points
  }

  /**
   * @desc 一阶贝塞尔
   * @param {number} t 当前百分比
   * @param {Array} p1 起点坐标
   * @param {Array} p2 终点坐标
   */
  oneBezier(t, p1, p2) {
    const [x1, y1] = p1
    const [x2, y2] = p2
    const x = x1 + (x2 - x1) * t
    const y = y1 + (y2 - y1) * t
    return [x, y]
  }

  /**
   * @desc 二阶贝塞尔
   * @param {number} t 当前百分比
   * @param {Array} p1 起点坐标
   * @param {Array} p2 终点坐标
   * @param {Array} cp 控制点
   */
  twoBezier(t, p1, cp, p2) {
    const [x1, y1] = p1
    const [cx, cy] = cp
    const [x2, y2] = p2
    const x = (1 - t) * (1 - t) * x1 + 2 * t * (1 - t) * cx + t * t * x2
    const y = (1 - t) * (1 - t) * y1 + 2 * t * (1 - t) * cy + t * t * y2
    return [x, y]
  }

  /**
   * @desc 三阶贝塞尔
   * @param {number} t 当前百分比
   * @param {Array} p1 起点坐标
   * @param {Array} p2 终点坐标
   * @param {Array} cp1 控制点1
   * @param {Array} cp2 控制点2
   */
  threeBezier(t, p1, cp1, cp2, p2) {
    const [x1, y1] = p1
    const [x2, y2] = p2
    const [cx1, cy1] = cp1
    const [cx2, cy2] = cp2
    const x =
      x1 * (1 - t) * (1 - t) * (1 - t) + 3 * cx1 * t * (1 - t) * (1 - t) + 3 * cx2 * t * t * (1 - t) + x2 * t * t * t
    const y =
      y1 * (1 - t) * (1 - t) * (1 - t) + 3 * cy1 * t * (1 - t) * (1 - t) + 3 * cy2 * t * t * (1 - t) + y2 * t * t * t
    return [x, y]
  }
}

export const bezier = new Bezier()

export function getHeartVectors(sampleRate = 50, radius = 10) {
  const vectors: {x: number; y: number}[] = []
  for (let i = 0; i < sampleRate; i++) {
    const radian = (2 * Math.PI * i) / 50
    vectors.push({
      x: radius * (16 * Math.pow(Math.sin(radian), 3)),
      y: radius * (13 * Math.cos(radian) - 5 * Math.cos(2 * radian) - 2 * Math.cos(3 * radian) - Math.cos(4 * radian))
    })
  }
  return vectors
}
