import { MarblingRendererDelegate } from "../ui.js";
import { default as Color } from "../../models/color.js";
export default class ColorPane {
    container: HTMLElement;
    foregroundPicker: HTMLInputElement;
    backgroundPicker: HTMLInputElement;
    swatches: Array<HTMLElement>;
    delegate: MarblingRendererDelegate;
    constructor(container: HTMLElement);
    readonly currentColor: Color;
    private foregroundChanged;
    private backgroundChanged;
    private swatchClicked;
}
