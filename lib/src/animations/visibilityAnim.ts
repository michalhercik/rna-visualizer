import * as d3 from 'd3';
import { RnaVis } from '../rna-vis';
import { VisibilityRecord } from '../components';
import { IAnimation, AfterFn } from '../animations';

export class VisibilityAnim implements IAnimation {
    visibilityRecords: VisibilityRecord[];

    public constructor(visibilityRecords: VisibilityRecord[]) {
        this.visibilityRecords = visibilityRecords;
    }

    /**
     * Change the state of the animation to active or not at a given index
     * @param index - Index to change the state of
     * @param isActive - New state of the index
     */
    public changeState(index: number, isActive: boolean) {
        this.visibilityRecords[index].setActive(isActive);
    }

    /**
     * Perform a specified step of the animation
     * @param elapsed - A part of the animation to preform
     */
    public do(elapsed: number) {
        this.visibilityRecords.forEach(rec => {
            if (rec.residues.length > elapsed) {
                rec.residues[elapsed].setVisible(rec.to[elapsed]);
            }
        });
    }

    /**
     * Reverse the animation.
     */
    public reverse() {
        this.visibilityRecords.forEach(rec => {
            rec.to = rec.to.map(t => !t);
        });
    }

    /**
     * Preforms the Animation
     * @param rna - RnaVis object on which is preformed the animation
     * @param duration - Duration of the animation
     * @param after - Function to call after the animation completes
     */
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

    /**
     * Instantly and synchronously completes the animation.
     */
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
