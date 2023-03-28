import { Styles } from '../styles';
import {
    Vector2,
    Transformation,
    identity,
} from '../components';

export class Text {
    text: string;
    coor: Vector2;
    classes: string[];
    visible: boolean = true;
    transform: Transformation = identity;

    public constructor(coor: Vector2, text: string, classes: string[]) {
        this.classes = classes;
        this.coor = coor;
        this.text = text;
    }

    public setTransform(transform: Transformation): Text {
        this.transform = transform;
        return this;
    }

    public getTransformedX(): number {
        return this.transform.applyX(this.coor.x);
    }

    public getX(): number {
        return this.coor.x;
    }

    public setX(x: number): Text {
        this.coor.x = x;
        return this;
    }

    public getTransformedY(): number {
        return this.transform.applyY(this.coor.y);
    }

    public getY(): number {
        return this.coor.y;
    }

    public setY(y: number): Text {
        this.coor.y = y;
        return this;
    }

    public setCoor(coor: Vector2): Text {
        this.coor = coor;
        return this;
    }

    public getCoor(): Vector2 {
        return this.coor.copy();
    }

    public setVisible(visible: boolean): Text {
        this.visible = visible;
        return this;
    }

    public isVisible(): boolean {
        return this.visible;
    }

    public getText(): string {
        return this.text;
    }

    public getClasses() {
        return this.classes;
    }

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

    public translate(shift: Vector2): Text {
        this.coor.add(shift);
        return this;
    }
}
