export var KeyboardShortcut;
(function (KeyboardShortcut) {
    KeyboardShortcut[KeyboardShortcut["Plus"] = 0] = "Plus";
    KeyboardShortcut[KeyboardShortcut["Minus"] = 1] = "Minus";
    KeyboardShortcut[KeyboardShortcut["S"] = 2] = "S";
    KeyboardShortcut[KeyboardShortcut["R"] = 3] = "R";
    KeyboardShortcut[KeyboardShortcut["D"] = 4] = "D";
    KeyboardShortcut[KeyboardShortcut["L"] = 5] = "L";
    KeyboardShortcut[KeyboardShortcut["E"] = 6] = "E";
    KeyboardShortcut[KeyboardShortcut["C"] = 7] = "C";
    KeyboardShortcut[KeyboardShortcut["W"] = 8] = "W";
    KeyboardShortcut[KeyboardShortcut["V"] = 9] = "V";
    KeyboardShortcut[KeyboardShortcut["F"] = 10] = "F";
    KeyboardShortcut[KeyboardShortcut["B"] = 11] = "B";
    KeyboardShortcut[KeyboardShortcut["Q"] = 12] = "Q";
    KeyboardShortcut[KeyboardShortcut["QuestionMark"] = 13] = "QuestionMark";
    KeyboardShortcut[KeyboardShortcut["Up"] = 14] = "Up";
    KeyboardShortcut[KeyboardShortcut["Right"] = 15] = "Right";
    KeyboardShortcut[KeyboardShortcut["Down"] = 16] = "Down";
    KeyboardShortcut[KeyboardShortcut["Left"] = 17] = "Left";
})(KeyboardShortcut || (KeyboardShortcut = {}));
export const keyMapping = {
    "=": KeyboardShortcut.Plus,
    "-": KeyboardShortcut.Minus,
    "s": KeyboardShortcut.S,
    "r": KeyboardShortcut.R,
    "d": KeyboardShortcut.D,
    "l": KeyboardShortcut.L,
    "e": KeyboardShortcut.E,
    "c": KeyboardShortcut.C,
    "q": KeyboardShortcut.Q,
    "w": KeyboardShortcut.W,
    "v": KeyboardShortcut.V,
    "f": KeyboardShortcut.F,
    "b": KeyboardShortcut.B,
    "?": KeyboardShortcut.QuestionMark,
    "ArrowRight": KeyboardShortcut.Right,
    "ArrowLeft": KeyboardShortcut.Left,
    "ArrowDown": KeyboardShortcut.Down,
    "ArrowUp": KeyboardShortcut.Up,
};
export const keyDownOnly = new Set([
    "ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"
]);
export default class MarblingKeyboardUI {
    constructor() {
        this.acceptingNewKeys = true;
        this.shiftDown = false;
        this.controlDown = false;
        this.altDown = false;
        this.metaDown = false;
        window.addEventListener("keypress", this.keyWasPressed.bind(this));
        window.addEventListener("keydown", this.keyDown.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));
    }
    keyWasPressed(event) {
        if (!this.acceptingNewKeys) {
            return;
        }
        const shortcut = keyMapping[event.key];
        this.keyboardDelegate.didPressShortcut(shortcut);
    }
    keyDown(e) {
        this.shiftDown = e.shiftKey;
        this.controlDown = e.ctrlKey;
        this.altDown = e.altKey;
        this.metaDown = e.metaKey;
        if (this.controlDown && e.keyCode == 83) {
            event.preventDefault();
            this.keyboardDelegate.didPressShortcut(KeyboardShortcut.S);
            return false;
        }
        else if (keyDownOnly.has(e.key)) {
            event.preventDefault();
            const shortcut = keyMapping[e.key];
            this.keyboardDelegate.didPressShortcut(shortcut);
        }
    }
    keyUp(e) {
        this.shiftDown = e.shiftKey;
        this.controlDown = e.ctrlKey;
        this.altDown = e.altKey;
        this.metaDown = e.metaKey;
    }
}
//# sourceMappingURL=keyboard.js.map