import { CircleRenderer, CrossRenderer } from "./cursor_renderer.js";
import Vec2, { vecMax, vecMin } from "../../models/vector.js";
import { circle } from "../../drawing_utilities.js";
export default class DynamicRadiusRenderer {
    constructor() {
        this.dirty = true;
        this._radius = 50;
        this.canvas = document.createElement("canvas");
        this.crossRenderer = new CrossRenderer();
        this.circleRenderer = new CircleRenderer();
    }
    set radius(value) {
        this._radius = value;
        this.dirty = true;
    }
    drawAtRest(ctx, position) {
        return this.crossRenderer.drawAtRest(ctx, position);
    }
    drawActive(ctx, mouseDown, cursor) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = "rgba(0,0,0,0.8)";
        ctx.beginPath();
        ctx.moveTo(mouseDown.x, mouseDown.y);
        ctx.lineTo(cursor.x, cursor.y);
        ctx.closePath();
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.beginPath();
        ctx.moveTo(mouseDown.x, mouseDown.y);
        ctx.lineTo(cursor.x, cursor.y);
        ctx.closePath();
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.beginPath();
        ctx.moveTo(mouseDown.x, mouseDown.y);
        ctx.lineTo(cursor.x, cursor.y);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        circle(ctx, mouseDown, 4);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        circle(ctx, mouseDown, 2);
        ctx.fill();
        const [crossMin, crossSize] = this.crossRenderer.drawAtRest(ctx, cursor);
        this.circleRenderer.radius = mouseDown.sub(cursor).length();
        const [circleMin, circleSize] = this.circleRenderer.drawAtRest(ctx, mouseDown);
        const min = vecMin(crossMin, circleMin);
        const max = vecMax(crossMin.add(crossSize), circleMin.add(circleSize));
        return [min, max.sub(min)];
    }
    updateCursor() {
        this.canvas.width = this._radius * 2 + 3;
        this.canvas.height = this._radius * 2 + 3;
        const ctx = this.canvas.getContext("2d");
        ctx.strokeStyle = "rgba(100,100,100,0.3)";
        const origin = new Vec2(this.canvas.width / 2, this.canvas.height / 2);
        circle(ctx, origin, this._radius);
        ctx.stroke();
    }
}
//# sourceMappingURL=dynamic_radius_renderer.js.map