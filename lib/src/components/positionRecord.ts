import { Vector2 } from '../components';
import { DataContainer } from '../data';
import {
    DoubleCoorTarget,
    SingleCoorTarget,
} from '../animations';

export class PositionRecord {
    public readonly labelLines: Map<string, DoubleCoorTarget>;
    public readonly labelTexts: Map<string, SingleCoorTarget>;
    public readonly residues: Map<string, SingleCoorTarget>;

    constructor(labelLines: Map<string, DoubleCoorTarget>,
        labelTexts: Map<string, SingleCoorTarget>,
        residues: Map<string, SingleCoorTarget>) {
        this.labelLines = labelLines;
        this.labelTexts = labelTexts;
        this.residues = residues;
    }

    public static fromDataContainer(container: DataContainer): PositionRecord {
        let labelLines = new Map<string, DoubleCoorTarget>();
        let labelTexts = new Map<string, SingleCoorTarget>();
        let residues = new Map<string, SingleCoorTarget>();

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

    public static fromTemplate(container: DataContainer, template: DataContainer): PositionRecord {
        let labelLines = new Map<string, DoubleCoorTarget>();
        let labelTexts = new Map<string, SingleCoorTarget>();
        let residues = new Map<string, SingleCoorTarget>();

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

    public static fromTranslation(container: DataContainer, shift: Vector2) {
        let labelLines = new Map<string, DoubleCoorTarget>();
        let labelTexts = new Map<string, SingleCoorTarget>();
        let residues = new Map<string, SingleCoorTarget>();

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

