import Modal from "./modal.js";
export default class UINotification extends Modal {
    callback: Function;
    constructor(content: string, callback: Function);
    willDismiss(): void;
    private didClickConfirm;
    private didClickDismiss;
}
