import * as d3 from 'd3';
import { RnaVis } from '../rnaVis';
import { VisibilityRecord } from '../components';
import { IAnimation, AfterFn } from '../animations';

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
        });
    }

    public reverse() {
        this.visibilityRecords.forEach(rec => {
            rec.to = rec.to.map(t => !t);
        });
    }

    public animate(rna: RnaVis, duration: number, after: AfterFn = () => { }): void {
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
