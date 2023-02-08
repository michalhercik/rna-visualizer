import { DataBasePair, DataLabel, DataStyle, DataResidue, RNAData } from './interfaces';
import { Residue, BasePair, Label, Coordinate, Line, Text } from './rna/data-structures';
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
        this.residues.forEach((res: Residue) => {
            res.setX(res.getX() + this.margin);
            res.setY(res.getY() + this.margin);
        })

        this.labels.forEach((label: Label) => {
            label.line.setX1(label.line.getX1() + this.margin);
            label.line.setY1(label.line.getY1() + this.margin);
            label.line.setX2(label.line.getX2() + this.margin);
            label.line.setY2(label.line.getY2() + this.margin);

            label.text.setX(label.text.getX());
            label.text.setY(label.text.getY());
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

        const classes = ['bp-line', 'res-line'];
        for (let i = 1; i < this.residues.length; ++i) {
            const basePair = new BasePair(
                this.residues[i - 1],
                this.residues[i],
                classes
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
            const coor1 = new Coordinate(label.labelLine.x1, label.labelLine.y1);
            const coor2 = new Coordinate(label.labelLine.x2, label.labelLine.y2);
            const lineClasses = Object.assign([], label.labelLine.classes);
            const line = new Line(coor1, coor2, lineClasses);

            const coor = new Coordinate(label.labelContent.x, label.labelContent.y);
            const textClasses = Object.assign([], label.labelContent.classes);
            const text = new Text(coor, label.labelContent.label, textClasses);

            const res = this.residues[label.residueIndex];
            const l = new Label(res, line, text);
            this.labels.push(l);
        })
    }
}
