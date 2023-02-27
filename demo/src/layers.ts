import { initRnaVis, initStructsSelector, reloadRnaVis } from './init.ts';

export { changeAlpha, centerStruct } from './events.ts';

export function init() {
    const canvas = document.getElementById('rna-canvas');
    initRnaVis(canvas, 0);

    const structsSelector = document.getElementById('structs-selector');
    initStructsSelector(structsSelector);

    load();
}

export function load(): void {
    const visList = document.getElementById('vis-list');
    // initVisList(visList);
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


