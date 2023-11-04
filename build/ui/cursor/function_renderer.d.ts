import Color from "../../models/color.js";
import Vec2 from "../../models/vector.js";
export default class FunctionRenderer {
    color: Color;
    private canvas;
    private xAxis;
    private dirty;
    constructor(minX: number, maxX: number, resolution?: number);
    private _functionToRender;
    functionToRender: Function;
    private _minX;
    minX: number;
    private _maxX;
    maxX: number;
    private _resolution;
    resolution: number;
    draw(ctx: CanvasRenderingContext2D, position: Vec2): void;
    private render;
}
