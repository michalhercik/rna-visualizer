/**
 * Two-dimensional vector.
 */
export class Vector2 {
    /**
     * The x component of the vector.
     */
    x: number;

    /**
     * The y component of the vector.
     */
    y: number;

    /**
     * The zero vector.
     */
    public static readonly zero = new Vector2(0, 0);

    /**
     * Creates a new Vector2 instance.
     * @param x - The x component of the vector.
     * @param y - The y component of the vector.
     */
    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Adds the given vector to this vector.
     * @param vector - The vector to add.
     * @returns The sum of this vector and the given vector.
     */
    public add(vector: Vector2): Vector2 {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    /**
     * Subtracts the given vector from this vector.
     * @param vector - The vector to subtract.
     * @returns The difference between this vector and the given vector.
     */
    public subtract(vector: Vector2): Vector2 {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    /**
     * Multiplies this vector by the given scalar.
     * @param k - The scalar to multiply by.
     * @returns This vector multiplied by the given scalar.
     */
    public multiply(k: number): Vector2 {
        this.x *= k;
        this.y *= k;
        return this;
    }

    /**
     * Returns the size (magnitude) of this vector.
     * @returns The size of this vector.
     */
    public size(): number {
        return Math.sqrt(
            Math.pow(this.x, 2) + Math.pow(this.y, 2)
        );
    }

    /**
     * Returns a copy of this vector.
     * @returns A copy of this vector.
     */
    public copy(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    /**
     * Returns the sum of the given vectors.
     * @param vector1 - The first vector.
     * @param vector2 - The second vector.
     * @returns The sum of the given vectors.
     */
    public static sum(vector1: Vector2, vector2: Vector2): Vector2 {
        return new Vector2(vector1.x, vector1.y).add(vector2);
    }

    /**
     * Returns the difference between the given vectors.
     * @param vector1 - The first vector.
     * @param vector2 - The second vector.
     * @returns The difference between the given vectors.
     */
    public static subtraction(vector1: Vector2, vector2: Vector2): Vector2 {
        return new Vector2(vector1.x, vector1.y).subtract(vector2);
    }

    /**
     * Returns the distance between the given vectors.
     * @param vector1 - The first vector.
     * @param vector2 - The second vector.
     * @returns The distance between the given vectors.
     */
    public static distance(vector1: Vector2, vector2: Vector2): number {
        return this.subtraction(vector1, vector2).size();
    }
}
