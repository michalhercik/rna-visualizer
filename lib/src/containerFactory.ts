import { DataBasePair, DataLabel, DataStyle, DataResidue, RNAData } from './interfaces';
import { Residue, BasePair, Label, Vector2, Line, Text } from './rna/data-structures';
import DataContainer from './dataContainer';
import { Styles } from './classes';

export default class ContainerFactory {
    private readonly margin = 10;
    private container: DataContainer;
    private data: RNAData;
    private styles: Styles;
    private residues: Residue[] = [];
    private basePairs: BasePair[] = [];
    private labels: Label[] = [];

    public create(data: RNAData, styles: Styles): DataContainer {
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

    private addMargin(): void {
        const shift = new Vector2(this.margin, this.margin);

        this.residues.forEach((res: Residue) => {
            res.translate(shift)
        })

        this.labels.forEach((label: Label) => {
            label.translate(shift);
        })
    }

    private setDimensions() {
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

    private addClasses(): void {
        this.data.classes.forEach((style: any) => {
            const name = style.name;
            delete style.name;
            this.container.styles.set(name, style);
        });
    }

    private addBasePairs(): void {
        const rna = this.data.rnaComplexes[0].rnaMolecules[0];

        rna.basePairs.forEach((bp: DataBasePair) => {
            const classes = Object.assign([], bp.classes);
            const basePair = new BasePair(
                this.residues[bp.residueIndex1],
                this.residues[bp.residueIndex2],
                classes
            );
            this.basePairs.push(basePair);
        })

        for (let i = 1; i < this.residues.length; ++i) {
            const basePair = new BasePair(
                this.residues[i - 1],
                this.residues[i],
                ['bp-line', 'res-line']
            );
            this.basePairs.push(basePair);
        } 
    }

    private addResidues(): void {
        const sequenceData = this.data.rnaComplexes[0].rnaMolecules[0].sequence;

        sequenceData.forEach((res: DataResidue) => {
            const residue = Residue.fromDataResidue(res, this.styles);
            this.residues.push(residue);
        })
    }

    private addLabels(): void {
        const labelData = this.data.rnaComplexes[0].rnaMolecules[0].labels;

        labelData.forEach((label: DataLabel) => {
            const coor1 = new Vector2(label.labelLine.x1, label.labelLine.y1);
            const coor2 = new Vector2(label.labelLine.x2, label.labelLine.y2);
            const lineClasses = Object.assign([], label.labelLine.classes);
            const line = new Line(coor1, coor2, lineClasses);

            const coor = new Vector2(label.labelContent.x, label.labelContent.y);
            const textClasses = Object.assign([], label.labelContent.classes);
            const text = new Text(coor, label.labelContent.label, textClasses);

            const res = this.residues[label.residueIndex];
            const l = new Label(res, line, text);
            this.labels.push(l);
        })
    }
}
