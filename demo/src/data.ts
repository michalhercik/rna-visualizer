import { IRnaInput } from 'rna-visualizer';

import data04 from '../example_data/json/URS000000C6FF_36873-d.16.b.Burkholderia.sp.json';
import data07 from '../example_data/json/URS00000AA4F3_76731-d.16.b.Burkholderia.sp.json';
import data05 from '../example_data/json/URS00000B9D9D_471852-d.5.b.A.madurae.json';

import template0407 from '../example_data/template/d.16.b.Burkholderia.sp_fromn_d.16.b.Burkholderia.sp.colored.json';
import template05 from '../example_data/template/d.5.b.A.madurae_fromn_d.5.b.A.madurae.colored.json';

// import ruber from '../example_data/data/json/a.16.c.C.ruber-a.16.c.C.ruber.colored.json';
// import ruber01 from '../example_data/data/json/URS00002E7035-a.16.c.C.ruber.colored.json';
// import ruber02 from '../example_data/data/json/URS0000380FEA-a.16.c.C.ruber.colored.json';
// import ruber03 from '../example_data/data/json/URS0000392402-a.16.c.C.ruber.colored.json';
// import ruber04 from '../example_data/data/json/URS00003F965A-a.16.c.C.ruber.colored.json';
// import ruber05 from '../example_data/data/json/URS0000458E34-a.16.c.C.ruber.colored.json';
// import ruber06 from '../example_data/data/json/URS00015E33A0-a.16.c.C.ruber.colored.json';
// import ruber07 from '../example_data/data/json/URS00022921C0-a.16.c.C.ruber.colored.json';

import falciparum01 from '../example_data/data/json/d.16.e.P.falciparum.S-d.16.e.P.falciparum.S.colored.json';
import falciparum02 from '../example_data/data/json/URS00001CD9C1-d.16.e.P.falciparum.S.colored.json';
import falciparum03 from '../example_data/data/json/URS000083EEC8-d.16.e.P.falciparum.S.colored.json';
import falciparum04 from '../example_data/data/json/URS00008C69E7-d.16.e.P.falciparum.S.colored.json';
import falciparum05 from '../example_data/data/json/URS00008C9253-d.16.e.P.falciparum.S.colored.json';
import falciparum06 from '../example_data/data/json/URS00008CD9C3-d.16.e.P.falciparum.S.colored.json';
import falciparum07 from '../example_data/data/json/URS00008CF1A3-d.16.e.P.falciparum.S.colored.json';
import falciparum08 from '../example_data/data/json/URS00008CF319-d.16.e.P.falciparum.S.colored.json';
import falciparum09 from '../example_data/data/json/URS00009CCACB-d.16.e.P.falciparum.S.colored.json';
import falciparum10 from '../example_data/data/json/URS00009D62DE-d.16.e.P.falciparum.S.colored.json';
import falciparum11 from '../example_data/data/json/URS00009E5F99-d.16.e.P.falciparum.S.colored.json';
import falciparum12 from '../example_data/data/json/URS0000A13402-d.16.e.P.falciparum.S.colored.json';
import falciparum13 from '../example_data/data/json/URS0000A2A05C-d.16.e.P.falciparum.S.colored.json';
import falciparum14 from '../example_data/data/json/URS0000A6B241-d.16.e.P.falciparum.S.colored.json';
import falciparum15 from '../example_data/data/json/URS0000BFA975-d.16.e.P.falciparum.S.colored.json';
import falciparum16 from '../example_data/data/json/URS0000C6A379-d.16.e.P.falciparum.S.colored.json';
import falciparum17 from '../example_data/data/json/URS0000CE8C9B-d.16.e.P.falciparum.S.colored.json';
import falciparum18 from '../example_data/data/json/URS0000D14FF8-d.16.e.P.falciparum.S.colored.json';
import falciparum19 from '../example_data/data/json/URS0000D3965E-d.16.e.P.falciparum.S.colored.json';
import falciparum20 from '../example_data/data/json/URS0000D4B3B8-d.16.e.P.falciparum.S.colored.json';

