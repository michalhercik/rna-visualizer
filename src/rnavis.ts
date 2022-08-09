import * as d3 from 'd3';
import { BasePair, Label, Style, Residue, RNAData } from './interfaces';
import { Styles } from './classes';
//import update from './zoom';


export class RNAVis {
    private margin = 10;
    private canvas;    
    private data;
    private dataContainer;
    private styles;
    private classComb = {
        line: new Set(),
        circle: new Set(),
        text: new Set()
    };

    constructor(element: HTMLElement, data: RNAData) {
        this.styles = new Styles();
        this.data = data;
        this.canvas = d3.select(element)
        .append('canvas');
        this.dataContainer = d3.select(document.createElement('custom'));
        this.setDimensions();

        this.addClasses();
        this.addBasePairs();
        this.addResidues();
        this.addLabels();
    }

    public addZoom() {
        const zoom = d3.zoom()
        .scaleExtent([1,10])
        .on('zoom', (event) => {
            this.update(this.data, event);
            this.draw();
        });
        this.canvas.call(zoom);
    }

    private update(data: RNAData, event: any) {
        const x = d3.scaleLinear().domain([0, 1063]).range([0, 1063]);
        const y = d3.scaleLinear().domain([0, 1375]).range([0, 1375]);

        x.range([0, 1063].map(d => event.transform.applyX(d)));
        y.range([0, 1375].map(d => event.transform.applyY(d)));

        const rna = data.rnaComplexes[0].rnaMolecules[0];

        const bpX = (resIndex: number) => this.formCoor(x(rna.sequence[resIndex].x));
        const bpY = (resIndex: number) => this.formCoor(y(rna.sequence[resIndex].y));

        this.dataContainer.selectAll('custom.bp-line:not(.res-line)')
        .attr('x1', (bp: BasePair) => bpX(bp.residueIndex1))
        .attr('y1', (bp: BasePair) => bpY(bp.residueIndex1))
        .attr('x2', (bp: BasePair) => bpX(bp.residueIndex2))
        .attr('y2', (bp: BasePair) => bpY(bp.residueIndex2));

        const getX = (res: Residue) => this.formCoor(x(res.x));
        const getY = (res: Residue) => this.formCoor(y(res.y));
        type Line = {res1: Residue, res2: Residue};

        this.dataContainer.selectAll('custom.res-type')
        .attr('x', (res: Residue) => getX(res))
        .attr('y', (res: Residue) => getY(res))
        .attr('fontSize', this.getFontSize(data.classes) * 0.75 * event.transform.k)
        .style('font-size', this.getFontSize(data.classes) * 0.75 * event.transform.k);

        this.dataContainer.selectAll('custom.res-circle')
        .attr('cx', (res: Residue) => getX(res))
        .attr('cy', (res: Residue) => getY(res))
        .attr('r', this.round(this.getFontSize(data.classes) * 0.75) * event.transform.k); 

        this.dataContainer.selectAll('custom.res-line')
        .attr('x1', (line: Line) => getX(line.res1))
        .attr('y1', (line: Line) => getY(line.res1))
        .attr('x2', (line: Line) => getX(line.res2))
        .attr('y2', (line: Line) => getY(line.res2))

        this.dataContainer.selectAll('custom.label')
        .attr('lx', (label: Label) => x(this.formCoor(label.labelContent.x)))
        .attr('ly', (label: Label) => y(this.formCoor(label.labelContent.y)))
        .attr('x1', (label: Label) => x(this.formCoor(label.labelLine.x1)))
        .attr('x2', (label: Label) => x(this.formCoor(label.labelLine.x2)))
        .attr('y1', (label: Label) => y(this.formCoor(label.labelLine.y1)))
        .attr('y2', (label: Label) => y(this.formCoor(label.labelLine.y2)))
        .attr('fontSize', this.getFontSize(data.classes) * 0.75 * event.transform.k);
    }

