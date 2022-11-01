import './style.css';
import { RNAVis, RNAData, animation } from 'rna-visualizer';
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
const svgSpace = document.getElementById('svg-space');
for (let i = 0; i < data.length ; ++i) { 
    break;
    const p = document.createElement('p')
    p.innerText = dataPath[i];
    svgSpace.append(p);
    const rnaVis = new RNAVis(svgSpace, data[i]);
    //rnaVis.addTemplate(template4);
    rnaVis.addZoom();
    rnaVis.addHoverLabel();
    rnaVis.draw();
}
const rnaVisT = new RNAVis(svgSpace, template05);
rnaVisT.addZoom();
rnaVisT.draw();

const rnaVis = new RNAVis(svgSpace, data[4]);
rnaVis.addTemplate(template05);
rnaVis.addZoom();
rnaVis.addHoverLabel();
rnaVis.draw();

const btn = document.createElement('button');
btn.innerHTML = 'Animate';
svgSpace.append(btn);
btn.onclick = () => {
    animation(rnaVis);
}

