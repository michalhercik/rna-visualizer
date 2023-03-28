import * as d3 from 'd3';
import { RnaVis } from '../rnaVis';
import { DataContainer } from '../data';
import { IAnimation, AfterFn } from '../animations';
import { PositionRecord } from '../components';

export class TranslationAnim implements IAnimation {
    container: DataContainer[];
    from: PositionRecord[];
    to: PositionRecord[];
    isActive: boolean[];
    private reversed: boolean = false;

    constructor(container: DataContainer[], to: PositionRecord[]) {
        this.container = container;
        this.isActive = container.map(_ => true);
        this.to = to;
        this.updateFrom();

    }

    public changeState(index: number, isActive: boolean): void {
        this.isActive[index] = isActive;
    }

    public changeAllStates(isActive: boolean): void {
        this.isActive = this.isActive.map(_ => isActive);
    }

    public updateFrom() {
        if (this.reversed) {
            this.to = this.container.map(c => PositionRecord
                .fromDataContainer(c));
        } else {
            this.from = this.container.map(c => PositionRecord
                .fromDataContainer(c));
        }
    }

    public setFrom(from: PositionRecord[]): void {
        if (from.length === this.to.length) {
            this.from = from;
        }
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
            });
        }
    }

    public reverse() {
        const tmp = this.from;
        this.from = this.to;
        this.to = tmp;
        this.reversed = !this.reversed;
    }

    public animate(rna: RnaVis, duration: number, after: AfterFn = () => { }): void {
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

    public instant() {
        this.do(1);
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
