import Vec2 from "../models/vector.js";
export default class WavyLineTine {
    constructor(origin, direction, numTines, spacing) {
        this.alpha = 30.0;
        this.lambda = 32;
        this.amplitude = 10;
        this.phase = 0.0;
        this.wavelength = 400.0;
        const strength = direction.length();
        this.line = direction.norm().perp();
        this.origin = origin;
        this.numTines = numTines;
        this.spacing = spacing;
        this.angle = this.line.angle();
        this.amplitude += strength / 10.0;
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
        const sinT = Math.sin(this.angle);
        const cosT = Math.cos(this.angle);
        const v = point.dot(new Vec2(sinT, -cosT));
        const factor = this.amplitude * Math.sin(2 * Math.PI / this.wavelength * v + this.phase);
        return new Vec2(cosT, sinT).scale(factor);
    }
}
//# sourceMappingURL=wavylinetine.js.map