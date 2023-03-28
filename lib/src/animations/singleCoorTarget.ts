import { Vector2 } from '../components';

export class SingleCoorTarget {
    public readonly coor: Vector2;

    constructor(coor: Vector2) {
        this.coor = coor;
    }

    public getX(): number {
        return this.coor.x;
    }

    public getY(): number {
        return this.coor.y;
    }
}

