import { RNAVis, Layer } from 'rna-visualizer';
import { data } from './data';

export let rnaVis;

export function initRnaVis(canvas: HTMLCanvasElement, structIndex: number): void {
    // canvas.getContext('2d').scale(2, 2);

    rnaVis = new RNAVis(canvas);
    loadData(structIndex);
    rnaVis
    .addZoom()
    .draw();
}

export function reloadRnaVis(structIndex: number) {
    rnaVis.clear();
    loadData(structIndex);
    rnaVis.draw();
}

export function loadData(index: number): void {
    const bundle = data[index];
    rnaVis.addData(bundle.template.structure, bundle.template.name);
    for (let d of bundle.data) {
        rnaVis.addData(d.structure, d.name);
    }

    rnaVis.translate(rnaVis.align());
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

export function initVisList(list: HTMLUListElement): void {
    const id = 'visibility';
    const op = document.createElement('li');
    op.append(newCheckbox(
        'bla' + id, 
        'bla' + id,
        true,
        (event: any) => {
            const newState = (event.currentTarget as HTMLInputElement).checked;
            for (let layer of rnaVis.layers) {
                (document.getElementById(layer.name + id) as HTMLInputElement).checked = newState;
                layer.visible = newState;
            }
            rnaVis.draw();
        }
    ));

    list.append(op);
    for (let layer of rnaVis.layers) {
        let listItem = document.createElement('li');
        listItem.append(newCheckboxFromLayer(layer, id, () => {
            const checkbox = event.currentTarget as HTMLInputElement;
            if (checkbox.checked) {
                rnaVis.showByName(checkbox.getAttribute('id').slice(0, -id.length));
            } else {
                rnaVis.hideByName(checkbox.getAttribute('id').slice(0, -id.length));
            }
            rnaVis.draw();
        }));
        listItem.append(newLabel(layer, id));
        list.append(listItem);
    }
}

function newCheckboxFromLayer(layer: Layer, id: string, callback: any): HTMLInputElement {
    return newCheckbox(
        layer.name + id,
        layer.name + id,
        layer.visible,
        callback
    );
}

function newCheckbox(id: string, name: string, checked: boolean, onChange: any): HTMLInputElement {
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', id);
    checkbox.setAttribute('name', name);
    if (checked) {
        checkbox.setAttribute('checked', "checked");
    }
    checkbox.addEventListener('change', onChange);
    return checkbox;
}

function newLabel(layer: Layer, id: string): HTMLElement {
    let label = document.createElement('label');
    label.setAttribute('for', layer.name + id);
    label.innerHTML = layer.name;
    return label;
}

