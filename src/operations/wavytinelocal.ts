import Operation from "./color_operations.js";
import VectorField from "../models/vectorfield.js";
import Vec2 from "../models/vector.js";
import {InteractiveCurveRenderer} from "../renderer/curve_renderer.js";

export default class WavyLineLocal implements Operation, VectorField {
    // N in the paper
    readonly normal: Vec2;
    // L in the paper
    readonly line: Vec2;
    // A in the paper
    readonly origin: Vec2;

    readonly numTines: number;
    readonly spacing: number;
    readonly amplitude: number = 50;
    readonly phase: number = Math.PI;
    readonly angle: number;
    readonly wavelength: number;
    readonly length: number;

    constructor(origin: Vec2, direction: Vec2, numTines: number, spacing: number) {
        const strength = direction.length();
        this.length = strength;
        this.line = direction.norm().perp();
        this.normal = direction.norm();
        this.origin = origin;
        this.numTines = numTines;
        this.spacing = spacing;
        this.angle = this.line.angle();
        this.wavelength = strength/numTines;
        this.amplitude += spacing / 10.0;
    }

    apply(renderer: InteractiveCurveRenderer) {
        // console.log(this.numTines, this.spacing, this.amplitude, this.phase, this.angle, this.wavelength, this.length)
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

    atPoint(point: Vec2): Vec2 {
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

        return new Vec2(cosT, sinT).scale(factor*d_factor);
    }
}