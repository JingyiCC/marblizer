import Vec2 from "../models/vector.js";
import Color from "../models/color.js";
export class Drop {
    constructor(color, radius, centerX, centerY) {
        this.dirty = true;
        this.color = color;
        this.points = Drop.initialCirclePoints(radius, centerX, centerY);
    }
    static initialCirclePoints(radius, centerX, centerY) {
        let points = [];
        const desiredArcLength = 0.05;
        const stepSize = desiredArcLength / radius;
        for (let i = 0.0; i < 2 * Math.PI; i += stepSize) {
            const newPoint = new Vec2(centerX + radius * Math.cos(i), centerY + radius * Math.sin(i));
            points.push(newPoint);
        }
        return points;
    }
    getPath() {
        if (!this.dirty) {
            return this._cached_path;
        }
        let newPath = new Path2D();
        const firstPoint = this.points[0];
        newPath.moveTo(firstPoint.x, firstPoint.y);
        for (let i = 1; i < this.points.length; i++) {
            const nextPoint = this.points[i];
            newPath.lineTo(nextPoint.x, nextPoint.y);
        }
        newPath.closePath();
        this._cached_path = newPath;
        this.dirty = false;
    }
    makeDirty() {
        this.dirty = true;
    }
}
export class InteractiveCurveRenderer {
    constructor(container) {
        this.drops = [];
        this.baseColor = new Color(220, 210, 210);
        this.dirty = true;
        this.displayCanvas = document.createElement("canvas");
        this.displayCanvas.className = "marbling-render-layer";
        container.insertBefore(this.displayCanvas, container.firstChild);
        this.renderCanvas = document.createElement("canvas");
        this.render();
        window.requestAnimationFrame(this.draw.bind(this));
    }
    setSize(width, height) {
        this.displayCanvas.width = width;
        this.displayCanvas.height = height;
        this.renderCanvas.width = width;
        this.renderCanvas.height = height;
        this.dirty = true;
    }
    render() {
        const ctx = this.renderCanvas.getContext("2d");
        ctx.fillStyle = this.baseColor.toRGBString();
        ctx.fillRect(0, 0, this.renderCanvas.width, this.renderCanvas.height);
        for (let i = 0; i < this.drops.length; i++) {
            const drop = this.drops[i];
            ctx.fillStyle = drop.color.toRGBString();
            ctx.fill(drop.getPath());
        }
    }
    draw() {
        if (this.dirty) {
            this.render();
            this.dirty = false;
        }
        const ctx = this.displayCanvas.getContext("2d");
        ctx.drawImage(this.renderCanvas, 0, 0);
        window.requestAnimationFrame(this.draw.bind(this));
    }
    reset() {
        this.drops = [];
        this.dirty = true;
    }
    applyOperations(operations) {
        for (let i = 0; i < operations.length; i++) {
            const operation = operations[i];
            operation.apply(this);
        }
        for (let i = 0; i < this.drops.length; i++) {
            const drop = this.drops[i];
            drop.getPath();
        }
        this.dirty = true;
    }
    save() {
        const newWindow = window.open('about:new', 'Ink Marbling Image');
        newWindow.document.write("<img src='" + this.renderCanvas.toDataURL("image/png") + "' alt='from canvas'/>");
    }
}
//# sourceMappingURL=curve_renderer.js.map