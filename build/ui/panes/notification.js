import Modal from "./modal.js";
export default class UINotification extends Modal {
    constructor(content, callback) {
        super();
        this.modal.className += " notification";
        this.modal.innerHTML = content;
        this.callback = callback;
    }
    willDismiss() {
        this.callback();
    }
    didClickConfirm(event) {
        this.hide();
        this.callback(true);
    }
    didClickDismiss(event) {
        this.hide();
        this.callback(false);
    }
}
//# sourceMappingURL=notification.js.map