import * as d3 from 'd3';
import { RNAData } from './interfaces';
import { Styles } from './classes';
export default class DataContainer {
    private margin;
    private styles;
    private width;
    private height;
    container: d3.Selection<HTMLElement, unknown, null, undefined>;
    data: RNAData;
    classComb: {
        line: Set<unknown>;
        circle: Set<unknown>;
        text: Set<unknown>;
    };
    constructor(data: RNAData, styles: Styles);
    private round;
    private formCoor;
    private setDimensions;
    private addClasses;
    private addBasePairs;
    private addResidues;
    private addLabels;
    update(event: any): void;
    getWidth(): number;
    getHeight(): number;
}
