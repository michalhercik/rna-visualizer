import { RNAVis, Layer } from 'rna-visualizer';

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

export function newCheckboxList(rnaVis: RNAVis, id: string, list: HTMLElement, callback: any): void {
    const op = document.createElement('li');
    op.append(newCheckbox(
        'bla' + id, 
        'bla' + id,
        false,
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
        listItem.append(newCheckboxFromLayer(layer, id, callback));
        listItem.append(newLabel(layer, id));
        list.append(listItem);
    }
}

