import { 
    initGroupsAlign, 
    initOnClickAlign, 
    initAnimation,
    initList,
    addVisibilityCheckboxes,
    addAnimationCheckboxes,
    addMappingCheckboxes,
    addStructNamesToList
} from './init.ts';
import { canvasClick } from './events';

export function init() {
    document.getElementById('alignment').style.display = 'block';
    document.getElementById('transformation').style.display = 'block';
    document.getElementById('transform-label').style.display = 'block';
    document.getElementById('visible-label').style.display = 'block';
    document.getElementById('rna-canvas').addEventListener('click', canvasClick, true);
    load();
}

export function load(): void {
    initAnimation();

    const list = document.getElementById('struct-list');
    initList(list);
    addVisibilityCheckboxes(list);
    addAnimationCheckboxes(list);
    addMappingCheckboxes(list);
    addStructNamesToList(list);

    const groups = document.getElementById('groups');
    initGroupsAlign(groups);
}
