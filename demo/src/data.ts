import { RNAData } from 'rna-visualizer';

import data04 from '../example_data/json/URS000000C6FF_36873-d.16.b.Burkholderia.sp.json';
import data07 from '../example_data/json/URS00000AA4F3_76731-d.16.b.Burkholderia.sp.json';
import data05 from '../example_data/json/URS00000B9D9D_471852-d.5.b.A.madurae.json';

import template0407 from '../example_data/template/d.16.b.Burkholderia.sp_fromn_d.16.b.Burkholderia.sp.colored.json';
import template05 from '../example_data/template/d.5.b.A.madurae_fromn_d.5.b.A.madurae.colored.json';

import ruber from '../example_data/data/json/a.16.c.C.ruber-a.16.c.C.ruber.colored.json';
import ruber1 from '../example_data/data/json/URS00002E7035-a.16.c.C.ruber.colored.json';
import ruber2 from '../example_data/data/json/URS0000380FEA-a.16.c.C.ruber.colored.json';
import ruber3 from '../example_data/data/json/URS0000392402-a.16.c.C.ruber.colored.json';
import ruber4 from '../example_data/data/json/URS00003F965A-a.16.c.C.ruber.colored.json';
import ruber5 from '../example_data/data/json/URS0000458E34-a.16.c.C.ruber.colored.json';
import ruber6 from '../example_data/data/json/URS00015E33A0-a.16.c.C.ruber.colored.json';
import ruber7 from '../example_data/data/json/URS00022921C0-a.16.c.C.ruber.colored.json';

