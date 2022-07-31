import * as d3 from 'd3';
import { BasePair, Label, Style, Residue, RNAData } from './interfaces';
import { classes } from './classes';
import zoom from './zoom';


export class SVGRNAVis {
    private margin = 10;
    private svg;    
    private data;

    constructor(element: HTMLElement, data: RNAData) {
        this.data = data;
        this.svg = d3.select(element)
        .append('svg')
        this.setDimensions();
    }

    public addZoom() {
        this.svg.call(zoom(this.data));
    }

    public draw(): void {
        this.addClasses();
        this.addBasePairs();
        this.addResidues();
        this.addLabels();
    }

    private setDimensions(): void {
        const residues = this.data.rnaComplexes[0].rnaMolecules[0].sequence;
        let width = Number.MIN_VALUE;
        let height = Number.MIN_VALUE;
        for (const res of residues) {
            if (res.x > width)
                width = res.x;
            if (res.y > height)
                height = res.y;
        }
        width += this.round(2 * this.margin);
        height += this.round(2 * this.margin);
        this.svg.attr('width', width)
        .attr('height', height);
    }

    private round (num: number): number {
        return Number(num.toFixed(2));
    }

    private formCoor(coor: number): number {
        return this.round(coor + this.margin);
    }

    private getFontSize(classes: Array<any>): number {
        return classes.find((style) => style.name == 'font')['font-size'].slice(0,-2);
    }

    private addClasses(): void {
        let styles = '';
        this.data.classes.concat(classes).forEach((style: Style) => {
            styles += '\n';
            styles += Object.keys(style).includes('element-wise') ? '' : '.';
            styles += style.name;
            styles += ' {';
            Object.entries(style).map(([key, value]) => {
                if (key !== 'name')
                    styles += `\n\t${key}: ${value};`;
            });
            styles += '\n}';
        });
        this.svg.append('style')
        .attr('type', 'text/css')
        .text(styles);
    }

    private addBasePairs(): void {
        const rna = this.data.rnaComplexes[0].rnaMolecules[0];

        const bpX = (resIndex: number) => this.formCoor(rna.sequence[resIndex].x);
        const bpY = (resIndex: number) => this.formCoor(rna.sequence[resIndex].y);

        const bps = this.svg.append('g').attr('class', 'bps');

        bps.selectAll('line')
        .data(rna.basePairs)
        .join('line')
        .attr('x1', (bp: BasePair) => bpX(bp.residueIndex1))
        .attr('y1', (bp: BasePair) => bpY(bp.residueIndex1))
        .attr('x2', (bp: BasePair) => bpX(bp.residueIndex2))
        .attr('y2', (bp: BasePair) => bpY(bp.residueIndex2))
        .attr('class', 'bp-line');
    }

    private addResidues(): void {
        const sequenceData = this.data.rnaComplexes[0].rnaMolecules[0].sequence;
        const residues = this.svg.append('g').attr('class', 'residues');

        const getX = (res: Residue) => this.formCoor(res.x);
        const getY = (res: Residue) => this.formCoor(res.y);
        const addLines = () => {
            type Line = {res1: Residue, res2: Residue};
            let lineData: Line[] = [];
            for (let i = 1; i < sequenceData.length; ++i) {
                lineData.push({
                    res1: sequenceData[i-1], 
                    res2: sequenceData[i], 
                });
            }
            residues.selectAll('line')
            .data(lineData)
            .join('line')
            .attr('x1', (line: Line) => getX(line.res1))
            .attr('y1', (line: Line) => getY(line.res1))
            .attr('x2', (line: Line) => getX(line.res2))
            .attr('y2', (line: Line) => getY(line.res2))
            .attr('class', 'bp-line res-line');
        }
        const addCircles = () => {
            residues.selectAll('circle')
            .data(sequenceData)
            .join('circle')
            .attr('cx', getX)
            .attr('cy', getY)
            .attr('r', this.round(this.getFontSize(this.data.classes) * 0.75))
            .attr('class', 'residue-circle');
        }
        const addTitles = () => {
            const resTitle = (residue: Residue) => 
            `${residue.residueIndex} (position.label in template: ${residue.residueIndex}.${residue.residueName}\')`;
            residues.selectAll('g')
            .data(sequenceData)
            .join('g')
            .append('title')
            .text(resTitle);
            residues.selectAll('g').append('text')
            .attr('x', getX)
            .attr('y', getY)
            .attr('class', (residue: Residue) => residue.classes.join(' '))
            .text((residue: Residue) => residue.residueName);
        }

        addLines();
        addCircles();
        addTitles();
    }

    private addLabels(): void {
        const labelData = this.data.rnaComplexes[0].rnaMolecules[0].labels;
        const labels = this.svg.append('g').attr('class', 'labels');

        labels.selectAll('g')
        .data(labelData)
        .join('g')
        .attr('class', 'label')
        .append('text')
        .text((label: Label) => label.labelContent.label)
        .attr('x', (label: Label) => this.formCoor(label.labelContent.x))
        .attr('y', (label: Label) => this.formCoor(label.labelContent.y))
        .attr('class', (label: Label) => label.labelContent.classes.join(' '));
        labels.selectAll('g').append('line')
        .attr('x1', (label: Label) => this.formCoor(label.labelLine.x1))
        .attr('x2', (label: Label) => this.formCoor(label.labelLine.x2))
        .attr('y1', (label: Label) => this.formCoor(label.labelLine.y1))
        .attr('y2', (label: Label) => this.formCoor(label.labelLine.y2))
        .attr('class', (label: Label) => label.labelLine.classes.join(' '));
    }
}

