import Vec2 from "../../models/vector.js";
import { CircleRenderer, CrossRenderer } from "./cursor_renderer.js";
import { Tool } from "../tools.js";
import TineRenderer from "./tine_renderer.js";
import DynamicRadiusRenderer from "./dynamic_radius_renderer.js";
export default class CursorOverlay {
    constructor(container) {
        this.lastMoveCoord = null;
        this.mouseDownCoord = null;
        this.prevDrawOrigin = new Vec2(-1, -1);
        this.prevDrawSize = new Vec2(-1, -1);
        this.currentTool = Tool.Drop;
        this.currentToolParameters = { "radius": 50 };
        this.overlayCanvas = document.createElement('canvas');
        this.overlayContext = this.overlayCanvas.getContext("2d");
        this.overlayCanvas.className = "marbling-cursor-overlay";
        container.appendChild(this.overlayCanvas);
        container.addEventListener("mousemove", this.mouseMove.bind(this));
        container.addEventListener("mousedown", this.mouseDown.bind(this));
        container.addEventListener("mouseup", this.mouseUp.bind(this));
        document.addEventListener("mouseout", this.mouseOut.bind(this));
        document.addEventListener("toolchange", this.toolChange.bind(this));
        const circle = new CircleRenderer();
        const tine = new TineRenderer();
        const localTine = new TineRenderer();
        const localWavy = new TineRenderer(function (t) {
            return 100 * Math.sin(Math.PI + .013 * t);
        });
        const wavy = new TineRenderer(function (t) {
            return 100 * Math.sin(Math.PI + .013 * t);
        });
        const dynamicRadius = new DynamicRadiusRenderer();
        this.defaultRenderer = new CrossRenderer();
        this.rendererForTool = {};
        this.rendererForTool[Tool.Drop] = circle;
        this.rendererForTool[Tool.Spatter] = circle;
        this.rendererForTool[Tool.TineLine] = tine;
        this.rendererForTool[Tool.TineLineLocal] = localTine;
        this.rendererForTool[Tool.WavyLineLocal] = localWavy;
        this.rendererForTool[Tool.WavyLine] = wavy;
        this.rendererForTool[Tool.CircularTine] = dynamicRadius;
        this.rendererForTool[Tool.Vortex] = dynamicRadius;
        this.currentCursorRenderer = this.rendererForTool[this.currentTool];
        this.drawOverlay();
    }
    setSize(width, height) {
        this.overlayCanvas.width = width;
        this.overlayCanvas.height = height;
    }
    toolChange(e) {
        this.currentTool = e.detail.currentTool;
        this.currentToolParameters = e.detail.parameters;
        this.currentCursorRenderer = this.rendererForTool[this.currentTool];
        if (this.currentCursorRenderer == null) {
            this.currentCursorRenderer = this.defaultRenderer;
        }
        switch (this.currentTool) {
            case Tool.Drop:
                this.currentCursorRenderer['radius'] = this.currentToolParameters["radius"];
                break;
            case Tool.Spatter:
                this.currentCursorRenderer['radius'] = this.currentToolParameters["scatterRadius"];
                break;
            case Tool.TineLine:
            case Tool.TineLineLocal:
            case Tool.WavyLineLocal:
                this.currentCursorRenderer['numTines'] = this.currentToolParameters["numTines"];
                this.currentCursorRenderer['spacing'] = this.currentToolParameters["spacing"];
                break;
            case Tool.WavyLine:
                this.currentCursorRenderer['numTines'] = this.currentToolParameters["numTines"];
                this.currentCursorRenderer['spacing'] = this.currentToolParameters["spacing"];
                break;
        }
    }
    mouseDown(e) {
        this.mouseDownCoord = new Vec2(e.offsetX, e.offsetY);
    }
    mouseMove(e) {
        this.lastMoveCoord = new Vec2(e.offsetX, e.offsetY);
    }
    mouseUp(e) {
        this.mouseDownCoord = null;
    }
    mouseOut(e) {
        this.lastMoveCoord = null;
        this.mouseDownCoord = null;
    }
    drawOverlay() {
        const ctx = this.overlayContext;
        ctx.clearRect(this.prevDrawOrigin.x, this.prevDrawOrigin.y, this.prevDrawSize.x, this.prevDrawSize.y);
        if (this.lastMoveCoord == null) {
            requestAnimationFrame(this.drawOverlay.bind(this));
            return;
        }
        let minExtent;
        let drawSize;
        if (this.mouseDownCoord == null) {
            [minExtent, drawSize] = this.currentCursorRenderer.drawAtRest(ctx, this.lastMoveCoord);
        }
        else {
            [minExtent, drawSize] = this.currentCursorRenderer.drawActive(ctx, this.mouseDownCoord, this.lastMoveCoord);
        }
        this.prevDrawSize = drawSize;
        this.prevDrawOrigin = minExtent;
        requestAnimationFrame(this.drawOverlay.bind(this));
    }
}
//# sourceMappingURL=cursor_overlay.js.map