import { RNAVis, RNAData, Animation, createGroups, Residue, VisibilityAnim, VisibilityRecord } from 'rna-visualizer';
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
            if (anim.isActive[i]) {
                checkbox.setAttribute('checked', "checked");
            }
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

export function addAnimBtn(rnaVis: RNAVis, anim: Animation): void {
    const animBtn = document.getElementById('animate-button');
    const duration = document.getElementById('duration') as HTMLInputElement;
    if (animBtn) {
        let removed = false;
        animBtn.onclick = (event) => {
            const visRec = anim.getActiveContainers()
            .map(cont => {
                const unMappable = cont.getUnmappableResidues();
                const to = unMappable.map(res => !res.isVisible());
                return new VisibilityRecord(unMappable, to);
            });
            const visAnim = new VisibilityAnim(visRec);
            const interval = 300;

            if (removed) {
                anim.animate(rnaVis, +duration.value, () => {
                    visAnim.animate(rnaVis, interval);
                    anim.reverse();
                    removed = !removed;
                });
            } else {
                visAnim.animate(rnaVis, interval, () => {
                    anim.animate(rnaVis, +duration.value, () => {
                        anim.reverse();
                        removed = !removed;
                    });
                });
            }
        }
    }
}

export function addAnimRange(rnaVis: RNAVis, anim: Animation): void {
    const range = document.getElementById('anim-range');
    if (range) {
        range.onchange = (event) => {
            const value = +(event.target as HTMLInputElement).value;
            anim.do(value);
            rnaVis.draw();
        };
    }
}

export function addAlpha(rnaVis: RNAVis): void {
    const bla = document.getElementById('alpha-value');
    if (bla) {
        bla.onchange = (event) => {
            const value = +(event.target as HTMLInputElement).value;
            console.log(value);
            rnaVis.setAlpha(value);
            rnaVis.draw();
        };
    }
}

