import { 
    initRnaVis,
    initStructsSelector, 
    reloadRnaVis, 
    initRange,
    initList,
    addVisibilityCheckboxes,
    addMappingCheckboxes,
    addStructNamesToList
} from './init.ts';

export { 
    changeAlpha, 
    setDefaultAlpha,
    centerStruct,
} from './events.ts';

export function init() {
    const canvas = document.getElementById('rna-canvas');
    initRnaVis(canvas, 0);

    const structsSelector = document.getElementById('structs-selector');
    initStructsSelector(structsSelector);

    const range = document.getElementById('alpha-value');
    initRange(range);

    load();
}

export function load(): void {
    const list = document.getElementById('vis-list');
    initList(list);
    addVisibilityCheckboxes(list);
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
