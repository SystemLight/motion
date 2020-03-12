import {
    createMotion,
    UniformMotion,
    AccelerateMotion,
    BounceMotion
} from "./lib/animation";


let motionBox = [];

function mounted() {
    let btnGroup = document.getElementById("btn-group");

    let startBtn = document.createElement("button");
    startBtn.innerText = "开始运动";
    startBtn.addEventListener("click", function () {
        motionBox.forEach(m => {
            m.start();
        })
    });

    let closeBtn = document.createElement("button");
    closeBtn.innerText = "关闭运动";
    closeBtn.addEventListener("click", function () {
        motionBox.forEach(m => {
            m.stop();
        })
    });

    let pauseBtn = document.createElement("button");
    pauseBtn.innerText = "暂停运动";
    pauseBtn.addEventListener("click", function () {
        motionBox.forEach(m => {
            m.pause();
        })
    });

    let continueBtn = document.createElement("button");
    continueBtn.innerText = "继续运动";
    continueBtn.addEventListener("click", function () {
        motionBox.forEach(m => {
            m.continue();
        })
    });

    btnGroup.appendChild(startBtn);
    btnGroup.appendChild(closeBtn);
    btnGroup.appendChild(pauseBtn);
    btnGroup.appendChild(continueBtn);
}

function createCanvas(canGroup) {
    let can = document.createElement("canvas");
    can.width = 500;
    can.height = 500;
    canGroup.appendChild(can);
    return can;
}

let canGroup = document.getElementById("can-group");

// 创建匀速运动
let um = createMotion(createCanvas(canGroup), UniformMotion);
motionBox.push(um);
um.afterBallStep = function () {
    if (this.isCrossBorder() > -1) {
        this.ball.y = this.ball.r;
    }
};
um.start();

// 创建加速运动
let am = createMotion(createCanvas(canGroup), AccelerateMotion);
motionBox.push(am);
am.afterBallStep = function () {
    if (this.isCrossBorder() > -1) {
        this.ball.y = this.ball.r;
    }
};
am.start();

// 创建弹性运动
let bm = createMotion(createCanvas(canGroup), BounceMotion);
motionBox.push(bm);
bm.start();

mounted();
