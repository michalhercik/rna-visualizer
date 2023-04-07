import { Vector2 } from '../components';
import { DataContainer } from '../data';
import {
    DoubleCoorTarget,
    SingleCoorTarget,
} from '../animations';

/**
 * A class representing a record of position targets for labels and residues.
 */
export class PositionRecord {
    /**
     * Map containing the target coordinates of the label lines, with the key being the residue index as a string.
     * @param labelLines - The map of label line targets.
     */
    public readonly labelLines: Map<string, DoubleCoorTarget>;
    /**
     * Map containing the target coordinates of the label texts, with the key being the residue index as a string.
     * @param labelTexts - The map of label text targets.
     */
    public readonly labelTexts: Map<string, SingleCoorTarget>;
    /**
     * Map containing the target coordinates of the residues, with the key being the residue index as a string.
     * @param residues - The map of residue targets.
     */
    public readonly residues: Map<string, SingleCoorTarget>;

    /**
     * Constructor for a PositionRecord object.
     * @param labelLines - The map of label line targets.
     * @param labelTexts - The map of label text targets.
     * @param residues - The map of residue targets.
     */
    constructor(labelLines: Map<string, DoubleCoorTarget>,
        labelTexts: Map<string, SingleCoorTarget>,
        residues: Map<string, SingleCoorTarget>) {
        this.labelLines = labelLines;
        this.labelTexts = labelTexts;
        this.residues = residues;
    }

    /**
     * Creates a new PositionRecord object from the given DataContainer object.
     * @param container - The DataContainer object from which to create the PositionRecord object.
     * @returns A new PositionRecord object.
     */
    public static fromDataContainer(container: DataContainer): PositionRecord {
        const labelLines = new Map<string, DoubleCoorTarget>();
        const labelTexts = new Map<string, SingleCoorTarget>();
        const residues = new Map<string, SingleCoorTarget>();

        container.residues.forEach(res => {
            const key = res.index.toString();
            const target = new SingleCoorTarget(res.getCoor());
            residues.set(key, target);
        });

        container.labels.forEach(label => {
            const key = label.residue.index.toString();

            const textTarget = new SingleCoorTarget(label.text.getCoor());
            labelTexts.set(key, textTarget);

            const lineTarget = new DoubleCoorTarget(label.line.getCoor1(), label.line.getCoor2());
            labelLines.set(key, lineTarget);
        });

        return new PositionRecord(labelLines, labelTexts, residues);
    }

    /**
     * Creates a new PositionRecord object from the given DataContainer with coordinates from the given template DataContainer object. Residue is added to record only if it has template residue.
     * @param container - The DataContainer object from which to create the PositionRecord object.
     * @param template - The template DataContainer object from which are taken coordinates.
     * @returns A new PositionRecord object.
     */
    public static fromTemplate(container: DataContainer, template: DataContainer): PositionRecord {
        const labelLines = new Map<string, DoubleCoorTarget>();
        const labelTexts = new Map<string, SingleCoorTarget>();
        const residues = new Map<string, SingleCoorTarget>();

        container.residues.forEach(res => {
            if (res.templateIndex > -1) {
                const tempRes = template.residues[res.templateIndex];
                const target = new SingleCoorTarget(tempRes.getCoor());
                const key = res.index.toString();
                residues.set(key, target);
            }
        });

        container.labels.forEach(label => {
            if (label.residue.templateIndex > -1) {
                const tempRes = template.residues[label.residue.templateIndex];
                const shift = Vector2.subtraction(tempRes.getCoor(), label.residue.getCoor());

                const key = label.residue.index.toString();

                const coor = Vector2.sum(label.text.getCoor(), shift);
                const textTarget = new SingleCoorTarget(coor);
                labelTexts.set(key, textTarget);

                const coor1 = Vector2.sum(label.line.getCoor1(), shift);
                const coor2 = Vector2.sum(label.line.getCoor2(), shift);
                const lineTarget = new DoubleCoorTarget(coor1, coor2);
                labelLines.set(key, lineTarget);
            }
        });

        return new PositionRecord(labelLines, labelTexts, residues);
    }

    /**
     * Creates a new PositionRecord object from the given DataContainer object and all coordinates are transalted by a Vector2 shift.
     * @param container - The DataContainer object from which to create the PositionRecord object.
     * @param shift - The Vector2 shift to apply to the target coordinates.
     * @returns A new PositionRecord object.
     */
    public static fromTranslation(container: DataContainer, shift: Vector2) {
        const labelLines = new Map<string, DoubleCoorTarget>();
        const labelTexts = new Map<string, SingleCoorTarget>();
        const residues = new Map<string, SingleCoorTarget>();

        container.residues.forEach(res => {
            const coor = Vector2.sum(res.getCoor(), shift);
            const target = new SingleCoorTarget(coor);
            const key = res.index.toString();
            residues.set(key, target);
        });

        container.labels.forEach(label => {
            const key = label.residue.index.toString();

            const coor = Vector2.sum(label.text.getCoor(), shift);
            const textTarget = new SingleCoorTarget(coor);
            labelTexts.set(key, textTarget);

            const coor1 = Vector2.sum(label.line.getCoor1(), shift);
            const coor2 = Vector2.sum(label.line.getCoor2(), shift);
            const lineTarget = new DoubleCoorTarget(coor1, coor2);
            labelLines.set(key, lineTarget);
        });

        return new PositionRecord(labelLines, labelTexts, residues);
    }
}

