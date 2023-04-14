import { 
    IDataBasePair, 
    IDataLabel, 
    IDataResidue 
} from '../rna-input';

export interface IRnaMolecule {
    basePairs: Array<IDataBasePair>;
    labels: Array<IDataLabel>;
    sequence: Array<IDataResidue>;
}

