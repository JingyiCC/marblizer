export default class Modal {
    constructor() {
        this.downOnContainer = false;
        this.container = document.createElement("div");
        this.container.className = "modal-container";
        document.body.appendChild(this.container);
        this.modal = document.createElement("div");
        this.container.appendChild(this.modal);
        this.modal.className = "center-pane marbling-pane";
        this.hide();
        this.container.onmouseup = this.upContainer.bind(this);
        this.container.onmousedown = this.downContainer.bind(this);
    }
    show() {
        this.container.removeAttribute("style");
    }
    hide() {
        this.container.style.visibility = "hidden";
        this.container.style.display = "none";
    }
    downContainer(event) {
        this.downOnContainer = event.target == this.container;
    }
    upContainer(event) {
        if (event.target == this.container && this.downOnContainer) {
            this.hide();
            this.willDismiss();
        }
        this.downOnContainer = false;
    }
}
//# sourceMappingURL=modal.js.map