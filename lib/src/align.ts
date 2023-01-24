import DataContainer from './dataContainer';
import { Residue } from './interfaces';

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
        return this.members.some((res: Residue) => res.residueIndex === index);
    }
}

export function createGroups(contA: DataContainer, contB: DataContainer, group: Group = null, filter: number = 5): Array<Group> {
    let tempRes = contA.getResidues();
    let shifts = new Map<string, Group>();
    contB.getResidues().forEach(res => {
        if (res.templateResidueIndex !== -1 && (group === null || group.has(res.templateResidueIndex))) {
            const tRes = tempRes[res.templateResidueIndex];
            let x = Math.round(tRes.x - res.x);
            let y = Math.round(tRes.y - res.y);
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

export function translate(cont: DataContainer, xShift: number, yShift: number) {
    cont.getSingleCoorObjects().forEach(object => {
        object.setOrig(
            Math.round(object.getX() + xShift), 
            Math.round(object.getY() + yShift)
        );
        object.setX(object.getX() + xShift);
        object.setY(object.getY() + yShift);
    })

    cont.getLines().forEach(line => {
        line.setOrig(
            Math.round(line.getX1() + xShift),
            Math.round(line.getY1() + yShift),
            Math.round(line.getX2() + xShift),
            Math.round(line.getY2() + yShift)
        );
        line.setX1(line.getX1() + xShift);
        line.setY1(line.getY1() + yShift);
        line.setX2(line.getX2() + xShift);
        line.setY2(line.getY2() + yShift);
    })
}
