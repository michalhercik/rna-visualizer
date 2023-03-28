import {
    Vector2,
    Transformation,
    identity,
} from '../components';

export class Rectangle {
    coor: Vector2;
    width: number;
    height: number;
    classes: string[];
    visible: boolean = true;
    transform: Transformation = identity;

    public constructor(coor: Vector2, width: number, height: number, classes: string[]) {
        this.classes = classes;
        this.coor = coor;
        this.width = width;
        this.height = height;
    }

    public setTransform(transform: Transformation): Rectangle {
        this.transform = transform;
        return this;
    }

    public getTransformedX(): number {
        return this.transform.applyX(this.coor.x);
    }

    public getX(): number {
        return this.coor.x;
    }

    public setX(x: number): Rectangle {
        this.coor.x = x;
        return this;
    }

    public getTransformedY(): number {
        return this.transform.applyY(this.coor.y);
    }

    public getY(): number {
        return this.coor.y;
    }

    public setY(y: number): Rectangle {
        this.coor.y = y;
        return this;
    }

    public setCoor(coor: Vector2): Rectangle {
        this.coor = coor;
        return this;
    }

    public getCoor(): Vector2 {
        return this.coor.copy();
    }

    public setVisible(visible: boolean): Rectangle {
        this.visible = visible;
        return this;
    }

    public isVisible(): boolean {
        return this.visible;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getClasses() {
        return this.classes;
    }

    public translate(shift: Vector2): Rectangle {
        this.coor.add(shift);
        return this;
    }
}
