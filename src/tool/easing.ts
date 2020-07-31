/*
    运动方式参考：https://echarts.apache.org/examples/zh/editor.html?c=line-easing
 */

export const easingFunc = {
    linear: function (k: number) {
        return k;
    },
    quadraticIn: function (k: number) {
        return k * k;
    },
    quadraticOut: function (k: number) {
        return k * (2 - k);
    },
    quadraticInOut: function (k: number) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k;
        }
        return -0.5 * (--k * (k - 2) - 1);
    },
    cubicIn: function (k: number) {
        return k * k * k;
    },
    cubicOut: function (k: number) {
        return --k * k * k + 1;
    },
    cubicInOut: function (k: number) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k + 2);
    },
    quarticIn: function (k: number) {
        return k * k * k * k;
    },
    quarticOut: function (k: number) {
        return 1 - (--k * k * k * k);
    },
    quarticInOut: function (k: number) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k;
        }
        return -0.5 * ((k -= 2) * k * k * k - 2);
    },
    quinticIn: function (k: number) {
        return k * k * k * k * k;
    },
    quinticOut: function (k: number) {
        return --k * k * k * k * k + 1;
    },
    quinticInOut: function (k: number) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k * k * k + 2);
    },
    sinusoidalIn: function (k: number) {
        return 1 - Math.cos(k * Math.PI / 2);
    },
    sinusoidalOut: function (k: number) {
        return Math.sin(k * Math.PI / 2);
    },
    sinusoidalInOut: function (k: number) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
    },
    exponentialIn: function (k: number) {
        return k === 0 ? 0 : Math.pow(1024, k - 1);
    },
    exponentialOut: function (k: number) {
        return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    },
    exponentialInOut: function (k: number) {
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if ((k *= 2) < 1) {
            return 0.5 * Math.pow(1024, k - 1);
        }
        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    },
    circularIn: function (k: number) {
        return 1 - Math.sqrt(1 - k * k);
    },
    circularOut: function (k: number) {
        return Math.sqrt(1 - (--k * k));
    },
    circularInOut: function (k: number) {
        if ((k *= 2) < 1) {
            return -0.5 * (Math.sqrt(1 - k * k) - 1);
        }
        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    },
    elasticIn: function (k: number, direction = 0) {
        let s;
        let a = 0.1;
        const p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        } else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        if (direction === 0) {
            return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
        } else if (direction === 1) {
            return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
        } else if (direction === 2) {
            if ((k *= 2) < 1) {
                return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
            }
            return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
        }
    },
    elasticOut: function (k: number) {
        return this.elasticIn(k, 1);
    },
    elasticInOut: function (k: number) {
        this.elasticIn(k, 2);
    },

    // 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
    backIn: function (k: number) {
        const s = 1.70158;
        return k * k * ((s + 1) * k - s);
    },
    backOut: function (k: number) {
        const s = 1.70158;
        return --k * k * ((s + 1) * k + s) + 1;
    },
    backInOut: function (k: number) {
        const s = 1.70158 * 1.525;
        if ((k *= 2) < 1) {
            return 0.5 * (k * k * ((s + 1) * k - s));
        }
        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    },

    // 创建弹跳效果
    bounceIn: function (k: number) {
        return 1 - easingFunc.bounceOut(1 - k);
    },
    bounceOut: function (k: number) {
        if (k < (1 / 2.75)) {
            return 7.5625 * k * k;
        } else if (k < (2 / 2.75)) {
            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
        } else if (k < (2.5 / 2.75)) {
            return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
        } else {
            return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
        }
    },
    bounceInOut: function (k: number) {
        if (k < 0.5) {
            return easingFunc.bounceIn(k * 2) * 0.5;
        }
        return easingFunc.bounceOut(k * 2 - 1) * 0.5 + 0.5;
    }
};
