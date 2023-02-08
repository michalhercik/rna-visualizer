import { 
    Label, 
    Coordinate,
    Transformation, 
    identity,
} from './data-structures';

export interface ILine {
    setTransform(transform: Transformation): ILine;
    getTransformedX1(): number;
    getTransformedY1(): number;
    getTransformedX2(): number;
    getTransformedY2(): number;    
    getX1(): number;
    getY1(): number;
    getX2(): number;
    getY2(): number;
    isVisible(): boolean;    
    getClasses(): string[];
}

export class Line implements ILine {
    private coor1: Coordinate;
    private coor2: Coordinate;
    private classes: string[];
    private visible: boolean;
    private transform: Transformation = identity;

    public constructor(coor1: Coordinate, coor2: Coordinate, classes: string[]) {
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
}
