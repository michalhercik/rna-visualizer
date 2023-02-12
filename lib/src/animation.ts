import * as d3 from 'd3';
import DataContainer from './dataContainer';
import { BasePair, Label, Residue, Vector2 } from './rna/data-structures';
import { drawLines, drawCircles, drawTexts } from './draw';
import { RNAVis } from './rnavis';

export class SingleCoorTarget {
    public readonly coor: Vector2;

    constructor(coor: Vector2) {
        this.coor = coor;
    }

    public getX(): number {
        return this.coor.x;
    }

    public getY(): number {
        return this.coor.y;
    }
}

export class DoubleCoorTarget {
    public readonly coor1: Vector2;
    public readonly coor2: Vector2;

    constructor(coor1: Vector2, coor2: Vector2) {
        this.coor1 = coor1;
        this.coor2 = coor2;
    }

    public getX1(): number {
        return this.coor1.x;
    }

    public getY1(): number {
        return this.coor1.y;
    }

    public getX2(): number {
        return this.coor2.x;
    }

    public getY2(): number {
        return this.coor2.y;
    }
}

export class AnimationState {
    public readonly labelLines: Map<string, DoubleCoorTarget>;
    public readonly labelTexts: Map<string, SingleCoorTarget>;
    public readonly residues: Map<string, SingleCoorTarget>;

    constructor(labelLines: Map<string, DoubleCoorTarget>,
                labelTexts: Map<string, SingleCoorTarget>,
                residues: Map<string, SingleCoorTarget>) {
        this.labelLines = labelLines;
        this.labelTexts = labelTexts;
        this.residues = residues;
    }

    public static fromDataContainer(container: DataContainer) : AnimationState {
        let labelLines = new Map<string, DoubleCoorTarget>();
        let labelTexts = new Map<string, SingleCoorTarget>();
        let residues = new Map<string, SingleCoorTarget>();

        container.residues.forEach(res => {
            const key = res.index.toString();
            const target = new SingleCoorTarget(res.getCoor());
            residues.set(key, target);
        })

        container.labels.forEach(label => {
            const key = label.residue.index.toString();
            
            const textTarget = new SingleCoorTarget(label.text.getCoor());
            labelTexts.set(key, textTarget);

            const lineTarget = new DoubleCoorTarget(label.line.getCoor1(), label.line.getCoor2());
            labelLines.set(key, lineTarget);
        });

        return new AnimationState(labelLines, labelTexts, residues);
    }

    public static fromTemplate(container: DataContainer, template: DataContainer): AnimationState {
        let labelLines = new Map<string, DoubleCoorTarget>();
        let labelTexts = new Map<string, SingleCoorTarget>();
        let residues = new Map<string, SingleCoorTarget>();

        container.residues.forEach(res => {
            if (res.templateIndex > -1) {
                const tempRes = template.residues[res.templateIndex];
                const target = new SingleCoorTarget(tempRes.getCoor());
                const key = res.index.toString();
                residues.set(key, target);
            }
        });

        container.labels.forEach(label => {
            if (label.residue.templateIndex > -1) {
                const tempRes = template.residues[label.residue.templateIndex];
                const shift = Vector2.subtraction(tempRes.getCoor(), label.residue.getCoor());

                const key = label.residue.index.toString();

                const coor = Vector2.sum(label.text.getCoor(), shift);
                const textTarget = new SingleCoorTarget(coor);
                labelTexts.set(key, textTarget);

                const coor1 = Vector2.sum(label.line.getCoor1(), shift);
                const coor2 = Vector2.sum(label.line.getCoor2(), shift);
                const lineTarget = new DoubleCoorTarget(coor1, coor2);
                labelLines.set(key, lineTarget)
            }
        });

        return new AnimationState(labelLines, labelTexts, residues);
    }

