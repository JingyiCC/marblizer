export function fmod(a, b) {
    return Number((a - (Math.floor(a / b) * b)).toPrecision(8));
}
export default class LineTineLocal {
    constructor(origin, direction, numTines, spacing) {
        this.alpha = 30.0;
        this.lambda = 32;
        this.lambda_line = 0.1;
        const strength = direction.length();
        this.length = strength;
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
        let d_norm = Math.abs(point.sub(this.origin).dot(this.normal));
        let d_line = point.sub(this.origin).dot(this.line);
        let d_factor = 1.0;
        if (d_line > this.length) {
            d_factor = 0;
        }
        else if (d_line < -1e-6) {
            d_factor = 0;
        }
        else {
            d_factor = 4.0 / (4.0 - this.length) * (Math.abs(d_line) * Math.abs(d_line) / this.length - Math.abs(d_line));
        }
        const halfSpace = this.spacing / 2.0;
        if (d_norm / this.spacing < this.numTines) {
            const test = fmod(d_norm, this.spacing);
            d_norm = halfSpace - Math.abs(test - halfSpace);
        }
        else {
            d_norm = d_norm - this.spacing * this.numTines;
        }
        const factor = this.alpha * this.lambda / (d_norm + this.lambda) * d_factor;
        return this.line.copy().scale(factor);
    }
}
//# sourceMappingURL=linetineLocal.js.map