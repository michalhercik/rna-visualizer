import { RnaVis, TranslationAnim, TranslationGroups, PositionRecord } from 'rna-visualizer';
import { data } from './data';

export let rnaVis: RnaVis;
export let toTemplateAnim: TranslationAnim;

export function resizeCanvas(canvas: HTMLCanvasElement, controls: HTMLElement): void {
    const alpha = canvas.getContext('2d').globalAlpha;
    canvas.height = 0;
    const container = controls.parentElement;
    const containerStyles = window.getComputedStyle(container);
    const colStyles = window.getComputedStyle(canvas.parentElement);
    canvas.height = Math.max(controls.offsetHeight, window.screen.height);
    canvas.width = +container.offsetWidth
        - Number(containerStyles.getPropertyValue('padding-left').slice(0, -2))
        - Number(containerStyles.getPropertyValue('padding-right').slice(0, -2))
        - 2 * Number(colStyles.getPropertyValue('padding-left').slice(0, -2))
        - 2 * Number(colStyles.getPropertyValue('padding-right').slice(0, -2))
        - controls.offsetWidth;
    canvas.getContext('2d').globalAlpha = alpha;
}

export function initRnaVis(canvas: HTMLCanvasElement, structIndex: number): void {
    rnaVis = new RnaVis(canvas);
    loadData(structIndex);
    rnaVis.addZoom();
}

export function reloadRnaVis(structIndex: number) {
    rnaVis.clear();
    loadData(structIndex);
}

export function loadData(index: number): void {
    const bundle = data[index];
    rnaVis.addLayer(bundle.template.structure, bundle.template.name);
    for (const d of bundle.data) {
        rnaVis.addLayer(d.structure, d.name);
    }

    rnaVis.translate(rnaVis.align());
}

export function initRange(range: HTMLInputElement): void {
    const alpha = rnaVis.getDefaultAlpha();
    range.value = alpha.toString();
}

export function initStructsSelector(select: HTMLSelectElement): void {
    let index = 0;
    for (const bundle of data) {
        const option = document.createElement('option');
        option.setAttribute('value', index.toString());
        option.innerHTML = bundle.template.name;
        select.append(option);
        ++index;
    }
}

export function initGroupsAlign(groups: HTMLElement): void {
    const ls = rnaVis.getDataContainers();
    const minGroupSize = 20;
    let i = 0;
    TranslationGroups.create(ls[0], ls[1], null, minGroupSize).forEach(group => {
        const b = document.createElement('input');
        b.setAttribute('type', 'button');
        b.setAttribute('class', 'group-btn btn btn-primary btn-sm m-1');
        b.setAttribute('value', group.size().toString());
        b.setAttribute('id', i.toString());
        b.onclick = (event) => {
            const shifts = rnaVis.align(Number((event.target as HTMLElement).id), minGroupSize);
            const containers = rnaVis.getDataContainers();
            const targets = shifts
                .map((shift, index) => PositionRecord.fromTranslation(containers[index], shift));
            new TranslationAnim(containers, targets)
                .animate(rnaVis, 1500, () => toTemplateAnim.updateFrom());
        };
        groups.append(b);
        ++i;
    });
}

export function initAnimation(): void {
    const template = rnaVis.layers[0].data;
    const containers = rnaVis.getDataContainers().slice(1);
    const targets = containers.map(cont => PositionRecord.fromTemplate(cont, template));
    toTemplateAnim = new TranslationAnim(containers, targets);
}

export function initList(list: HTMLUListElement): void {
    const topItem = document.createElement('li');
    topItem.setAttribute('class', 'list-group-item');
    list.append(topItem);
    rnaVis.layers.forEach(_ => {
        const listItem = document.createElement('li');
        listItem.setAttribute('class', 'list-group-item');
        list.append(listItem);
    });
}

export function addVisibilityCheckboxes(list: HTMLUListElement): void {
    const topCallback = (event: Event) => {
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
    const topCallback = (event: Event) => {
        const checked = (event.currentTarget as HTMLInputElement).checked;
        toTemplateAnim.changeAllStates(checked);
    };
    addCheckboxToList(list, 'animation-checkbox', topCallback, (event: Event) => {
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
    rnaVis.layers.forEach(layer => {
        layer.mappingLines.forEach(ml => ml.setVisible(false));
    });
    const topCallback = (event: Event) => {
        const checked = (event.currentTarget as HTMLInputElement).checked;
        rnaVis.layers.forEach(layer => {
            layer.mappingLines.forEach(ml => ml.setVisible(checked));
        });
        rnaVis.draw();
    };
    addCheckboxToList(list, 'mapping-checkbox', topCallback, (event: Event) => {
        const currentTarget = event.currentTarget as HTMLInputElement;
        const index = +currentTarget.value;
        const checked = currentTarget.checked;
        rnaVis.layers[index].mappingLines.forEach(ml => ml.setVisible(checked));
        rnaVis.draw();
    }, false);
}

export function addStructNamesToList(list: HTMLUListElement): void {
    const labels = rnaVis.layers.map(layer => layer.name);
    labels.unshift('all');
    addLabelToList(list, labels);
}

function addCheckboxToList(list: HTMLUListElement, type: string, topCallback: (event: Event) => void, callback: (event: Event) => void, checked = true): void {
    const checkClasses = 'form-check-input me-1';
    const topItem = list.children[0];
    topItem.append(newCheckbox(type + 'top' + ` ${checkClasses}`, "None", (event: Event) => {
        const newState = (event.currentTarget as HTMLInputElement).checked;
        Array.from(document.getElementsByClassName(type))
            .forEach((el: HTMLInputElement) => {
                el.checked = newState;
            });
        topCallback(event);
    }, checked));

    Array.from(list.children).slice(1).forEach((li, index) => {
        li.append(newCheckbox(type + ` ${checkClasses}`, index.toString(), callback, checked));
    });
}

function addLabelToList(list: HTMLUListElement, labels: string[]): void {
    Array.from(list.children).forEach((li, index) => {
        li.append(newLabel(labels[index]));
    });
}

function newCheckbox(type: string, value: string, callback: (event: Event) => void, checked: boolean): HTMLInputElement {
    const checkbox = document.createElement('input');
    checkbox.setAttribute('class', type);
    checkbox.setAttribute('value', value);
    checkbox.setAttribute('type', 'checkbox');
    if (checked) {
        checkbox.setAttribute('checked', "checked");
    }
    checkbox.addEventListener('change', callback);
    return checkbox;
}

function newLabel(text: string): HTMLElement {
    const label = document.createElement('label');
    label.innerHTML = text;
    return label;
}
