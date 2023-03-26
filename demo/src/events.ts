import { VisibilityAnim, VisibilityRecord, Animation } from 'rna-visualizer';
import { rnaVis, toTemplateAnim, resizeCanvas } from './init';

export function windowResize(canvas: HTMLCanvasElement, controls: HTMLElement): void {
    resizeCanvas(canvas, controls);
    if (rnaVis) {
        centerStruct();
    }
}

export function canvasClick(event: Event): void {
    const rect = rnaVis.canvas.node().getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const containers = rnaVis.getDataContainers();
    const residue = containers[0].getClosestResByCoor(x, y); 

    if (residue !== null) {
        const animTarget = rnaVis.getAlignmentToTempResidue(residue);
        const anim = new Animation(containers.slice(1), animTarget);
        anim.animate(rnaVis, 1500);
    }

    toTemplateAnim.updateFrom();
}

export function numberingLabel(event: Event): void {
    const checked = +(event.target as HTMLInputElement).checked;
    rnaVis.numberingLabelsVisibility(checked);
    rnaVis.draw();
}

export function showLabel(event: Event): void {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    rnaVis.draw();
    rnaVis.drawHoverLabel(x, y);
}

export function hoverLabel(event: Event, canvas: HTMLCanvasElement): void {
    const checked = +(event.target as HTMLInputElement).checked;
    if (checked) {
        canvas.addEventListener('mousemove', showLabel, true);
    } else {
        canvas.removeEventListener('mousemove', showLabel, true);
    }
}

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
export function animateToTemplate(event, duration: number, interval: number): void {
    const button = event.target as HTMLInputElement;
    button.disabled = true;

    const visRec = toTemplateAnim.getActiveContainers()
    .map(cont => {
        const unMappable = cont.getUnmappableResidues();
        const to = new Array(unMappable.length).fill(!removed);
        return new VisibilityRecord(unMappable, to);
    });
    const visAnim = new VisibilityAnim(visRec);
    visAnim.instant();
    visAnim.reverse();

    if (removed) {
        toTemplateAnim.animate(rnaVis, duration, () => {
            visAnim.animate(rnaVis, interval);
            toTemplateAnim.reverse();
            removed = !removed;
            button.disabled = false;
        });
    } else {
        visAnim.animate(rnaVis, interval, () => {
            toTemplateAnim.animate(rnaVis, duration, () => {
                toTemplateAnim.reverse();
                removed = !removed;
                button.disabled = false;
            });
        });
    }
}
