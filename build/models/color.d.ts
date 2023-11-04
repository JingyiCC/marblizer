export default class Color {
    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly a: number;
    constructor(r: number, g: number, b: number, a?: number);
    static withRGB(hex: string): Color;
    static withHex(hex: string): Color;
    toRGBString(): string;
    toRGBAString(): string;
    toHexString(): string;
    withAlpha(alpha: number): Color;
    toHexStringWithAlpha(): string;
}
export declare const black: Color;
export declare const white: Color;
export declare const red: Color;
export declare const green: Color;
export declare const blue: Color;
export declare const colorSets: Color[][];
