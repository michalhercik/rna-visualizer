import { 
    IDataBasePair, 
    IDataLabel, 
    IDataResidue 
} from '../rna-input';

export interface IRnaMolecules {
    name: string;
    basePairs: Array<IDataBasePair>;
    labels: Array<IDataLabel>;
    sequence: Array<IDataResidue>;
}

