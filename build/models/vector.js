export default class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static zero() {
        return new Vec2(0, 0);
    }
    sub(other) {
        return new Vec2(this.x - other.x, this.y - other.y);
    }
    add(other) {
        return new Vec2(this.x + other.x, this.y + other.y);
    }
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }
    copy() {
        return new Vec2(this.x, this.y);
    }
    acc(other) {
        this.x += other.x;
        this.y += other.y;
    }
    scale(factor) {
        return new Vec2(this.x * factor, this.y * factor);
    }
    norm() {
        const l = this.length();
        return new Vec2(this.x / l, this.y / l);
    }
    perp() {
        return new Vec2(-1 * this.y, this.x);
    }
    length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    angle() {
        return Math.atan2(this.y, this.x);
    }
    mult(mat) {
        return new Vec2(this.x * mat.m11 + this.y * mat.m21, this.x * mat.m12 + this.y * mat.m22);
    }
    get(i) {
        switch (i) {
            case 0:
                return this.x;
            case 1:
                return this.y;
        }
        console.assert(false, "Invalid vector index");
    }
    eq(other) {
        return this.x == other.x && this.y == other.y;
    }
}
export function vecMax(first, second) {
    return new Vec2(Math.max(first.x, second.x), Math.max(first.y, second.y));
}
export function vecMin(first, second) {
    return new Vec2(Math.min(first.x, second.x), Math.min(first.y, second.y));
}
//# sourceMappingURL=vector.js.map