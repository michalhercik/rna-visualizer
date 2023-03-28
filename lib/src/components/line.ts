import {
    ILine,
    Vector2,
    Transformation,
    identity,
} from '../components';

export class Line implements ILine {
    private coor1: Vector2;
    private coor2: Vector2;
    private classes: string[];
    private visible: boolean = true;
    private transform: Transformation = identity;

    public constructor(coor1: Vector2, coor2: Vector2, classes: string[]) {
        this.coor1 = coor1;
        this.coor2 = coor2;
        this.classes = classes;
    }

    public setTransform(transform: Transformation): Line {
        this.transform = transform;
        return this;
    }

    public getTransformedX1(): number {
        return this.transform.applyX(this.coor1.x);
    }

    public getTransformedY1(): number {
        return this.transform.applyY(this.coor1.y);
    }

    public getTransformedX2(): number {
        return this.transform.applyX(this.coor2.x);
    }

    public getTransformedY2(): number {
        return this.transform.applyY(this.coor2.y);
    }

    public setX1(x1: number): Line {
        this.coor1.x = x1;
        return this;
    }

    public getX1(): number {
        return this.coor1.x;
    }

    public setY1(y1: number): Line {
        this.coor1.y = y1;
        return this;
    }

    public getY1(): number {
        return this.coor1.y;
    }

    public setX2(x2: number): Line {
        this.coor2.x = x2;
        return this;
    }

    public getX2(): number {
        return this.coor2.x;
    }

    public setY2(y2: number): Line {
        this.coor2.y = y2;
        return this;
    }

    public getY2(): number {
        return this.coor2.y;
    }

    public setCoor1(coor: Vector2): Line {
        this.coor1 = coor;
        return this;
    }

    public getCoor1(): Vector2 {
        return this.coor1.copy();
    }

    public setCoor2(coor: Vector2): Line {
        this.coor2 = coor;
        return this;
    }

    public getCoor2(): Vector2 {
        return this.coor2.copy();
    }

    public setVisible(visible: boolean): Line {
        this.visible = visible;
        return this;
    }

    public isVisible(): boolean {
        return this.visible;
    }

    public getClasses(): string[] {
        return this.classes;
    }

    public translate(shift: Vector2): Line {
        this.coor1.add(shift);
        this.coor2.add(shift);
        return this;
    }
}
