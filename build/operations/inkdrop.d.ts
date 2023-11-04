import Operation from "./color_operations.js";
import VectorField from "../models/vectorfield.js";
import Vec2 from "../models/vector.js";
import Color from "../models/color.js";
import { InteractiveCurveRenderer } from "../renderer/curve_renderer.js";
export default class InkDropOperation implements Operation, VectorField {
    readonly position: Vec2;
    readonly radius: number;
    readonly color: Color;
    readonly displacing: boolean;
    constructor(position: Vec2, radius: number, color: Color, displacing?: boolean);
    apply(renderer: InteractiveCurveRenderer): void;
    atPoint(point: Vec2): Vec2;
}
