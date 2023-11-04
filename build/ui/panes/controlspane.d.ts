import { MarblingRendererDelegate, MarblingUIDelegate } from "../ui.js";
export declare enum ButtonBehavior {
    Toggle = 0,
    Temporary = 1
}
export declare enum UICommand {
    Save = 0,
    ShowField = 1,
    ShowScriptEditor = 2,
    ShowHelp = 3,
    Reset = 4,
    ShowKeyboardShortcutOverlay = 5
}
export default class ControlsPane {
    container: HTMLElement;
    optionToButtonMapping: {
        [key: number]: HTMLElement;
    };
    buttonBehaviors: {
        [key: number]: ButtonBehavior;
    };
    delegate: MarblingRendererDelegate;
    uiDelegate: MarblingUIDelegate;
    private shiftDown;
    constructor(container: HTMLElement);
    private shiftChange;
    private optionClicked;
}
