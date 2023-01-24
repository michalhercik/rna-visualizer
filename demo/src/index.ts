import './style.css';
import { RNAVis, RNAData, animation, createGroups } from 'rna-visualizer';
import data01 from '../example_data/json/mouse_from_human.colored.json';
import data02 from '../example_data/json/URS000075EC78_9606-HS_LSU_3D.json';
import data03 from '../example_data/json/add_bp_to_stem.json';
import data04 from '../example_data/json/URS000000C6FF_36873-d.16.b.Burkholderia.sp.json';
import data05 from '../example_data/json/URS00000B9D9D_471852-d.5.b.A.madurae.json';
import data06 from '../example_data/json/J01436.1456.1522.json';
import data07 from '../example_data/json/URS00000AA4F3_76731-d.16.b.Burkholderia.sp.json';
import data08 from '../example_data/json/URS000075EC78_9606-HS_LSU_3D.json';
import data09 from '../example_data/json/URS00008E3949_44689-DD_28S_3D.json';
import data10 from '../example_data/json/Oceanobacillus_iheyensis-EC_SSU_3D.json';
import data11 from '../example_data/json/URS00000B14F2_575540-d.5.b.P.brasiliensis.json';
import data12 from '../example_data/json/URS000080E357_9606-mHS_LSU_3D.json';
import data13 from '../example_data/json/URS0000000306_562.json';
import data14 from '../example_data/json/URS00000B1E10_489619-d.16.b.B.japonicum.json';

import template01 from '../example_data/template/human_from_human.colored.json';
import template0208 from '../example_data/template/HS_LSU_3D_fromn_HS_LSU_3D.colored.json';
import template0407 from '../example_data/template/d.16.b.Burkholderia.sp_fromn_d.16.b.Burkholderia.sp.colored.json';
import template05 from '../example_data/template/d.5.b.A.madurae_fromn_d.5.b.A.madurae.colored.json';
import template09 from '../example_data/template/DD_28S_3D_fromn_DD_28S_3D.colored.json';
import template10 from '../example_data/template/EC_SSU_3D_fromn_EC_SSU_3D.colored.json';
import template11 from '../example_data/template/d.5.b.P.brasiliensis_fromn_d.5.b.P.brasiliensis.colored.json';
import template12 from '../example_data/template/mHS_LSU_3D_fromn_mHS_LSU_3D.colored.json';
import template14 from '../example_data/template/d.16.b.B.japonicum_fromn_d.16.b.B.japonicum.colored.json';

const data: RNAData[] = [
    data01, 
    data02, 
    data03, 
    data04, 
    data05, 
    data06, 
    data07, 
    data08, 
    data09, 
    data10, 
    data11, 
    data12, 
    data13, 
    data14 
];
const dataPath = [
    'mouse_from_human.colored.json',
    'URS000075EC78_9606-HS_LSU_3D.json',
    'add_bp_to_stem.json',
    'URS000000C6FF_36873-d.16.b.Burkholderia.sp.json',
    'URS00000B9D9D_471852-d.5.b.A.madurae.json',
    'J01436.1456.1522.json',
    'URS00000AA4F3_76731-d.16.b.Burkholderia.sp.json',
    'URS000075EC78_9606-HS_LSU_3D.json',
    'URS00008E3949_44689-DD_28S_3D.json',
    'Oceanobacillus_iheyensis-EC_SSU_3D.json',
    'URS00000B14F2_575540-d.5.b.P.brasiliensis.json',
    'URS000080E357_9606-mHS_LSU_3D.json',
    'URS0000000306_562.json',
    'URS00000B1E10_489619-d.16.b.B.japonicum.json'
]
const layers = document.getElementById('layers-canvas');
const controls = document.getElementById('controls');
const visibility = document.getElementById('visibility');
const resetBtn = document.getElementById('reset-pos');
const groups = document.getElementById('groups');

// Canvas
const rnaVis = new RNAVis(layers);
rnaVis.addData(template0407, 'template');
rnaVis.addData(data[3], dataPath[3]);
rnaVis.addData(data[6], dataPath[6]);
rnaVis.addZoom();
// rnaVis.addHoverLabel();
rnaVis.addClickAlign();
rnaVis.draw();

resetBtn.addEventListener('click', (event) => {
    rnaVis.resetPositions();
    rnaVis.draw();
})

// Visibility
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

// Aligning

const minGroupSize = 20;
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

let input = document.createElement('input');
input.setAttribute('type', 'text');
input.setAttribute('id', 'align-group');
controls.append(input);

let btn = document.createElement('button');
btn.innerHTML = 'align';
controls.append(btn);
btn.onclick = () => {
    let group = +(document.getElementById('align-group') as HTMLInputElement).value;
    rnaVis.align(group, minGroupSize);
    rnaVis.draw();
}


// const rnaVis = new RNAVis(svgSpace, data[4]);
// rnaVis.addTemplate(template05);
// rnaVis.addZoom();
// rnaVis.addHoverLabel();
// rnaVis.draw();

// const btn = document.createElement('button');
// btn.innerHTML = 'Animate';
// svgSpace.append(btn);
// btn.onclick = () => {
//     animation(rnaVis);
// }

