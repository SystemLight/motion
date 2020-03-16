import {TweenMotion} from "./lib/animation";
import {Ball} from "./lib/ball";
import {createCanvas, angle2radian} from "./tool/utils";

import TWEEN from '@tweenjs/tween.js'


let canGroup = document.getElementById("can-group");
if (canGroup) {
    let can = createCanvas(canGroup);

    let boundaryX = {from: 0, to: can.width};
    let boundaryY = {from: 0, to: can.height};

    let um = new TweenMotion(can, boundaryX, boundaryY, function (): Ball {
        let b = new Ball();
        let xPos = can.width / 2 - b.r;
        b.site = {
            x: xPos,
            y: b.r,
        };
        b.setDirection(angle2radian(110), 0.5);
        new TWEEN.Tween(b.site).to({y: can.height}, 3000)
            .easing(TWEEN.Easing.Bounce.Out).start();
        return b;
    });
    um.loop();
}
