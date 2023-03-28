import {
    DataContainer,
    TranslationGroup,
} from '../data';

export class TranslationGroups {
    public static create(contA: DataContainer, contB: DataContainer, group: TranslationGroup = null, filter: number = 5): Array<TranslationGroup> {
        let tempRes = contA.residues;
        let shifts = new Map<string, TranslationGroup>();
        contB.residues.forEach(res => {
            if (res.templateIndex !== -1 && (group === null || group.has(res.templateIndex))) {
                const tRes = tempRes[res.templateIndex];
                let x = Math.round(tRes.getX() - res.getX());
                let y = Math.round(tRes.getY() - res.getY());
                let key = x + "," + y;
                if (shifts.has(key)) {
                    shifts.get(key).push(tRes);
                } else {
                    shifts.set(key, new TranslationGroup(x, y, tRes));
                }
            }
        });
        let groups = Array.from(shifts.values()).filter(group => group.size() > filter);
        return groups;
    }

    public static getBest(groups: TranslationGroup[]) {
        let bestGroup = groups[0];
        groups.forEach((group) => {
            if (group.size() > bestGroup.size()) {
                bestGroup = group;
            }
        });
        return bestGroup;
    }
}

