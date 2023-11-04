import { Tool } from "./tools.js";
import Vec2 from "../models/vector.js";
import InkDropOperation from "../operations/inkdrop.js";
import LineTine from "../operations/linetine.js";
import LineTineLocal from "../operations/linetineLocal.js";
import WavyLineLocal from "../operations/wavytinelocal.js";
import WavyLineTine from "../operations/wavylinetine.js";
import CircularLineTine from "../operations/circularlinetine.js";
import Vortex from "../operations/vortex.js";
export default class VectorFieldOverlay {
    constructor(container) {
        this.currentTool = Tool.Drop;
        this.currentToolParameter = { "radius": 50 };
        this._previewOperation = null;
        this.renderer = new VectorFieldRenderer(container);
        container.addEventListener("mousedown", this.mouseDown.bind(this));
        container.addEventListener("mouseup", this.mouseUp.bind(this));
        container.addEventListener("mouseout", this.mouseOut.bind(this));
        container.addEventListener("mousemove", this.mouseMove.bind(this));
        document.addEventListener("toolchange", this.toolChange.bind(this));
    }
    set previewOperation(value) {
        this._previewOperation = value;
        this.renderer.vectorField = this._previewOperation;
    }
    setSize(width, height) {
        this.renderer.setSize(width, height);
    }
    toggleVisibility() {
        this.renderer.toggleVisibility();
    }
    increaseResolution() {
        this.renderer['spacing'] = Math.min(80, this.renderer['spacing'] + 2);
    }
    decreaseResolution() {
        this.renderer['spacing'] = Math.max(5, this.renderer['spacing'] - 2);
    }
    toolChange(e) {
        this.currentTool = e.detail.currentTool;
        this.currentToolParameter = e.detail.parameters;
        this.generatePreviewOperation();
    }
    mouseDown(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        this.mouseDownCoord = new Vec2(x, y);
        switch (this.currentTool) {
            case Tool.Drop:
                break;
            case Tool.TineLine:
                this.lastMouseCoord = new Vec2(x, y);
            case Tool.TineLineLocal:
                this.lastMouseCoord = new Vec2(x, y);
            case Tool.WavyLineLocal:
                this.lastMouseCoord = new Vec2(x, y);
        }
    }
    mouseUp(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        this.lastMouseCoord = null;
        this.mouseDownCoord = null;
    }
    mouseOut(e) {
        this.lastMouseCoord = null;
        this.mouseDownCoord = null;
        this.previewOperation = null;
    }
    mouseMove(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        this.lastMouseCoord = new Vec2(x, y);
        this.generatePreviewOperation();
    }
    generatePreviewOperation() {
        switch (this.currentTool) {
            case Tool.Drop: {
                const radius = this.currentToolParameter['radius'];
                this.previewOperation = new InkDropOperation(this.lastMouseCoord, radius, null);
                break;
            }
            case Tool.TineLine: {
                if (this.lastMouseCoord != null && this.mouseDownCoord != null) {
                    const spacing = this.currentToolParameter['spacing'];
                    const numTines = this.currentToolParameter['numTines'];
                    const dir = this.lastMouseCoord.sub(this.mouseDownCoord);
                    if (dir.length() > 0.03) {
                        this.previewOperation = new LineTine(this.mouseDownCoord, dir, numTines, spacing);
                    }
                }
                else {
                    this.previewOperation = null;
                }
                break;
            }
            case Tool.TineLineLocal: {
                if (this.lastMouseCoord != null && this.mouseDownCoord != null) {
                    const spacing = this.currentToolParameter['spacing'];
                    const numTines = this.currentToolParameter['numTines'];
                    const dir = this.lastMouseCoord.sub(this.mouseDownCoord);
                    if (dir.length() > 0.03) {
                        this.previewOperation = new LineTineLocal(this.mouseDownCoord, dir, numTines, spacing);
                    }
                }
                else {
                    this.previewOperation = null;
                }
                break;
            }
            case Tool.WavyLineLocal: {
                if (this.lastMouseCoord != null && this.mouseDownCoord != null) {
                    const spacing = this.currentToolParameter['spacing'];
                    const numTines = this.currentToolParameter['numTines'];
                    const dir = this.lastMouseCoord.sub(this.mouseDownCoord);
                    if (dir.length() > 0.03) {
                        this.previewOperation = new WavyLineLocal(this.mouseDownCoord, dir, numTines, spacing);
                    }
                    break;
                }
                else {
                    this.previewOperation = null;
                }
                break;
            }
            case Tool.WavyLine: {
                if (this.lastMouseCoord != null && this.mouseDownCoord != null) {
                    const spacing = this.currentToolParameter['spacing'];
                    const numTines = this.currentToolParameter['numTines'];
                    const dir = this.lastMouseCoord.sub(this.mouseDownCoord);
                    if (dir.length() > 0.03) {
                        this.previewOperation = new WavyLineTine(this.mouseDownCoord, dir, numTines, spacing);
                    }
                    break;
                }
                else {
                    this.previewOperation = null;
                }
                break;
            }
            case Tool.CircularTine: {
                if (this.lastMouseCoord != null && this.mouseDownCoord != null) {
                    const spacing = this.currentToolParameter['spacing'];
                    const numTines = this.currentToolParameter['numTines'];
                    const radius = this.lastMouseCoord.sub(this.mouseDownCoord).length();
                    if (radius > 0.03) {
                        this.previewOperation = new CircularLineTine(this.mouseDownCoord, radius, numTines, spacing);
                    }
                    break;
                }
                else {
                    this.previewOperation = null;
                }
                break;
            }
            case Tool.Vortex: {
                if (this.lastMouseCoord != null && this.mouseDownCoord != null) {
                    const radius = this.lastMouseCoord.sub(this.mouseDownCoord).length();
                    if (radius > 0.03) {
                        this.previewOperation = new Vortex(this.mouseDownCoord, radius);
                    }
                    break;
                }
                else {
                    this.previewOperation = null;
                }
                break;
            }
        }
    }
}
class VectorFieldRenderer {
    constructor(container) {
        this.visible = false;
        this.dirty = true;
        this.arrowWidth = 20;
        this.arrowHeight = 12;
        this.arrow = this.generateArrowPath();
        this._spacing = 40;
        this._vectorField = null;
        this.overlayCanvas = document.createElement('canvas');
        this.overlayCanvas.className = "marbling-vector-field-overlay";
        this.overlayContext = this.overlayCanvas.getContext("2d");
        container.appendChild(this.overlayCanvas);
        this.drawOverlay();
    }
    get spacing() {
        return this._spacing;
    }
    set spacing(value) {
        this._spacing = value;
        this.dirty = true;
    }
    set vectorField(value) {
        this._vectorField = value;
        this.dirty = true;
    }
    generateArrowPath() {
        const path = new Path2D();
        path.moveTo(0, 2);
        path.lineTo(2, 2);
        path.lineTo(12, 2);
        path.lineTo(12, 6);
        path.lineTo(20, 3);
        path.lineTo(12, 0);
        path.lineTo(12, 4);
        path.lineTo(0, 4);
        path.closePath();
        return path;
    }
    setSize(width, height) {
        this.overlayCanvas.width = width;
        this.overlayCanvas.height = height;
        this.dirty = true;
    }
    toggleVisibility() {
        if (this.visible) {
            this.visible = false;
            this.overlayCanvas.style.visibility = "hidden";
        }
        else {
            this.visible = true;
            this.overlayCanvas.style.visibility = "visible";
            this.drawOverlay();
        }
    }
    drawOverlay() {
        if (!this.visible) {
            return;
        }
        if (!this.dirty) {
            requestAnimationFrame(this.drawOverlay.bind(this));
            return;
        }
        const ctx = this.overlayContext;
        const width = this.arrowWidth;
        const height = this.arrowHeight;
        ctx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
        if (this._vectorField == null) {
            requestAnimationFrame(this.drawOverlay.bind(this));
            return;
        }
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        ctx.fillStyle = "rgba(0,0,0, 0.8)";
        ctx.strokeStyle = "rgba(255,255,255,0.6)";
        for (let x = 0; x < this.overlayCanvas.width; x += this._spacing) {
            for (let y = 0; y < this.overlayCanvas.height; y += this._spacing) {
                const dir = this._vectorField.atPoint(new Vec2(x, y));
                const angle = dir.angle();
                const size = dir.length() / this.arrowHeight;
                if (size > 0.1) {
                    ctx.translate(x - halfWidth, y - halfHeight);
                    ctx.scale(size, size);
                    ctx.rotate(angle);
                    ctx.stroke(this.arrow);
                    ctx.fill(this.arrow);
                    ctx.scale(1 / size, 1 / size);
                    ctx.rotate(-angle);
                    ctx.translate(-x + halfWidth, -y + halfHeight);
                }
            }
        }
        this.dirty = false;
        requestAnimationFrame(this.drawOverlay.bind(this));
    }
}
//# sourceMappingURL=vector_field_overlay.js.map