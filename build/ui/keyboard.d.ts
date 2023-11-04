export declare enum KeyboardShortcut {
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
export declare const keyMapping: {
    "=": KeyboardShortcut;
    "-": KeyboardShortcut;
    "s": KeyboardShortcut;
    "r": KeyboardShortcut;
    "d": KeyboardShortcut;
    "l": KeyboardShortcut;
    "e": KeyboardShortcut;
    "c": KeyboardShortcut;
    "q": KeyboardShortcut;
    "w": KeyboardShortcut;
    "v": KeyboardShortcut;
    "f": KeyboardShortcut;
    "b": KeyboardShortcut;
    "?": KeyboardShortcut;
    "ArrowRight": KeyboardShortcut;
    "ArrowLeft": KeyboardShortcut;
    "ArrowDown": KeyboardShortcut;
    "ArrowUp": KeyboardShortcut;
};
export declare const keyDownOnly: Set<string>;
export interface MarblingKeyboardUIDelegate {
    didPressShortcut(shortcut: KeyboardShortcut): any;
}
export default class MarblingKeyboardUI {
    keyboardDelegate: MarblingKeyboardUIDelegate;
    acceptingNewKeys: boolean;
    shiftDown: boolean;
    controlDown: boolean;
    altDown: boolean;
    metaDown: boolean;
    constructor();
    keyWasPressed(event: KeyboardEvent): void;
    private keyDown;
    private keyUp;
}
