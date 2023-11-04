import Operation from "../operations/color_operations.js";
import MarblingRenderer from "./curve_renderer.js";
export default class SVGRenderer implements MarblingRenderer {
    save(): void;
    applyOperations(operations: [Operation]): void;
}
