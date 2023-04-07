import { Styles } from '../styles';
import {
    Vector2,
    Transformation,
    identity,
} from '../components';

/**
 * Represents a Text object.
 */
export class Text {
    text: string;
    coor: Vector2;
    classes: string[];
    visible = true;
    transform: Transformation = identity;

    /**
     * Creates a new Text object.
     * @param coor - The initial position of the object.
     * @param text - The text content of the object.
     * @param classes - An array of classes for styling the text.
     */
    public constructor(coor: Vector2, text: string, classes: string[]) {
        this.classes = classes;
        this.coor = coor;
        this.text = text;
    }

    /**
     * Sets the transformation applied to the object.
     * @param transform - The transformation to apply.
     * @returns The Text object.
     */
    public setTransform(transform: Transformation): Text {
        this.transform = transform;
        return this;
    }

    /**
     * Returns the transformed x-coordinate of the object.
     * @returns The transformed x-coordinate.
     */
    public getTransformedX(): number {
        return this.transform.applyX(this.coor.x);
    }

    /**
     * Returns the x-coordinate of the object.
     * @returns The x-coordinate.
     */
    public getX(): number {
        return this.coor.x;
    }

    /**
     * Sets the x-coordinate of the object.
     * @param x - The x-coordinate to set.
     * @returns The Text object.
     */
    public setX(x: number): Text {
        this.coor.x = x;
        return this;
    }

    /**
     * Returns the transformed y-coordinate of the object.
     * @returns The transformed y-coordinate.
     */
    public getTransformedY(): number {
        return this.transform.applyY(this.coor.y);
    }

    /**
     * Returns the y-coordinate of the object.
     * @returns The y-coordinate.
     */
    public getY(): number {
        return this.coor.y;
    }

    /**
     * Sets the y-coordinate of the object.
     * @param y - The y-coordinate to set.
     * @returns The Text object.
     */
    public setY(y: number): Text {
        this.coor.y = y;
        return this;
    }

    /**
     * Sets the position of the object.
     * @param coor - The position to set.
     * @returns The Text object.
     */
    public setCoor(coor: Vector2): Text {
        this.coor = coor;
        return this;
    }

    /**
     * Returns a copy of the position vector of the object.
     * @returns The position vector.
     */
    public getCoor(): Vector2 {
        return this.coor.copy();
    }

    /**
     * Sets whether the object is visible.
     * @param visible - Whether the object is visible.
     * @returns The Text object.
     */
    public setVisible(visible: boolean): Text {
        this.visible = visible;
        return this;
    }

    /**
     * Returns whether the object is visible.
     * @returns Whether the object is visible.
     */
    public isVisible(): boolean {
        return this.visible;
    }

    /**
     * Returns the text content of the object.
     * @returns The text content.
     */
    public getText(): string {
        return this.text;
    }

    /**
     * Returns the classes which are used to style the object.
     * @returns The classes.
     */
    public getClasses() {
        return this.classes;
    }

    /**
     * Returns the width of the text in pixels, given a set of styles.
     * @param styles - The styles to use.
     * @returns The width of the text in pixels.
     */
    public width(styles: Styles): number {
        const textStyles = styles.get(this.classes);

        const fontSize = () => {
            const k = textStyles['k'] || 1;
            return textStyles['font-size'].slice(0, -2) * k + 'px';
        };

        const ctx = document.createElement('canvas').getContext('2d');
        ctx.font =
            (textStyles['font-weight'] || 'normal') + ' ' +
            (fontSize() || '6px') + ' ' +
            (textStyles['font-family'] || 'Helvetica');

        return ctx.measureText(this.text).width;
    }

    /**
     * Translates the position of the object by a given shift vector.
     * @param shift - The shift vector.
     * @returns The Text object.
     */
    public translate(shift: Vector2): Text {
        this.coor.add(shift);
        return this;
    }
}
