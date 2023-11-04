import { Drop } from "../renderer/curve_renderer.js";
export default class InkDropOperation {
    constructor(position, radius, color, displacing = true) {
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.displacing = displacing;
    }
    apply(renderer) {
        let newDrop = new Drop(this.color, this.radius, this.position.x, this.position.y);
        if (this.displacing) {
            for (let d = 0; d < renderer.drops.length; d++) {
                let drop = renderer.drops[d];
                for (let p = 0; p < drop.points.length; p++) {
                    const oldPoint = drop.points[p];
                    const offset = this.atPoint(oldPoint);
                    drop.points[p] = oldPoint.add(offset);
                }
                drop.makeDirty();
            }
        }
        renderer.drops.push(newDrop);
    }
    atPoint(point) {
        const radius2 = Math.pow(this.radius, 2);
        const pointDir = point.sub(this.position);
        const factor = Math.sqrt(1 + (radius2 / Math.pow(pointDir.length(), 2)));
        const newPoint = this.position.add(pointDir.scale(factor));
        return newPoint.sub(point);
    }
}
//# sourceMappingURL=inkdrop.js.map