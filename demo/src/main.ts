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
} from './init'
import { showLabel, windowResize, canvasClick } from './events';

export { 
    changeAlpha, 
    setDefaultAlpha,
    centerStruct,
    animateToTemplate,
    showLabel,
    hoverLabel,
    numberingLabel,
} from './events.ts';

export let page = combination;

export function init(): void {
    const canvas = document.getElementById('rna-canvas');
    const controls = document.getElementById('controls');

    addEventListener("resize", event => windowResize(canvas, controls));
    canvas.addEventListener('mousemove', showLabel, true);
    initRnaVis(canvas, 0);

    const structsSelector = document.getElementById('structs-selector');
    initStructsSelector(structsSelector);

    const range = document.getElementById('alpha-value');
    initRange(range);

    page.init();
    resizeCanvas(canvas, controls);
    rnaVis.draw();
}

export function reload(): void {
    clear();
    page.reload();
}

export function navClick(event: Event): void {
    clear();
    const canvas = document.getElementById('rna-canvas');
    canvas.removeEventListener('click', canvasClick, true);
    document.getElementsByClassName('active')[0].classList.remove('active');
    event.target.classList.add('active');
    changePage(event.target.innerHTML);
    page.init();
    const controls = document.getElementById('controls');
    resizeCanvas(canvas, controls);
    rnaVis.draw();
}

function changePage(newPageName: string): void {
    switch(newPageName) {
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
