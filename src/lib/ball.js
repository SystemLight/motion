export function accuracy(number, fractionDigits = 2) {
    if (typeof number === "number") {
        return parseFloat(number.toFixed(fractionDigits));
    }
    return NaN;
}

export class Ball {

    constructor(x = 0, y = 0, r = 10) {
        this.r = r;
        this.x = x || r;
        this.y = y || r;

        this.color = "#333333";

        // 小球运动速度
        this._speed = 0.3;
        this._direction = 0;

        this._vx = 0;// x方向速度
        this._vy = 0;// y方向速度

        this.__setSpeed();
        Reflect.defineProperty(this, "speed", {
            set: (v) => {
                this._speed = accuracy(v);
                this.__setSpeed();
            },
            get: () => {
                return this._speed;
            }
        });

        Reflect.defineProperty(this, "direction", {
            set: (v) => {
                // v是方向弧度
                this._direction = accuracy(v);
                this.__setSpeed();
            },
            get: () => {
                return this._direction;
            }
        });
    }

    __setSpeed() {
        this._vx = accuracy(Math.cos(this._direction)) * this._speed;
        this._vy = accuracy(Math.sin(this._direction)) * this._speed;
    }

    setDirectionAngle(angle) {
        this.direction = (Math.PI / 180) * angle;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    step(diffTime = 1) {
        this.x += this._vx * diffTime;
        this.y += this._vy * diffTime;
    }
}
