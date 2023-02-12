import './style.css';
import { addAnim, addAnimBtn, addAnimRange } from './animation';
import { RNAVis, RNAData, createGroups, Animation, AnimationState } from 'rna-visualizer';
import { data } from './data';
import { newCheckboxList } from './checkboxList';

const layers = document.getElementById('canvas-space') as HTMLCanvasElement;
const selection = document.getElementById('rna-selection');


layers.getContext('2d').scale(2, 2);
layers.style.width = (+layers.width / 2) + 'px';
layers.style.height = (+layers.height / 2) + 'px';

const minGroupSize = 20;
const rnaVis = new RNAVis(layers);
rnaVis.addZoom();
// rnaVis.addHoverLabel();


addSelection(rnaVis);
load();
selection.addEventListener('change', load);

function addVisibility(rnaVis: RNAVis): void {
    const visibility = document.getElementById('visibility');
    if (visibility) {
        visibility.replaceChildren();
        const id = "visiblity";
        newCheckboxList(rnaVis, id, visibility, (event: any) => {
            const checkbox = event.currentTarget as HTMLInputElement;
            if (checkbox.checked) {
                rnaVis.showByName(checkbox.getAttribute('id').slice(0, -id.length));
            } else {
                rnaVis.hideByName(checkbox.getAttribute('id').slice(0, -id.length));
            }
            rnaVis.draw();
        });
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
                let targets: AnimationState[] = [];

                for (let i = 0; i < shifts.length; ++i) {
                    targets.push(AnimationState.fromTranslation(containers[i + 1], shifts[i]));
                }

                const anim = new Animation(containers.slice(1), targets);
                anim.animate(rnaVis, 1500);
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

function addOnClickAlign(rnaVis: RNAVis, animation: Animation): void {
    if (document.getElementById('click-align') !== null)
        rnaVis.canvas.node().onclick = (event) => {
            const rect = rnaVis.canvas.node().getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const containers = rnaVis.getDataContainers();
            const bla = containers[0].getResByCoor(x, y); 

            if (bla !== null) {
                const animTarget = rnaVis.getAlignmentToTempResidue(bla);
                animation.setFrom(animTarget);
                const anim = new Animation(containers.slice(1), animTarget);
                anim.animate(rnaVis, 1500);
            }
        };
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
    // for (let i = 1; i < rnaVis.layers.length; ++i) {
    //     animation.changeState(i - 1, rnaVis.layers[i].visible);
    // }


    addVisibility(rnaVis);
    addGroups(rnaVis);
    addOnClickAlign(rnaVis, animation);
    addAnim(rnaVis, animation);
    addAnimBtn(rnaVis, animation);
    addAnimRange(rnaVis, animation);
    addResetBtn(rnaVis);
}

