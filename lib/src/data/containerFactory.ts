import { DataContainer } from '../data';
import { Styles } from '../styles';
import {
    IDataBasePair,
    IDataLabel,
    IDataResidue,
    IRnaInput,
} from '../rna-input';
import {
    Residue,
    BasePair,
    Label,
    Vector2,
    Line,
    Text,
} from '../components';

/**
 * Factory class for creating a DataContainer object that displays RNA visualization.
 */
export class ContainerFactory {
    private static readonly margin = 10;
    private static container: DataContainer;
    private static data: IRnaInput;
    private static styles: Styles;
    private static residues: Residue[];
    private static basePairs: BasePair[];
    private static labels: Label[];

    /**
    * Creates a DataContainer object for the RNA visualization.
    * @param data - The RNA input data.
    * @param styles - The styles to apply to the visualization.
    * @returns A DataContainer object representing the IRnaInput data with given styles.
    */
    public static create(data: IRnaInput, styles: Styles): DataContainer {
        this.basePairs = [];
        this.labels = [];
        this.residues = [];
        this.data = data;
        this.styles = styles;
        this.addResidues();
        this.addBasePairs();
        this.addLabels();
        this.addMargin();
        this.container = new DataContainer(this.residues, this.basePairs, this.labels, styles);
        this.setDimensions();
        return this.container;
    }

    private static addMargin(): void {
        const shift = new Vector2(this.margin, this.margin);

        this.residues.forEach((res: Residue) => {
            res.translate(shift);
        });

        this.labels.forEach((label: Label) => {
            label.translate(shift);
        });
    }

    private static setDimensions() {
        const residues = this.data.rnaComplexes[0].rnaMolecules[0].sequence;
        let width = Number.MIN_VALUE;
        let height = Number.MIN_VALUE;
        for (const res of residues) {
            if (res.x > width)
                width = res.x;
            if (res.y > height)
                height = res.y;
        }
        this.container.width = Math.round(2 * this.margin + width);
        this.container.height = Math.round(2 * this.margin + height);
    }

    private static addBasePairs(): void {
        const rna = this.data.rnaComplexes[0].rnaMolecules[0];

        rna.basePairs.forEach((bp: IDataBasePair) => {
            const classes = Object.assign([], bp.classes);
            const basePair = new BasePair(
                this.residues[bp.residueIndex1],
                this.residues[bp.residueIndex2],
                classes
            );
            this.basePairs.push(basePair);
        });

        for (let i = 1; i < this.residues.length; ++i) {
            const basePair = new BasePair(
                this.residues[i - 1],
                this.residues[i],
                ['bp-line', 'res-line']
            );
            this.basePairs.push(basePair);
        }
    }

    private static addResidues(): void {
        const sequenceData = this.data.rnaComplexes[0].rnaMolecules[0].sequence;

        sequenceData.forEach((res: IDataResidue) => {
            const residue = Residue.fromDataResidue(res, this.styles);
            this.residues.push(residue);
        });
    }

    private static addLabels(): void {
        const labelData = this.data.rnaComplexes[0].rnaMolecules[0].labels;

        labelData.forEach((label: IDataLabel) => {
            const coor1 = new Vector2(label.labelLine.x1, label.labelLine.y1);
            const coor2 = new Vector2(label.labelLine.x2, label.labelLine.y2);
            const lineClasses = Object.assign([], label.labelLine.classes);
            const line = new Line(coor1, coor2, lineClasses);

            const coor = new Vector2(label.labelContent.x, label.labelContent.y);
            const textClasses = Object.assign([], label.labelContent.classes);
            textClasses.push(Styles.TRANSFORMED_CLASS);
            const text = new Text(coor, label.labelContent.label, textClasses);

            const res = this.residues[label.residueIndex];
            const l = new Label(res, line, text);
            this.labels.push(l);
        });
    }
}
