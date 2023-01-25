import { BasePair, Label, Style, Residue, RNAData } from './interfaces';
import DataContainer from './dataContainer';
import { ResidueTitle, ResidueCircle, LabelText, LabelLine, BpLine } from './dataContainer';
import { Styles } from './classes';

export default class ContainerFactory {
    private readonly margin = 10;
    private container: DataContainer;

    public create(data: RNAData, styles: Styles): DataContainer {
        this.container = new DataContainer(data, styles);
        this.setDimensions();
        this.addMargin();
        this.addBasePairs();
        this.addResidues();
        this.addLabels();
        return this.container;
    }

    private addMargin(): void {
        const rna = this.container.data.rnaComplexes[0].rnaMolecules[0];
        rna.sequence.forEach((res: Residue) => {
            res.x += this.margin;
            res.y += this.margin;
        })

        rna.labels.forEach((label: Label) => {
            label.labelLine.x1 += this.margin;
            label.labelLine.y1 += this.margin;
            label.labelLine.x2 += this.margin;
            label.labelLine.y2 += this.margin;
            label.labelContent.x += this.margin;
            label.labelContent.y += this.margin;
        })
    }

    private setDimensions() {
        const residues = this.container.data.rnaComplexes[0].rnaMolecules[0].sequence;
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
        this.container.data.classes.forEach((style: any) => {
            const name = style.name;
            delete style.name;
            this.container.styles.set(name, style);
        });
    }

    private addBasePairs(): void {
        const rna = this.container.data.rnaComplexes[0].rnaMolecules[0];

        rna.basePairs.forEach((bp: BasePair) => {
            this.container.addBpLine(new BpLine(rna.sequence, bp));
        })
    }

    private addResidues(): void {
        const sequenceData = this.container.data.rnaComplexes[0].rnaMolecules[0].sequence;

        for (let i = 1; i < sequenceData.length; ++i) {
            this.container.addBpLine(new BpLine(sequenceData, {
                residueIndex1: i-1,
                residueIndex2: i,
                basePairType: "null",
                classes: ['bp-line', 'res-line']
            }));
        }
        sequenceData.forEach((res: Residue) => {
            const r = this.container.styles.getProperty(res.classes, 'font-size').slice(0,-2) * 0.75;
            this.container.addResCircle(new ResidueCircle(res, r));
            this.container.addResTitle(new ResidueTitle(res));
        })
    }

    private addLabels(): void {
        const labelData = this.container.data.rnaComplexes[0].rnaMolecules[0].labels;

        labelData.forEach((label: Label) => {
            this.container.addLabelText(new LabelText(label));
            this.container.addLabelLine(new LabelLine(label));
        })
    }
}