    public draw(): void {
        const context = this.canvas.node().getContext('2d');
        context.fillStyle = '#fff';
        context.rect(0, 0, +this.canvas.attr('width'), +this.canvas.attr('height'));
        context.fill();

        this.drawLines();
        this.drawCircles();
        this.drawText();
    }

    private setDimensions(): void {
        const residues = this.data.rnaComplexes[0].rnaMolecules[0].sequence;
        const scale = 2;
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
        this.canvas
        .attr('width', scale * width)
        .attr('height', scale * height)
        .attr('style', 'width: ' + (+this.canvas.attr('width') / scale) + 'px');
        this.canvas.node().getContext('2d').scale(scale, scale);
    }

    private round (num: number): number {
        return Number(num.toFixed(2));
    }

    private formCoor(coor: number): number {
        return this.round(coor + this.margin);
    }

    private getFontSize(classes: Array<any>): number {
        //return classes.find((style) => style.name == 'font')['font-size'].slice(0,-2);
        return 6;
    }

    private addClasses(): void {
        // let styles = '';
        // this.data.classes.concat(classes).forEach((style: Style) => {
        //     styles += '\n';
        //     styles += Object.keys(style).includes('element-wise') ? '' : '.';
        //     styles += style.name;
        //     styles += ' {';
        //     Object.entries(style).map(([key, value]) => {
        //         if (key !== 'name')
        //             styles += `\n\t${key}: ${value};`;
        //     });
        //     styles += '\n}';
        // });
        // this.canvas.append('style')
        // .attr('type', 'text/css')
        // .text(styles);
        this.data.classes.forEach((style: any) => {
            const name = style.name;
            delete style.name;
            this.styles.set(name, style);
        });
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
        .attr('class', (bp: BasePair) => {
            const c = bp.classes.join(' ') + ' line';
            this.classComb.line.add(c);
            return c;
        });    
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
            .attr('class', 'bp-line res-line line');
            this.classComb.line.add('bp-line res-line line');
        }
        const addCircles = () => {
            this.dataContainer.selectAll('custom.res-circle')
            .data(sequenceData)
            .join('custom')
            .attr('cx', getX)
            .attr('cy', getY)
            .attr('r', this.round(this.getFontSize(this.data.classes) * 0.75))
            .attr('class', 'res-circle circle');
            this.classComb.circle.add('res-circle circle');
        }
        const addTitles = () => {
            const resTitle = (residue: Residue) => 
            `${residue.residueIndex} (position.label in template: ${residue.residueIndex}.${residue.residueName}\')`;
            this.dataContainer.selectAll('custom.res-title')
            .data(sequenceData)
            .join('custom')
            .attr('title', resTitle)
            .attr('x', getX)
            .attr('y', getY)
            .attr('text', (residue: Residue) => residue.residueName)
            .attr('class', (residue: Residue) => {
                const c = residue.classes.join(' ') + ' res-title label';
                this.classComb.text.add(c);
                return c;
            });
        }

