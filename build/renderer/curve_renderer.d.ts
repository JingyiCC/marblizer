import Vec2 from "../models/vector.js";
import Color from "../models/color.js";
import Operation from "../operations/color_operations.js";
export declare class Drop {
    points: Array<Vec2>;
    readonly color: Color;
    _cached_path: Path2D;
    private dirty;
    constructor(color: Color, radius: number, centerX: number, centerY: number);
    private static initialCirclePoints;
    getPath(): Path2D;
    makeDirty(): void;
}
export default interface MarblingRenderer {
    applyOperations(operations: [Operation]): any;
    save(): any;
}
export declare class InteractiveCurveRenderer implements MarblingRenderer {
    renderCanvas: HTMLCanvasElement;
    displayCanvas: HTMLCanvasElement;
    drops: Drop[];
    baseColor: Color;
    private dirty;
    private history;
    constructor(container: HTMLElement);
    setSize(width: number, height: number): void;
    render(): void;
    draw(): void;
    reset(): void;
    applyOperations(operations: [Operation]): void;
    save(): void;
}
