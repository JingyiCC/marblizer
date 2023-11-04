import Color from "../../models/color.js";
export default class FunctionRenderer {
    constructor(minX, maxX, resolution = 2) {
        this.color = new Color(30, 30, 30, 0.1);
        this.xAxis = null;
        this.dirty = true;
        this.canvas = document.createElement("canvas");
        this._minX = minX;
        this._maxX = maxX;
        this._resolution = resolution;
    }
    set functionToRender(value) {
        this._functionToRender = value;
        this.dirty = true;
    }
    set minX(value) {
        this._minX = value;
        this.dirty = true;
    }
    set maxX(value) {
        this._maxX = value;
        this.dirty = true;
    }
    set resolution(value) {
        this._resolution = value;
        this.dirty = true;
    }
    draw(ctx, position) {
        if (this.dirty) {
            this.render();
        }
        ctx.drawImage(this.canvas, position.x + this._minX, position.y - this.xAxis);
    }
    render() {
        let points = [];
        let min = Infinity;
        let max = -Infinity;
        for (let t = this._minX; t < this._maxX; t += 1 / this._resolution) {
            const nextPoint = this._functionToRender(t);
            min = Math.min(min, nextPoint);
            max = Math.max(max, nextPoint);
            points.push([t, nextPoint]);
        }
        min -= 2;
        max += 2;
        this.xAxis = -min;
        this.canvas.width = this._maxX - this._minX;
        this.canvas.height = max - min;
        const ctx = this.canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(0, points[0]);
        for (let i = 1; i < points.length; i++) {
            const point = points[i];
            ctx.lineTo(point[0] - this._minX, point[1] + this.xAxis);
        }
        ctx.closePath();
        ctx.strokeStyle = this.color.toRGBAString();
        ctx.stroke();
    }
}
//# sourceMappingURL=function_renderer.js.map