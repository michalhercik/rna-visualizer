import { RNAVis, Layer, Animation, createGroups, RnaPositionRecord } from 'rna-visualizer';
import { data } from './data';

export let rnaVis;
export let toTemplateAnim;

export function resizeCanvas(canvas: HTMLCanvasElement, controls: HTMLElement): void {
    const alpha = canvas.getContext('2d').globalAlpha;
    canvas.height = 0;
    const container = controls.parentElement;
    const containerStyles = window.getComputedStyle(container);
    const colStyles = window.getComputedStyle(canvas.parentElement);
    canvas.height = Math.max(controls.offsetHeight, window.screen.height);
    canvas.width = +container.offsetWidth 
    - containerStyles.getPropertyValue('padding-left').slice(0, -2)
    - containerStyles.getPropertyValue('padding-right').slice(0, -2)
    - 2 * +colStyles.getPropertyValue('padding-left').slice(0, -2)
    - 2 * +colStyles.getPropertyValue('padding-right').slice(0, -2)
    - controls.offsetWidth;
    canvas.getContext('2d').globalAlpha = alpha;
}

export function initRnaVis(canvas: HTMLCanvasElement, structIndex: number): void {
    rnaVis = new RNAVis(canvas);
    loadData(structIndex);
    rnaVis.addZoom();
}

export function reloadRnaVis(structIndex: number) {
    rnaVis.clear();
    loadData(structIndex);
}

export function loadData(index: number): void {
    const bundle = data[index];
    rnaVis.addData(bundle.template.structure, bundle.template.name);
    for (let d of bundle.data) {
        rnaVis.addData(d.structure, d.name);
    }

    rnaVis.translate(rnaVis.align());
}

export function initRange(range: HTMLInputElement): void {
    const alpha = rnaVis.getDefaultAlpha();
    range.value = alpha;
}

export function initStructsSelector(select: HTMLSelectElement): void {
    let index = 0;
    for (let bundle of data) {
        const option = document.createElement('option');
        option.setAttribute('value', index.toString());
        option.innerHTML = bundle.template.name;
        select.append(option);
        ++index;
    }
}

export function initGroupsAlign(groups: HTMLElement): void {
    let ls = rnaVis.getDataContainers();
    const minGroupSize = 20;
    let i = 0;
    createGroups(ls[0], ls[1], null, minGroupSize).forEach(group => {
        let b = document.createElement('input');
        b.setAttribute('type', 'button');
        b.setAttribute('class', 'btn btn-primary btn-sm m-1');
        b.setAttribute('value', group.size() + '');
        b.setAttribute('id', i + '');
        b.onclick = (event) => {
            const shifts = rnaVis.align(+(event.target as HTMLElement).id, minGroupSize);
            const containers = rnaVis.getDataContainers();
            const targets = shifts
            .map((shift, index) => RnaPositionRecord.fromTranslation(containers[index], shift));

            // translateAnim.setFrom(targets);
            new Animation(containers, targets)
            .animate(rnaVis, 1500);
        }
        groups.append(b);
        ++i;
    })
}

export function initOnClickAlign(canvas): void {
    canvas.onclick = (event) => {
        const rect = rnaVis.canvas.node().getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const containers = rnaVis.getDataContainers();
        const residue = containers[0].getClosestResByCoor(x, y); 

        if (residue !== null) {
            const animTarget = rnaVis.getAlignmentToTempResidue(residue);
            const anim = new Animation(containers.slice(1), animTarget);
            anim.animate(rnaVis, 1500);
        }

        toTemplateAnim.updateFrom();
    };
}

export function initAnimation(): void {
    const template = rnaVis.layers[0].data;
    const containers = rnaVis.getDataContainers().slice(1);
    const targets = containers.map(cont => RnaPositionRecord.fromTemplate(cont, template))
    toTemplateAnim = new Animation(containers, targets);
}

export function initList(list: HTMLUListElement): void {
    const topItem = document.createElement('li');
    topItem.setAttribute('class', 'list-group-item');
    list.append(topItem);
    rnaVis.layers.forEach(layer => {
        const listItem = document.createElement('li');
        listItem.setAttribute('class', 'list-group-item');
        list.append(listItem);
    })
}

export function addVisibilityCheckboxes(list: HTMLUListElement): void {
    const topCallback = event => {
        const checked = (event.currentTarget as HTMLInputElement).checked;
        rnaVis.setAllVisibility(checked);
        rnaVis.setAlpha(rnaVis.getDefaultAlpha());
        rnaVis.draw();
    };
    addCheckboxToList(list, 'visibility-checkbox', topCallback, event => {
        const currentTarget = event.currentTarget as HTMLInputElement;
        const index = +currentTarget.value;
        const checked = currentTarget.checked;
        rnaVis.setVisibility(index, checked);
        rnaVis.setAlpha(rnaVis.getDefaultAlpha());
        rnaVis.draw();
    });
}

export function addAnimationCheckboxes(list: HTMLUListElement): void {
    const topCallback = event => {
        const checked = (event.currentTarget as HTMLInputElement).checked;
        toTemplateAnim.changeAllStates(checked);
    };
    addCheckboxToList(list, 'animation-checkbox', topCallback, event => {
        const currentTarget = event.currentTarget as HTMLInputElement;
        let index = +currentTarget.value;
        if (index > 0) {
            --index;
            const checked = currentTarget.checked;
            toTemplateAnim.changeState(index, checked);
        }
    });
}

export function addMappingCheckboxes(list: HTMLUListElement): void {
    const topCallback = event => {
        const checked = (event.currentTarget as HTMLInputElement).checked;
        rnaVis.layers.forEach(layer => {
            layer.mappingLines.forEach(ml => ml.setVisible(checked));
        });
        rnaVis.draw();
    };
    addCheckboxToList(list, 'mapping-checkbox', topCallback, event => {
        const currentTarget = event.currentTarget as HTMLInputElement;
        let index = +currentTarget.value;
        const checked = currentTarget.checked;
        rnaVis.layers[index].mappingLines.forEach(ml => ml.setVisible(checked));
        rnaVis.draw();
    });
}

export function addStructNamesToList(list: HTMLUListElement): void {
    const labels = rnaVis.layers.map(layer => layer.name);
    labels.unshift('all');
    addLabelToList(list, labels);
}

function addCheckboxToList(list: HTMLUListElement, type: string, topCallback: () => void, callback: () => void): void {
    const checkClasses = 'form-check-input me-1';
    const topItem = list.children[0];
    topItem.append(newCheckbox(type + 'top' + ` ${checkClasses}`, "None", event => {
        const newState = (event.currentTarget as HTMLInputElement).checked;
        Array.from(document.getElementsByClassName(type))
        .forEach(el => {
            el.checked = newState;
        });
        topCallback(event);
    }))

    Array.from(list.children).slice(1).forEach((li, index) => {
        li.append(newCheckbox(type + ` ${checkClasses}`, index, callback));
    });
}

function addLabelToList(list: HTMLUListElement, labels: string[]): void {
    Array.from(list.children).forEach((li, index) => {
        li.append(newLabel(labels[index]));
    });
}

function newCheckbox(type: string, value: string, callback: () => void): HTMLInputElement {
    const checkbox = document.createElement('input');
    checkbox.setAttribute('class', type);
    checkbox.setAttribute('value', value);
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('checked', "checked");
    checkbox.addEventListener('change', callback);
    return checkbox;
}

function newLabel(text: string): HTMLElement {
    let label = document.createElement('label');
    label.innerHTML = text;
    return label;
}
