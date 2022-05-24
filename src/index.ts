import './style.css';
import { RNAVis } from './rnavis';
import { RNAData } from './interfaces';
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
    const p = document.createElement('p')
    p.innerText = dataPath[i];
    svgSpace.append(p);
    const rnaVis = new RNAVis(svgSpace, data[i]);
    rnaVis.draw();
}

