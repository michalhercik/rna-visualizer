import { Residue } from '../components';

/**
 * Stores information about the visibility of residues in a structure for animation.
 */
export class VisibilityRecord {
    residues: Residue[];
    /**
     * Array of boolean values indicating whether a residue is visible or not at the end of a animation.
     */
    to: boolean[];
    /**
     * Boolean indicating if this VisibilityRecord is used in animation.
     */
    active = true;

    /**
     * Creates a new VisibilityRecord.
     * @param residues - Array of residues.
     * @param to - Array of boolean values.
     * @throws Error if the length of `residues` and `to` arrays differ.
     */
    public constructor(residues: Residue[], to: boolean[]) {
        if (residues.length !== to.length) {
            throw new Error('residues.length !== to.length');
        }
        this.residues = residues;
        this.to = to;
    }

    /**
     * Sets the `active` flag for this VisibilityRecord.
     * @param active - Boolean value to set as the `active` flag.
     */
    public setActive(active: boolean): void {
        this.active = active;
    }

    /**
     * Returns the `active` flag for this VisibilityRecord.
     * @returns A boolean indicating if this VisibilityRecord is active or not.
     */
    public isActive(): boolean {
        return this.active;
    }
}
