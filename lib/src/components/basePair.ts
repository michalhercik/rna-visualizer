import {
    Residue,
    Transformation,
    identity,
    ILine,
} from '../components';

/**
 * Represents a base pair.
 * @implements {ILine}
 */
export class BasePair implements ILine {
    private residue1: Residue;
    private residue2: Residue;
    private transform: Transformation = identity;
    private classes: string[];

    /**
     * Creates a new instance of BasePair.
     * @param residue1 - The first residue of the base pair.
     * @param residue2 - The second residue of the base pair.
     * @param classes - The classes associated with the base pair.
     */
    public constructor(residue1: Residue, residue2: Residue, classes: string[]) {
        this.residue1 = residue1;
        this.residue2 = residue2;
        this.classes = classes;
    }

    /**
     * Sets the transformation to be applied to the base pair.
     * @param transform - The transformation to apply to the base pair.
     * @returns The BasePair instance for method chaining.
     */
    public setTransform(transform: Transformation): BasePair {
        this.transform = transform;
        return this;
    }

    /**
     * Gets the x coordinate of the first residue after transformation.
     * @returns The x coordinate of the first residue after transformation.
     */
    public getTransformedX1(): number {
        return this.transform.applyX(this.residue1.getX());
    }

    /**
     * Gets the y coordinate of the first residue after transformation.
     * @returns The y coordinate of the first residue after transformation.
     */
    public getTransformedY1(): number {
        return this.transform.applyY(this.residue1.getY());
    }

    /**
     * Gets the x coordinate of the second residue after transformation.
     * @returns The x coordinate of the second residue after transformation.
     */
    public getTransformedX2(): number {
        return this.transform.applyX(this.residue2.getX());
    }

    /**
     * Gets the y coordinate of the second residue after transformation.
     * @returns The y coordinate of the second residue after transformation.
     */
    public getTransformedY2(): number {
        return this.transform.applyY(this.residue2.getY());
    }

    /**
     * Gets the x coordinate of the first residue.
     * @returns The x coordinate of the first residue.
     */
    public getX1(): number {
        return this.residue1.getX();
    }

    /**
     * Gets the y coordinate of the first residue.
     * @returns The y coordinate of the first residue.
     */
    public getY1(): number {
        return this.residue1.getY();
    }

    /**
     * Gets the x coordinate of the second residue.
     * @returns The x coordinate of the second residue.
     */
    public getX2(): number {
        return this.residue2.getX();
    }

    /**
     * Gets the y coordinate of the second residue.
     * @returns The y coordinate of the second residue.
     */
    public getY2(): number {
        return this.residue2.getY();
    }

    /**
     * Determines whether the base pair is visible.
     * @returns Whether the base pair is visible.
     */
    public isVisible(): boolean {
        return this.residue1.isVisible() && this.residue2.isVisible();
    }

    /**
     * Gets the classes associated with the base pair.
     * @returns The classes associated with the base pair.
     */
    public getClasses(): string[] {
        return this.classes;
    }
}