// import gougerotii01 from '../example_data/data/json/d.16.b.S.gougerotii-d.16.b.S.gougerotii.colored.json';
// import gougerotii02 from '../example_data/data/json/URS0000026F6E-d.16.b.S.gougerotii.colored.json';
// import gougerotii03 from '../example_data/data/json/URS000004A608-d.16.b.S.gougerotii.colored.json';
// import gougerotii04 from '../example_data/data/json/URS0000091657-d.16.b.S.gougerotii.colored.json';
// import gougerotii05 from '../example_data/data/json/URS0000104FCD-d.16.b.S.gougerotii.colored.json';
// import gougerotii06 from '../example_data/data/json/URS000017D656-d.16.b.S.gougerotii.colored.json';
// import gougerotii07 from '../example_data/data/json/URS00001CA094-d.16.b.S.gougerotii.colored.json';
// import gougerotii08 from '../example_data/data/json/URS00001D5A8E-d.16.b.S.gougerotii.colored.json';
// import gougerotii09 from '../example_data/data/json/URS000020FD4E-d.16.b.S.gougerotii.colored.json';
// import gougerotii10 from '../example_data/data/json/URS00002137C2-d.16.b.S.gougerotii.colored.json';
// import gougerotii11 from '../example_data/data/json/URS000025D9DF-d.16.b.S.gougerotii.colored.json';
// import gougerotii12 from '../example_data/data/json/URS00002A6A2E-d.16.b.S.gougerotii.colored.json';
// import gougerotii13 from '../example_data/data/json/URS0000301CCE-d.16.b.S.gougerotii.colored.json';
// import gougerotii14 from '../example_data/data/json/URS0000348B44-d.16.b.S.gougerotii.colored.json';
// import gougerotii15 from '../example_data/data/json/URS000035B9D8-d.16.b.S.gougerotii.colored.json';
// import gougerotii16 from '../example_data/data/json/URS000049CCC7-d.16.b.S.gougerotii.colored.json';
// import gougerotii17 from '../example_data/data/json/URS00004D2571-d.16.b.S.gougerotii.colored.json';
// import gougerotii18 from '../example_data/data/json/URS000051E3E8-d.16.b.S.gougerotii.colored.json';
// import gougerotii19 from '../example_data/data/json/URS0001AABA1F-d.16.b.S.gougerotii.colored.json';

import thermus01 from '../example_data/data/json/d.5.b.Thermus.sp-d.5.b.Thermus.sp.colored.json';
import thermus02 from '../example_data/data/json/URS000005A630-d.5.b.Thermus.sp.colored.json';
import thermus03 from '../example_data/data/json/URS00004ED16E-d.5.b.Thermus.sp.colored.json';
import thermus04 from '../example_data/data/json/URS000068C454-d.5.b.Thermus.sp.colored.json';
import thermus05 from '../example_data/data/json/URS00006EAB99-d.5.b.Thermus.sp.colored.json';
import thermus06 from '../example_data/data/json/URS0000ABE1C9-d.5.b.Thermus.sp.colored.json';
import thermus07 from '../example_data/data/json/URS0000AD1532-d.5.b.Thermus.sp.colored.json';
import thermus08 from '../example_data/data/json/URS0000B1A7E7-d.5.b.Thermus.sp.colored.json';
import thermus09 from '../example_data/data/json/URS00007AB7B5-d.5.b.Thermus.sp.colored.json';
import thermus10 from '../example_data/data/json/URS0000C22F13-d.5.b.Thermus.sp.colored.json';
import thermus11 from '../example_data/data/json/URS0000C9B48E-d.5.b.Thermus.sp.colored.json';
import thermus12 from '../example_data/data/json/URS0000C9F910-d.5.b.Thermus.sp.colored.json';
import thermus13 from '../example_data/data/json/URS0000CB0232-d.5.b.Thermus.sp.colored.json';
import thermus14 from '../example_data/data/json/URS0000D05C6D-d.5.b.Thermus.sp.colored.json';
import thermus15 from '../example_data/data/json/URS0000D21169-d.5.b.Thermus.sp.colored.json';
import thermus16 from '../example_data/data/json/URS0000D41711-d.5.b.Thermus.sp.colored.json';
import thermus17 from '../example_data/data/json/URS0000D8A7A4-d.5.b.Thermus.sp.colored.json';
import thermus18 from '../example_data/data/json/URS0000E500C5-d.5.b.Thermus.sp.colored.json';
import thermus19 from '../example_data/data/json/URS0000E55277-d.5.b.Thermus.sp.colored.json';
import thermus20 from '../example_data/data/json/URS0000E5E56E-d.5.b.Thermus.sp.colored.json';

