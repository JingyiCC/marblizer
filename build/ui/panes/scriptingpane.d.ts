/// <reference path="../../../src/.d.ts" />
export default class ScriptingPane {
    container: HTMLElement;
    modal: HTMLElement;
    callback: Function;
    active: boolean;
    private codeMirror;
    private runButton;
    private dismissButton;
    private getURL;
    private downOnContainer;
    constructor(element: HTMLElement);
    getInput(callback: Function): void;
    hide(): void;
    show(): void;
    private downContainer;
    private upContainer;
    private didClickConfirm;
    private didClickDismiss;
    private didClickGetURL;
}
