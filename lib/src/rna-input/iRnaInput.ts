import { IRnaComplexes, IDataStyle } from '../rna-input';

/**
 * Interface for object representing input data for RnaVis.
 */
export interface IRnaInput {
    classes: IDataStyle[];
    rnaComplexes: IRnaComplexes[];
}
