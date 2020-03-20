import {Animation} from "./lib/animation";

import TWEEN from '@tweenjs/tween.js'


function createCanvas(
    canGroup: HTMLElement,
    w: number = 500,
    h: number = 500
): HTMLCanvasElement {
    let can = document.createElement("canvas");
    can.width = w;
    can.height = h;
    canGroup.appendChild(can);
    return can;
}

let canGroup = document.getElementById("can-group");
if (canGroup) {
    let can = createCanvas(canGroup);
    let um = new Animation(can);
    um.loop();
}
