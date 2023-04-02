import { Vector2 } from '../components';

/**
 * A class representing a pair of 2D coordinates.
 */
export class DoubleCoorTarget {
    public readonly coor1: Vector2;
    public readonly coor2: Vector2;

    /**
     * Constructs a DoubleCoorTarget object with the given coordinates.
     * @param coor1 - The first coordinate.
     * @param coor2 - The second coordinate.
     */
    constructor(coor1: Vector2, coor2: Vector2) {
        this.coor1 = coor1;
        this.coor2 = coor2;
    }

    /**
     * Returns the x value of the first coordinate.
     */
    public getX1(): number {
        return this.coor1.x;
    }

    /**
     * Returns the y value of the first coordinate.
     */
    public getY1(): number {
        return this.coor1.y;
    }

    /**
     * Returns the x value of the second coordinate.
     */
    public getX2(): number {
        return this.coor2.x;
    }

    /**
     * Returns the y value of the second coordinate.
     */
    public getY2(): number {
        return this.coor2.y;
    }
}

