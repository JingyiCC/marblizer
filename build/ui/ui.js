import { default as ControlsPane, UICommand } from "./panes/controlspane.js";
import ToolsPane from "./panes/toolspane.js";
import ColorPane from "./panes/colorpane.js";
import ScriptingPane from "./panes/scriptingpane.js";
import Vec2 from "../models/vector.js";
import MarblingKeyboardUI, { KeyboardShortcut } from "./keyboard.js";
import CursorOverlay from "./cursor/cursor_overlay.js";
import VectorFieldOverlay from "./vector_field_overlay.js";
import InkDropOperation from "../operations/inkdrop.js";
import { Tool } from "./tools.js";
import Vortex from "../operations/vortex.js";
import CircularLineTine from "../operations/circularlinetine.js";
import WavyLineTine from "../operations/wavylinetine.js";
import LineTineLocal from "../operations/linetineLocal.js";
import WavyLineLocal from "../operations/wavytinelocal.js";
import LineTine from "../operations/linetine.js";
import KeyboardShortcutOverlay from "./help_overlay.js";
import UserProgram from "../scripting/user_program.js";
export default class MarblingUI {
    constructor(container, toolsContainer, optionsContainer, colorContainer, textContainer) {
        this.toolsPane = new ToolsPane(toolsContainer);
        this.colorPane = new ColorPane(colorContainer);
        this.scriptingPane = new ScriptingPane(textContainer);
        this.controlsPane = new ControlsPane(optionsContainer);
        this.controlsPane.uiDelegate = this;
        this.keyboardShortcutOverlay = new KeyboardShortcutOverlay();
        this.keyboardManager = new MarblingKeyboardUI();
        this.keyboardManager.keyboardDelegate = this;
        container.addEventListener("mousedown", this.mouseDown.bind(this));
        container.addEventListener("mouseup", this.mouseUp.bind(this));
        container.addEventListener("mousemove", this.mouseMove.bind(this));
        container.addEventListener("mousewheel", this.scroll.bind(this));
        document.addEventListener("mouseout", this.mouseOut.bind(this));
        this.cursorOverlay = new CursorOverlay(container);
        this.vectorFieldOverlay = new VectorFieldOverlay(container);
    }
    set delegate(delegate) {
        this._delegate = delegate;
        this.toolsPane.delegate = delegate;
        this.controlsPane.delegate = delegate;
        this.colorPane.delegate = delegate;
    }
    set size(size) {
        this.cursorOverlay.setSize(size.x, size.y);
        this.vectorFieldOverlay.setSize(size.x, size.y);
        this._size = size;
    }
    didPressShortcut(shortcut) {
        switch (shortcut) {
            case KeyboardShortcut.S:
                if (this.keyboardManager.controlDown) {
                    this._delegate.save();
                }
                else {
                    this.keyboardManager.acceptingNewKeys = false;
                    this.scriptingPane.getInput(this.didEnterInput.bind(this));
                }
                return;
            case KeyboardShortcut.Up:
                this.toolsPane.toolParameters.increasePrimary(this.toolsPane.currentTool);
                return;
            case KeyboardShortcut.Down:
                this.toolsPane.toolParameters.decreasePrimary(this.toolsPane.currentTool);
                return;
            case KeyboardShortcut.Right:
                this.toolsPane.toolParameters.increaseSecondary(this.toolsPane.currentTool);
                return;
            case KeyboardShortcut.Left:
                this.toolsPane.toolParameters.decreaseSecondary(this.toolsPane.currentTool);
                return;
            case KeyboardShortcut.R:
                if (confirm("Clear the composition?")) {
                    this._delegate.reset();
                }
                return;
            case KeyboardShortcut.F:
                this.vectorFieldOverlay.toggleVisibility();
                return;
            case KeyboardShortcut.Q:
                this.vectorFieldOverlay.decreaseResolution();
                return;
            case KeyboardShortcut.W:
                this.vectorFieldOverlay.increaseResolution();
                return;
            case KeyboardShortcut.QuestionMark:
                if (this.keyboardManager.shiftDown) {
                    this.keyboardShortcutOverlay.show();
                }
                return;
        }
    }
    applyCommand(command) {
        switch (command) {
            case UICommand.Reset: {
                if (confirm("Clear the composition?")) {
                    this._delegate.reset();
                }
                return;
            }
            case UICommand.Save: {
                this._delegate.save();
                return;
            }
            case UICommand.ShowField: {
                this.vectorFieldOverlay.toggleVisibility();
                return;
            }
            case UICommand.ShowHelp: {
                return;
            }
            case UICommand.ShowKeyboardShortcutOverlay: {
                this.keyboardShortcutOverlay.show();
                return;
            }
            case UICommand.ShowScriptEditor: {
                this.scriptingPane.getInput(this.didEnterInput.bind(this));
            }
        }
    }
    didEnterInput(input) {
        this.keyboardManager.acceptingNewKeys = true;
        if (input == null) {
            return;
        }
        let result;
        try {
            const userProgram = new UserProgram(input);
            result = userProgram.execute(this._size);
        }
        catch (e) {
            alert(e);
        }
        if (result != null && result.length > 0) {
            this._delegate.applyOperations(result);
        }
    }
    mouseDown(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        this.mouseDownCoord = new Vec2(x, y);
        this.mouseInterval = setInterval(this.mouseHeldHandler.bind(this), 50);
    }
    mouseUp(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        let operation;
        const currentCoord = new Vec2(x, y);
        switch (this.toolsPane.currentTool) {
            case Tool.Drop:
                const dropRadius = this.toolsPane.toolParameters.forTool(Tool.Drop)['radius'];
                operation = new InkDropOperation(new Vec2(x, y), dropRadius, this.colorPane.currentColor, !this.keyboardManager.shiftDown);
                this._delegate.applyOperations([operation]);
                break;
            case Tool.TineLine: {
                const direction = currentCoord.sub(this.mouseDownCoord);
                if (direction.length() > 0.03) {
                    const numTines = this.toolsPane.toolParameters.forTool(Tool.TineLine)['numTines'];
                    const spacing = this.toolsPane.toolParameters.forTool(Tool.TineLine)['spacing'];
                    operation = new LineTine(this.mouseDownCoord, direction, numTines, spacing);
                    this._delegate.applyOperations([operation]);
                }
                break;
            }
            case Tool.TineLineLocal: {
                const direction = currentCoord.sub(this.mouseDownCoord);
                if (direction.length() > 0.03) {
                    const numTines = this.toolsPane.toolParameters.forTool(Tool.TineLineLocal)['numTines'];
                    const spacing = this.toolsPane.toolParameters.forTool(Tool.TineLineLocal)['spacing'];
                    operation = new LineTineLocal(this.mouseDownCoord, direction, numTines, spacing);
                    this._delegate.applyOperations([operation]);
                }
                break;
            }
            case Tool.WavyLineLocal: {
                const direction = currentCoord.sub(this.mouseDownCoord);
                if (direction.length() > 0.03) {
                    const numTines = this.toolsPane.toolParameters.forTool(Tool.WavyLineLocal)['numTines'];
                    const spacing = this.toolsPane.toolParameters.forTool(Tool.WavyLineLocal)['spacing'];
                    operation = new WavyLineLocal(this.mouseDownCoord, direction, numTines, spacing);
                    this._delegate.applyOperations([operation]);
                }
                break;
            }
            case Tool.WavyLine: {
                const direction = currentCoord.sub(this.mouseDownCoord);
                if (direction.length() > 0.03) {
                    const numTines = this.toolsPane.toolParameters.forTool(Tool.WavyLine)['numTines'];
                    const spacing = this.toolsPane.toolParameters.forTool(Tool.WavyLine)['spacing'];
                    operation = new WavyLineTine(this.mouseDownCoord, direction, numTines, spacing);
                    this._delegate.applyOperations([operation]);
                }
                break;
            }
            case Tool.CircularTine: {
                const radius = currentCoord.sub(this.mouseDownCoord).length();
                const numTines = this.toolsPane.toolParameters.forTool(Tool.CircularTine)['numTines'];
                const spacing = this.toolsPane.toolParameters.forTool(Tool.CircularTine)['spacing'];
                if (radius > 0.03) {
                    operation = new CircularLineTine(this.mouseDownCoord, radius, numTines, spacing);
                    this._delegate.applyOperations([operation]);
                }
                break;
            }
            case Tool.Vortex: {
                const radius = currentCoord.sub(this.mouseDownCoord).length();
                if (radius > 0.03) {
                    operation = new Vortex(this.mouseDownCoord, radius);
                    this._delegate.applyOperations([operation]);
                }
                break;
            }
        }
        this.lastMouseCoord = null;
        this.mouseDownCoord = null;
        clearInterval(this.mouseInterval);
        this.mouseInterval = 0;
    }
    mouseMove(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        this.lastMouseCoord = new Vec2(x, y);
    }
    mouseOut(e) {
        this.mouseDownCoord = null;
        this.lastMouseCoord = null;
    }
    mouseHeldHandler() {
        switch (this.toolsPane.currentTool) {
            case Tool.Spatter:
                if (this.mouseDownCoord != null) {
                    const dropRadius = this.toolsPane.toolParameters.forTool(Tool.Spatter)['dropRadius'];
                    const scatterRadius = this.toolsPane.toolParameters.forTool(Tool.Spatter)['scatterRadius'];
                    const currentColor = this.colorPane.currentColor;
                    if (Math.random() < 0.5) {
                        const newOrigin = this.lastMouseCoord.add(new Vec2(Math.random() * 2 * scatterRadius - scatterRadius, Math.random() * 2 * scatterRadius - scatterRadius));
                        const newRadius = Math.random() * 6 + dropRadius - 3;
                        const operation = new InkDropOperation(newOrigin, newRadius, currentColor, false);
                        this._delegate.applyOperations([operation]);
                    }
                }
        }
    }
    scroll(e) {
        const delta = e.wheelDelta;
        if (delta > 0) {
            if (!this.keyboardManager.shiftDown) {
                this.toolsPane.toolParameters.increasePrimary(this.toolsPane.currentTool);
            }
            else {
                this.toolsPane.toolParameters.increaseSecondary(this.toolsPane.currentTool);
            }
        }
        else {
            if (!this.keyboardManager.shiftDown) {
                this.toolsPane.toolParameters.decreasePrimary(this.toolsPane.currentTool);
            }
            else {
                this.toolsPane.toolParameters.decreaseSecondary(this.toolsPane.currentTool);
            }
        }
    }
}
//# sourceMappingURL=ui.js.map