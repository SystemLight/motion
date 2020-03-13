export function accuracy(number: number, fractionDigits: number = 2): number {
    return parseFloat(number.toFixed(fractionDigits));
}

export function createCanvas(
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