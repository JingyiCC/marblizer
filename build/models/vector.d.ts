import Mat2x2 from "./matrix.js";
export default class Vec2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    static zero(): Vec2;
    sub(other: Vec2): Vec2;
    add(other: Vec2): Vec2;
    dot(other: Vec2): number;
    copy(): Vec2;
    acc(other: Vec2): void;
    scale(factor: number): Vec2;
    norm(): Vec2;
    perp(): Vec2;
    length(): number;
    angle(): number;
    mult(mat: Mat2x2): Vec2;
    get(i: number): number;
    eq(other: Vec2): boolean;
}
export declare function vecMax(first: Vec2, second: Vec2): Vec2;
export declare function vecMin(first: Vec2, second: Vec2): Vec2;
