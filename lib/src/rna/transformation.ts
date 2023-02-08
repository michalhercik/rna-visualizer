export interface Transformation {
    applyX(x: number): number;
    applyY(y: number): number;
}

export const identity: Transformation = {applyX: (x) => x, applyY: (y) => y};
