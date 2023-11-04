import Vec2 from "../models/vector.js";
export default class UserProgram {
    private executable;
    constructor(string: string);
    static fromBase64(binary: string): UserProgram;
    asBase64String(): string;
    execute(canvasSize: Vec2): any;
}
