import { 
    Residue, 
    Transformation,
    identity,
    ILine,
} from './data-structures';

export class BasePair implements ILine {
    private residue1: Residue;
    private residue2: Residue;
    private transform: Transformation = identity;
    private classes: string[];

    public constructor(residue1: Residue, residue2: Residue, classes: string[]) {
        this.residue1 = residue1;
        this.residue2 = residue2;
        this.classes = classes;
    }

    public setTransform(transform: Transformation): BasePair {
        this.transform = transform;
        return this;
    }

    public getTransformedX1(): number {
        return this.transform.applyX(this.residue1.getX());
    }

    public getTransformedY1(): number {
        return this.transform.applyY(this.residue1.getY());
    }

    public getTransformedX2(): number {
        return this.transform.applyX(this.residue2.getX());
    }

    public getTransformedY2(): number {
        return this.transform.applyY(this.residue2.getY());
    }
    
    public getX1(): number {
        return this.residue1.getX();
    }

    public getY1(): number {
        return this.residue1.getY();
    }

    public getX2(): number {
        return this.residue2.getX();
    }

    public getY2(): number {
        return this.residue2.getY();
    }

    public isVisible(): boolean {
        return this.residue1.isVisible() && this.residue2.isVisible();
    }

    public getClasses(): string[] {
        return this.classes;
    }
}
