import { BasePair, Label, Style, Residue, RNAData } from './interfaces';
import DataContainer from './dataContainer';
import { Styles } from './classes';

export default class ContainerFactory {
    private container: DataContainer;

    public create(data: RNAData, styles: Styles): DataContainer {
        this.container = new DataContainer(data, styles);
        this.setDimensions();
        this.addBasePairs();
        this.addResidues();
        this.addLabels();
        return this.container;
    }

    private formCoor(num: number): number {
        return num + this.container.margin;
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
        this.container.width = Math.round(2 * this.container.margin + width);
        this.container.height = Math.round(2 * this.container.margin + height);
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

        const bpX = (resIndex: number) => this.formCoor(rna.sequence[resIndex].x);
        const bpY = (resIndex: number) => this.formCoor(rna.sequence[resIndex].y);

        this.container.container.selectAll('custom.bp-line')
        .data(rna.basePairs)
        .join('custom')
        .attr('x1', (bp: BasePair) => bpX(bp.residueIndex1))
        .attr('y1', (bp: BasePair) => bpY(bp.residueIndex1))
        .attr('x2', (bp: BasePair) => bpX(bp.residueIndex2))
        .attr('y2', (bp: BasePair) => bpY(bp.residueIndex2))
        .attr('class', (bp: BasePair) => {
            const c = bp.classes.join(' ') + ' line';
            this.container.classComb.line.add(c);
            return c;
        });    
    }
    private addResidues(): void {
        const sequenceData = this.container.data.rnaComplexes[0].rnaMolecules[0].sequence;

        const getX = (res: Residue) => this.formCoor(res.x);
        const getY = (res: Residue) => this.formCoor(res.y);

        const addLines = () => {
            type Line = {res1: Residue, res2: Residue};
            let lineData: Line[] = [];
            for (let i = 1; i < sequenceData.length; ++i) {
                lineData.push({
                    res1: sequenceData[i-1], 
                    res2: sequenceData[i], 
                });
            }
            this.container.container.selectAll('custom.res-line')
            .data(lineData)
            .join('custom')
            .attr('x1', (line: Line) => getX(line.res1))
            .attr('y1', (line: Line) => getY(line.res1))
            .attr('x2', (line: Line) => getX(line.res2))
            .attr('y2', (line: Line) => getY(line.res2))
            .attr('class', 'bp-line res-line line');
            this.container.classComb.line.add('bp-line res-line line');
        }
        const addCircles = () => {
            this.container.container.selectAll('custom.res-circle')
            .data(sequenceData)
            .join('custom')
            .attr('cx', getX)
            .attr('cy', getY)
            .attr('r', this.container.styles.getProperty('font', 'font-size').slice(0,-2) * 0.75)
            .attr('class', 'res-circle circle');
            this.container.classComb.circle.add('res-circle circle');
        }
        const addTitles = () => {
            const resTitle = (residue: Residue) => 
            `${residue.residueIndex} (position.label in template: ${residue.residueIndex}.${residue.residueName}\')`;
            this.container.container.selectAll('custom.res-title')
            .data(sequenceData)
            .join('custom')
            .attr('title', resTitle)
            .attr('x', getX)
            .attr('y', getY)
            .attr('text', (residue: Residue) => residue.residueName)
            .attr('class', (residue: Residue) => {
                const c = residue.classes.join(' ') + ' res-title label transform';
                this.container.classComb.text.add(c);
                return c;
            });
        }

        addLines();
        addCircles();
        addTitles();
    }
    private addLabels(): void {
        const labelData = this.container.data.rnaComplexes[0].rnaMolecules[0].labels;

        this.container.container.selectAll('custom.label-text')
        .data(labelData)
        .join('custom')
        .attr('text', (label: Label) => label.labelContent.label)
        .attr('x', (label: Label) => this.formCoor(label.labelContent.x))
        .attr('y', (label: Label) => this.formCoor(label.labelContent.y))
        .attr('class', (label: Label) => {
            const c = label.labelContent.classes.join(' ') + ' label-text label transform';
            this.container.classComb.text.add(c);
            return c;
        });

        this.container.container.selectAll('custom.label-line')
        .data(labelData)
        .join('custom')
        .attr('x1', (label: Label) => this.formCoor(label.labelLine.x1))
        .attr('x2', (label: Label) => this.formCoor(label.labelLine.x2))
        .attr('y1', (label: Label) => this.formCoor(label.labelLine.y1))
        .attr('y2', (label: Label) => this.formCoor(label.labelLine.y2))
        .attr('class', (label: Label) => {
            const c = label.labelLine.classes.join(' ') + ' label-line line';
            this.container.classComb.line.add(c);
            return c;
        });
    }
}
