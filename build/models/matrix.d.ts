import Vec2 from "./vector.js";
export default class Mat2x2 {
    readonly m11: number;
    readonly m12: number;
    readonly m21: number;
    readonly m22: number;
    constructor(m11: number, m12: number, m21: number, m22: number);
    static withColumns(first: Vec2, second: Vec2): Mat2x2;
    mult(v: Vec2): Vec2;
}
