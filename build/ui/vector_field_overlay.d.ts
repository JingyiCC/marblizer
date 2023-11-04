import Operation from "../operations/color_operations.js";
export default class VectorFieldOverlay {
    private renderer;
    private currentTool;
    private currentToolParameter;
    private mouseDownCoord;
    private lastMouseCoord;
    constructor(container: HTMLElement);
    private _previewOperation;
    previewOperation: Operation;
    setSize(width: number, height: number): void;
    toggleVisibility(): void;
    increaseResolution(): void;
    decreaseResolution(): void;
    private toolChange;
    private mouseDown;
    private mouseUp;
    private mouseOut;
    private mouseMove;
    private generatePreviewOperation;
}
