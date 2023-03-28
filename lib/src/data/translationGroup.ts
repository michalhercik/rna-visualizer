import { Residue } from '../components';

export class TranslationGroup {
    public xShift: number;
    public yShift: number;
    public members: Residue[];

    public constructor(x: number, y: number, member: Residue) {
        this.xShift = x;
        this.yShift = y;
        this.members = [member];
    }

    public push(member: Residue) {
        this.members.push(member);
    }

    public size(): number {
        return this.members.length;
    }

    public has(index: number) {
        return this.members.some((res: Residue) => res.index === index);
    }
}

