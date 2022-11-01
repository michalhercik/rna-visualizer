import * as d3 from 'd3';
import { BasePair, Label, Style, Residue, RNAData } from './interfaces';
import { Styles } from './classes';
import DataContainer from './dataContainer';

export default class ContainerUpdater {

    public update(event: any, container: DataContainer) {
        const width = container.width;
        const height = container.height;
        const x = d3.scaleLinear().domain([0, width]).range([0, width]);
        const y = d3.scaleLinear().domain([0, height]).range([0,height]);

        x.range([0, width].map(d => event.transform.applyX(d)));
        y.range([0, height].map(d => event.transform.applyY(d)));

        this.updateScale(container, event.transform.k);
        this.updateResidues(container, x, y);
        this.updateBpLines(container, x, y);
        this.updateLabels(container, x, y);
    }

    public animationUpdate(t: number) {
        const x = (node: any) => {
            return +node.attr('sx') * (1 - t) + (+node.attr('tx')) * t;
        }
        const y = (node: any) => {
            return +node.attr('sy') * (1 - t) + (+node.attr('ty')) * t;
        }
        // this.updateResidues(x, y);
        // this.updateBpLines(x, y);
        // this.updateLabels(x, y);
    }

    private updateResidues(container: DataContainer, x: Function, y: Function) {
        container.container.selectAll('custom.res-title')
        .attr('x', (res: Residue) => x(res.x))
        .attr('y', (res: Residue) => y(res.y));

        container.container.selectAll('custom.res-circle')
        .attr('cx', (res: Residue) => x(res.x))
        .attr('cy', (res: Residue) => y(res.y));
    }

    private updateBpLines(container: DataContainer, x: Function, y: Function) {
        const rna = container.data.rnaComplexes[0].rnaMolecules[0];
        const bpX = (resIndex: number) => (x(rna.sequence[resIndex].x));
        const bpY = (resIndex: number) => (y(rna.sequence[resIndex].y));

        container.container.selectAll('custom.bp-line:not(.res-line)')
        .attr('x1', (bp: BasePair) => bpX(bp.residueIndex1))
        .attr('y1', (bp: BasePair) => bpY(bp.residueIndex1))
        .attr('x2', (bp: BasePair) => bpX(bp.residueIndex2))
        .attr('y2', (bp: BasePair) => bpY(bp.residueIndex2));

        type Line = {res1: Residue, res2: Residue};
        container.container.selectAll('custom.res-line')
        .attr('x1', (line: Line) => x(line.res1.x))
        .attr('y1', (line: Line) => y(line.res1.y))
        .attr('x2', (line: Line) => x(line.res2.x))
        .attr('y2', (line: Line) => y(line.res2.y))
    }

    private updateLabels(container: DataContainer, x: Function, y: Function) {
        container.container.selectAll('custom.label-text')
        .attr('x', (label: Label) => (x(label.labelContent.x)))
        .attr('y', (label: Label) => (y(label.labelContent.y)));

        container.container.selectAll('custom.label-line')
        .attr('x1', (label: Label) => (x(label.labelLine.x1)))
        .attr('x2', (label: Label) => (x(label.labelLine.x2)))
        .attr('y1', (label: Label) => (y(label.labelLine.y1)))
        .attr('y2', (label: Label) => (y(label.labelLine.y2)));
    }

    private updateScale(container: DataContainer, k: number) {
        container.styles.set('transform', {k: k});

        container.container.selectAll('custom.label-text').classed('transform', true);
        container.container.selectAll('custom.res-title').classed('transform', true);

        container.container.selectAll('custom.res-circle')
        .attr('r', container.styles.getProperty('font', 'font-size').slice(0,-2) * 0.75 * k); 
    }
}
