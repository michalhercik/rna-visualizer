import { Coordinate, Transformation, Text, Circle } from './data-structures';
import { Styles } from '../classes';
import { DataResidue } from '../interfaces';

export class Residue {
    public  name: string;
    public  index: number;
    public  templateIndex: number;
    public  templateName: string;
    public circle: Circle;
    public text: Text;
    private visible: boolean = true;

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

    public static fromDataResidue(res: DataResidue, styles: Styles): Residue {
        const textCoor = new Coordinate(res.x, res.y);
        const classes = Object.assign([], res.classes);
        const text = new Text(textCoor, res.residueName, classes);

        const circleCoor = new Coordinate(res.x, res.y);
        const radius = styles.getProperty(res.classes, 'font-size').slice(0,-2) * 0.75;
        const circle = new Circle(circleCoor, radius);

        return new Residue(
            res.residueName,
            res.residueIndex,
            res.templateResidueName,
            res.templateResidueIndex,
            circle,
            text
        )
    }

    public setTransform(transform: Transformation): Residue {
        this.text.setTransform(transform);
        this.circle.setTransform(transform);
        return this;
    }

    public getTransformedX(): number {
        return this.circle.getTransformedX();
    }
    
    public getX(): number {
        return this.circle.getX();
    }

    public setX(x: number): Residue {
        this.circle.setX(x);
        this.text.setX(x);
        return this;
    }

    public getTransformedY(): number {
        return this.circle.getTransformedY();
    }

    public getY(): number {
        return this.circle.getY();
    }

    public setY(y: number): Residue {
        this.circle.setY(y);
        this.text.setY(y);
        return this;
    }

    public setVisible(visible: boolean): Residue {
        this.circle.setVisible(visible);
        this.text.setVisible(visible);
        this.visible = visible;
        return this;
    }

    public isVisible(): boolean {
        return this.visible;
    }

    public getClasses(): string[] {
        return this.text.getClasses();
    }
}
