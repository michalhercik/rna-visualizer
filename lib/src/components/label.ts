import {
    Vector2,
    Residue,
    Line,
    Text,
    Transformation,
} from '../components';

export class Label {
    public residue: Residue;
    public line: Line;
    public text: Text;
    private visible: boolean = true;

    public constructor(residue: Residue, line: Line, text: Text) {
        this.residue = residue;
        this.line = line;
        this.text = text;
    }

    public setTransform(transform: Transformation): Label {
        this.line.setTransform(transform);
        this.text.setTransform(transform);
        return this;
    }

    public setVisible(visible: boolean): Label {
        this.line.setVisible(visible);
        this.text.setVisible(visible);
        this.visible = visible;
        return this;
    }

    public isVisible(): boolean {
        return this.visible && this.residue.isVisible();
    }

    public translate(shift: Vector2): Label {
        this.line.translate(shift);
        this.text.translate(shift);
        return this;
    }
}