    public static fromTranslation(container: DataContainer, shift: Vector2) {
        let labelLines = new Map<string, DoubleCoorTarget>();
        let labelTexts = new Map<string, SingleCoorTarget>();
        let residues = new Map<string, SingleCoorTarget>();

        container.residues.forEach(res => {
            const coor = Vector2.sum(res.getCoor(), shift);
            const target = new SingleCoorTarget(coor);
            const key = res.index.toString();
            residues.set(key, target);
        });

        container.labels.forEach(label => {
            const key = label.residue.index.toString();

            const coor = Vector2.sum(label.text.getCoor(), shift);
            const textTarget = new SingleCoorTarget(coor);
            labelTexts.set(key, textTarget);

            const coor1 = Vector2.sum(label.line.getCoor1(), shift);
            const coor2 = Vector2.sum(label.line.getCoor2(), shift);
            const lineTarget = new DoubleCoorTarget(coor1, coor2);
            labelLines.set(key, lineTarget);
        });

        return new AnimationState(labelLines, labelTexts, residues);
    }
}

export class Animation {
    container: DataContainer[];
    from: AnimationState[];
    to: AnimationState[];
    isActive: boolean[];

    constructor(container: DataContainer[], to: AnimationState[]) {
        this.container = container;
        this.isActive = container.map(c => true);
        this.to = to;
        this.updateFrom();
        
    }

    public changeState(index: number, isActive: boolean) {
        this.isActive[index] = isActive;
    }

    public updateFrom() {
        this.from = this.container.map(c => AnimationState.fromDataContainer(c));
    }

    public setFrom(from: AnimationState[]): Animation {
        if (from.length === this.to.length) {
            this.from = from;
        }
        return this;
    }

    public do(elapsed: number) {
        const update = (start: number, target: number) => start * (1 - elapsed) + (target) * elapsed;

        for (let i = 0; i < this.container.length; ++i) {
            if (!this.isActive[i]) {
                continue;
            }

            this.container[i].residues.forEach(res => {
                const key = res.index.toString();
                if (this.from[i].residues.has(key) && this.to[i].residues.has(key)) {
                    const fromRes = this.from[i].residues.get(key);
                    const toRes = this.to[i].residues.get(key);
                    res
                    .setX(update(fromRes.getX(), toRes.getX()))
                    .setY(update(fromRes.getY(), toRes.getY()));
                }
            });

            this.container[i].labels.forEach(label => {
                const key = label.residue.index.toString();
                if (this.from[i].labelTexts.has(key) && this.to[i].labelTexts.has(key)) {
                    const fromLabelText = this.from[i].labelTexts.get(key);
                    const toLabelText = this.to[i].labelTexts.get(key);
                    label.text
                    .setX(update(fromLabelText.getX(), toLabelText.getX()))
                    .setY(update(fromLabelText.getY(), toLabelText.getY()));
                }

                if (this.from[i].labelLines.has(key) && this.to[i].labelLines.has(key)) {
                    const fromLabelLine = this.from[i].labelLines.get(key);
                    const toLabelLine = this.to[i].labelLines.get(key);
                    label.line
                    .setX1(update(fromLabelLine.getX1(), toLabelLine.getX1()))
                    .setY1(update(fromLabelLine.getY1(), toLabelLine.getY1()))
                    .setX2(update(fromLabelLine.getX2(), toLabelLine.getX2()))
                    .setY2(update(fromLabelLine.getY2(), toLabelLine.getY2()));
                }
            })
        }
    }

    public reverse() {
        const tmp = this.from;
        this.from = this.to;
        this.to = tmp;
    }

    public animate(rna: RNAVis, duration: number, after: () => void = () => {}): void {
        if (this.isActive.indexOf(true) > -1) {
            const ease = d3.easeCubic;
            let timer = d3.timer((t) => {
                const elapsed = Math.min(1, ease(t / duration));
                this.do(elapsed);
                rna.draw();

                if (elapsed == 1) {
                    timer.stop();
                    after();
                }
            });
        }
    }
}

export function remove(dataContainer: DataContainer): void {
    dataContainer.residues.forEach(res => {
        if (res.templateIndex === -1) {
            res.setVisible(false);
        }
    })
}

export function add(dataContainer: DataContainer): void {
    dataContainer.residues.forEach(res => {
        if (res.templateIndex === -1) {
            res.setVisible(true);
        }
    })
}
