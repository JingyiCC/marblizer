import { default as Color, colorSets } from "../../models/color.js";
import { ChangeBaseColorOperation } from "../../operations/color_operations.js";
export default class ColorPane {
    constructor(container) {
        this.swatches = [];
        this.container = container;
        for (let i = 0; i < 5; i++) {
            const selector = ".swatch-" + i;
            const element = container.querySelector(selector);
            element.onclick = this.swatchClicked.bind(this);
            this.swatches.push(element);
        }
        window.addEventListener("change", function () {
            alert("test");
        });
        function installed() {
            this.foregroundPicker = container.querySelector(".foreground");
            this.backgroundPicker = container.querySelector(".background");
            this.foregroundPicker.onchange = this.foregroundChanged.bind(this);
            this.backgroundPicker.onchange = this.backgroundChanged.bind(this);
        }
        document.addEventListener("colorPickersInstalled", installed.bind(this));
        for (let i = 0; i < this.swatches.length; i++) {
            this.swatches[i].style.backgroundColor = colorSets[0][i].toRGBString();
        }
    }
    get currentColor() {
        return Color.withHex(this.foregroundPicker.value);
    }
    foregroundChanged(event, color) {
        let swatchColors = [];
        for (let i = 0; i < this.swatches.length; i++) {
            const current = Color.withRGB(this.swatches[i].style.backgroundColor);
            swatchColors.push(current);
        }
        this.swatches[0].style.backgroundColor = color.toRgbString();
        for (let i = 1; i < this.swatches.length; i++) {
            const current = swatchColors[i - 1];
            this.swatches[i].style.backgroundColor = current.toRGBString();
            swatchColors.push(current);
        }
    }
    backgroundChanged(event, color) {
        const parsed = Color.withRGB(color.toRgbString());
        this.delegate.applyOperations([new ChangeBaseColorOperation(parsed)]);
    }
    swatchClicked(event) {
        const target = event.target;
        const newColor = Color.withRGB(target.style.backgroundColor);
        $(this.foregroundPicker).spectrum("set", newColor.toHexString());
    }
}
//# sourceMappingURL=colorpane.js.map