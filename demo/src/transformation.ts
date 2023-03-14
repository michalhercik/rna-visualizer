import { 
    initRnaVis,
    initStructsSelector, 
    initAnimation,
    reloadRnaVis, 
    initRange,
    initList,
    addAnimationCheckboxes,
    addMappingCheckboxes,
    addStructNamesToList
} from './init.ts';
import { showLabel } from './events';

export { 
    changeAlpha, 
    setDefaultAlpha,
    centerStruct,
    animateToTemplate,
    showLabel,
    hoverLabel,
} from './events.ts';

export function init() {
    const canvas = document.getElementById('rna-canvas');
    canvas.addEventListener('mousemove', showLabel, true);
    initRnaVis(canvas, 0);

    const structsSelector = document.getElementById('structs-selector');
    initStructsSelector(structsSelector);

    const range = document.getElementById('alpha-value');
    initRange(range);

    load();
}

export function load(): void {
    initAnimation();

    const list = document.getElementById('vis-list');
    initList(list);
    addAnimationCheckboxes(list);
    addMappingCheckboxes(list);
    addStructNamesToList(list);
}

export function clear() {
    document.getElementById('vis-list').replaceChildren();
}

export function reload(): void {
    clear();
    const structIndex = (document.getElementById('structs-selector') as HTMLSelectElement).value;
    reloadRnaVis(structIndex);
    load();
}
