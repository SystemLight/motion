import {BounceMotion} from "./lib/animation";
import {Ball} from "./lib/ball";
import {createCanvas} from "./tool/utils";


let canGroup = document.getElementById("can-group");
if (canGroup) {
    let can = createCanvas(canGroup);

    let boundaryX = {from: 0, to: can.width};
    let boundaryY = {from: 0, to: can.height};

    let um = new BounceMotion(can, boundaryX, boundaryY, function (): Ball {
        let b = new Ball();
        b.site = {
            x: can.width / 2 - b.r,
            y: b.r,
        };
        b.setDirectionDegree(90);
        b.speed = 0.3;
        return b;
    });
    um.loop();
}
