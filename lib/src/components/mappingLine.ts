import { Residue, ILine } from '../components';
import { DataContainer } from '../data';

/**
 * Represents a line between two residues that are mapped to each other.
 */
export class MappingLine implements ILine {
    residue1: Residue;
    residue2: Residue;
    classes: string[];
    visible = true;

    /**
     * Constructs a MappingLine object
     * @param residue1 - the first residue object
     * @param residue2 - the second residue object
     * @param classes - an array of strings representing the classes of the MappingLine object for styling the line.
     */
    public constructor(residue1: Residue, residue2: Residue, classes: string[]) {
        this.residue1 = residue1;
        this.residue2 = residue2;
        this.classes = classes;
    }

    /**
     * Gets the transformed X coordinate of the first residue
     * @returns a number representing the transformed X coordinate of the first residue
     */
    public getTransformedX1(): number {
        return this.residue1.getTransformedX();
    }

    /**
     * Gets the transformed Y coordinate of the first residue
     * @returns a number representing the transformed Y coordinate of the first residue
     */
    public getTransformedY1(): number {
        return this.residue1.getTransformedY();
    }

    /**
     * Gets the transformed X coordinate of the second residue
     * @returns a number representing the transformed X coordinate of the second residue
     */
    public getTransformedX2(): number {
        return this.residue2.getTransformedX();
    }

    /**
     * Gets the transformed Y coordinate of the second residue
     * @returns a number representing the transformed Y coordinate of the second residue
     */
    public getTransformedY2(): number {
        return this.residue2.getTransformedY();
    }

    /**
     * Gets the X coordinate of the first residue
     * @returns a number representing the X coordinate of the first residue
     */
    public getX1(): number {
        return this.residue1.getX();
    }

    /**
     * Gets the Y coordinate of the first residue
     * @returns a number representing the Y coordinate of the first residue
     */
    public getY1(): number {
        return this.residue1.getY();
    }

    /**
     * Gets the X coordinate of the second residue
     * @returns a number representing the X coordinate of the second residue
     */
    public getX2(): number {
        return this.residue2.getX();
    }

    /**
     * Gets the Y coordinate of the second residue
     * @returns a number representing the Y coordinate of the second residue
     */
    public getY2(): number {
        return this.residue2.getY();
    }

    /**
     * Sets the visibility of the MappingLine object
     * @param visible - a boolean value representing the visibility of the MappingLine object
     */
    public setVisible(visible: boolean) {
        this.visible = visible;
    }

    /**
     * Gets the visibility of the MappingLine object
     * @returns a boolean value representing the visibility of the MappingLine object
     */
    public isVisible(): boolean {
        return this.visible;
    }

    /**
     * Gets an array of strings representing the classes of the MappingLine object
     * @returns an array of strings representing the classes of the MappingLine object
     */
    public getClasses(): string[] {
        return this.classes;
    }

    /**
    * Creates MappingLine objects for each residue pair that can be mapped between template and derived container.
    * @param template - The DataContainer representing the template structure.
    * @param container - The DataContainer representing the derived structure.
    * @param classes - (Optional) An array of strings to set as the classes property for each MappingLine object.
    * @returns An array of MappingLine objects representing the residue mappings between template and derived container.
    */
    public static createMappingLines(template: DataContainer, container: DataContainer, classes: string[] = ['mapping-line']): MappingLine[] {
        const mappingLines: MappingLine[] = [];
        container.getMappableResidues().forEach(res => {
            const tempRes = template.residues[res.templateIndex];
            const mp = new MappingLine(tempRes, res, classes);
            mappingLines.push(mp);
        });
        return mappingLines;
    }
}
