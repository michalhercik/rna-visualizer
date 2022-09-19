import * as d3 from 'd3';
import { BasePair, Label, Style, Residue, RNAData } from './interfaces';
import { Styles } from './classes';
import DataContainer from './dataContainer';

export default class ContainerUpdater {
    private container;

    public constructor(container: DataContainer) {
        this.container = container;
    }

    public update(event: any) {
        const width = this.container.width;
        const height = this.container.height;
        const x = d3.scaleLinear().domain([0, width]).range([0, width]);
        const y = d3.scaleLinear().domain([0, height]).range([0,height]);

        x.range([0, width].map(d => event.transform.applyX(d)));
        y.range([0, height].map(d => event.transform.applyY(d)));

        this.container.styles.set('transform', {k: event.transform.k});

        this.updateResidues(x, y, event.transform.k);
        this.updateBpLines(x, y);
        this.updateLabels(x, y);
    }

    private updateResidues(x: Function, y: Function, k: number) {
        this.container.container.selectAll('custom.res-title')
        .attr('x', (res: Residue) => x(res.x))
        .attr('y', (res: Residue) => y(res.y))
        .classed('transform', true);

        this.container.container.selectAll('custom.res-circle')
        .attr('cx', (res: Residue) => x(res.x))
        .attr('cy', (res: Residue) => y(res.y))
        .attr('r', this.container.styles.getProperty('font', 'font-size').slice(0,-2) * 0.75 * k); 
    }

    private updateBpLines(x: Function, y: Function) {
        const rna = this.container.data.rnaComplexes[0].rnaMolecules[0];
        const bpX = (resIndex: number) => (x(rna.sequence[resIndex].x));
        const bpY = (resIndex: number) => (y(rna.sequence[resIndex].y));

        this.container.container.selectAll('custom.bp-line:not(.res-line)')
        .attr('x1', (bp: BasePair) => bpX(bp.residueIndex1))
        .attr('y1', (bp: BasePair) => bpY(bp.residueIndex1))
        .attr('x2', (bp: BasePair) => bpX(bp.residueIndex2))
        .attr('y2', (bp: BasePair) => bpY(bp.residueIndex2));

        type Line = {res1: Residue, res2: Residue};
        this.container.container.selectAll('custom.res-line')
        .attr('x1', (line: Line) => x(line.res1.x))
        .attr('y1', (line: Line) => y(line.res1.y))
        .attr('x2', (line: Line) => x(line.res2.x))
        .attr('y2', (line: Line) => y(line.res2.y))
    }

    private updateLabels(x: Function, y: Function) {
        this.container.container.selectAll('custom.label-text')
        .attr('x', (label: Label) => (x(label.labelContent.x)))
        .attr('y', (label: Label) => (y(label.labelContent.y)))
        .classed('transform', true);

        this.container.container.selectAll('custom.label-line')
        .attr('x1', (label: Label) => (x(label.labelLine.x1)))
        .attr('x2', (label: Label) => (x(label.labelLine.x2)))
        .attr('y1', (label: Label) => (y(label.labelLine.y1)))
        .attr('y2', (label: Label) => (y(label.labelLine.y2)));
    }
}
