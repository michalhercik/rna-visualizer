import DataContainer from './dataContainer';
import { Residue } from './rna/data-structures';

export class Group {
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

export function createGroups(contA: DataContainer, contB: DataContainer, group: Group = null, filter: number = 5): Array<Group> {
    let tempRes = contA.residues;
    let shifts = new Map<string, Group>();
    contB.residues.forEach(res => {
        if (res.templateIndex !== -1 && (group === null || group.has(res.templateIndex))) {
            const tRes = tempRes[res.templateIndex];
            let x = Math.round(tRes.getX() - res.getX());
            let y = Math.round(tRes.getY() - res.getY());
            let key = x + "," + y;
            if (shifts.has(key)) {
                shifts.get(key).push(tRes);
            } else {
                shifts.set(key, new Group(x, y, tRes));
            }
        }
    });
    let groups = Array.from(shifts.values()).filter( group => group.size() > filter);
    return groups;
}

export function getBestGroup(groups: Group[]) {
    let bestGroup = groups[0];
    groups.forEach((group) => {
        if (group.size() > bestGroup.size()) {
            bestGroup = group;
        }
    });
    return bestGroup;
}
