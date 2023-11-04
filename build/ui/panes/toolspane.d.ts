import { MarblingRendererDelegate } from "../ui.js";
import ToolParameters, { Tool } from "../tools.js";
export default class ToolsPane {
    container: HTMLElement;
    toolToButtonMapping: {
        [key: number]: HTMLElement;
    };
    delegate: MarblingRendererDelegate;
    toolParameters: ToolParameters;
    private shiftDown;
    constructor(container: HTMLElement);
    private _currentTool;
    currentTool: Tool;
    private shiftChange;
    private toolClicked;
    private fireEvent;
}
