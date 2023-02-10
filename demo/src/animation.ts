import { RNAVis, RNAData, remove, add, Animation, AnimationState, createGroups } from 'rna-visualizer';
import {data} from './data';
import * as d3 from 'd3';

export function addAnim(rnaVis: RNAVis, anim: Animation): void {
    const animList = document.getElementById('animation');
    if (animList) {
        animList.replaceChildren();
        for (let i = 0; i < anim.container.length; ++i) {
            let cont = anim.container[i];
            let listItem = document.createElement('li');
            animList.append(listItem);
            let checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('id', 'anim' + i);
            checkbox.setAttribute('name', 'anim' + i);
            checkbox.setAttribute('checked', "checked");
            checkbox.addEventListener('change', (event) => {
                const checkbox = event.currentTarget as HTMLInputElement;
                anim.changeState(+checkbox.id.slice(4), checkbox.checked);
            });
            listItem.append(checkbox);

            let label = document.createElement('label');
            label.setAttribute('for', 'anim' + i);
            label.innerHTML = rnaVis.layers[i + 1].name;
            listItem.append(label);
        }
    }
}

export function addAnimBtn(rnaVis: RNAVis, anim: Animation) {
    const animBtn = document.getElementById('animate-button');
    if (animBtn) {
        let removed = false;
        animBtn.onclick = (event) => {
            if (!removed) {
                anim.updateFrom();
                anim.container.forEach(remove);
                rnaVis.draw();
            }

            anim.animate(rnaVis, () => {
                if (removed) {
                    anim.container.forEach(add);
                    rnaVis.draw();
                }
                anim.reverse();
                removed = !removed;
            });
        }
    }
}

