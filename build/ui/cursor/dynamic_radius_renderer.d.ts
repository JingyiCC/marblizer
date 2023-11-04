import { default as CursorRenderer } from "./cursor_renderer.js";
import Vec2 from "../../models/vector.js";
export default class DynamicRadiusRenderer implements CursorRenderer {
    private dirty;
    private canvas;
    private crossRenderer;
    private circleRenderer;
    constructor();
    private _radius;
    radius: number;
    drawAtRest(ctx: CanvasRenderingContext2D, position: Vec2): [Vec2, Vec2];
    drawActive(ctx: CanvasRenderingContext2D, mouseDown: Vec2, cursor: Vec2): [Vec2, Vec2];
    private updateCursor;
}
