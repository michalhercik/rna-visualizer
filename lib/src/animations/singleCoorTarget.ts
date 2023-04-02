import { Vector2 } from '../components';

/**
 * Represents a target coordinate with a single point.
 */
export class SingleCoorTarget {
    public readonly coor: Vector2;

    /**
     * Initializes a new instance of the `SingleCoorTarget` class.
     * @param coor - The coordinate of the target.
     */
    constructor(coor: Vector2) {
        this.coor = coor;
    }

    /**
     * Gets the x-coordinate of the target.
     * @returns The x-coordinate of the target.
     */
    public getX(): number {
        return this.coor.x;
    }

    /**
     * Gets the y-coordinate of the target.
     * @returns The y-coordinate of the target.
     */
    public getY(): number {
        return this.coor.y;
    }
}
