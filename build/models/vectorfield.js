import Vec2 from "./vector.js";
export class UniformVectorField {
    constructor(vector) {
        this.vector = vector;
    }
    atPoint(point) {
        return this.vector;
    }
}
export class SinVectorField {
    atPoint(point) {
        return new Vec2(Math.sin(0.01 * point.x), Math.sin(0.01 * point.x));
    }
}
//# sourceMappingURL=vectorfield.js.map