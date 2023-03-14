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

export class RnaPositionRecord {
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

    public static fromDataContainer(container: DataContainer) : RnaPositionRecord {
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

        return new RnaPositionRecord(labelLines, labelTexts, residues);
    }

    public static fromTemplate(container: DataContainer, template: DataContainer): RnaPositionRecord {
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

        return new RnaPositionRecord(labelLines, labelTexts, residues);
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

        return new RnaPositionRecord(labelLines, labelTexts, residues);
    }
}

type BasicFn = () => void;

export interface IAnimation {
    changeState(index: number, isActive: boolean): void;
    do(elapsed: number): void;
    reverse(): void;
    animate(rna: RNAVis, duration: number, after: BasicFn): void;
}

export class Animation implements IAnimation {
    container: DataContainer[];
    from: RnaPositionRecord[];
    to: RnaPositionRecord[];
    isActive: boolean[];

    constructor(container: DataContainer[], to: RnaPositionRecord[]) {
        this.container = container;
        this.isActive = container.map(c => true);
        this.to = to;
        this.updateFrom();
        
    }

    public changeState(index: number, isActive: boolean): void {
        this.isActive[index] = isActive;
    }

    public changeAllStates(isActive: boolean): void {
        this.isActive = this.isActive.map(e => isActive);
    }

    public updateFrom() {
        this.from = this.container.map(c => RnaPositionRecord.fromDataContainer(c));
    }

    public setFrom(from: RnaPositionRecord[]): Animation {
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

    public animate(rna: RNAVis, duration: number, after: BasicFn = () => {}): void {
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
        } else {
            after();
        }
    }

    public getActiveContainers(): DataContainer[] {
        let active = [];
        for (let i = 0; i < this.container.length; ++i) {
            if (this.isActive[i]) {
                active.push(this.container[i]);
            }
        }
        return active;
    }
}

export class VisibilityRecord {
    residues: Residue[];
    to: boolean[];
    active: boolean = true;

    public constructor(residues: Residue[], to: boolean[]) {
        if (residues.length !== to.length) {
            throw new Error('residues.length !== to.length');
        }
        this.residues = residues;
        this.to = to;
    }

    public setActive(active: boolean): void {
        this.active = active;
    }

    public isActive(): boolean {
        return this.active;
    }
}

export class VisibilityAnim implements IAnimation {
    visibilityRecords: VisibilityRecord[];

    public constructor(visibilityRecords: VisibilityRecord[]) {
        this.visibilityRecords = visibilityRecords;
    }

    public changeState(index: number, active: boolean) {
        this.visibilityRecords[index].setActive(active);
    }

    public do(elapsed: number) {
        this.visibilityRecords.forEach(rec => {
            if (rec.residues.length > elapsed) {
                rec.residues[elapsed].setVisible(rec.to[elapsed]);
            }
        })
    }

    public reverse() {
        this.visibilityRecords.forEach(rec => {
            rec.setActive(!rec.isActive());
        })
    }

    public animate(rna: RNAVis, duration: number, after: BasicFn = () => {}): void {
        if (duration <= 0) {
            this.instant();
            rna.draw();
            after();
            return;
        }
        const max = this.maxIndex();
        let i = 0;
        const interval = d3.interval(() => {
            this.do(i);
            rna.draw();
            ++i;
            if (i >= max) {
                interval.stop();
                after();
            }
        }, duration);
    }

    public instant() {
        const max = this.maxIndex();
        if (max > 0) {
            Array.from(Array(max).keys()).forEach(i => this.do(i));
        }
    }

    private maxIndex(): number {
        const max = Math.max(
            ...this.visibilityRecords.map(rec => rec.residues.length)
        );
        return max;
    }
}
