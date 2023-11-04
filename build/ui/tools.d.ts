export declare enum Tool {
    Drop = 0,
    Spatter = 1,
    TineLine = 2,
    TineLineLocal = 3,
    WavyLineLocal = 4,
    WavyLine = 5,
    CircularTine = 6,
    Vortex = 7
}
export default class ToolParameters {
    parameters: {
        [key: number]: string;
    };
    onchange: Function;
    constructor(onchange: Function);
    forTool(tool: Tool): string;
    increasePrimary(tool: Tool): void;
    decreasePrimary(tool: Tool): void;
    increaseSecondary(tool: Tool): void;
    decreaseSecondary(tool: Tool): void;
}
