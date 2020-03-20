export function accuracy(number: number, fractionDigits: number = 2): number {
    return parseFloat(number.toFixed(fractionDigits));
}

export function angle2radian(angle: number): number {
    return (Math.PI / 180) * angle;
}
