import { RNAData } from 'rna-visualizer';

import data01 from '../example_data/json/mouse_from_human.colored.json';
import data02 from '../example_data/json/URS000075EC78_9606-HS_LSU_3D.json';
import data03 from '../example_data/json/add_bp_to_stem.json';
import data04 from '../example_data/json/URS000000C6FF_36873-d.16.b.Burkholderia.sp.json';
import data05 from '../example_data/json/URS00000B9D9D_471852-d.5.b.A.madurae.json';
import data06 from '../example_data/json/J01436.1456.1522.json';
import data07 from '../example_data/json/URS00000AA4F3_76731-d.16.b.Burkholderia.sp.json';
import data09 from '../example_data/json/URS00008E3949_44689-DD_28S_3D.json';
import data10 from '../example_data/json/Oceanobacillus_iheyensis-EC_SSU_3D.json';
import data11 from '../example_data/json/URS00000B14F2_575540-d.5.b.P.brasiliensis.json';
import data12 from '../example_data/json/URS000080E357_9606-mHS_LSU_3D.json';
import data13 from '../example_data/json/URS0000000306_562.json';
import data14 from '../example_data/json/URS00000B1E10_489619-d.16.b.B.japonicum.json';

import template01 from '../example_data/template/human_from_human.colored.json';
import template02 from '../example_data/template/HS_LSU_3D_fromn_HS_LSU_3D.colored.json';
import template0407 from '../example_data/template/d.16.b.Burkholderia.sp_fromn_d.16.b.Burkholderia.sp.colored.json';
import template05 from '../example_data/template/d.5.b.A.madurae_fromn_d.5.b.A.madurae.colored.json';
import template09 from '../example_data/template/DD_28S_3D_fromn_DD_28S_3D.colored.json';
import template10 from '../example_data/template/EC_SSU_3D_fromn_EC_SSU_3D.colored.json';
import template11 from '../example_data/template/d.5.b.P.brasiliensis_fromn_d.5.b.P.brasiliensis.colored.json';
import template12 from '../example_data/template/mHS_LSU_3D_fromn_mHS_LSU_3D.colored.json';
import template14 from '../example_data/template/d.16.b.B.japonicum_fromn_d.16.b.B.japonicum.colored.json';

import dataa from '../example_data/results/json/URS000063A153_9606,-d.5.e.N.viridescens.colored.json';
import datab from '../example_data/results/json/URS0000647CE7_9606,-d.5.e.I.iguana.colored.json';
import datac from '../example_data/results/json/URS0000652AF6_9606,-d.5.e.B.taurus.colored.json';
import datad from '../example_data/results/json/URS000066550E_9606,-d.5.e.I.iguana.colored.json';
import datae from '../example_data/results/json/URS000068DF33_9606,-d.5.e.B.taurus.colored.json';
import dataf from '../example_data/results/json/URS000068E89F_9606,-d.5.e.N.viridescens.colored.json';
import datag from '../example_data/results/json/URS00006B0282_9606,-d.5.e.P.waltl.colored.json';
import datah from '../example_data/results/json/URS00006BC741_9606,-d.5.e.B.taurus.colored.json';
import datai from '../example_data/results/json/URS00006C8E20_9606,-d.5.e.I.iguana.colored.json';
import dataj from '../example_data/results/json/URS00006E1E4D_9606,-d.5.e.P.waltl.colored.json';
import datak from '../example_data/results/json/URS00007005F1_9606,-d.5.e.B.taurus.colored.json';
import datal from '../example_data/results/json/URS0000700884_9606,-d.5.e.P.waltl.colored.json';
import datam from '../example_data/results/json/URS0000701843_9606,-d.5.e.I.iguana.colored.json';
import datan from '../example_data/results/json/URS000072BE72_9606,-d.5.e.I.iguana.colored.json';

export class Data {
    name: string;
    structure: RNAData;

    constructor(name: string, structure: RNAData) {
        this.name = name;
        this.structure = structure;
    }
}

export class DataBundle {
    template: Data;
    data: Data[];

    constructor(template: Data, data: Data[]) {
        this.template = template;
        this.data = data;
    }
}

export const data: DataBundle[] = [
    new DataBundle(
        new Data('d.5.b.A.madurae', template05),
        [
            new Data('URS00000B9D9D_471852', data05)
        ]
    ),
    new DataBundle(
        new Data('d.16.b.Burkholderia.sp', template0407),
        [
            new Data('URS000000C6FF_36873', data04),
            new Data('URS00000AA4F3_76731', data07)
        ]
    ),
    new DataBundle(
        new Data('HS_LSU_3D', template02),
        [
            new Data('URS000075EC78_9606', data02)
        ]
    ),
];

