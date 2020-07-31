import {Animation} from "./lib/animation";

// 创建一个canvas画布
function createCanvas(canGroup: HTMLElement, w = 500, h = 500) {
    const can = document.createElement("canvas");
    can.width = w;
    can.height = h;
    canGroup.appendChild(can);
    return can;
}

const canGroup = document.getElementById("can-group");
if (canGroup) {
    const can = createCanvas(canGroup);

    // =====开启描述动画=====
    const um = new Animation(can);

    um.loop();
    // =====开启描述动画=====
}
