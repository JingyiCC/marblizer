import { default as ControlsPane, UICommand } from "./panes/controlspane.js";
import Operation from "../operations/color_operations.js";
import ToolsPane from "./panes/toolspane.js";
import ColorPane from "./panes/colorpane.js";
import Vec2 from "../models/vector.js";
import { KeyboardShortcut } from "./keyboard.js";
export interface MarblingRendererDelegate {
    reset(): any;
    applyOperations(operations: [Operation]): any;
    save(): any;
}
export interface MarblingUIDelegate {
    applyCommand(command: UICommand): any;
}
export default class MarblingUI implements MarblingUIDelegate {
    toolsPane: ToolsPane;
    colorPane: ColorPane;
    controlsPane: ControlsPane;
    private scriptingPane;
    private lastMouseCoord;
    private mouseDownCoord;
    private mouseInterval;
    private keyboardShortcutOverlay;
    private keyboardManager;
    private cursorOverlay;
    private vectorFieldOverlay;
    constructor(container: HTMLElement, toolsContainer: HTMLElement, optionsContainer: HTMLElement, colorContainer: HTMLElement, textContainer: HTMLElement);
    _delegate: MarblingRendererDelegate;
    delegate: MarblingRendererDelegate;
    private _size;
    size: Vec2;
    didPressShortcut(shortcut: KeyboardShortcut): void;
    applyCommand(command: UICommand): void;
    private didEnterInput;
    private mouseDown;
    private mouseUp;
    private mouseMove;
    private mouseOut;
    private mouseHeldHandler;
    private scroll;
}
