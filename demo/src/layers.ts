import {
    initList,
    addVisibilityCheckboxes,
    addMappingCheckboxes,
    addStructNamesToList
} from './init';

export function init() {
    document.getElementById('alignment').style.display = 'none';
    document.getElementById('transformation').style.display = 'none';
    document.getElementById('transform-label').style.display = 'none';
    document.getElementById('visible-label').style.display = 'block';
    load();
}

export function load(): void {
    const list = document.getElementById('struct-list') as HTMLUListElement;
    initList(list);
    addVisibilityCheckboxes(list);
    addMappingCheckboxes(list);
    addStructNamesToList(list);
}
