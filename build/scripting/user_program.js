export default class UserProgram {
    constructor(string) {
        this.executable = new Function(string);
    }
    static fromBase64(binary) {
        return new UserProgram(atob(binary));
    }
    asBase64String() {
        return btoa(this.executable.toString());
    }
    execute(canvasSize) {
        const scriptData = { canvasWidth: canvasSize.x, canvasHeight: canvasSize.y };
        return this.executable.bind(scriptData)();
    }
}
//# sourceMappingURL=user_program.js.map