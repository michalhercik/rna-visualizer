import './style.css';
import {animBtn} from './animation';
import { RNAVis, RNAData, createGroups } from 'rna-visualizer';
import {data} from './data';

const layers = document.getElementById('canvas-space');
const controls = document.getElementById('controls');
const visibility = document.getElementById('visibility');
const resetBtn = document.getElementById('reset-pos');
const groups = document.getElementById('groups');
const selection = document.getElementById('rna-selection');

const minGroupSize = 20;
const rnaVis = new RNAVis(layers);
rnaVis.addZoom();
// rnaVis.addHoverLabel();
rnaVis.addClickAlign();

function load(): void {
    const index = +(selection as HTMLSelectElement).selectedIndex;
    rnaVis.clear();
    const bundle = data[index];
    rnaVis.addData(bundle.template.structure, bundle.template.name);
    for (let d of bundle.data) {
      rnaVis.addData(d.structure, d.name);
    }

    rnaVis.draw();

    if (visibility) {
        visibility.replaceChildren();
        for (let layer of Array.from(rnaVis.layers.values())) {
            let listItem = document.createElement('li');
            visibility.append(listItem);
            let checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('id', layer.id);
            checkbox.setAttribute('name', layer.id);
            checkbox.setAttribute('checked', layer.visible ? "checked" : "");
            checkbox.addEventListener('change', (event) => {
                const checkbox = event.currentTarget as HTMLInputElement;
                if (checkbox.checked) {
                    rnaVis.show(checkbox.getAttribute('id'));
                } else {
                    rnaVis.hide(checkbox.getAttribute('id'));
                }
                rnaVis.draw();
            })
            listItem.append(checkbox);

            let label = document.createElement('label');
            label.setAttribute('for', layer.id);
            label.innerHTML = layer.id;
            listItem.append(label);
        }
    }

    if (groups) {
        groups.replaceChildren();
        let ls = rnaVis.getDataContainers();

        let i = 0;
        createGroups(ls[0], ls[1], null, minGroupSize).forEach( group => {
            let b = document.createElement('input');
            b.setAttribute('type', 'button');
            b.setAttribute('value', group.size() + '');
            b.setAttribute('id', i + '');
            b.onclick = (event) => {
                rnaVis.align(+(event.target as HTMLElement).id, minGroupSize);
                rnaVis.draw();
            }
            groups.append(b);
            ++i;
        })
    }
    animBtn(rnaVis);
}

// Selection init
let bla = 0;
for (let bundle of data) {
    const option = document.createElement('option');
    option.setAttribute('value', bla.toString());
    option.innerHTML = bundle.template.name;
    selection.append(option);
    ++bla;
}

load();

selection.addEventListener('change', load);

resetBtn.addEventListener('click', (event) => {
    rnaVis.resetPositions();
    rnaVis.draw();
})

