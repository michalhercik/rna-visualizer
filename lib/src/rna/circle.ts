import { 
    Vector2, 
    Transformation, 
    identity,
    IObject
} from './data-structures';

export class Circle implements IObject {
    private coor: Vector2;
    private radius: number;
    private scale: number = 1;
    private visible: boolean = true;
    private transform: Transformation = identity;

    public constructor(coor: Vector2, radius: number) {
        this.coor = coor;
        this.radius = radius;
    }

    public setTransform(transform: Transformation): Circle {
        this.transform = transform;
        return this;
    }

    public getTransformedX(): number {
        return this.transform.applyX(this.coor.x);
    }
    
    public getX(): number {
        return this.coor.x;
    }

    public setX(x: number): Circle {
        this.coor.x = x;
        return this;
    }

    public getTransformedY(): number {
        return this.transform.applyY(this.coor.y);
    }

    public getY(): number {
        return this.coor.y;
    }

    public setY(y: number): Circle {
        this.coor.y = y;
        return this;
    }

    public setCoor(coor: Vector2): Circle {
        this.coor = coor;
        return this;
    }

    public getCoor(): Vector2 {
        return this.coor.copy();
    }

    public getScaledRadius() {
        return this.scale * this.radius;
    }

    public setScale(scale: number): Circle {
        this.scale = scale;
        return this;
    }

    public setVisible(visible: boolean): Circle {
        this.visible = visible;
        return this;
    }

    public isVisible(): boolean {
        return this.visible;
    }

    public getClasses(): string[] {
        return ['circle'];
    }

    public translate(shift: Vector2): Circle {
        this.coor.add(shift);
        return this;
    }
}
