import { Vector2 } from '../components';

export class DoubleCoorTarget {
    public readonly coor1: Vector2;
    public readonly coor2: Vector2;

    constructor(coor1: Vector2, coor2: Vector2) {
        this.coor1 = coor1;
        this.coor2 = coor2;
    }

    public getX1(): number {
        return this.coor1.x;
    }

    public getY1(): number {
        return this.coor1.y;
    }

    public getX2(): number {
        return this.coor2.x;
    }

    public getY2(): number {
        return this.coor2.y;
    }
}

