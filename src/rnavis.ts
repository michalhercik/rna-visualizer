import * as d3 from 'd3';
import { BasePair, Label, Style, Residue, RNAData } from './interfaces';
import { classes } from './classes';

const WIDTH = 1200;
const HEIGHT = 1400;

export class RNAVis {
    private margin = 10;
    private svg;    
    private data;

    constructor(element: HTMLElement, data: RNAData) {
        this.data = data;
        this.svg = d3.select(element).append('svg') 
        .attr('viewBox', [0, 0, WIDTH, HEIGHT])
        .attr('width', WIDTH)
        .attr('height', HEIGHT);
    }

    public draw(): void {
        this.addClasses();
        this.addBasePairs();
        this.addResidues();
        this.addLabels();
    }

    private round (num: number): string {
        return num.toFixed(2);
    }

    private formCoor(coor: number): string {
        return this.round(coor + this.margin)
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
        const rna = this.data.rnaComplexes[0].rnaMolecules[0];
        const resX = (residue: Residue) => this.formCoor(residue.x);
        const resY = (residue: Residue) => this.formCoor(residue.y);
        const resTitle = (residue: Residue) => 
        `${residue.residueIndex} (position.label in template: ${residue.residueIndex}.${residue.residueName}\')`;
        const residues = this.svg.append('g').attr('class', 'residues');

        residues.selectAll('circle')
        .data(rna.sequence)
        .join('circle')
        .attr('cx', resX)
        .attr('cy', resY)
        .attr('r', this.round(this.getFontSize(this.data.classes) * 0.75))
        .attr('class', 'residue-circle');

        residues.selectAll('g')
        .data(rna.sequence)
        .join('g')
        .append('title')
        .text(resTitle);
        residues.selectAll('g').append('text')
        .attr('x', resX)
        .attr('y', resY)
        .attr('class', (residue: Residue) => residue.classes.join(' '))
        .text((residue: Residue) => residue.residueName);
    }

    private addLabels(): void {
        const rna = this.data.rnaComplexes[0].rnaMolecules[0];
        const labels = this.svg.append('g').attr('class', 'labels');

        labels.selectAll('g')
        .data(rna.labels)
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

