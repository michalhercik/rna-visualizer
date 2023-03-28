import { Residue } from '../components';

export class VisibilityRecord {
    residues: Residue[];
    to: boolean[];
    active: boolean = true;

    public constructor(residues: Residue[], to: boolean[]) {
        if (residues.length !== to.length) {
            throw new Error('residues.length !== to.length');
        }
        this.residues = residues;
        this.to = to;
    }

    public setActive(active: boolean): void {
        this.active = active;
    }

    public isActive(): boolean {
        return this.active;
    }
}