import oshimae01 from '../example_data/data/json/d.5.e.S.oshimae-d.5.e.S.oshimae.colored.json';
import oshimae02 from '../example_data/data/json/URS0000403DBD-d.5.e.S.oshimae.colored.json';
import oshimae03 from '../example_data/data/json/URS0000654472-d.5.e.S.oshimae.colored.json';
import oshimae04 from '../example_data/data/json/URS00006B114F-d.5.e.S.oshimae.colored.json';
import oshimae05 from '../example_data/data/json/URS00006B436E-d.5.e.S.oshimae.colored.json';
import oshimae06 from '../example_data/data/json/URS00006B5635-d.5.e.S.oshimae.colored.json';
import oshimae07 from '../example_data/data/json/URS00006D5E7C-d.5.e.S.oshimae.colored.json';
import oshimae08 from '../example_data/data/json/URS00006E712C-d.5.e.S.oshimae.colored.json';
import oshimae09 from '../example_data/data/json/URS00006EC74F-d.5.e.S.oshimae.colored.json';
import oshimae10 from '../example_data/data/json/URS0000AB09C9-d.5.e.S.oshimae.colored.json';
import oshimae11 from '../example_data/data/json/URS0000BF71BC-d.5.e.S.oshimae.colored.json';
import oshimae12 from '../example_data/data/json/URS0000C0CBA2-d.5.e.S.oshimae.colored.json';
import oshimae13 from '../example_data/data/json/URS0000C1EF24-d.5.e.S.oshimae.colored.json';
import oshimae14 from '../example_data/data/json/URS0000C23F6A-d.5.e.S.oshimae.colored.json';
import oshimae15 from '../example_data/data/json/URS0000C2EF6F-d.5.e.S.oshimae.colored.json';
import oshimae16 from '../example_data/data/json/URS0000C5427B-d.5.e.S.oshimae.colored.json';
import oshimae17 from '../example_data/data/json/URS0000C65D11-d.5.e.S.oshimae.colored.json';
import oshimae18 from '../example_data/data/json/URS0000C846BF-d.5.e.S.oshimae.colored.json';
import oshimae19 from '../example_data/data/json/URS0000C868E8-d.5.e.S.oshimae.colored.json';
import oshimae20 from '../example_data/data/json/URS0000E63262-d.5.e.S.oshimae.colored.json';