        addLines();
        addCircles();
        addTitles();
    }

    private addLabels(): void {
        const labelData = this.data.rnaComplexes[0].rnaMolecules[0].labels;

        this.dataContainer.selectAll('custom.label-text')
        .data(labelData)
        .join('custom')
        .attr('text', (label: Label) => label.labelContent.label)
        .attr('x', (label: Label) => this.formCoor(label.labelContent.x))
        .attr('y', (label: Label) => this.formCoor(label.labelContent.y))
        .attr('class', (label: Label) => {
            const c = label.labelContent.classes.join(' ') + ' label-text label';
            this.classComb.text.add(c);
            return c;
        });

        this.dataContainer.selectAll('custom.label-line')
        .data(labelData)
        .join('custom')
        .attr('x1', (label: Label) => this.formCoor(label.labelLine.x1))
        .attr('x2', (label: Label) => this.formCoor(label.labelLine.x2))
        .attr('y1', (label: Label) => this.formCoor(label.labelLine.y1))
        .attr('y2', (label: Label) => this.formCoor(label.labelLine.y2))
        .attr('class', (label: Label) => {
            const c = label.labelLine.classes.join(' ') + ' label-line line';
            this.classComb.line.add(c);
            return c;
        });
    }

    private drawLines() {
        const context = this.canvas.node().getContext('2d');
        this.classComb.line.forEach((comb: string) => {
            const lineStyles = this.styles.get(comb);
            context.strokeStyle = lineStyles['stroke'] || 'black';
            context.lineWidth = lineStyles['stroke-width'] || 1;

            this.dataContainer
            .selectAll('[class="' + comb + '"]')
            .each(function(d) {
                const node = d3.select(this);
                context.beginPath();
                context.moveTo(+node.attr('x1'), +node.attr('y1'));
                context.lineTo(+node.attr('x2'), +node.attr('y2'));
                context.stroke();
            });
        });
    }

    private drawCircles() {
        const context = this.canvas.node().getContext('2d');
        this.classComb.circle.forEach((comb: string) => {
            const circleStyles = this.styles.get(comb);
            context.strokeStyle = circleStyles['stroke'] || 'black';
            context.fillStyle = circleStyles['fill'] || 'white';
            context.lineWidth = circleStyles['stroke-width'] || 1;

            this.dataContainer
            .selectAll('[class="' + comb + '"]')
            .each(function(d) {
                const node = d3.select(this);
                context.beginPath();
                context.arc(+node.attr('cx'), +node.attr('cy'), +node.attr('r'), 0, 2 * Math.PI);
                context.fill();
            });
        });
    }

    private drawText() {
        const translate = new Map();
        translate.set('start', 'left');
        translate.set('middle', 'center');
        translate.set('end', 'right');
        const context = this.canvas.node().getContext('2d');
        this.classComb.text.forEach((comb: string) => {
            const textStyles = this.styles.get(comb);
            context.font = 
                (textStyles['font-weight'] || 'normal') + ' ' + 
                (textStyles['font-size'] || '6px') + ' ' + 
                (textStyles['font-family'] || 'Helvetica');
            context.fillStyle = textStyles['fill'] || 'black';
            // TODO: ...
            context.textAlign = translate.get(textStyles['text-anchor'] || 'middle');
            context.textBaseline = textStyles['baseline'] || 'middle';

            this.dataContainer
            .selectAll('[class="' + comb + '"]')
            .each(function(d) {
                const node = d3.select(this);
                context.fillText(node.attr('text'), +node.attr('x'), +node.attr('y'));
            });
        });
    }

    private drawBasePairs(): void {
        const context = this.canvas.node().getContext('2d');
        const lineStyles = this.styles.get('bp-line');
        context.strokeStyle = lineStyles['stroke'] || 'black';
        context.lineWidth = lineStyles['stroke-width'] || 1;

        this.dataContainer
        .selectAll('custom.bp-line')
        .each(function(d) {
            const node = d3.select(this);
            context.beginPath();
            context.moveTo(+node.attr('x1'), +node.attr('y1'));
            context.lineTo(+node.attr('x2'), +node.attr('y2'));
            context.stroke();
        });
    }

    private drawResidues(): void {
        const context = this.canvas.node().getContext('2d');  
        context.fillStyle = 'white';

        this.dataContainer
        .selectAll('custom.res-circle')
        .each(function(d) {
            const node = d3.select(this);
            context.beginPath();
            context.arc(+node.attr('cx'), +node.attr('cy'), +node.attr('r'), 0, 2 * Math.PI);
            context.fill();
        });

        context.font =  'bold 6px Helvetica';
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        this.dataContainer
        .selectAll('custom.res-type')
        .each(function(d) {
            const node = d3.select(this);
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
            context.font = node.attr('fontSize') + 'px Helvetica';
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

