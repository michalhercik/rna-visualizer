import {
    Vector2,
    Transformation,
    Text,
    Circle,
} from '../components';
import { Styles } from '../styles';
import { IDataResidue } from '../rna-input';

/**
 * Class representing a Residue
 */
export class Residue {
    public name: string;
    public index: number;
    public templateIndex: number;
    public templateName: string;
    public circle: Circle;
    public text: Text;
    private visible: boolean = true;

    /**
     * Create a Residue.
     * @param name - The name of the residue.
     * @param index - The index of the residue.
     * @param templateName - The name of the template residue.
     * @param templateIndex - The index of the template residue.
     * @param circle - The Circle object representing the text background.
     * @param text - The Text object representing the residue name.
     */
    public constructor(name: string,
        index: number,
        templateName: string,
        templateIndex: number,
        circle: Circle,
        text: Text) {
        this.name = name;
        this.index = index;
        this.templateIndex = templateIndex;
        this.templateName = templateName;
        this.circle = circle;
        this.text = text;
    }

    /**
     * Creates a Residue from IDataResidue object.
     * @param res - The IDataResidue object representing a residue.
     * @param styles - The Styles object representing the styles of the residue.
     * @returns A Residue object created from the given IDataResidue object.
     */
    public static fromDataResidue(res: IDataResidue, styles: Styles): Residue {
        const textCoor = new Vector2(res.x, res.y);
        const classes = Object.assign([], res.classes);
        classes.push(Styles.TRANSFORMED_CLASS);
        const text = new Text(textCoor, res.residueName, classes);

        const circleCoor = new Vector2(res.x, res.y);
        const radius = Number(styles.getProperty(res.classes, 'font-size').slice(0, -2)) * 0.75;
        const circle = new Circle(circleCoor, radius);

        return new Residue(
            res.residueName,
            res.residueIndex,
            res.templateResidueName,
            res.templateResidueIndex,
            circle,
            text
        );
    }

    /**
     * Sets the transformation for the Residue.
     * @param transform - The Transformation object representing the transformation to set.
     * @returns The Residue object.
     */
    public setTransform(transform: Transformation): Residue {
        this.text.setTransform(transform);
        this.circle.setTransform(transform);
        return this;
    }

    /**
     * Gets the transformed X coordinate of the Residue.
     * @returns The transformed X coordinate of the Residue.
     */
    public getTransformedX(): number {
        return this.circle.getTransformedX();
    }

    /**
     * Gets the X coordinate of the Residue.
     * @returns The X coordinate of the Residue.
     */
    public getX(): number {
        return this.circle.getX();
    }

    /**
     * Sets the X coordinate of the Residue.
     * @param x - The X coordinate to set.
     * @returns The Residue object.
     */
    public setX(x: number): Residue {
        this.circle.setX(x);
        this.text.setX(x);
        return this;
    }

    /**
     * Gets the transformed Y coordinate of the Residue.
     * @returns The transformed Y coordinate of the Residue.
     */
    public getTransformedY(): number {
        return this.circle.getTransformedY();
    }

    /**
     * Gets the Y coordinate of the Residue.
     * @returns The Y coordinate of the Residue.
     */
    public getY(): number {
        return this.circle.getY();
    }

    /**
     * Sets the Y coordinate of the Residue.
     * @param y - The Y coordinate to set.
     * @returns The Residue object.
     */
    public setY(y: number): Residue {
        this.circle.setY(y);
        this.text.setY(y);
        return this;
    }

    /**
     * Sets the coordinate of the Residue.
     * @param coor - The Vector2 object representing the coordinate to set.
     * @returns The Residue object.
     */
    public setCoor(coor: Vector2): Residue {
        this.circle.setCoor(coor);
        this.text.setCoor(coor);
        return this;
    }

    /**
     * Gets the coordinate of the Residue.
     * @returns The Vector2 object representing the coordinate of the Residue.
     */
    public getCoor(): Vector2 {
        return this.circle.getCoor();
    }

    /**
     * Gets the transformed coordinate of the Residue.
     * @returns The Vector2 object representing the transformed coordinate of the Residue.
     */
    public getTransformedCoor(): Vector2 {
        return this.circle.getTransformedCoor();
    }

    /**
     * Sets the visibility of the Residue.
     * @param visible - The boolean value representing the visibility to set.
     * @returns The Residue object.
     */
    public setVisible(visible: boolean): Residue {
        this.circle.setVisible(visible);
        this.text.setVisible(visible);
        this.visible = visible;
        return this;
    }

    /**
     * Gets the visibility of the Residue.
     * @returns The boolean value representing the visibility of the Residue.
     */
    public isVisible(): boolean {
        return this.visible;
    }

    /**
     * Gets the classes of the Residue text.
     * @returns The array of strings representing the classes of the Residue text.
     */
    public getClasses(): string[] {
        return this.text.getClasses();
    }

    /**
    * Translates the residue's circle and text by the given shift vector.
    * 
    * @param shift - The vector to shift the residue's circle and text by.
    * @returns This Residue instance.
    */
    public translate(shift: Vector2): Residue {
        this.circle.translate(shift);
        this.text.translate(shift);
        return this;
    }
}
