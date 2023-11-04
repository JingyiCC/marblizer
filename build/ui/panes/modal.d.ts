export default abstract class Modal {
    container: HTMLElement;
    modal: HTMLElement;
    private downOnContainer;
    constructor();
    abstract willDismiss(): any;
    show(): void;
    hide(): void;
    private downContainer;
    private upContainer;
}
