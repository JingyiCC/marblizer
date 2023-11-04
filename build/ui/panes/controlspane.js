export var ButtonBehavior;
(function (ButtonBehavior) {
    ButtonBehavior[ButtonBehavior["Toggle"] = 0] = "Toggle";
    ButtonBehavior[ButtonBehavior["Temporary"] = 1] = "Temporary";
})(ButtonBehavior || (ButtonBehavior = {}));
export var UICommand;
(function (UICommand) {
    UICommand[UICommand["Save"] = 0] = "Save";
    UICommand[UICommand["ShowField"] = 1] = "ShowField";
    UICommand[UICommand["ShowScriptEditor"] = 2] = "ShowScriptEditor";
    UICommand[UICommand["ShowHelp"] = 3] = "ShowHelp";
    UICommand[UICommand["Reset"] = 4] = "Reset";
    UICommand[UICommand["ShowKeyboardShortcutOverlay"] = 5] = "ShowKeyboardShortcutOverlay";
})(UICommand || (UICommand = {}));
export default class ControlsPane {
    constructor(container) {
        this.shiftDown = false;
        this.container = container;
        const saveButton = container.querySelector(".save-image");
        const showFieldButton = container.querySelector(".show-field");
        const showScriptEditor = container.querySelector(".show-script-editor");
        const helpButton = container.querySelector(".help");
        const resetButton = container.querySelector(".reset");
        const keyboardShortcutsButton = container.querySelector(".show-keyboard-shortcuts");
        this.optionToButtonMapping = {};
        this.buttonBehaviors = {};
        this.optionToButtonMapping[UICommand.Save] = saveButton;
        this.buttonBehaviors[UICommand.Save] = ButtonBehavior.Temporary;
        this.optionToButtonMapping[UICommand.ShowField] = showFieldButton;
        this.buttonBehaviors[UICommand.ShowField] = ButtonBehavior.Toggle;
        this.optionToButtonMapping[UICommand.ShowScriptEditor] = showScriptEditor;
        this.buttonBehaviors[UICommand.ShowScriptEditor] = ButtonBehavior.Temporary;
        this.optionToButtonMapping[UICommand.ShowHelp] = helpButton;
        this.buttonBehaviors[UICommand.ShowHelp] = ButtonBehavior.Temporary;
        this.optionToButtonMapping[UICommand.Reset] = resetButton;
        this.buttonBehaviors[UICommand.Reset] = ButtonBehavior.Temporary;
        this.optionToButtonMapping[UICommand.ShowKeyboardShortcutOverlay] = keyboardShortcutsButton;
        this.buttonBehaviors[UICommand.ShowKeyboardShortcutOverlay] = ButtonBehavior.Temporary;
        for (const key in this.optionToButtonMapping) {
            this.optionToButtonMapping[key].onclick = this.optionClicked.bind(this);
        }
        document.addEventListener("keydown", this.shiftChange.bind(this));
        document.addEventListener("keyup", this.shiftChange.bind(this));
    }
    shiftChange(e) {
        this.shiftDown = e.shiftKey;
    }
    optionClicked(event) {
        const target = event.currentTarget;
        let option;
        for (let key in this.optionToButtonMapping) {
            if (this.optionToButtonMapping[key] == target) {
                option = parseInt(key);
                if (this.buttonBehaviors[key] == ButtonBehavior.Temporary) {
                    break;
                }
                if (this.optionToButtonMapping[key].className.match("active")) {
                    let newClasses = this.optionToButtonMapping[key].className.replace(/(\s|^)active(\s|$)/, ' ');
                    this.optionToButtonMapping[key].className = newClasses;
                }
                else {
                    this.optionToButtonMapping[key].className += " active";
                }
            }
        }
        this.uiDelegate.applyCommand(option);
    }
}
//# sourceMappingURL=controlspane.js.map