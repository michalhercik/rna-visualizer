import { VisibilityAnim, VisibilityRecord } from 'rna-visualizer';
import { rnaVis, toTemplateAnim } from './init';

export function changeAlpha(event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    rnaVis.setAlpha(value);
    rnaVis.draw();
}

export function setDefaultAlpha(range: HTMLInputElement): void {
    const alpha = rnaVis.getDefaultAlpha();
    range.value = alpha;
    rnaVis.setAlpha(alpha);
    rnaVis.draw();
}

export function centerStruct(): void {
    rnaVis.resetPositions();
    rnaVis.draw();
}

let removed = false;
export function animateToTemplate(duration: number, interval: number): void {
    if (!removed) {
        toTemplateAnim.updateFrom();
    }

    const visRec = toTemplateAnim.getActiveContainers()
    .map(cont => {
        const unMappable = cont.getUnmappableResidues();
        const to = unMappable.map(res => !res.isVisible());
        return new VisibilityRecord(unMappable, to);
    });
    const visAnim = new VisibilityAnim(visRec);

    if (removed) {
        toTemplateAnim.animate(rnaVis, duration, () => {
            visAnim.animate(rnaVis, interval);
            toTemplateAnim.reverse();
            removed = !removed;
        });
    } else {
        visAnim.animate(rnaVis, interval, () => {
            toTemplateAnim.animate(rnaVis, duration, () => {
                toTemplateAnim.reverse();
                removed = !removed;
            });
        });
    }
}
