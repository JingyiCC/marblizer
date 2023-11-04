import Mat2x2 from "../models/matrix.js";
export default class CircularLineTine {
    constructor(origin, radius, numTines, interval, counterClockwise = false) {
        this.alpha = 80.0;
        this.lambda = 32;
        this.radius = radius;
        this.center = origin;
        this.numTines = numTines;
        this.interval = interval;
        this.counterClockwise = counterClockwise;
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
        const pLessC = point.sub(this.center);
        const pLessCLen = pLessC.length();
        const d = Math.abs(pLessCLen - this.radius);
        const l = this.alpha * this.lambda / (d + this.lambda);
        const theta = this.counterClockwise ? -l / pLessCLen : l / pLessCLen;
        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta);
        const mat = new Mat2x2(cosT, sinT, -sinT, cosT);
        const addend = pLessC.mult(mat);
        const trans = this.center.add(addend);
        return trans.sub(point);
    }
}
//# sourceMappingURL=circularlinetine.js.map