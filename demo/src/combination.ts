import { 
    rnaVis,
    resizeCanvas,
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
import { showLabel, windowResize } from './events';

export { 
    changeAlpha, 
    setDefaultAlpha,
    centerStruct,
    animateToTemplate,
    showLabel,
    hoverLabel,
    numberingLabel,
} from './events.ts';

export function init() {
    const canvas = document.getElementById('rna-canvas');
    const controls = document.getElementById('controls');

    addEventListener("resize", event => windowResize(canvas, controls));
    canvas.addEventListener('mousemove', showLabel, true);
    initRnaVis(canvas, 0);

    initOnClickAlign(canvas);

    const structsSelector = document.getElementById('structs-selector');
    initStructsSelector(structsSelector);

    const range = document.getElementById('alpha-value');
    initRange(range);

    load();
    resizeCanvas(canvas, controls);
    rnaVis.draw();
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

export function reload(): void {
    const structIndex = (document.getElementById('structs-selector') as HTMLSelectElement).value;
    reloadRnaVis(structIndex);
    load();

    const canvas = document.getElementById('rna-canvas');
    const controls = document.getElementById('controls');
    resizeCanvas(canvas, controls);

    rnaVis.draw();
}
