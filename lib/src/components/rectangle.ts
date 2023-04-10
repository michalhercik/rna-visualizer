import {
    Vector2,
    Transformation,
    identity,
} from '../components';

/**
 * Object representing a rectangle
 */
export class Rectangle {
    private coor: Vector2;
    public width: number;
    public height: number;
    public classes: string[];
    public visible = true;
    public transform: Transformation = identity;

    /**
     * Creates a new rectangle with the given parameters.
     * @param coor - The coordinate of the rectangle.
     * @param width - The width of the rectangle.
     * @param height - The height of the rectangle.
     * @param classes - An array of classes for styling the rectangle.
     */
    public constructor(coor: Vector2, width: number, height: number, classes: string[]) {
        this.classes = classes;
        this.coor = coor;
        this.width = width;
        this.height = height;
    }

    /**
     * Sets the transformation to be applied to the rectangle.
     * @param transform - The transformation to be applied to the rectangle.
     * @returns The modified rectangle.
     */
    public setTransform(transform: Transformation): Rectangle {
        this.transform = transform;
        return this;
    }

    /**
     * Returns the transformed X coordinate of the rectangle.
     * @returns The transformed X coordinate of the rectangle.
     */
    public getTransformedX(): number {
        return this.transform.applyX(this.coor.x);
    }

    /**
     * Returns the X coordinate of the rectangle.
     * @returns The X coordinate of the rectangle.
     */
    public getX(): number {
        return this.coor.x;
    }

    /**
     * Sets the X coordinate of the rectangle.
     * @param x - The new X coordinate of the rectangle.
     * @returns The modified rectangle.
     */
    public setX(x: number): Rectangle {
        this.coor.x = x;
        return this;
    }

    /**
     * Returns the transformed Y coordinate of the rectangle.
     * @returns The transformed Y coordinate of the rectangle.
     */
    public getTransformedY(): number {
        return this.transform.applyY(this.coor.y);
    }

    /**
     * Returns the Y coordinate of the rectangle.
     * @returns The Y coordinate of the rectangle.
     */
    public getY(): number {
        return this.coor.y;
    }

    /**
     * Sets the Y coordinate of the rectangle.
     * @param y - The new Y coordinate of the rectangle.
     * @returns The modified rectangle.
     */
    public setY(y: number): Rectangle {
        this.coor.y = y;
        return this;
    }

    /**
     * Sets the coordinate of the rectangle.
     * @param coor - The new coordinate of the rectangle.
     * @returns The modified rectangle.
     */
    public setCoor(coor: Vector2): Rectangle {
        this.coor = coor;
        return this;
    }

    /**
     * Gets the coordinates of the rectangle.
     * @returns - A copy of the coordinates of the rectangle as a `Vector2` object.
     */
    public getCoor(): Vector2 {
        return this.coor.copy();
    }

    /**
     * Sets the visibility of the rectangle.
     * @param visible - A boolean indicating the visibility of the rectangle.
     * @returns - The current `Rectangle` object.
     */
    public setVisible(visible: boolean): Rectangle {
        this.visible = visible;
        return this;
    }

    /**
     * Gets the visibility of the rectangle.
     * @returns - A boolean indicating the visibility of the rectangle.
     */
    public isVisible(): boolean {
        return this.visible;
    }

    /**
     * Gets the width of the rectangle.
     * @returns - The width of the rectangle as a number.
     */
    public getWidth(): number {
        return this.width;
    }

    /**
     * Gets the height of the rectangle.
     * @returns - The height of the rectangle as a number.
     */
    public getHeight(): number {
        return this.height;
    }

    /**
     * Gets the classes associated with the rectangle.
     * @returns - An array of strings representing the classes associated with the rectangle.
     */
    public getClasses() {
        return this.classes;
    }

    /**
     * Translates the rectangle by the given vector.
     * @param shift - A `Vector2` object representing the amount to translate the rectangle.
     * @returns - The current `Rectangle` object.
     */
    public translate(shift: Vector2): Rectangle {
        this.coor.add(shift);
        return this;
    }
}
