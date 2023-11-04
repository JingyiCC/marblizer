import Color from "../models/color.js";
import { InteractiveCurveRenderer } from "../renderer/curve_renderer.js";
export default interface Operation {
    apply(renderer: InteractiveCurveRenderer): any;
}
export declare class ChangeBaseColorOperation implements Operation {
    readonly color: Color;
    constructor(color: Color);
    apply(renderer: InteractiveCurveRenderer): void;
}
