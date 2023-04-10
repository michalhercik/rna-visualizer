import {
    Vector2,
    Transformation,
    identity,
} from '../components';

/**
 * A class representing a circle.
 */
export class Circle {
    private coor: Vector2;
    public radius: number;
    public scale = 1;
    public visible = true;
    public transform: Transformation = identity;

    /**
     * Creates a new circle.
     * @param coor - The center coordinates of the circle.
     * @param radius - The radius of the circle.
     */
    public constructor(coor: Vector2, radius: number) {
        this.coor = coor;
        this.radius = radius;
    }

    /**
     * Sets a transformation for the circle.
     * @param transform - The transformation to set.
     * @returns The circle object.
     */
    public setTransform(transform: Transformation): Circle {
        this.transform = transform;
        return this;
    }

    /**
     * Gets the transformed X coordinate of the circle center.
     * @returns The transformed X coordinate.
     */
    public getTransformedX(): number {
        return this.transform.applyX(this.coor.x);
    }

    /**
     * Gets the X coordinate of the circle center.
     * @returns The X coordinate.
     */
    public getX(): number {
        return this.coor.x;
    }

    /**
     * Sets the X coordinate of the circle center.
     * @param x - The X coordinate to set.
     * @returns The circle object.
     */
    public setX(x: number): Circle {
        this.coor.x = x;
        return this;
    }

    /**
     * Gets the transformed Y coordinate of the circle center.
     * @returns The transformed Y coordinate.
     */
    public getTransformedY(): number {
        return this.transform.applyY(this.coor.y);
    }

    /**
     * Gets the Y coordinate of the circle center.
     * @returns The Y coordinate.
     */
    public getY(): number {
        return this.coor.y;
    }

    /**
     * Sets the Y coordinate of the circle center.
     * @param y - The Y coordinate to set.
     * @returns The circle object.
     */
    public setY(y: number): Circle {
        this.coor.y = y;
        return this;
    }

    /**
     * Sets the center coordinates of the circle.
     * @param coor - The center coordinates to set.
     * @returns The circle object.
     */
    public setCoor(coor: Vector2): Circle {
        this.coor = coor;
        return this;
    }

    /**
     * Gets the center coordinates of the circle.
     * @returns A copy of the center coordinates as a Vector2 object.
     */
    public getCoor(): Vector2 {
        return this.coor.copy();
    }

    /**
     * Gets the transformed center coordinates of the circle.
     * @returns The transformed center coordinates as a Vector2 object.
     */
    public getTransformedCoor(): Vector2 {
        return new Vector2(
            this.getTransformedX(),
            this.getTransformedY()
        );
    }

    /**
     * Gets the scaled radius of the circle.
     * @returns The scaled radius.
     */
    public getScaledRadius() {
        return this.scale * this.radius;
    }

    /**
     * Sets the scaling factor of the circle.
     * @param scale - The scaling factor to set.
     * @returns The circle object.
     */
    public setScale(scale: number): Circle {
        this.scale = scale;
        return this;
    }

    /**
     * Sets the visibility of the circle.
     * @param visible - The visibility to set.
     * @returns The circle object.
     */
    public setVisible(visible: boolean): Circle {
        this.visible = visible;
        return this;
    }

    /**
     * Determines whether the circle is visible.
     * @returns Whether the circle is visible.
     */
    public isVisible(): boolean {
        return this.visible;
    }

    /**
     * Gets the classes associated with the circle.
     * @returns The classes associated with the circle.
     */
    public getClasses(): string[] {
        return ['circle'];
    }

    /**
     * Translates the circle by the given vector.
     * @param shift - The vector by which to translate the circle.
     * @returns The circle object.
     */
    public translate(shift: Vector2): Circle {
        this.coor.add(shift);
        return this;
    }
}
