import { rnaVis } from './init';

export function changeAlpha(event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    rnaVis.setAlpha(value);
    rnaVis.draw();
}

export function centerStruct(): void {
    rnaVis.resetPositions();
    rnaVis.draw();
}
