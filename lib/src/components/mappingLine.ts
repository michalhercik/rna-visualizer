import { Residue, ILine } from '../components';
import { DataContainer } from '../data';

export class MappingLine implements ILine {
    residue1: Residue;
    residue2: Residue;
    classes: string[];
    visible: boolean = true;

    public constructor(residue1: Residue, residue2: Residue, classes: string[]) {
        this.residue1 = residue1;
        this.residue2 = residue2;
        this.classes = classes;
    }

    public getTransformedX1(): number {
        return this.residue1.getTransformedX();
    }

    public getTransformedY1(): number {
        return this.residue1.getTransformedY();
    }

    public getTransformedX2(): number {
        return this.residue2.getTransformedX();
    }

    public getTransformedY2(): number {
        return this.residue2.getTransformedY();
    }

    public getX1(): number {
        return this.residue1.getX();
    }

    public getY1(): number {
        return this.residue1.getY();
    }

    public getX2(): number {
        return this.residue2.getX();
    }

    public getY2(): number {
        return this.residue2.getY();
    }

    public setVisible(visible: boolean) {
        this.visible = visible;
    }

    public isVisible(): boolean {
        return this.visible;
    }

    public getClasses(): string[] {
        return this.classes;
    }

    public static createMappingLines(template: DataContainer, container: DataContainer, classes: string[] = ['mapping-line']): MappingLine[] {
        let mappingLines: MappingLine[] = [];
        container.getMappableResidues().forEach(res => {
            const tempRes = template.residues[res.templateIndex];
            const mp = new MappingLine(tempRes, res, classes);
            mappingLines.push(mp);
        });
        return mappingLines;
    }
}
