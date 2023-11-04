import Vec2 from "../models/vector.js";
import Operation from "./color_operations.js";
import VectorField from "../models/vectorfield.js";
import { InteractiveCurveRenderer } from "../renderer/curve_renderer.js";
export default class CircularLineTine implements Operation, VectorField {
    readonly center: Vec2;
    readonly radius: number;
    readonly numTines: number;
    readonly interval: number;
    readonly alpha: number;
    readonly lambda: number;
    readonly counterClockwise: boolean;
    constructor(origin: Vec2, radius: number, numTines: number, interval: number, counterClockwise?: boolean);
    apply(renderer: InteractiveCurveRenderer): void;
    atPoint(point: Vec2): Vec2;
}
