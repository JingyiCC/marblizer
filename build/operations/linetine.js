export function fmod(a, b) {
    return Number((a - (Math.floor(a / b) * b)).toPrecision(8));
}
export default class LineTine {
    constructor(origin, direction, numTines, spacing) {
        this.alpha = 30.0;
        this.lambda = 32;
        const strength = direction.length();
        this.line = direction.norm();
        this.normal = this.line.perp().norm();
        this.origin = origin;
        this.numTines = numTines;
        this.spacing = spacing;
        this.alpha += strength / 10.0;
    }
    apply(renderer) {
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
    atPoint(point) {
        let d = Math.abs(point.sub(this.origin).dot(this.normal));
        const halfSpace = this.spacing / 2.0;
        if (d / this.spacing < this.numTines) {
            const test = fmod(d, this.spacing);
            d = halfSpace - Math.abs(test - halfSpace);
        }
        else {
            d = d - this.spacing * this.numTines;
        }
        const factor = this.alpha * this.lambda / (d + this.lambda);
        return this.line.copy().scale(factor);
    }
}
//# sourceMappingURL=linetine.js.map