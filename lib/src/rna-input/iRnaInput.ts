import { IRnaComplexes } from '../rna-input';

/**
 * Interface for object representing input data for RnaVis.
 */
export interface IRnaInput {
    classes: Array<any>;
    rnaComplexes: Array<IRnaComplexes>;
}
