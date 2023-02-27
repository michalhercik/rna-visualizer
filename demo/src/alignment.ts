import { 
    initRnaVis,
    initStructsSelector, 
    initGroupsAlign, 
    initOnClickAlign, 
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

    initOnClickAlign(canvas);

    const structsSelector = document.getElementById('structs-selector');
    initStructsSelector(structsSelector);

    const range = document.getElementById('alpha-value');
    initRange(range);

    load();
}

export function load(): void {
    const list = document.getElementById('vis-list');
    initList(list);
    addMappingCheckboxes(list);
    addStructNamesToList(list);

    const groups = document.getElementById('groups');
    initGroupsAlign(groups);
}

export function clear() {
    document.getElementById('vis-list').replaceChildren();
    document.getElementById('groups').replaceChildren();
}

export function reload(): void {
    clear();
    const structIndex = (document.getElementById('structs-selector') as HTMLSelectElement).value;
    reloadRnaVis(structIndex);
    load();
}
