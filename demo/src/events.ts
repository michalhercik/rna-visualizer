import { VisibilityAnim, VisibilityRecord, TranslationAnim } from 'rna-visualizer';
import { rnaVis, toTemplateAnim, resizeCanvas } from './init';

export function windowResize(canvas: HTMLCanvasElement, controls: HTMLElement): void {
    resizeCanvas(canvas, controls);
    rnaVis.draw();
}

export function canvasClick(event: MouseEvent): void {
    const rect = rnaVis.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const containers = rnaVis.getDataContainers();
    const residue = containers[0].getClosestResByCoor(x, y);

    if (residue !== null) {
        const reversed = toTemplateAnim.isReversed();
        if (reversed) {
            toTemplateAnim.instant();
        }
        const animTarget = rnaVis.getAlignmentToTempResidue(residue);
        const anim = new TranslationAnim(containers.slice(1), animTarget);
        if (reversed) {
            anim.setState(toTemplateAnim.getState());
        }
        anim.instant()
        toTemplateAnim.updateFrom();
        if (reversed) {
            toTemplateAnim.reverse();
            toTemplateAnim.instant();
            toTemplateAnim.reverse();
            anim.setState(toTemplateAnim.getState().map(s => !s));
        }
        anim.animate(rnaVis, 1500);
    }
}

export function numberingLabel(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    rnaVis.numberingLabelsVisibility(checked);
    rnaVis.draw();
}

export function showLabel(event: MouseEvent): void {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
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
    range.value = alpha.toString();
    rnaVis.setAlpha(alpha);
    rnaVis.draw();
}

export function centerStruct(): void {
    rnaVis.resetPositions();
    rnaVis.draw();
}

let removed = false;
export function animateToTemplate(event: Event, duration: number, interval: number): void {
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
            Array.from(document.getElementsByClassName('group-btn'))
                .forEach(btn => btn.disabled = false);
        });
    } else {
        Array.from(document.getElementsByClassName('group-btn'))
            .forEach(btn => btn.disabled = true);
        visAnim.animate(rnaVis, interval, () => {
            toTemplateAnim.animate(rnaVis, duration, () => {
                toTemplateAnim.reverse();
                removed = !removed;
                button.disabled = false;
            });
        });
    }
}