import DD_28S_3D01 from '../example_data/data/json/DD_28S_3D-DD_28S_3D.colored.json';
import DD_28S_3D02 from '../example_data/data/json/URS000005676D-DD_28S_3D.colored.json';
import DD_28S_3D03 from '../example_data/data/json/URS00002D5F33-DD_28S_3D.colored.json';
import DD_28S_3D04 from '../example_data/data/json/URS000036FFBE-DD_28S_3D.colored.json';
import DD_28S_3D05 from '../example_data/data/json/URS00003D618F-DD_28S_3D.colored.json';
import DD_28S_3D06 from '../example_data/data/json/URS0000414A13-DD_28S_3D.colored.json';
import DD_28S_3D07 from '../example_data/data/json/URS000045F92C-DD_28S_3D.colored.json';
import DD_28S_3D08 from '../example_data/data/json/URS00004D4E11-DD_28S_3D.colored.json';
import DD_28S_3D09 from '../example_data/data/json/URS00005CEC3B-DD_28S_3D.colored.json';
import DD_28S_3D10 from '../example_data/data/json/URS00006089EF-DD_28S_3D.colored.json';
import DD_28S_3D11 from '../example_data/data/json/URS00008DF80A-DD_28S_3D.colored.json';
import DD_28S_3D12 from '../example_data/data/json/URS00009ABD9D-DD_28S_3D.colored.json';
import DD_28S_3D13 from '../example_data/data/json/URS00009E85E3-DD_28S_3D.colored.json';
import DD_28S_3D14 from '../example_data/data/json/URS0000A36D28-DD_28S_3D.colored.json';
import DD_28S_3D15 from '../example_data/data/json/URS0000A44108-DD_28S_3D.colored.json';
import DD_28S_3D16 from '../example_data/data/json/URS0000A5DA85-DD_28S_3D.colored.json';
import DD_28S_3D17 from '../example_data/data/json/URS0000A6356D-DD_28S_3D.colored.json';
import DD_28S_3D18 from '../example_data/data/json/URS0000C3373F-DD_28S_3D.colored.json';
                
import DM_LSU_3D01 from '../example_data/data/json/DM_LSU_3D-DM_LSU_3D.colored.json';
import DM_LSU_3D02 from '../example_data/data/json/URS00000462D8-DM_LSU_3D.colored.json';
import DM_LSU_3D03 from '../example_data/data/json/URS00000BBC93-DM_LSU_3D.colored.json';
import DM_LSU_3D04 from '../example_data/data/json/URS000037A62A-DM_LSU_3D.colored.json';
import DM_LSU_3D05 from '../example_data/data/json/URS0000463172-DM_LSU_3D.colored.json';
import DM_LSU_3D06 from '../example_data/data/json/URS00004E6E13-DM_LSU_3D.colored.json';
import DM_LSU_3D07 from '../example_data/data/json/URS000052FC62-DM_LSU_3D.colored.json';
import DM_LSU_3D08 from '../example_data/data/json/URS0000560E2A-DM_LSU_3D.colored.json';
import DM_LSU_3D09 from '../example_data/data/json/URS000056E490-DM_LSU_3D.colored.json';
import DM_LSU_3D10 from '../example_data/data/json/URS000068AF33-DM_LSU_3D.colored.json';
import DM_LSU_3D11 from '../example_data/data/json/URS0000785F3E-DM_LSU_3D.colored.json';
import DM_LSU_3D12 from '../example_data/data/json/URS00007CBC0A-DM_LSU_3D.colored.json';
import DM_LSU_3D13 from '../example_data/data/json/URS00008D7355-DM_LSU_3D.colored.json';
import DM_LSU_3D14 from '../example_data/data/json/URS00009FEFB5-DM_LSU_3D.colored.json';
import DM_LSU_3D15 from '../example_data/data/json/URS0000A2E11F-DM_LSU_3D.colored.json';
import DM_LSU_3D16 from '../example_data/data/json/URS0000A50F39-DM_LSU_3D.colored.json';
import DM_LSU_3D17 from '../example_data/data/json/URS0000A5351F-DM_LSU_3D.colored.json';
import DM_LSU_3D18 from '../example_data/data/json/URS0000ABF3A0-DM_LSU_3D.colored.json';
import DM_LSU_3D19 from '../example_data/data/json/URS0000B8B9A1-DM_LSU_3D.colored.json';
import DM_LSU_3D20 from '../example_data/data/json/URS0000D721AC-DM_LSU_3D.colored.json';

export class Data {
    name: string;
    structure: IRnaInput;

