import * as combination from './combination';
import * as layers from './layers';
import * as transformation from './transformation';
import * as alignment from './alignment';
import {
    rnaVis,
    resizeCanvas,
    initRnaVis,
    initStructsSelector,
    initRange,
} from './init';
import { showLabel, windowResize, canvasClick } from './events';
import { reloadRnaVis } from './init';

export {
    changeAlpha,
    setDefaultAlpha,
    centerStruct,
    animateToTemplate,
    showLabel,
    hoverLabel,
    numberingLabel,
} from './events';

export let page = combination;

export function init(): void {
    const canvas = document.getElementById('rna-canvas') as HTMLCanvasElement;
    const controls = document.getElementById('controls');
    addEventListener("resize", _ => windowResize(canvas, controls));
    canvas.addEventListener('mousemove', showLabel, true);
    initRnaVis(canvas, 0);

    const structsSelector = document.getElementById('structs-selector') as HTMLSelectElement;
    initStructsSelector(structsSelector);

    const range = document.getElementById('alpha-value') as HTMLInputElement;
    initRange(range);

    page.init();
    resizeCanvas(canvas, controls);
    rnaVis.draw();
}

export function reload(structIndex: number): void {
    clear();
    reloadRnaVis(structIndex);
    page.load();
    const canvas = document.getElementById('rna-canvas') as HTMLCanvasElement;
    const controls = document.getElementById('controls');
    resizeCanvas(canvas, controls);
    rnaVis.draw();
}

export function navClick(event: Event): void {
    clear();
    const canvas = document.getElementById('rna-canvas') as HTMLCanvasElement;
    const controls = document.getElementById('controls');
    canvas.removeEventListener('click', canvasClick, true);
    document.getElementsByClassName('active')[0].classList.remove('active');
    const target = event.target as HTMLElement;
    target.classList.add('active');
    changePage(target.innerHTML);
    page.init();
    resizeCanvas(canvas, controls);
    rnaVis.draw();
}

function changePage(newPageName: string): void {
    switch (newPageName) {
        case 'Alignment': {
            page = alignment;
            break;
        }
        case 'Layers': {
            page = layers;
            break;
        }
        case 'Transformation': {
            page = transformation;
            break;
        }
        case 'Combination': {
            page = combination;
            break;
        }
    }
}

function clear(): void {
    document.getElementById('struct-list').replaceChildren();
    document.getElementById('groups').replaceChildren();
}
