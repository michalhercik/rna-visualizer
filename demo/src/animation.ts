import { RNAVis, RNAData, remove, add, Animation, AnimationState, animate, createGroups } from 'rna-visualizer';
import {data} from './data';
import * as d3 from 'd3';

export function animBtn(rnaVis: RNAVis) {
    const animBtn = document.getElementById('animate-button');
    if (animBtn) {
        const duration = 1500;
        let removed = false;
        let cont = rnaVis.getDataContainers()
        let targets: AnimationState[] = [];
        console.log(cont);
        for (let i = 1; i < cont.length; ++i) {
            targets.push(AnimationState.fromTemplate(cont[i], cont[0]));
        }
        const anim = new Animation(cont.slice(1), targets, duration);
        anim.reverse();
        animBtn.onclick = (event) => {
            if (!removed) {
                anim.container.forEach(remove);
                rnaVis.draw();
            }

            animate(anim, rnaVis);

            if (removed) {
                anim.container.forEach(add);
                rnaVis.draw();
            }

            anim.reverse();
            removed = !removed;
        }
    }
}

