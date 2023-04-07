import {
    DataContainer,
    TranslationGroup,
} from '../data';

/**
 * A utility class for creating and manipulating TranslationGroups.
 */
export class TranslationGroups {

    /**
    * Creates TranslationGroups from two DataContainers, optionally filtered by a specific group and a minimum size.
    * @param contA - The first DataContainer.
    * @param contB - The second DataContainer.
    * @param group - Optional TranslationGroup to filter by.
    * @param filter - Minimum size for generated TranslationGroups.
    * @returns An array of TranslationGroups.
    */
    public static create(contA: DataContainer, contB: DataContainer, group: TranslationGroup = null, filter = 5): Array<TranslationGroup> {
        const tempRes = contA.residues;
        const shifts = new Map<string, TranslationGroup>();
        contB.residues.forEach(res => {
            if (res.templateIndex !== -1 && (group === null || group.has(res.templateIndex))) {
                const tRes = tempRes[res.templateIndex];
                const x = Math.round(tRes.getX() - res.getX());
                const y = Math.round(tRes.getY() - res.getY());
                const key = x + "," + y;
                if (shifts.has(key)) {
                    shifts.get(key).push(tRes);
                } else {
                    shifts.set(key, new TranslationGroup(x, y, tRes));
                }
            }
        });
        const groups = Array.from(shifts.values()).filter(group => group.size() > filter);
        return groups;
    }

    /**
    * Returns the largest TranslationGroup from an array of TranslationGroups.
    * @param groups - The array of TranslationGroups to search.
    * @returns The largest TranslationGroup.
    */
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

