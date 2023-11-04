import CursorRenderer from "./cursor_renderer.js";
import Vec2 from "../../models/vector.js";
export default class TineRenderer implements CursorRenderer {
    private dirty;
    private canvas;
    private crossRenderer;
    private functionRenderer;
    private r;
    constructor(func?: Function);
    private _spacing;
    spacing: number;
    private _numTines;
    numTines: number;
    drawActive(ctx: CanvasRenderingContext2D, mouseDown: Vec2, cursor: Vec2): [Vec2, Vec2];
    drawAtRest(ctx: CanvasRenderingContext2D, position: Vec2): [Vec2, Vec2];
    private updateCursor;
}
