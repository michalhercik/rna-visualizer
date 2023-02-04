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
    container: DataContainer[];
    from: AnimationState[];
    to: AnimationState[];
    isActive: boolean[];
    duration: number;

    constructor(container: DataContainer[], to: AnimationState[], duration: number) {
        this.from = container.map(c => AnimationState.fromDataContainer(c));
        this.isActive = container.map(c => true);
        this.to = to;
        this.container = container;
        this.duration = duration;
    }

    public changeState(index: number, isActive: boolean) {
        this.isActive[index] = isActive;
    }

    public do(elapsed: number) {
        const ease = d3.easeCubic;
        const t = Math.min(1, ease(elapsed / this.duration));
        const update = (start: number, target: number) => start * (1 - t) + (target) * t;

        for (let i = 0; i < this.container.length; ++i) {
            if (!this.isActive[i]) {
                continue;
            }

            this.container[i].getResidues().forEach(res => {
                const key = res.residueIndex.toString();
                if (this.from[i].residues.has(key) && this.to[i].residues.has(key)) {
                    const fromRes = this.from[i].residues.get(key);
                    const toRes = this.to[i].residues.get(key);
                    res.x = update(fromRes.x, toRes.x);
                    res.y = update(fromRes.y, toRes.y);
                }
            });

            this.container[i].getSingleCoorObjects().forEach(object => {
                object.setX(object.getOrigX());
                object.setY(object.getOrigY());
            })

            this.container[i].getLines().forEach(object => {
                object.setX1(object.getOrigX1());
                object.setY1(object.getOrigY1());
                object.setX2(object.getOrigX2());
                object.setY2(object.getOrigY2());
            })
        }
    }

    public reverse() {
        const tmp = this.from;
        this.from = this.to;
        this.to = tmp;
    }
}

export function remove(dataContainer: DataContainer): void {
    dataContainer.getResidues().forEach(res => {
        if (res.templateResidueIndex === -1) {
            res.visible = false;
        }
    })
}

export function add(dataContainer: DataContainer): void {
    dataContainer.getResidues().forEach(res => {
        if (res.templateResidueIndex === -1) {
            res.visible = true;
        }
    })
}

export function animate(anim: Animation, rna: RNAVis): void {
    const ease = d3.easeCubic;
    let moveTimer = d3.timer((elapsed) => {
        anim.do(elapsed);
        rna.draw();

        const t = Math.min(1, ease(elapsed / anim.duration));
        if (t == 1) {
            moveTimer.stop();
        }
    });
}
