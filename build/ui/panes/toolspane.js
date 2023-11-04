import ToolParameters, { Tool } from "../tools.js";
export default class ToolsPane {
    constructor(container) {
        this.shiftDown = false;
        this.container = container;
        const dropButton = container.querySelector(".drop-tool");
        const spatterButton = container.querySelector(".spatter-tool");
        const tineButton = container.querySelector(".tine-tool");
        const localButton = container.querySelector(".local-tool");
        const wavyButton = container.querySelector(".wavy-tine-tool");
        const localWavyButton = container.querySelector(".local-wavy-tool");
        const circularButton = container.querySelector(".circular-tine-tool");
        const swirlButton = container.querySelector(".vortex-tool");
        this.toolToButtonMapping = {};
        this.toolToButtonMapping[Tool.Drop] = dropButton;
        this.toolToButtonMapping[Tool.Spatter] = spatterButton;
        this.toolToButtonMapping[Tool.TineLine] = tineButton;
        this.toolToButtonMapping[Tool.TineLineLocal] = localButton;
        this.toolToButtonMapping[Tool.WavyLineLocal] = localWavyButton;
        this.toolToButtonMapping[Tool.WavyLine] = wavyButton;
        this.toolToButtonMapping[Tool.CircularTine] = circularButton;
        this.toolToButtonMapping[Tool.Vortex] = swirlButton;
        this.toolParameters = new ToolParameters(this.fireEvent.bind(this));
        this._currentTool = Tool.Drop;
        this.toolToButtonMapping[this._currentTool.valueOf()].className += " active";
        for (const key in this.toolToButtonMapping) {
            this.toolToButtonMapping[key].onclick = this.toolClicked.bind(this);
        }
        document.addEventListener("keydown", this.shiftChange.bind(this));
        document.addEventListener("keyup", this.shiftChange.bind(this));
    }
    get currentTool() {
        return this._currentTool;
    }
    set currentTool(value) {
        this._currentTool = value;
        this.fireEvent();
    }
    shiftChange(e) {
        this.shiftDown = e.shiftKey;
    }
    toolClicked(event) {
        for (let key in this.toolToButtonMapping) {
            let newClasses = this.toolToButtonMapping[key].className.replace(/(\s|^)active(\s|$)/, ' ');
            this.toolToButtonMapping[key].className = newClasses;
        }
        const target = event.currentTarget;
        for (let key in this.toolToButtonMapping) {
            if (this.toolToButtonMapping[key] == target) {
                this._currentTool = parseInt(key);
            }
        }
        this.toolToButtonMapping[this._currentTool.valueOf()].className += " active";
        this.fireEvent();
    }
    fireEvent() {
        const dict = { "currentTool": this.currentTool, "parameters": this.toolParameters.forTool(this.currentTool) };
        const event = new CustomEvent("toolchange", { detail: dict });
        document.dispatchEvent(event);
    }
}
//# sourceMappingURL=toolspane.js.map