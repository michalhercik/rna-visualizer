import * as d3 from 'd3';
import { BasePair, Label, Style, Residue, RNAData } from './interfaces';
import { Styles } from './classes';

export default class DataContainer {
    public readonly margin = 10;
    public readonly styles;
    public width: number;
    public height: number;
    public readonly container;
    public readonly data;
    public readonly classComb = {
        line: new Set(),
        circle: new Set(),
        text: new Set()
    };

    public constructor(data: RNAData, styles: Styles) {
        this.data = data;
        this.styles = styles;
        this.container = d3.select(document.createElement('custom'));
    }

    public getResByCoor(x: number, y: number): any {
        const styles = this.styles;
        let res: any = null;
        this.container.selectAll('.res-title').each(function () {
            const node = d3.select(this);
            const resStyles = styles.get(node.attr('class')); 
            const k = resStyles['k'] || 1;
            const shift = (+resStyles['font-size'].slice(0, -2) || 7) * k / 2;
            if ( x >= +node.attr('x') - shift 
               && x <= +node.attr('x') + shift
               && y >= +node.attr('y') - shift 
               && y <= +node.attr('y') + shift ) {
                   res = node;
               }
        })
        return res;
    }
}
