/**
 * Interface representing a 2D transformation.
 */
export interface Transformation {
    /**
     * Applies the transformation to a given x-coordinate.
     * 
     * @param x - The x-coordinate to apply the transformation to.
     * @returns The transformed x-coordinate.
     */
    applyX(x: number): number;

    /**
     * Applies the transformation to a given y-coordinate.
     * 
     * @param y - The y-coordinate to apply the transformation to.
     * @returns The transformed y-coordinate.
     */
    applyY(y: number): number;
}

/**
 * Identity transformation object that does not modify its inputs.
 */
export const identity: Transformation = { 
    /**
     * Applies the identity transformation to a given x-coordinate.
     * 
     * @param x - The x-coordinate to apply the transformation to.
     * @returns The unmodified x-coordinate.
     */
    applyX: (x) => x, 

    /**
     * Applies the identity transformation to a given y-coordinate.
     * 
     * @param y - The y-coordinate to apply the transformation to.
     * @returns The unmodified y-coordinate.
     */
    applyY: (y) => y 
};
