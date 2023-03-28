import { RnaVis } from '../rnaVis';

export type AfterFn = () => void;

export interface IAnimation {
    changeState(index: number, isActive: boolean): void;
    do(elapsed: number): void;
    reverse(): void;
    animate(rna: RnaVis, duration: number, after: AfterFn): void;
}
