import * as d3 from 'd3';
import { RnaVis } from '../rna-vis';
import { DataContainer } from '../data';
import { IAnimation, AfterFn } from '../animations';
import { PositionRecord } from '../components';

/**
 * An implementation of the IAnimation interface for translation animations.
 */
export class TranslationAnim implements IAnimation {
    container: DataContainer[];
    from: PositionRecord[];
    to: PositionRecord[];
    isActive: boolean[];
    private reversed: boolean = false;

    /**
     * Creates an instance of TranslationAnim.
     * @param container - An array of DataContainer instances to animate.
     * @param to - An array of PositionRecord instances that represent the final position of the containers.
     */
    constructor(container: DataContainer[], to: PositionRecord[]) {
        this.container = container;
        this.isActive = container.map(_ => true);
        this.to = to;
        this.updateFrom();

    }

    /**
     * Returns true if the animation is currently reversed, false otherwise.
     * @returns True if the animation is currently reversed, false otherwise.
     */
    public isReversed(): boolean {
        return this.reversed;
    }

    /**
     * Sets the active state of the containers.
     * @param isActive - An array of boolean values that represent the active state of the containers.
     */
    public setState(isActive: boolean[]) {
        if (this.isActive.length !== isActive.length) {
            throw new Error('this.isActive.length !== isActive.length');
        }
        this.isActive = isActive;
    }

    /**
     * Returns an array of boolean values that represent the active state of the containers.
     * @returns An array of boolean values that represent the active state of the containers.
     */
    public getState() {
        return this.isActive;
    }

    /**
     * Changes the active state of a container at a specific index.
     * @param index - The index of the container to change the active state of.
     * @param isActive - The new active state of the container.
     */
    public changeState(index: number, isActive: boolean): void {
        this.isActive[index] = isActive;
    }

    /**
     * Changes the active state of all containers to a specific value.
     * @param isActive - The new active state of all containers.
     */
    public changeAllStates(isActive: boolean): void {
        this.isActive = this.isActive.map(_ => isActive);
    }

    /**
     * Updates the to array if the animation is reversed otherwise it updates from array using container.
     */
    public updateFrom() {
        if (this.reversed) {
            this.to = this.container.map(c => PositionRecord
                .fromDataContainer(c));
        } else {
            this.from = this.container.map(c => PositionRecord
                .fromDataContainer(c));
        }
    }

    /**
     * Sets the from array to a new array of PositionRecord instances.
     * @param from - An array of PositionRecord instances to set the from array to.
     */
    public setFrom(from: PositionRecord[]): void {
        if (from.length === this.to.length) {
            this.from = from;
        }
    }

    /**
     * Perform a specified step of the animation
     * @param elapsed - A part of the animation to preform
     */
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

    /**
     * Reverses the animation.
     */
    public reverse() {
        const tmp = this.from;
        this.from = this.to;
        this.to = tmp;
        this.reversed = !this.reversed;
    }

    /**
     * Preforms the Animation
     * @param rna - An instance of RnaVis to animate.
     * @param duration - The duration of the animation in milliseconds.
     * @param after - A callback function to execute after the animation has finished.
     */
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

    /**
     * Instantly and synchronously completes the animation.
     */
    public instant() {
        this.do(1);
    }

    /**
     * Returns an array of DataContainer instances that are currently active.
     * @returns An array of DataContainer instances that are currently active.
     */
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
