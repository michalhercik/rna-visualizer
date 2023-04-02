import { Residue } from '../components';

/**
 * Represents a translation group with given translation.
 */
export class TranslationGroup {
    public xShift: number;
    public yShift: number;
    public members: Residue[];

    /**
     * Creates a translation group.
     * @param x - The x shift.
     * @param y - The y shift.
     * @param member - The member residue.
     */
    public constructor(x: number, y: number, member: Residue) {
        this.xShift = x;
        this.yShift = y;
        this.members = [member];
    }

    /**
     * Adds a member residue to the group.
     * @param member - The member residue to add.
     */
    public push(member: Residue) {
        this.members.push(member);
    }

    /**
     * Returns the number of members in the group.
     * @returns The number of members in the group.
     */
    public size(): number {
        return this.members.length;
    }

    /**
     * Returns whether the group has a member residue with the given index.
     * @param index - The index to check for.
     * @returns Whether the group has a member residue with the given index.
     */
    public has(index: number) {
        return this.members.some((res: Residue) => res.index === index);
    }
}

