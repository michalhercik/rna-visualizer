import { IRnaMolecules } from '../rna-input';

export interface IRnaComplexes {
    name: string;
    rnaMolecules: Array<IRnaMolecules>;
}

