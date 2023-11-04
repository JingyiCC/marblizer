import Operation from "./color_operations.js";
import VectorField from "../models/vectorfield.js";
import Vec2 from "../models/vector.js";
import { InteractiveCurveRenderer } from "../renderer/curve_renderer.js";
export default class Vortex implements Operation, VectorField {
    readonly center: Vec2;
    readonly radius: number;
    readonly strength: number;
    readonly alpha: number;
    readonly lambda: number;
    readonly counterclockwise: boolean;
    constructor(origin: Vec2, radius: number, counterclockwise?: boolean);
    apply(renderer: InteractiveCurveRenderer): void;
    atPoint(point: Vec2): Vec2;
}
