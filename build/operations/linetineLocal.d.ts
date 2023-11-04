import Operation from "./color_operations.js";
import VectorField from "../models/vectorfield.js";
import Vec2 from "../models/vector.js";
import { InteractiveCurveRenderer } from "../renderer/curve_renderer.js";
export declare function fmod(a: any, b: any): number;
export default class LineTineLocal implements Operation, VectorField {
    readonly normal: Vec2;
    readonly line: Vec2;
    readonly origin: Vec2;
    readonly numTines: number;
    readonly spacing: number;
    readonly alpha: number;
    readonly lambda: number;
    readonly lambda_line: number;
    readonly length: number;
    constructor(origin: Vec2, direction: Vec2, numTines: number, spacing: number);
    apply(renderer: InteractiveCurveRenderer): void;
    atPoint(point: Vec2): Vec2;
}
