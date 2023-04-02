export class Vector2 {
    x: number;
    y: number;

    public static readonly zero = new Vector2(0, 0);

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public add(vector: Vector2): Vector2 {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    public subtract(vector: Vector2): Vector2 {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    public multiply(k: number): Vector2 {
        this.x *= k;
        this.y *= k;
        return this;
    }

    public size(): number {
        return Math.sqrt(
            Math.pow(this.x, 2) + Math.pow(this.y, 2)
        );
    }

    public copy(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    public static sum(vector1: Vector2, vector2: Vector2): Vector2 {
        return new Vector2(vector1.x, vector1.y).add(vector2);
    }

    public static subtraction(vector1: Vector2, vector2: Vector2): Vector2 {
        return new Vector2(vector1.x, vector1.y).subtract(vector2);
    }

    public static distance(vector1: Vector2, vector2: Vector2): number {
        return this.subtraction(vector1, vector2).size();
    }
}
