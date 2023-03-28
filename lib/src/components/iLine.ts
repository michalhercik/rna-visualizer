export interface ILine {
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
