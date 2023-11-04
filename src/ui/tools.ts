export enum Tool {
    Drop = 0,
    Spatter = 1,
    TineLine = 2,
    TineLineLocal = 3,
    WavyLineLocal = 4,
    WavyLine = 5,
    CircularTine = 6,
    Vortex = 7
}

const allTools = [Tool.Drop, Tool.Spatter, Tool.TineLine, Tool.TineLineLocal, Tool.WavyLineLocal, Tool.WavyLine, Tool.CircularTine, Tool.Vortex];

function toolInitializedObject<T>(): { [key: number]: T } {
    const object = {};
    for (const tool in allTools) {
        object[tool] = {};
    }
    return object;
}

const primaryKeys: { [key: number]: string } = toolInitializedObject();
primaryKeys[Tool.Drop] = "radius";
primaryKeys[Tool.Spatter] = "scatterRadius";
primaryKeys[Tool.TineLine] = "spacing";
primaryKeys[Tool.TineLineLocal] = "spacing";
primaryKeys[Tool.WavyLineLocal] = "spacing";
primaryKeys[Tool.WavyLine] = "spacing";
primaryKeys[Tool.CircularTine] = "spacing";

const secondaryKeys: { [key: number]: string } = toolInitializedObject();
secondaryKeys[Tool.Spatter] = "dropRadius";
secondaryKeys[Tool.TineLine] = "numTines";
secondaryKeys[Tool.TineLineLocal] = "numTines";
secondaryKeys[Tool.WavyLineLocal] = "numTines";
secondaryKeys[Tool.WavyLine] = "numTines";
secondaryKeys[Tool.CircularTine] = "numTines";

const guides: { [key: number]: string } = toolInitializedObject();
guides[Tool.Drop]["radius"] = [5, 300, 5];
guides[Tool.Spatter]["scatterRadius"] = [20, 300, 5];
guides[Tool.Spatter]["dropRadius"] = [5, 40, 5];
guides[Tool.TineLine]["spacing"] = [5, 300, 5];
guides[Tool.TineLine]["numTines"] = [0, 20, 1];
guides[Tool.TineLineLocal]["spacing"] = [5, 300, 5];
guides[Tool.TineLineLocal]["numTines"] = [0, 20, 1];
guides[Tool.WavyLineLocal]["spacing"] = [5, 300, 10];
guides[Tool.WavyLineLocal]["numTines"] = [1, 40, 1];
guides[Tool.WavyLine]["spacing"] = [5, 300, 5];
guides[Tool.WavyLine]["numTines"] = [0, 20, 1];
guides[Tool.CircularTine]["spacing"] = [5, 300, 5];
guides[Tool.CircularTine]["numTines"] = [0, 20, 1];


export default class ToolParameters {
    parameters: { [key: number]: string };
    onchange: Function;

    constructor(onchange: Function) {
        this.onchange = onchange;
        this.parameters = toolInitializedObject();
        this.parameters[Tool.Drop]["radius"] = 50;
        this.parameters[Tool.Spatter]["scatterRadius"] = 100;
        this.parameters[Tool.Spatter]["dropRadius"] = 10;
        this.parameters[Tool.Spatter]["number"] = 100;
        this.parameters[Tool.Spatter]["variability"] = 20;
        this.parameters[Tool.TineLine]["numTines"] = 1;
        this.parameters[Tool.TineLine]["spacing"] = 200;
        this.parameters[Tool.TineLineLocal]["numTines"] = 1;
        this.parameters[Tool.TineLineLocal]["spacing"] = 200;
        this.parameters[Tool.WavyLineLocal]["numTines"] = 1;
        this.parameters[Tool.WavyLineLocal]["spacing"] = 20;
        this.parameters[Tool.WavyLine]["numTines"] = 1;
        this.parameters[Tool.WavyLine]["spacing"] = 200;
        this.parameters[Tool.CircularTine]["numTines"] = 1;
        this.parameters[Tool.CircularTine]["spacing"] = 200;
    }

    forTool(tool: Tool) {
        return this.parameters[tool];
    }

    increasePrimary(tool: Tool) {
        const currentValue = this.parameters[tool][primaryKeys[tool]];
        const [min, max, step] = guides[tool][primaryKeys[tool]];
        this.parameters[tool][primaryKeys[tool]] = Math.min(max, currentValue + step);
        this.onchange();
    }

    decreasePrimary(tool: Tool) {
        const currentValue = this.parameters[tool][primaryKeys[tool]];
        const [min, max, step] = guides[tool][primaryKeys[tool]];
        this.parameters[tool][primaryKeys[tool]] = Math.max(min, currentValue - step);
        this.onchange();
    }

    increaseSecondary(tool: Tool) {
        const currentValue = this.parameters[tool][secondaryKeys[tool]];
        const [min, max, step] = guides[tool][secondaryKeys[tool]];
        this.parameters[tool][secondaryKeys[tool]] = Math.min(max, currentValue + step);
        this.onchange();
    }

    decreaseSecondary(tool: Tool) {
        const currentValue = this.parameters[tool][secondaryKeys[tool]];
        const [min, max, step] = guides[tool][secondaryKeys[tool]];
        this.parameters[tool][secondaryKeys[tool]] = Math.max(min, currentValue - step);
        this.onchange();
    }

}