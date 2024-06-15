const exchangeToRem = (pixel: number, base = 16): string =>
    `${pixel / base}rem`;

export const pixelToRem = (...pixel: Array<number>): string =>
    pixel.map((px: number) => exchangeToRem(px)).join(' ');
