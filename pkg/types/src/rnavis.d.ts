import { RNAData } from './interfaces';
export declare class RNAVis {
    private margin;
    private canvas;
    private dataContainer;
    private linesDrawer;
    private circlesDrawer;
    private textDrawer;
    constructor(element: HTMLElement, data: RNAData);
    private setDimensions;
    addZoom(): void;
    draw(): void;
}
