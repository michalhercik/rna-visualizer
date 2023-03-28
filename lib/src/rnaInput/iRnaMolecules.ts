import { IDataBasePair } from '../rnaInput';
import { IDataLabel } from '../rnaInput';
import { IDataResidue } from '../rnaInput';

export interface IRnaMolecules {
    name: string;
    basePairs: Array<IDataBasePair>;
    labels: Array<IDataLabel>;
    sequence: Array<IDataResidue>;
}

