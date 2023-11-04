import Vec2 from "./vector.js";
export default class Mat2x2 {
    constructor(m11, m12, m21, m22) {
        this.m11 = m11;
        this.m12 = m12;
        this.m21 = m21;
        this.m22 = m22;
    }
    static withColumns(first, second) {
        return new Mat2x2(first.x, second.x, first.y, second.y);
    }
    mult(v) {
        return new Vec2(this.m11 * v.x + this.m12 * v.y, this.m21 * v.x + this.m22 * v.y);
    }
}
//# sourceMappingURL=matrix.js.map