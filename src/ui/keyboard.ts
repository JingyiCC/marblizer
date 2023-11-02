import set = Reflect.set;

export enum KeyboardShortcut {
    Plus = 0,
    Minus = 1,
    S = 2,
    R = 3,
    D = 4,
    L = 5,
    E = 6,
    C = 7,
    W = 8,
    V = 9,
    F = 10,
    B = 11,
    Q = 12,
    QuestionMark = 13,
    Up = 14,
    Right = 15,
    Down = 16,
    Left = 17
}

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

export interface MarblingKeyboardUIDelegate {
    didPressShortcut(shortcut: KeyboardShortcut)
}

export default class MarblingKeyboardUI {
    keyboardDelegate: MarblingKeyboardUIDelegate;
    acceptingNewKeys: boolean = true;
    shiftDown: boolean = false;
    controlDown: boolean = false;
    altDown: boolean = false;
    metaDown: boolean = false;

    constructor() {
        window.addEventListener("keypress", this.keyWasPressed.bind(this));
        window.addEventListener("keydown", this.keyDown.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));

    }

    keyWasPressed(event: KeyboardEvent) {
        if (!this.acceptingNewKeys) {
            return;
        }
        const shortcut = keyMapping[event.key];
        this.keyboardDelegate.didPressShortcut(shortcut);

    }

    private keyDown(e: KeyboardEvent) {
        this.shiftDown = e.shiftKey;
        this.controlDown = e.ctrlKey;
        this.altDown = e.altKey;
        this.metaDown = e.metaKey;

        if (this.controlDown && e.keyCode == 83) {
            event.preventDefault();
            this.keyboardDelegate.didPressShortcut(KeyboardShortcut.S);

            return false;
        } else if (keyDownOnly.has(e.key)) {
            event.preventDefault();
            const shortcut = keyMapping[e.key];
            this.keyboardDelegate.didPressShortcut(shortcut);
        }
    }

    private keyUp(e: KeyboardEvent) {
        this.shiftDown = e.shiftKey;
        this.controlDown = e.ctrlKey;
        this.altDown = e.altKey;
        this.metaDown = e.metaKey;
    }


}