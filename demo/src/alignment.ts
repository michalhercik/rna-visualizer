import {
    initGroupsAlign,
    initList,
    addMappingCheckboxes,
    addStructNamesToList
} from './init';
import { canvasClick } from './events';

export function init() {
    document.getElementById('alignment').style.display = 'block';
    document.getElementById('transformation').style.display = 'none';
    document.getElementById('transform-label').style.display = 'none';
    document.getElementById('visible-label').style.display = 'none';
    document.getElementById('rna-canvas').addEventListener('click', canvasClick, true);
    load();
}

export function load(): void {
    const list = document.getElementById('struct-list') as HTMLUListElement;
    initList(list);
    addMappingCheckboxes(list);
    addStructNamesToList(list);

    const groups = document.getElementById('groups');
    initGroupsAlign(groups);
}
