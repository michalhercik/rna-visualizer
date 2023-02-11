import './style.css';
import { addAnim, addAnimBtn, addAnimRange } from './animation';
import { RNAVis, RNAData, createGroups, Animation, AnimationState } from 'rna-visualizer';
import { data } from './data';

const layers = document.getElementById('canvas-space');
const selection = document.getElementById('rna-selection');


const minGroupSize = 20;
const rnaVis = new RNAVis(layers);
rnaVis.addZoom();
// rnaVis.addHoverLabel();
rnaVis.addClickAlign(1500);

addSelection(rnaVis);
load();
selection.addEventListener('change', load);

function addVisibility(rnaVis: RNAVis): void {
    const visibility = document.getElementById('visibility');
    if (visibility) {
        visibility.replaceChildren();
        for (let layer of Array.from(rnaVis.layers.values())) {
            let listItem = document.createElement('li');
            visibility.append(listItem);
            let checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('id', layer.name);
            checkbox.setAttribute('name', layer.name);
            checkbox.setAttribute('checked', layer.visible ? "checked" : "");
            checkbox.addEventListener('change', (event) => {
                const checkbox = event.currentTarget as HTMLInputElement;
                if (checkbox.checked) {
                    rnaVis.showByName(checkbox.getAttribute('id'));
                } else {
                    rnaVis.hideByName(checkbox.getAttribute('id'));
                }
                rnaVis.draw();
            })
            listItem.append(checkbox);

            let label = document.createElement('label');
            label.setAttribute('for', layer.name);
            label.innerHTML = layer.name;
            listItem.append(label);
        }
    }
}

function addGroups(rnaVis: RNAVis): void {
    const groups = document.getElementById('groups');
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
                const shifts = rnaVis.align(+(event.target as HTMLElement).id, minGroupSize);
                const containers = rnaVis.getDataContainers();

                for (let i = 0; i < shifts.length; ++i) {
                    containers[i + 1].translate(shifts[i]);
                }

                rnaVis.draw();
            }
            groups.append(b);
            ++i;
        })
    }
}

function addResetBtn(rnaVis: RNAVis): void {
    const resetBtn = document.getElementById('reset-pos');
    resetBtn.addEventListener('click', (event) => {
        rnaVis.resetPositions();
        rnaVis.draw();
    })
}

function addSelection(rnaVis: RNAVis): void {
    let bla = 0;
    for (let bundle of data) {
        const option = document.createElement('option');
        option.setAttribute('value', bla.toString());
        option.innerHTML = bundle.template.name;
        selection.append(option);
        ++bla;
    }
}

function load(): void {
    const index = +(selection as HTMLSelectElement).selectedIndex;
    rnaVis.clear();
    const bundle = data[index];
    rnaVis.addData(bundle.template.structure, bundle.template.name);
    for (let d of bundle.data) {
      rnaVis.addData(d.structure, d.name);
    }

    const shifts = rnaVis.align();
    const containers = rnaVis.getDataContainers();

    for (let i = 0; i < shifts.length; ++i) {
        containers[i + 1].translate(shifts[i]);
    }

    rnaVis.draw();


    let targets: AnimationState[] = [];
    let checkbox;
    for (let i = 1; i < rnaVis.layers.length; ++i) {
        targets.push(AnimationState.fromTemplate(rnaVis.layers[i].data, rnaVis.layers[0].data));
    }
    let conts = rnaVis.getDataContainers();
    const animation = new Animation(conts.slice(1), targets);

    addVisibility(rnaVis);
    addGroups(rnaVis);
    addAnim(rnaVis, animation);
    addAnimBtn(rnaVis, animation);
    addAnimRange(rnaVis, animation);
    addResetBtn(rnaVis);
}

