import * as d3 from 'd3';
import { BasePair, Label, Residue, RNAData } from './interfaces';
import { classes } from './classes';

// export default function update(data: RNAData, event: any) {
//     const margin = 10;
// 
//     const x = d3.scaleLinear().domain([0, 1063]).range([0, 1063]);
//     const y = d3.scaleLinear().domain([0, 1375]).range([0, 1375]);
// 
//     x.range([0, 1063].map(d => event.transform.applyX(d)));
//     y.range([0, 1375].map(d => event.transform.applyY(d)));
//     updateBasePairs();
//     updateResidues(event);
//     updateLabels(event);
// 
//     function updateBasePairs(): void {
//         const rna = data.rnaComplexes[0].rnaMolecules[0];
// 
//         const bpX = (resIndex: number) => formCoor(x(rna.sequence[resIndex].x));
//         const bpY = (resIndex: number) => formCoor(y(rna.sequence[resIndex].y));
// 
//         d3.selectAll('custom.bp-line')
//         .attr('x1', (bp: BasePair) => bpX(bp.residueIndex1))
//         .attr('y1', (bp: BasePair) => bpY(bp.residueIndex1))
//         .attr('x2', (bp: BasePair) => bpX(bp.residueIndex2))
//         .attr('y2', (bp: BasePair) => bpY(bp.residueIndex2));
//     }
// 
//     function updateResidues(event: any): void {
//         const getX = (res: Residue) => formCoor(x(res.x));
//         const getY = (res: Residue) => formCoor(y(res.y));
//         type Line = {res1: Residue, res2: Residue};
// 
//         d3.selectAll('custom.res-type')
//         .attr('x', (res: Residue) => getX(res))
//         .attr('y', (res: Residue) => getY(res))
//         .style('font-size', getFontSize(data.classes) * 0.75 * event.transform.k);
// 
//         d3.selectAll('custom.res-circle')
//         .attr('cx', (res: Residue) => getX(res))
//         .attr('cy', (res: Residue) => getY(res))
//         .attr('r', round(getFontSize(data.classes) * 0.75) * event.transform.k); 
// 
//         // d3.selectAll('.residues line')
//         // .attr('x1', (line: Line) => getX(line.res1))
//         // .attr('y1', (line: Line) => getY(line.res1))
//         // .attr('x2', (line: Line) => getX(line.res2))
//         // .attr('y2', (line: Line) => getY(line.res2))
//     }
// 
//     function updateLabels(event: any): void {
//         d3.selectAll('custom.label')
//         .attr('lx', (label: Label) => x(formCoor(label.labelContent.x)))
//         .attr('ly', (label: Label) => y(formCoor(label.labelContent.y)))
//         //.style('font-size', getFontSize(data.classes) * 0.75 * event.transform.k);
//         //d3.selectAll('.label line')
//         .attr('x1', (label: Label) => x(formCoor(label.labelLine.x1)))
//         .attr('x2', (label: Label) => x(formCoor(label.labelLine.x2)))
//         .attr('y1', (label: Label) => y(formCoor(label.labelLine.y1)))
//         .attr('y2', (label: Label) => y(formCoor(label.labelLine.y2)));
//     }
// 
//     function round (num: number): number {
//         return Number(num.toFixed(2));
//     }
// 
//     function formCoor(coor: number): number {
//         return round(coor + margin);
//     }
// 
//     function getFontSize(classes: Array<any>): number {
//         return classes.find((style) => style.name == 'font')['font-size'].slice(0,-2);
//     }
//     //return zoom;
// }

