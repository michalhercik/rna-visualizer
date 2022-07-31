import * as d3 from 'd3';
import { BasePair, Label, Style, Residue, RNAData } from './interfaces';
import { classes } from './classes';
import zoom from './zoom';


export class RNAVis {
    private margin = 10;
    private canvas;    
    private data;
    private dataContainer;

    constructor(element: HTMLElement, data: RNAData) {
        this.data = data;
        this.canvas = d3.select(element)
        .append('canvas')
        this.dataContainer = d3.select(document.createElement('custom'));
        this.setDimensions();

        this.addClasses();
        this.addBasePairs();
        this.addResidues();
        this.addLabels();
    }

    public addZoom() {
        //const button = document.createElement('button');
        //button.innerText = 'Zoom';
        //button.addEventListener('click', () => zoom(this.data));
        //document.body.appendChild(button);
        this.canvas.call(zoom(this.data));
    }

    public draw(): void {
        const context = this.canvas.node().getContext('2d');
        context.fillStyle = '#fff';
        context.rect(0, 0, +this.canvas.attr('width'), +this.canvas.attr('height'));
        context.fill();

        this.drawBasePairs();
        this.drawResidues();
        this.drawLabels();
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
        this.canvas.attr('width', width)
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
        this.canvas.append('style')
        .attr('type', 'text/css')
        .text(styles);
    }

    private addBasePairs(): void {
        const rna = this.data.rnaComplexes[0].rnaMolecules[0];

        const bpX = (resIndex: number) => this.formCoor(rna.sequence[resIndex].x);
        const bpY = (resIndex: number) => this.formCoor(rna.sequence[resIndex].y);

        // const bps = this.canvas.append('g').attr('class', 'bps');

        this.dataContainer.selectAll('custom.bp-line')
        .data(rna.basePairs)
        .join('custom')
        .attr('x1', (bp: BasePair) => bpX(bp.residueIndex1))
        .attr('y1', (bp: BasePair) => bpY(bp.residueIndex1))
        .attr('x2', (bp: BasePair) => bpX(bp.residueIndex2))
        .attr('y2', (bp: BasePair) => bpY(bp.residueIndex2))
        .attr('class', 'bp-line');
    }

    private addResidues(): void {
        const sequenceData = this.data.rnaComplexes[0].rnaMolecules[0].sequence;
        //const residues = this.canvas.append('g').attr('class', 'residues');

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
            this.dataContainer.selectAll('custom.res-line')
            .data(lineData)
            .join('custom')
            .attr('x1', (line: Line) => getX(line.res1))
            .attr('y1', (line: Line) => getY(line.res1))
            .attr('x2', (line: Line) => getX(line.res2))
            .attr('y2', (line: Line) => getY(line.res2))
            .attr('class', 'bp-line res-line');
        }
        const addCircles = () => {
            this.dataContainer.selectAll('custom.res-circle')
            .data(sequenceData)
            .join('custom')
            .attr('cx', getX)
            .attr('cy', getY)
            .attr('r', this.round(this.getFontSize(this.data.classes) * 0.75))
            .attr('class', 'res-circle');
        }
        const addTitles = () => {
            const resTitle = (residue: Residue) => 
            `${residue.residueIndex} (position.label in template: ${residue.residueIndex}.${residue.residueName}\')`;
            this.dataContainer.selectAll('custom.res-type')
            .data(sequenceData)
            .join('custom')
            .attr('title', resTitle)
            .attr('x', getX)
            .attr('y', getY)
            .attr('class', (residue: Residue) => residue.classes.join(' ') + ' res-type')
            .attr('text', (residue: Residue) => residue.residueName);
        }

        addLines();
        addCircles();
        addTitles();
    }

    private addLabels(): void {
        const labelData = this.data.rnaComplexes[0].rnaMolecules[0].labels;

        this.dataContainer.selectAll('custom.label')
        .data(labelData)
        .join('custom')
        .attr('class', 'label')
        .attr('text', (label: Label) => label.labelContent.label)
        .attr('lx', (label: Label) => this.formCoor(label.labelContent.x))
        .attr('ly', (label: Label) => this.formCoor(label.labelContent.y))
        .attr('x1', (label: Label) => this.formCoor(label.labelLine.x1))
        .attr('x2', (label: Label) => this.formCoor(label.labelLine.x2))
        .attr('y1', (label: Label) => this.formCoor(label.labelLine.y1))
        .attr('y2', (label: Label) => this.formCoor(label.labelLine.y2));
    }

    private drawBasePairs(): void {
        const context = this.canvas.node().getContext('2d');

        this.dataContainer
        .selectAll('custom.bp-line')
        .each(function(d) {
            const node = d3.select(this);

            // TODO: dynamically
            context.strokeStyle = 'black';
            context.lineWidth = 0.5;

            context.beginPath();
            context.moveTo(+node.attr('x1'), +node.attr('y1'));
            context.lineTo(+node.attr('x2'), +node.attr('y2'));
            context.stroke();
        });
    }

    private drawResidues(): void {
        const context = this.canvas.node().getContext('2d');  

        this.dataContainer
        .selectAll('custom.res-circle')
        .each(function(d) {
            const node = d3.select(this);

            // TODO: dynamically
            context.fillStyle = 'white';
            context.beginPath();
            context.arc(+node.attr('cx'), +node.attr('cy'), +node.attr('r'), 0, 2 * Math.PI);
            context.fill();
        });
        this.dataContainer
        .selectAll('custom.res-type')
        .each(function(d) {
            const node = d3.select(this);

            // TODO: dynamically
            context.font = '7.58px Helvetica';
            context.fillStyle = 'black';

            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(node.attr('text'), +node.attr('x'), +node.attr('y'));
        });
    }

    private drawLabels(): void {
        const context = this.canvas.node().getContext('2d');  

         this.dataContainer
        .selectAll('custom.label')
        .each(function(d) {
            const node = d3.select(this);

            // TODO: dynamically
            context.font = '7.58px Helvetica';
            context.fillStyle = 'black';

            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(node.attr('text'), +node.attr('lx'), +node.attr('ly'));

            context.strokeStyle = 'black';
            context.lineWidth = 0.5;

            context.beginPath();
            context.moveTo(+node.attr('x1'), +node.attr('y1'));
            context.lineTo(+node.attr('x2'), +node.attr('y2'));
            context.stroke();
        });
    }
}

