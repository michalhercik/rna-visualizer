export interface Residue 
{
    x: number;
    y: number;
    residueName: string;
    residueIndex: number;
    templateResidueIndex: number;
    templateResidueName: string;
    classes: Array<string>;
}

export interface BasePair 
{
    residueIndex1: number;
    residueIndex2: number;
    basePairType: string;
    classes: Array<any>;
}

export interface LabelContent 
{
    classes: Array<string>;
    label: string;
    x: number;
    y: number;
}

export interface LabelLine
{
    classes: Array<string>;
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

export interface Label 
{
    labelContent: LabelContent;
    labelLine: LabelLine;
    residueIndex: number; 
}

export interface Style 
{
    name: string;
}

export interface RNAMolecules
{
    name: string;
    basePairs: Array<BasePair>;
    labels: Array<Label>;
    sequence: Array<Residue>;
}

export interface RNAComplexes
{
    name: string;
    rnaMolecules: Array<RNAMolecules>;
}

export interface RNAData
{
    classes: Array<any>;
    rnaComplexes: Array<RNAComplexes>;
}