    constructor(name: string, structure: IRnaInput) {
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
        new Data('d.5.b.A.madurae (2)', template05),
        [
            new Data('URS00000B9D9D_471852', data05)
        ]
    ),
    new DataBundle(
        new Data('d.16.b.Burkholderia.sp (3)', template0407),
        [
            new Data('URS000000C6FF_36873', data04),
            new Data('URS00000AA4F3_76731', data07)
        ]
    ),
    new DataBundle(
        new Data('d.5.b.Thermus.sp (20)', thermus01),
        [
            new Data('URS000005A630', thermus02),
            new Data('URS00004ED16E', thermus03),
            new Data('URS000068C454', thermus04),
            new Data('URS00006EAB99', thermus05),
            new Data('URS0000ABE1C9', thermus06),
            new Data('URS0000AD1532', thermus07),
            new Data('URS0000B1A7E7', thermus08),
            new Data('URS00007AB7B5', thermus09),
            new Data('URS0000C22F13', thermus10),
            new Data('URS0000C9B48E', thermus11),
            new Data('URS0000C9F910', thermus12),
            new Data('URS0000CB0232', thermus13),
            new Data('URS0000D05C6D', thermus14),
            new Data('URS0000D21169', thermus15),
            new Data('URS0000D41711', thermus16),
            new Data('URS0000D8A7A4', thermus17),
            new Data('URS0000E500C5', thermus18),
            new Data('URS0000E55277', thermus19),
            new Data('URS0000E5E56E', thermus20),
        ]
    ),
    new DataBundle(
        new Data('d.5.e.S.oshimae (20)', oshimae01),
        [
            new Data('URS0000403DBD', oshimae02),
            new Data('URS0000654472', oshimae03),
            new Data('URS00006B114F', oshimae04),
            new Data('URS00006B436E', oshimae05),
            new Data('URS00006B5635', oshimae06),
            new Data('URS00006D5E7C', oshimae07),
            new Data('URS00006E712C', oshimae08),
            new Data('URS00006EC74F', oshimae09),
            new Data('URS0000AB09C9', oshimae10),
            new Data('URS0000BF71BC', oshimae11),
            new Data('URS0000C0CBA2', oshimae12),
            new Data('URS0000C1EF24', oshimae13),
            new Data('URS0000C23F6A', oshimae14),
            new Data('URS0000C2EF6F', oshimae15),
            new Data('URS0000C5427B', oshimae16),
            new Data('URS0000C65D11', oshimae17),
            new Data('URS0000C846BF', oshimae18),
            new Data('URS0000C868E8', oshimae19),
            new Data('URS0000E63262', oshimae20),
        ]
    ),
    new DataBundle(
        new Data('DD_28S_3D (18)', DD_28S_3D01),
        [
            new Data('URS000005676D', DD_28S_3D02),
            new Data('URS00002D5F33', DD_28S_3D03),
            new Data('URS000036FFBE', DD_28S_3D04),
            new Data('URS00003D618F', DD_28S_3D05),
            new Data('URS0000414A13', DD_28S_3D06),
            new Data('URS000045F92C', DD_28S_3D07),
            new Data('URS00004D4E11', DD_28S_3D08),
            new Data('URS00005CEC3B', DD_28S_3D09),
            new Data('URS00006089EF', DD_28S_3D10),
            new Data('URS00008DF80A', DD_28S_3D11),
            new Data('URS00009ABD9D', DD_28S_3D12),
            new Data('URS00009E85E3', DD_28S_3D13),
            new Data('URS0000A36D28', DD_28S_3D14),
            new Data('URS0000A44108', DD_28S_3D15),
            new Data('URS0000A5DA85', DD_28S_3D16),
            new Data('URS0000A6356D', DD_28S_3D17),
            new Data('URS0000C3373F', DD_28S_3D18),
        ]
    ),
    new DataBundle(
        new Data('DM_LSU_3D (20)', DM_LSU_3D01),
        [
            new Data('URS00000462D8', DM_LSU_3D02),
            new Data('URS00000BBC93', DM_LSU_3D03),
            new Data('URS000037A62A', DM_LSU_3D04),
            new Data('URS0000463172', DM_LSU_3D05),
            new Data('URS00004E6E13', DM_LSU_3D06),
            new Data('URS000052FC62', DM_LSU_3D07),
            new Data('URS0000560E2A', DM_LSU_3D08),
            new Data('URS000056E490', DM_LSU_3D09),
            new Data('URS000068AF33', DM_LSU_3D10),
            new Data('URS0000785F3E', DM_LSU_3D11),
            new Data('URS00007CBC0A', DM_LSU_3D12),
            new Data('URS00008D7355', DM_LSU_3D13),
            new Data('URS00009FEFB5', DM_LSU_3D14),
            new Data('URS0000A2E11F', DM_LSU_3D15),
            new Data('URS0000A50F39', DM_LSU_3D16),
            new Data('URS0000A5351F', DM_LSU_3D17),
            new Data('URS0000ABF3A0', DM_LSU_3D18),
            new Data('URS0000B8B9A1', DM_LSU_3D19),
            new Data('URS0000D721AC', DM_LSU_3D20),
        ]
    ),
    // new DataBundle(
    //     new Data('d.16.e.P.falciparum.S (20)', falciparum01),
    //     [
    //         new Data('URS00001CD9C1', falciparum02),
    //         new Data('URS000083EEC8', falciparum03),
    //         new Data('URS00008C69E7', falciparum04),
    //         new Data('URS00008C9253', falciparum05),
    //         new Data('URS00008CD9C3', falciparum06),
    //         new Data('URS00008CF1A3', falciparum07),
    //         new Data('URS00008CF319', falciparum08),
    //         new Data('URS00009CCACB', falciparum09),
    //         new Data('URS00009D62DE', falciparum10),
    //         new Data('URS00009E5F99', falciparum11),
    //         new Data('URS0000A13402', falciparum12),
    //         new Data('URS0000A2A05C', falciparum13),
    //         new Data('URS0000A6B241', falciparum14),
    //         new Data('URS0000BFA975', falciparum15),
    //         new Data('URS0000C6A379', falciparum16),
    //         new Data('URS0000CE8C9B', falciparum17),
    //         new Data('URS0000D14FF8', falciparum18),
    //         new Data('URS0000D3965E', falciparum19),
    //         new Data('URS0000D4B3B8', falciparum20),
    //     ]
    // ),
    // new DataBundle(
    //     new Data('d.16.b.S.gougerotii (19)', gougerotii01),
    //     [
    //         new Data('URS0000026F6E', gougerotii02),
    //         new Data('URS000004A608', gougerotii03),
    //         new Data('URS0000091657', gougerotii04),
    //         new Data('URS0000104FCD', gougerotii05),
    //         new Data('URS000017D656', gougerotii06),
    //         new Data('URS00001CA094', gougerotii07),
    //         new Data('URS00001D5A8E', gougerotii08),
    //         new Data('URS000020FD4E', gougerotii09),
    //         new Data('URS00002137C2', gougerotii10),
    //         new Data('URS000025D9DF', gougerotii11),
    //         new Data('URS00002A6A2E', gougerotii12),
    //         new Data('URS0000301CCE', gougerotii13),
    //         new Data('URS0000348B44', gougerotii14),
    //         new Data('URS000035B9D8', gougerotii15),
    //         new Data('URS000049CCC7', gougerotii16),
    //         new Data('URS00004D2571', gougerotii17),
    //         new Data('URS000051E3E8', gougerotii18),
    //         new Data('URS0001AABA1F', gougerotii19),
    //     ]
    // ),
    // new DataBundle(
    //     new Data('ruber', ruber),
    //     [
    //         new Data('URS00002E7035', ruber01),
    //         new Data('URS0000380FEA', ruber02),
    //         new Data('URS0000392402', ruber03),
    //         new Data('URS00003F965A', ruber04),
    //         new Data('URS0000458E34', ruber05),
    //         new Data('URS00015E33A0', ruber06),
    //         new Data('URS00022921C0', ruber07),
    //     ]
    // ),
];
