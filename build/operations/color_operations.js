export class ChangeBaseColorOperation {
    constructor(color) {
        this.color = color;
    }
    apply(renderer) {
        renderer.baseColor = this.color;
    }
}
//# sourceMappingURL=color_operations.js.map