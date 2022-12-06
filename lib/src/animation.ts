import * as d3 from 'd3';
import DataContainer from './dataContainer';
import { BasePair, Label, Style, Residue, RNAData } from './interfaces';
import { drawLines, drawCircles, drawTexts } from './draw';
import { RNAVis } from './rnavis';


export function animation(rna: RNAVis): void {}
// export function animation(rna: RNAVis): void {
//     let data = rna.dataContainer;
//     data.container.selectAll('custom.res-title').each(function() {
//         const node = d3.select(this);
//         const data: any = node.data()[0];
//         node.attr('sx', node.attr('x'));
//         node.attr('sy', node.attr('y'));
//         const t = rna.templDataContainer.container.select(`.res-title[index="${data.templateResidueIndex}"]`);
//         if (t.empty()) {
//             node.attr('tx', node.attr('x'));
//             node.attr('ty', node.attr('y'));
//         } else {
//             node.attr('tx', t.attr('x'));
//             node.attr('ty', t.attr('y'));
//         }
//     });
//     const tempSeq = rna.templDataContainer.data.rnaComplexes[0].rnaMolecules[0].sequence;
//     const seq = rna.dataContainer.data.rnaComplexes[0].rnaMolecules[0].sequence;
//     data.container.selectAll('custom.bp-line:not(.res-line)').each(function() {
//         const node = d3.select(this);
//         const data:any  = node.data()[0];
//         const t1 = rna.templDataContainer.container.select(`.res-title[index="${seq[data.residueIndex1].templateResidueIndex}"]`);
//         const t2 = rna.templDataContainer.container.select(`.res-title[index="${seq[data.residueIndex2].templateResidueIndex}"]`);
//         node.attr('sx1', node.attr('x1'));
//         node.attr('sy1', node.attr('y1'));
//         node.attr('sx2', node.attr('x2'));
//         node.attr('sy2', node.attr('y2'));
//         if (t1.empty()) {
//             node.attr('tx1', node.attr('x1'));
//             node.attr('ty1', node.attr('y1'));
//         } else {
//             node.attr('tx1', t1.attr('x'));
//             node.attr('ty1', t1.attr('y'));
//         }
//         if (t2.empty()) {
//             node.attr('tx2', node.attr('x2'));
//             node.attr('ty2', node.attr('y2'));
//         } else {
//             node.attr('tx2', t2.attr('x'));
//             node.attr('ty2', t2.attr('y'));
//         }
//     });
//     data.container.selectAll('custom.res-circle').each(function() {
//         const node = d3.select(this);
//         const data:any = node.data()[0];
//         node.attr('scx', node.attr('x'));
//         node.attr('scy', node.attr('y'));
//         if (data.templateResidueIndex != -1) {
//             const t = rna.templDataContainer.container.select(`.res-title[index="${data.templateResidueIndex}"]`);
//             node.attr('tcx', t.attr('x'));
//             node.attr('tcy', t.attr('y'));
//         } else {
//             node.attr('tcx', node.attr('scx'));
//             node.attr('tcy', node.attr('scy'));
//         }
//     })
// 
//     const duration = 1500;
//     const step = 300;
//     const ease = d3.easeCubic;
// 
//     const rename = () => {
//         let renameTimer = d3.interval((elpased) => {
//             const n = data.container.select('.res-title.text-green')
//             if (n.empty()) {
//                 renameTimer.stop();
//                 remove();
//             } else {
//                 n.attr('text', (res: Residue) => res.templateResidueName);
//                 n.classed('text-green', false);
//                 data.classComb.text.add(n.attr('class'));
//             }
//             rna.draw();
//         }, step);
//     }
//     const remove = () => {
//         let removeTimer = d3.interval((elpased) => {
//             const n = data.container.select('.res-title[tempIndex="-1"]')
//             if (n.empty()) {
//                 removeTimer.stop();
//                 move();
//             } else {
//                 n.remove();
//             }
//             rna.draw();
//         }, step);
//     }
//     const move = () => {
//         let moveTimer = d3.timer((elapsed) => {
//             const t = Math.min(1, ease(elapsed / duration));
//             const update = (start: number, target: number) => start * (1 - t) + (target) * t;
//             data.container.selectAll('custom.res-title').each(function() {
//                 const node = d3.select(this);
//                 node.attr('x', update(+node.attr('sx'), +node.attr('tx')));
//                 node.attr('y', update(+node.attr('sy'), +node.attr('ty')));
//             });
//             data.container.selectAll('custom.bp-line').each(function() {
//                 const node = d3.select(this);
//                 node.attr('x1', +node.attr('sx1') * (1 - t) + (+node.attr('tx1')) * t);
//                 node.attr('y1', +node.attr('sy1') * (1 - t) + (+node.attr('ty1')) * t);
//                 node.attr('x2', +node.attr('sx2') * (1 - t) + (+node.attr('tx2')) * t);
//                 node.attr('y2', +node.attr('sy2') * (1 - t) + (+node.attr('ty2')) * t);
//             });
//             data.container.selectAll('custom.res-circle').each(function() {
//                 const node = d3.select(this);
//                 node.attr('cx', +node.attr('scx') * (1 - t) + (+node.attr('tcx')) * t);
//                 node.attr('cy', +node.attr('scy') * (1 - t) + (+node.attr('tcy')) * t);
//             })
// 
//             rna.draw();
// 
//             if (t == 1) {
//                 moveTimer.stop();
//                 add();
//             }
//         });
//     }
//     const add = () => {
//         let i = 0;
//         let addInterval = d3.interval((elpased) => {
//             for (;!data.container.select(`.res-title[tempIndex="${i}"]`).empty(); ++i) {}
//             if (i < tempSeq.length) {
//                 const t = rna.templDataContainer.container.select(`.res-title[index="${i}"]`);
//                 const tData: Residue = t.data()[0] as Residue;
//                 console.log('add');
//                 seq.push(tData);
//                 rna.draw();
//             } else {
//                 addInterval.stop();        
//             }
//         }, step)
//     }
//     rename();
// }
