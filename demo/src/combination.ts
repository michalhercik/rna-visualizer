import { 
    initRnaVis,
    initStructsSelector, 
    initGroupsAlign, 
    initOnClickAlign, 
    initAnimation,
    reloadRnaVis, 
    initRange,
    initList,
    addVisibilityCheckboxes,
    addAnimationCheckboxes,
    addMappingCheckboxes,
    addStructNamesToList
} from './init.ts';

export { 
    changeAlpha, 
    setDefaultAlpha,
    centerStruct,
    animateToTemplate,
    showLabel
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
    initAnimation();

    const list = document.getElementById('vis-list');
    initList(list);
    addVisibilityCheckboxes(list);
    addAnimationCheckboxes(list);
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
