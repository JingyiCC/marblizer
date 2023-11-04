import Vec2 from "../../models/vector.js";
export default interface CursorRenderer {
    drawAtRest(ctx: CanvasRenderingContext2D, position: Vec2): [Vec2, Vec2];
    drawActive(ctx: CanvasRenderingContext2D, mouseDown: Vec2, cursor: Vec2): [Vec2, Vec2];
}
export declare class CircleRenderer implements CursorRenderer {
    private dirty;
    private canvas;
    constructor();
    private _radius;
    radius: number;
    drawAtRest(ctx: CanvasRenderingContext2D, position: Vec2): [Vec2, Vec2];
    drawActive(ctx: CanvasRenderingContext2D, mouseDown: Vec2, cursor: Vec2): [Vec2, Vec2];
    private updateCursor;
}
export declare class CrossRenderer implements CursorRenderer {
    size: number;
    private dirty;
    private canvas;
    constructor();
    drawAtRest(ctx: CanvasRenderingContext2D, position: Vec2): [Vec2, Vec2];
    drawActive(ctx: CanvasRenderingContext2D, mouseDown: Vec2, cursor: Vec2): [Vec2, Vec2];
    private updateCursor;
}
