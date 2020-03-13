export type range = {
    from: number,
    to: number
};

export abstract class Motion<qo> {

    isStop: boolean;
    isPause: boolean;

    quadraticObject: qo;

    protected _diffTime: number | null;
    protected _lastTime: number;
    protected _loop: () => void;

    protected constructor(
        public boundaryX: range,
        public boundaryY: range,
        public createQuadraticObject: () => qo
    ) {
        this.isStop = false;
        this.isPause = false;

        this._diffTime = null;
        this._lastTime = 0;

        this.quadraticObject = this.createQuadraticObject();
        this._lastTime = new Date().getTime();

        this._loop = this.loop.bind(this);
    }

    set diffTime(v: number) {
        this._diffTime = v;
    }

    get diffTime(): number {
        let diffTime;
        if (this._diffTime) {
            diffTime = this._diffTime;
            this._diffTime = null;
        } else {
            diffTime = new Date().getTime() - this._lastTime;
        }
        this._lastTime = new Date().getTime();
        return diffTime;
    }

    start(): void {
        this.stop();
        this.isStop = false;
        this.quadraticObject = this.createQuadraticObject();
        this._lastTime = new Date().getTime();
        this.loop();
    }

    stop(): void {
        this.isStop = true;
    }

    pause(): void {
        this.isPause = true;
        this.diffTime = new Date().getTime() - this._lastTime;
    }

    continue(): void {
        if (this.isPause) {
            this.isPause = false;
            this.loop();
        }
    }

    abstract loop(): void

}
