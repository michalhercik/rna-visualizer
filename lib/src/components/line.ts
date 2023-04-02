import {
    ILine,
    Vector2,
    Transformation,
    identity,
} from '../components';

/**
 * A class representing a line segment between two points.
 */
export class Line implements ILine {
    private coor1: Vector2;
    private coor2: Vector2;
    private classes: string[];
    private visible: boolean = true;
    private transform: Transformation = identity;

    /**
     * Create a new Line object.
     * @param coor1 - The first coordinate of the line segment.
     * @param coor2 - The second coordinate of the line segment.
     * @param classes - An array of classes for styling the line segment.
     */
    public constructor(coor1: Vector2, coor2: Vector2, classes: string[]) {
        this.coor1 = coor1;
        this.coor2 = coor2;
        this.classes = classes;
    }

    /**
     * Set the transformation to apply to this line segment.
     * @param transform - The transformation to apply.
     * @returns This line segment, for chaining.
     */
    public setTransform(transform: Transformation): Line {
        this.transform = transform;
        return this;
    }

    /**
     * Get the transformed X coordinate of the first point of this line segment.
     * @returns The transformed X coordinate of the first point.
     */
    public getTransformedX1(): number {
        return this.transform.applyX(this.coor1.x);
    }

    /**
     * Get the transformed Y coordinate of the first point of this line segment.
     * @returns The transformed Y coordinate of the first point.
     */
    public getTransformedY1(): number {
        return this.transform.applyY(this.coor1.y);
    }

    /**
     * Get the transformed X coordinate of the second point of this line segment.
     * @returns The transformed X coordinate of the second point.
     */
    public getTransformedX2(): number {
        return this.transform.applyX(this.coor2.x);
    }

    /**
     * Get the transformed Y coordinate of the second point of this line segment.
     * @returns The transformed Y coordinate of the second point.
     */
    public getTransformedY2(): number {
        return this.transform.applyY(this.coor2.y);
    }

    /**
     * Set the X coordinate of the first point of this line segment.
     * @param x1 - The new X coordinate of the first point.
     * @returns This line segment, for chaining.
     */
    public setX1(x1: number): Line {
        this.coor1.x = x1;
        return this;
    }

    /**
     * Get the X coordinate of the first point of this line segment.
     * @returns The X coordinate of the first point.
     */
    public getX1(): number {
        return this.coor1.x;
    }

    /**
     * Set the Y coordinate of the first point of this line segment.
     * @param y1 - The new Y coordinate of the first point.
     * @returns This line segment, for chaining.
     */
    public setY1(y1: number): Line {
        this.coor1.y = y1;
        return this;
    }

    /**
     * Get the Y coordinate of the first point of this line segment.
     * @returns The Y coordinate of the first point.
     */
    public getY1(): number {
        return this.coor1.y;
    }

    /**
     * Set the X coordinate of the second point of this line segment.
     * @param x2 - The new X coordinate of the second point.
     * @returns This line segment, for chaining.
     */
    public setX2(x2: number): Line {
        this.coor2.x = x2;
        return this;
    }

    /**
     * Gets the x-coordinate of the second point of the line.
     */
    public getX2(): number {
        return this.coor2.x;
    }

    /**
     * Sets the Y coordinate of the second point of the line.
     * @param y2 - The new Y coordinate.
     */
    public setY2(y2: number): Line {
        this.coor2.y = y2;
        return this;
    }

    /**
     * Gets the Y coordinate of the second point of the line.
     */
    public getY2(): number {
        return this.coor2.y;
    }

    /**
     * Sets the first point of the line to the given Vector2.
     * @param coor - The new coordinates.
     */
    public setCoor1(coor: Vector2): Line {
        this.coor1 = coor;
        return this;
    }

    /**
     * Gets a copy of the first point of the line as a Vector2.
     */
    public getCoor1(): Vector2 {
        return this.coor1.copy();
    }

    /**
     * Sets the second point of the line to the given Vector2.
     * @param coor - The new coordinates.
     */
    public setCoor2(coor: Vector2): Line {
        this.coor2 = coor;
        return this;
    }

    /**
     * Gets a copy of the second point of the line as a Vector2.
     */
    public getCoor2(): Vector2 {
        return this.coor2.copy();
    }

    /**
     * Sets the visibility of the line.
     * @param visible - True if the line should be visible, false otherwise.
     */
    public setVisible(visible: boolean): Line {
        this.visible = visible;
        return this;
    }

    /**
     * Gets the visibility of the line.
     */
    public isVisible(): boolean {
        return this.visible;
    }

    /**
     * Gets the classes applied to the line.
     */
    public getClasses(): string[] {
        return this.classes;
    }

    /**
     * Translates the line by the given Vector2.
     * @param shift - The Vector2 to translate by.
     */
    public translate(shift: Vector2): Line {
        this.coor1.add(shift);
        this.coor2.add(shift);
        return this;
    }
}
