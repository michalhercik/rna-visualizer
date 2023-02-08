import { Transformation } from './transformation';

export class Coordinate {
    x: number;
    y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public transform(transformation: Transformation): Coordinate {
        this.x = transformation.applyX(this.x);
        this.y = transformation.applyY(this.y);
        return this;
    }

    public add(coor: Coordinate): Coordinate {
        this.x += coor.x;
        this.y += coor.y;
        return this;
    }

    public multiply(k: number): Coordinate {
        this.x *= k;
        this.y *= k;
        return this;
    }
}
