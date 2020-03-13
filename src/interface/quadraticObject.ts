import {accuracy} from "../tool/utils";


export abstract class QuadraticObject {

    size: {
        w: number,
        h: number
    };

    site: {
        x: number,
        y: number
    };

    protected _direction: number;
    protected _speed: number;
    protected _vx: number;
    protected _vy: number;

    protected constructor(x: number, y: number, w: number, h: number) {
        this.size = {
            w: w,
            h: h
        };
        this.site = {
            x: x,
            y: y
        };
        this._direction = 0;
        this._speed = 0;
        this._vx = 0;
        this._vy = 0;
    }

    set direction(v: number) {
        this._direction = v;
        this._setV();
    }

    get direction(): number {
        return this._direction;
    }

    set speed(v: number) {
        this._speed = accuracy(v);
        this._setV();
    }

    get speed() {
        return this._speed;
    }

    _setV(): void {
        this._vx = accuracy(Math.cos(this._direction)) * accuracy(this._speed);
        this._vy = accuracy(Math.sin(this._direction)) * accuracy(this._speed);
    }

    setDirectionDegree(degree: number): void {
        this.direction = (Math.PI / 180) * degree;
    }

    abstract step(...args: any[]): void

    abstract draw(...args: any[]): void

}