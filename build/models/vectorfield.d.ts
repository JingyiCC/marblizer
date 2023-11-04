import Vec2 from "./vector.js";
export default interface VectorField {
    atPoint(point: Vec2): Vec2;
}
export declare class UniformVectorField implements VectorField {
    private vector;
    constructor(vector: Vec2);
    atPoint(point: Vec2): Vec2;
}
export declare class SinVectorField implements VectorField {
    atPoint(point: Vec2): Vec2;
}
