export default class CursorOverlay {
    private overlayCanvas;
    private overlayContext;
    private currentCursorRenderer;
    private lastMoveCoord;
    private mouseDownCoord;
    private prevDrawOrigin;
    private prevDrawSize;
    private currentTool;
    private currentToolParameters;
    private rendererForTool;
    private defaultRenderer;
    constructor(container: HTMLElement);
    setSize(width: number, height: number): void;
    private toolChange;
    private mouseDown;
    private mouseMove;
    private mouseUp;
    private mouseOut;
    private drawOverlay;
}
