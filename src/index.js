import {Animation} from "./lib/animation";


// 创建一个canvas画布
function createCanvas(canGroup, w = 500, h = 500) {
    let can = document.createElement("canvas");
    can.width = w;
    can.height = h;
    canGroup.appendChild(can);
    return can;
}

let canGroup = document.getElementById("can-group");
if (canGroup) {
    let can = createCanvas(canGroup);

    // =====开启描述动画=====
    let um = new Animation(can);

    um.loop();
    // =====开启描述动画=====
}
