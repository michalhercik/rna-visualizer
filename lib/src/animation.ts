import * as d3 from 'd3';
import DataContainer from './dataContainer';
import { BasePair, Label, Style, Residue, RNAData } from './interfaces';
import { drawLines, drawCircles, drawTexts } from './draw';
import { RNAVis } from './rnavis';

export class SingleCoorTarget {
    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class DoubleCoorTarget {
    public readonly x1: number;
    public readonly y1: number;
    public readonly x2: number;
    public readonly y2: number;

    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
}

export class AnimationState {
    public readonly bpLines: Map<string, DoubleCoorTarget>;
    public readonly labelLines: Map<string, DoubleCoorTarget>;
    public readonly labelTexts: Map<string, SingleCoorTarget>;
    public readonly residues: Map<string, SingleCoorTarget>;

    constructor(bpLines: Map<string, DoubleCoorTarget>,
                labelLines: Map<string, DoubleCoorTarget>,
                labelTexts: Map<string, SingleCoorTarget>,
                residues: Map<string, SingleCoorTarget>) {
        this.bpLines = bpLines;
        this.labelLines = labelLines;
        this.labelTexts = labelTexts;
        this.residues = residues;
    }

    public static fromDataContainer(container: DataContainer) : AnimationState {
        let bpLines = new Map<string, DoubleCoorTarget>();
        let labelLines = new Map<string, DoubleCoorTarget>();
        let labelTexts = new Map<string, SingleCoorTarget>();
        let residues = new Map<string, SingleCoorTarget>();

        container.getResidues().forEach(res => {
            const target = new SingleCoorTarget(res.x, res.y);
            const key = res.residueIndex.toString();
            residues.set(key, target);
        })

        return new AnimationState(bpLines, labelLines, labelTexts, residues);
    }

    public static fromTemplate(container: DataContainer, template: DataContainer): AnimationState {
        let bpLines = new Map<string, DoubleCoorTarget>();
        let labelLines = new Map<string, DoubleCoorTarget>();
        let labelTexts = new Map<string, SingleCoorTarget>();
        let residues = new Map<string, SingleCoorTarget>();

        const containerResidues = container.getResidues();
        const templateResidues = template.getResidues();

        containerResidues.forEach(res => {
            if (res.templateResidueIndex > -1) {
                const tempRes = templateResidues[res.templateResidueIndex];
                const target = new SingleCoorTarget(tempRes.x, tempRes.y);
                const key = res.residueIndex + '';
                residues.set(key, target);
            }
        })

        return new AnimationState(bpLines, labelLines, labelTexts, residues);
    }
}

export class Animation {
    from: AnimationState;
    to: AnimationState;
    container: DataContainer;
    duration: number;

    constructor(container: DataContainer, to: AnimationState, duration: number) {
        this.from = AnimationState.fromDataContainer(container);
        this.to = to;
        this.container = container;
        this.duration = duration;
    }

    public do(elapsed: number) {
        const ease = d3.easeCubic;
        const t = Math.min(1, ease(elapsed / this.duration));
        const update = (start: number, target: number) => start * (1 - t) + (target) * t;

        this.container.getResidues().forEach(res => {
            const key = res.residueIndex.toString();
            if (this.from.residues.has(key) && this.to.residues.has(key)) {
                const fromRes = this.from.residues.get(key);
                const toRes = this.to.residues.get(key);
                res.x = update(fromRes.x, toRes.x);
                res.y = update(fromRes.y, toRes.y);
            }
        });

        this.container.getSingleCoorObjects().forEach(object => {
            object.setX(object.getOrigX());
            object.setY(object.getOrigY());
        })

        this.container.getLines().forEach(object => {
            object.setX1(object.getOrigX1());
            object.setY1(object.getOrigY1());
            object.setX2(object.getOrigX2());
            object.setY2(object.getOrigY2());
        })
    }

    public reverse() {
        const tmp = this.from;
        this.from = this.to;
        this.to = tmp;
    }
}

//export function animation(rna: RNAVis): void {}
export function transformToTemplate(rna: RNAVis): void {
    const duration = 1500;
    const step = 300;
    const ease = d3.easeCubic;

    // const rename = () => {
    //     let renameTimer = d3.interval((elpased) => {
    //         const n = data.container.select('.res-title.text-green')
    //         if (n.empty()) {
    //             renameTimer.stop();
    //             remove();
    //         } else {
    //             n.attr('text', (res: Residue) => res.templateResidueName);
    //             n.classed('text-green', false);
    //             data.classComb.text.add(n.attr('class'));
    //         }
    //         rna.draw();
    //     }, step);
    // }
    // const remove = () => {
    //     let removeTimer = d3.interval((elpased) => {
    //         const n = data.container.select('.res-title[tempIndex="-1"]')
    //         if (n.empty()) {
    //             removeTimer.stop();
    //             move();
    //         } else {
    //             n.remove();
    //         }
    //         rna.draw();
    //     }, step);
    // }
    const move = () => {
        const anim = new Animation(rna.layers.get('data').data, AnimationState.fromTemplate(rna.layers.get('data').data, rna.layers.get('template').data), duration);
        let moveTimer = d3.timer((elapsed) => {
            anim.do(elapsed);
            rna.draw();

            const ease = d3.easeCubic;
            const t = Math.min(1, ease(elapsed / duration));
            if (t == 1) {
                moveTimer.stop();
                //add();
            }
        });
    }
    // const add = () => {
    //     let i = 0;
    //     let addInterval = d3.interval((elpased) => {
    //         for (;!data.container.select(`.res-title[tempIndex="${i}"]`).empty(); ++i) {}
    //         if (i < tempSeq.length) {
    //             const t = rna.templDataContainer.container.select(`.res-title[index="${i}"]`);
    //             const tData: Residue = t.data()[0] as Residue;
    //             console.log('add');
    //             seq.push(tData);
    //             rna.draw();
    //         } else {
    //             addInterval.stop();        
    //         }
    //     }, step)
    // }
    // rename();
    move();
}
