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

    public vx: number;
    public vy: number;

    protected constructor(x: number, y: number, w: number, h: number) {
        this.size = {
            w: w,
            h: h
        };
        this.site = {
            x: x,
            y: y
        };
        this.vx = 0;
        this.vy = 0;
    }

    setDirection(radian: number, speed: number) {
        // 角度可选范围0-360度
        this.vx = accuracy(Math.cos(accuracy(radian))) * accuracy(speed);
        this.vy = accuracy(Math.sin(accuracy(radian))) * accuracy(speed);
    }

    abstract step(...args: any[]): void

    abstract draw(...args: any[]): void

}