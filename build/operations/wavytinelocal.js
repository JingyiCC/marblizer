import Vec2 from "../models/vector.js";
export default class WavyLineLocal {
    constructor(origin, direction, numTines, spacing) {
        this.amplitude = 50;
        this.phase = Math.PI;
        const strength = direction.length();
        this.length = strength;
        this.line = direction.norm().perp();
        this.normal = direction.norm();
        this.origin = origin;
        this.numTines = numTines;
        this.spacing = spacing;
        this.angle = this.line.angle();
        this.wavelength = strength / numTines;
        this.amplitude += spacing / 10.0;
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
        let d_factor = 1.0;
        let d_line = point.sub(this.origin).dot(this.normal);
        if (d_line > this.length) {
            d_factor = 0;
        }
        else if (d_line < -1e-6) {
            d_factor = 0;
        }
        else {
            d_factor = 1.0;
        }
        const sinT = Math.sin(this.angle);
        const cosT = Math.cos(this.angle);
        const v = (point.sub(this.origin)).dot(new Vec2(sinT, -cosT));
        const factor = this.amplitude * Math.sin(2 * Math.PI / this.wavelength * v + this.phase);
        return new Vec2(cosT, sinT).scale(factor * d_factor);
    }
}
//# sourceMappingURL=wavytinelocal.js.map