import Operation from "./color_operations.js";
import VectorField from "../models/vectorfield.js";
import Vec2 from "../models/vector.js";
import { InteractiveCurveRenderer } from "../renderer/curve_renderer.js";
export default class WavyLineLocal implements Operation, VectorField {
    readonly normal: Vec2;
    readonly line: Vec2;
    readonly origin: Vec2;
    readonly numTines: number;
    readonly spacing: number;
    readonly amplitude: number;
    readonly phase: number;
    readonly angle: number;
    readonly wavelength: number;
    readonly length: number;
    constructor(origin: Vec2, direction: Vec2, numTines: number, spacing: number);
    apply(renderer: InteractiveCurveRenderer): void;
    atPoint(point: Vec2): Vec2;
}