// import from '../example_data/data/json/d.16.b.S.gougerotii-d.16.b.S.gougerotii.colored.json';
// import from '../example_data/data/json/d.16.e.P.falciparum.S-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/d.5.b.Thermus.sp-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/d.5.e.S.oshimae-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/DD_28S_3D-DD_28S_3D.colored.json';
// import from '../example_data/data/json/DM_LSU_3D-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/E-Thr.colored.json';
// import from '../example_data/data/json/EC_SSU_3D-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/HS_LSU_3D-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/LD_SSU_3D-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/mHS_LSU_3D-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/mt_TetT_LSU_3D-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/RF00025-RF00025.colored.json';
// import from '../example_data/data/json/RF02705-RF02705.colored.json';
// import from '../example_data/data/json/RF03163-RF03163.colored.json';
// import from '../example_data/data/json/RF04183-RF04183.colored.json';
// import from '../example_data/data/json/RNAseP_e_H_sapiens_3D-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/TeT_LSU_3D-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/TT_SSU_3D-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0000026F6E-d.16.b.S.gougerotii.colored.json';
// import from '../example_data/data/json/URS000002CE04-RF00025.colored.json';
// import from '../example_data/data/json/URS000002E9EC-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00000462D8-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000048BE7-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS000004A608-d.16.b.S.gougerotii.colored.json';
// import from '../example_data/data/json/URS00000517C8-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS000005676D-DD_28S_3D.colored.json';
// import from '../example_data/data/json/URS000005A630-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/URS0000060E4C-RF00025.colored.json';
// import from '../example_data/data/json/URS0000091657-d.16.b.S.gougerotii.colored.json';
// import from '../example_data/data/json/URS00000B391F-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00000B74A8-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00000BBC93-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00000DD2CE-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00000E7604-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00000F034E-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000104FCD-d.16.b.S.gougerotii.colored.json';
// import from '../example_data/data/json/URS000010C681-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000117E7B-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000012BECF-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000134425-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00001370D7-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0000140699-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00001538C7-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000017D656-d.16.b.S.gougerotii.colored.json';
// import from '../example_data/data/json/URS0000191753-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000019E656-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00001A3D0C-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00001CA094-d.16.b.S.gougerotii.colored.json';
// import from '../example_data/data/json/URS00001CD9C1-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/URS00001D5A8E-d.16.b.S.gougerotii.colored.json';
// import from '../example_data/data/json/URS00001D71BD-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00001E8361-RF00025.colored.json';
// import from '../example_data/data/json/URS00001E8D22-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00001F11FB-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00001FE60A-RF00025.colored.json';
// import from '../example_data/data/json/URS0000203D23-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000020A581-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000020FD4E-d.16.b.S.gougerotii.colored.json';
// import from '../example_data/data/json/URS00002137C2-d.16.b.S.gougerotii.colored.json';
// import from '../example_data/data/json/URS0000246F30-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS000024EC43-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0000256B1C-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS000025D9DF-d.16.b.S.gougerotii.colored.json';
// import from '../example_data/data/json/URS0000263341-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS000026E152-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00002A6A2E-d.16.b.S.gougerotii.colored.json';
// import from '../example_data/data/json/URS00002AAC99-RF04183.colored.json';
// import from '../example_data/data/json/URS00002ADF42-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00002B5B3C-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00002D5F33-DD_28S_3D.colored.json';
// import from '../example_data/data/json/URS00002D6192-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00002DADDA-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00002F7661-RF00025.colored.json';
// import from '../example_data/data/json/URS00002FE0E2-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0000301CCE-d.16.b.S.gougerotii.colored.json';
// import from '../example_data/data/json/URS00003057BB-RF00025.colored.json';
// import from '../example_data/data/json/URS0000324DD6-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0000332695-RF00025.colored.json';
// import from '../example_data/data/json/URS00003356A6-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0000335A16-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000338BF4-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000347605-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000348B44-d.16.b.S.gougerotii.colored.json';
// import from '../example_data/data/json/URS000035B9D8-d.16.b.S.gougerotii.colored.json';
// import from '../example_data/data/json/URS000036FFBE-DD_28S_3D.colored.json';
// import from '../example_data/data/json/URS000037A62A-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00003ADDB5-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00003C76B2-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00003D618F-DD_28S_3D.colored.json';
// import from '../example_data/data/json/URS00003D6490-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00003E07EC-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00003F365C-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00003FABC7-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000402983-RF00025.colored.json';
// import from '../example_data/data/json/URS0000403DBD-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/URS0000410BE4-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000414A13-DD_28S_3D.colored.json';
// import from '../example_data/data/json/URS000042ACE1-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000043124C-RF00025.colored.json';
// import from '../example_data/data/json/URS00004428D7-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000045F92C-DD_28S_3D.colored.json';
// import from '../example_data/data/json/URS00004630D8-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000463172-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000046795C-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000047337A-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000474A27-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00004823F7-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS000049CCC7-d.16.b.S.gougerotii.colored.json';
// import from '../example_data/data/json/URS00004A37BC-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00004B8BB6-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00004D2571-d.16.b.S.gougerotii.colored.json';
// import from '../example_data/data/json/URS00004D4E11-DD_28S_3D.colored.json';
// import from '../example_data/data/json/URS00004D5B0C-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00004DEF2D-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00004E6E13-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00004ED16E-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/URS00004F87E6-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00004FFEA6-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000051AD39-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000051E3E8-d.16.b.S.gougerotii.colored.json';
// import from '../example_data/data/json/URS000052FC62-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000054B419-SL_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000055012E-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0000551F3D-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000560E2A-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000563C4E-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000564747-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000056930B-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000056BE6C-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000056E490-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000574B42-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000058940B-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000593E06-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS000059C7BC-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00005A52BB-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00005C7BBF-RF00025.colored.json';
// import from '../example_data/data/json/URS00005CEC3B-DD_28S_3D.colored.json';
// import from '../example_data/data/json/URS00005CF4B3-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00005DC55A-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00005DFA6D-RF00025.colored.json';
// import from '../example_data/data/json/URS00005E1FFD-RF00025.colored.json';
// import from '../example_data/data/json/URS00005EC8B8-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00005EE272-RF00025.colored.json';
// import from '../example_data/data/json/URS0000600F88-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00006089EF-DD_28S_3D.colored.json';
// import from '../example_data/data/json/URS0000614E3F-E_Thr.colored.json';
// import from '../example_data/data/json/URS0000615B75-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000636654-RF04183.colored.json';
// import from '../example_data/data/json/URS0000643983-RF00025.colored.json';
// import from '../example_data/data/json/URS000064BA33-RF04183.colored.json';
// import from '../example_data/data/json/URS000064E611-RF04183.colored.json';
// import from '../example_data/data/json/URS0000654472-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/URS0000660034-RF04183.colored.json';
// import from '../example_data/data/json/URS000066795E-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/URS0000670005-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/URS0000670798-RF00025.colored.json';
// import from '../example_data/data/json/URS000068AF33-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000068C454-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/URS000069307F-RF04183.colored.json';
// import from '../example_data/data/json/URS0000696E0A-RF00025.colored.json';
// import from '../example_data/data/json/URS00006A1EE2-E_Thr.colored.json';
// import from '../example_data/data/json/URS00006A39F5-RF04183.colored.json';
// import from '../example_data/data/json/URS00006B114F-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/URS00006B436E-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/URS00006B5635-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/URS00006B69E6-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/URS00006B7562-RF04183.colored.json';
// import from '../example_data/data/json/URS00006B7720-RF04183.colored.json';
// import from '../example_data/data/json/URS00006BB22B-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/URS00006C57D8-RF00025.colored.json';
// import from '../example_data/data/json/URS00006CB030-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00006D30A9-RF00025.colored.json';
// import from '../example_data/data/json/URS00006D5E7C-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/URS00006E119D-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00006E712C-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/URS00006EAB99-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/URS00006EB723-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00006EC74F-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/URS00006ECDB1-RF04183.colored.json';
// import from '../example_data/data/json/URS00006F79CA-RF04183.colored.json';
// import from '../example_data/data/json/URS00006F79CF-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00007023F2-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/URS0000762EBD-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0000785F3E-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000078BAD9-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00007AB7B5-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/URS00007B24CE-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00007C0D1A-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00007CBC0A-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00007DA417-RF04183.colored.json';
// import from '../example_data/data/json/URS00007DB894-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00007ED2F7-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000080DE21-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS000080F275-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000815736-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000826356-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS000083E766-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS000083EEC8-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/URS0000863F62-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS000087B236-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0000884E7C-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS000088F085-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00008947D2-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00008C69E7-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/URS00008C9253-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/URS00008CD9C3-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/URS00008CF1A3-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/URS00008CF319-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/URS00008D7355-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00008DF80A-DD_28S_3D.colored.json';
// import from '../example_data/data/json/URS00008EC240-E_Thr.colored.json';
// import from '../example_data/data/json/URS00008ED8FF-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000900BC7-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0000907485-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/URS000090BA6E-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/URS00009102C9-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/URS00009138A3-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0000920DEE-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00009255E7-RF03163.colored.json';
// import from '../example_data/data/json/URS000092F7F4-RF03163.colored.json';
// import from '../example_data/data/json/URS000094B1F2-RF03163.colored.json';
// import from '../example_data/data/json/URS000095196C-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0000952837-RF04183.colored.json';
// import from '../example_data/data/json/URS000095CAFC-RF03163.colored.json';
// import from '../example_data/data/json/URS000096986A-RF03163.colored.json';
// import from '../example_data/data/json/URS000099DC29-RF03163.colored.json';
// import from '../example_data/data/json/URS00009A1FD3-RF03163.colored.json';
// import from '../example_data/data/json/URS00009ABD9D-DD_28S_3D.colored.json';
// import from '../example_data/data/json/URS00009CCACB-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/URS00009CF199-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00009D62DE-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/URS00009DBC85-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00009E167E-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS00009E5F99-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/URS00009E85E3-DD_28S_3D.colored.json';
// import from '../example_data/data/json/URS00009FEFB5-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000A13402-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/URS0000A26C4F-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000A2A05C-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/URS0000A2E11F-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000A35D87-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000A36D28-DD_28S_3D.colored.json';
// import from '../example_data/data/json/URS0000A44108-DD_28S_3D.colored.json';
// import from '../example_data/data/json/URS0000A4ABDE-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000A50F39-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000A5351F-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000A5678D-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0000A5DA85-DD_28S_3D.colored.json';
// import from '../example_data/data/json/URS0000A6356D-DD_28S_3D.colored.json';
// import from '../example_data/data/json/URS0000A6B241-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/URS0000A9C895-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/URS0000AB09C9-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/URS0000ABE1C9-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/URS0000ABF3A0-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000AC2E70-E_Thr.colored.json';
// import from '../example_data/data/json/URS0000AD1532-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/URS0000B16027-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000B1A7E7-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/URS0000B5FE59-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000B806E8-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000B8B9A1-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000BB06BE-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000BC8F67-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/URS0000BD0EA4-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/URS0000BD4AE5-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/URS0000BD5107-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/URS0000BE66A7-E_Thr.colored.json';
// import from '../example_data/data/json/URS0000BF52BC-E_Thr.colored.json';
// import from '../example_data/data/json/URS0000BF71BC-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/URS0000BFA975-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/URS0000BFC2B6-mt_TetT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000C056E2-RF02705.colored.json';
// import from '../example_data/data/json/URS0000C08EAE-RF02705.colored.json';
// import from '../example_data/data/json/URS0000C0CBA2-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/URS0000C0EB10-E_Thr.colored.json';
// import from '../example_data/data/json/URS0000C1CD51-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/URS0000C1EF24-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/URS0000C1F442-RF02705.colored.json';
// import from '../example_data/data/json/URS0000C1FDD6-RF02705.colored.json';
// import from '../example_data/data/json/URS0000C22F13-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/URS0000C23F6A-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/URS0000C24334-E_Thr.colored.json';
// import from '../example_data/data/json/URS0000C2AE2D-RF02705.colored.json';
// import from '../example_data/data/json/URS0000C2EF6F-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/URS0000C31674-RF00025.colored.json';
// import from '../example_data/data/json/URS0000C3373F-DD_28S_3D.colored.json';
// import from '../example_data/data/json/URS0000C3851E-RF02705.colored.json';
// import from '../example_data/data/json/URS0000C38723-RF02705.colored.json';
// import from '../example_data/data/json/URS0000C3BDA3-E_Thr.colored.json';
// import from '../example_data/data/json/URS0000C3C2BC-RF02705.colored.json';
// import from '../example_data/data/json/URS0000C3D017-E_Thr.colored.json';
// import from '../example_data/data/json/URS0000C4273C-RF03163.colored.json';
// import from '../example_data/data/json/URS0000C464A9-E_Thr.colored.json';
// import from '../example_data/data/json/URS0000C49F1F-E_Thr.colored.json';
// import from '../example_data/data/json/URS0000C4B1A9-E_Thr.colored.json';
// import from '../example_data/data/json/URS0000C51716-RF02705.colored.json';
// import from '../example_data/data/json/URS0000C52FF4-RF02705.colored.json';
// import from '../example_data/data/json/URS0000C5427B-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/URS0000C55736-E_Thr.colored.json';
// import from '../example_data/data/json/URS0000C5DE29-RF02705.colored.json';
// import from '../example_data/data/json/URS0000C63E5B-E_Thr.colored.json';
// import from '../example_data/data/json/URS0000C65D11-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/URS0000C66575-RF04183.colored.json';
// import from '../example_data/data/json/URS0000C67720-RF03163.colored.json';
// import from '../example_data/data/json/URS0000C6A379-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/URS0000C6F648-RF02705.colored.json';
// import from '../example_data/data/json/URS0000C70039-RF02705.colored.json';
// import from '../example_data/data/json/URS0000C70D36-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/URS0000C74571-RF02705.colored.json';
// import from '../example_data/data/json/URS0000C760F4-RF02705.colored.json';
// import from '../example_data/data/json/URS0000C787FB-RF03163.colored.json';
// import from '../example_data/data/json/URS0000C79B31-E_Thr.colored.json';
// import from '../example_data/data/json/URS0000C7C315-RF02705.colored.json';
// import from '../example_data/data/json/URS0000C846BF-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/URS0000C862BB-RF02705.colored.json';
// import from '../example_data/data/json/URS0000C868E8-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/URS0000C97638-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000C9B48E-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/URS0000C9F910-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/URS0000CB0232-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/URS0000CBBB71-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000CDB656-RF02705.colored.json';
// import from '../example_data/data/json/URS0000CE8C9B-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/URS0000D05C6D-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/URS0000D14FF8-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/URS0000D21169-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/URS0000D3965E-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/URS0000D41711-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/URS0000D4B3B8-d.16.e.P.falciparum.S.colored.json';
// import from '../example_data/data/json/URS0000D61576-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/URS0000D721AC-DM_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000D82300-SL_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000D8A7A4-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/URS0000DA8398-E_Thr.colored.json';
// import from '../example_data/data/json/URS0000DB3CF0-E_Thr.colored.json';
// import from '../example_data/data/json/URS0000DB8966-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/URS0000DB8FC7-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/URS0000DBEB55-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000DE6316-TT_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0000DF52B1-E_Thr.colored.json';
// import from '../example_data/data/json/URS0000E1A6F1-HS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000E1A9A5-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000E33D26-EC_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0000E49B1B-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000E500C5-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/URS0000E5250E-TeT_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000E54703-mHS_LSU_3D.colored.json';
// import from '../example_data/data/json/URS0000E55277-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/URS0000E5E1A4-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0000E5E56E-d.5.b.Thermus.sp.colored.json';
// import from '../example_data/data/json/URS0000E63262-d.5.e.S.oshimae.colored.json';
// import from '../example_data/data/json/URS0000E65096-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/URS0000EF3B29-RF02705.colored.json';
// import from '../example_data/data/json/URS0001A20749-RNAseP_e_H_sapiens_3D.colored.json';
// import from '../example_data/data/json/URS0001AABA1F-d.16.b.S.gougerotii.colored.json';
// import from '../example_data/data/json/URS0001CC45CA-RF04183.colored.json';
// import from '../example_data/data/json/URS0001DB099D-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0001E06194-RF04183.colored.json';
// import from '../example_data/data/json/URS0001E07AC0-RF04183.colored.json';
// import from '../example_data/data/json/URS00022791CF-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00022799E7-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/URS000227E316-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/URS000227FAE6-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0002280FF2-RF04183.colored.json';
// import from '../example_data/data/json/URS0002285B3E-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0002289C75-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/URS0002295E7D-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00022A5CD0-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00022AA96A-LD_SSU_3D.colored.json';
// import from '../example_data/data/json/URS00022AAD21-RF04183.colored.json';
// import from '../example_data/data/json/URS0002313359-RF03163.colored.json';
// import from '../example_data/data/json/URS0002316547-RF03163.colored.json';
// import from '../example_data/data/json/URS0002316620-RF03163.colored.json';
// import from '../example_data/data/json/URS0002316635-RF03163.colored.json';
// import from '../example_data/data/json/URS0002322829-RF03163.colored.json';
// import from '../example_data/data/json/URS00023260C4-RF03163.colored.json';
// import from '../example_data/data/json/URS0002326288-RF03163.colored.json';
// import from '../example_data/data/json/URS00023262A5-RF03163.colored.json';
// import from '../example_data/data/json/URS000232B7E6-RF03163.colored.json';

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
    // new DataBundle(
    //     new Data('ruber', ruber),
    //     [
    //         new Data('URS00002E7035', ruber1),
    //         new Data('URS0000380FEA', ruber2),
    //         new Data('URS0000392402', ruber3),
    //         new Data('URS00003F965A', ruber4),
    //         new Data('URS0000458E34', ruber5),
    //         new Data('URS00015E33A0', ruber6),
    //         new Data('URS00022921C0', ruber7),
    //     ]
    // ),
];

