import { RnaVis } from '../rna-vis';

/**
 * A type of function that is invoked after an animation completes.
 */
export type AfterFn = () => void;

/**
 * Interface for defining an animation
 */
export interface IAnimation {

    /**
     * Change the state of the animation to active or not at a given index
     * @param index - Index to change the state of
     * @param isActive - New state of the index
     */
    changeState(index: number, isActive: boolean): void;

    /**
     * Perform a specified step of the animation
     * @param elapsed - A part of the animation to preform
     */
    do(elapsed: number): void;

    /**
     * Reverse the animation.
     */
    reverse(): void;

    /**
     * Preforms the Animation
     * @param rna - RnaVis object on which is preformed the animation
     * @param duration - Duration of the animation
     * @param after - Function to call after the animation completes
     */
    animate(rna: RnaVis, duration: number, after: AfterFn): void;
}
