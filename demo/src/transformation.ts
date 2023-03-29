import {
    initAnimation,
    initList,
    addAnimationCheckboxes,
    addMappingCheckboxes,
    addStructNamesToList
} from './init';

export function init() {
    document.getElementById('alignment').style.display = 'none';
    document.getElementById('transformation').style.display = 'block';
    document.getElementById('transform-label').style.display = 'block';
    document.getElementById('visible-label').style.display = 'none';
    load();
}

export function load(): void {
    initAnimation();

    const list = document.getElementById('struct-list') as HTMLUListElement;
    initList(list);
    addAnimationCheckboxes(list);
    addMappingCheckboxes(list);
    addStructNamesToList(list);
}
