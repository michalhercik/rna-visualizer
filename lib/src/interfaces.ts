export interface SingleCoorObject {
    getX(): number;
    getY(): number;
    setX(newX: number): void;
    setY(newY: number): void;
    getOrigX(): number;
    getOrigY(): number;
    setOrig(newX: number, newY: number): void;
    getClasses(): Array<string>;
    isVisible(): boolean;
}

export interface Text extends SingleCoorObject {
    getText(): string;
}

export interface Circle extends SingleCoorObject {
    getR(): number;
}

export interface Line {
    getX1(): number;
    getX2(): number;
    getY1(): number;
    getY2(): number;
    setX1(newX1: number): void;
    setX2(newX2: number): void;
    setY1(newY1: number): void;
    setY2(newY2: number): void;
    getOrigX1(): number;
    getOrigX2(): number;
    getOrigY1(): number;
    getOrigY2(): number;
    setOrig(newX1: number, newY1: number, newX2: number, newY2: number): void;
    getClasses(): Array<string>;
    isVisible(): boolean;
}

export interface DataResidue 
{
    x: number;
    y: number;
    residueName: string;
    residueIndex: number;
    templateResidueIndex?: number;
    templateResidueName?: string;
    classes: Array<string>;
}

export interface DataBasePair 
{
    residueIndex1: number;
    residueIndex2: number;
    basePairType: string;
    classes: Array<any>;
}

export interface DataLabelContent 
{
    classes: Array<string>;
    label: string;
    x: number;
    y: number;
}

export interface DataLabelLine
{
    classes: Array<string>;
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

export interface DataLabel 
{
    labelContent: DataLabelContent;
    labelLine: DataLabelLine;
    residueIndex: number; 
}

export interface DataStyle 
{
    name: string;
}

export interface RNAMolecules
{
    name: string;
    basePairs: Array<DataBasePair>;
    labels: Array<DataLabel>;
    sequence: Array<DataResidue>;
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
