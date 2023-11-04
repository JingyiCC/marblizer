import { tutorialProgram } from "../../scripting/example_scripts.js";
import UINotification from "./notification.js";
export default class ScriptingPane {
    constructor(element) {
        this.downOnContainer = false;
        this.container = element.parentElement;
        this.modal = element;
        this.dismissButton = element.querySelector(".close-button");
        this.runButton = element.querySelector(".run-button");
        this.getURL = element.querySelector(".get-url-button");
        this.codeMirror = CodeMirror(element.querySelector(".input-container"), {
            value: tutorialProgram,
            mode: "javascript",
            lineNumbers: true,
            theme: "solarized dark"
        });
        this.runButton.onclick = this.didClickConfirm.bind(this);
        this.dismissButton.onclick = this.didClickDismiss.bind(this);
        this.getURL.onclick = this.didClickGetURL.bind(this);
        this.container.onmouseup = this.upContainer.bind(this);
        this.container.onmousedown = this.downContainer.bind(this);
    }
    getInput(callback) {
        this.callback = callback;
        this.show();
    }
    hide() {
        this.active = false;
        this.container.style.visibility = "hidden";
        this.container.style.display = "none";
    }
    show() {
        this.active = true;
        this.container.removeAttribute("style");
        this.codeMirror.refresh();
    }
    downContainer(event) {
        this.downOnContainer = event.target == this.container;
    }
    upContainer(event) {
        if (event.target == this.container && this.downOnContainer) {
            this.hide();
            this.callback(null);
        }
        this.downOnContainer = false;
    }
    didClickConfirm(event) {
        this.hide();
        this.callback(this.codeMirror.getValue());
    }
    didClickDismiss(event) {
        this.hide();
        this.callback(null);
    }
    didClickGetURL() {
        const program = LZString.compressToEncodedURIComponent(this.codeMirror.getValue());
        const base = window.location;
        const baseUrl = base.protocol + "//" + base.host + "/" + base.pathname.split('/')[1];
        const notification = new UINotification(baseUrl + "?p=" + program, null);
        notification.show();
    }
}
//# sourceMappingURL=scriptingpane.js.map