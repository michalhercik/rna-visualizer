export interface IResidue 
{
    x: number;
    y: number;
    residueName: string;
    residueIndex: number;
    classes: Array<string>;
}

export interface IBasePair 
{
    residueIndex1: number;
    residueIndex2: number;
    basePairType: string;
}

export interface ILabelContent 
{
    classes: Array<string>;
    label: string;
    x: number;
    y: number;
}

export interface ILabelLine
{
    classes: Array<string>;
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

export interface ILabel 
{
    labelContent: ILabelContent;
    labelLine: ILabelLine;
    residueIndex: number; 
}

export interface IStyle 
{
    name: string;
}

export interface IRNAMolecules
{
    name: string;
    basePairs: Array<IBasePair>;
    labels: Array<ILabel>;
    sequence: Array<IResidue>;
}

export interface IRNAComplexes
{
    name: string;
    rnaMolecules: Array<IRNAMolecules>;
}

export interface IRNAData
{
    classes: Array<IStyle>;
    rnaComplexes: Array<IRNAComplexes>;
}
