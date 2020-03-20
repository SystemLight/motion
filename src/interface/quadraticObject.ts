import {accuracy} from "../tool/utils";


export abstract class QuadraticObject {

    public vx: number = 0;
    public vy: number = 0;

    protected constructor(
        public x: number = 0,
        public y: number = 0,
        public halfW: number = 0,
        public halfH: number = 0
    ) {
    }

    setDirection(radian: number, speed: number) {
        // 拖过物体角度设置方向，角度可选范围0-360度
        this.vx = accuracy(Math.cos(radian) * speed);
        this.vy = accuracy(Math.sin(radian) * speed);
    }

    setXY(val: number) {
        this.x = val;
        this.y = val;
    }

    setHalfWH(val: number) {
        this.halfW = val;
        this.halfH = val;
    }

    abstract step(...args: any[]): void

    abstract render(...args: any[]): void

}