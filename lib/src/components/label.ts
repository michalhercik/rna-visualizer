import {
    Vector2,
    Residue,
    Line,
    Text,
    Transformation,
} from '../components';

/**
* Label class.
*/
export class Label {
    public residue: Residue;
    public line: Line;
    public text: Text;
    public visible = true;

    /**
    * @param residue - Residue to which the label is attached.
    * @param line - Line component of the label.
    * @param text - Text component of the label.
    */
    public constructor(residue: Residue, line: Line, text: Text) {
        this.residue = residue;
        this.line = line;
        this.text = text;
    }

    /**
    * @param transform - Transformation to apply to the label.
    */
    public setTransform(transform: Transformation): Label {
        this.line.setTransform(transform);
        this.text.setTransform(transform);
        return this;
    }

    /**
    * @param visible - Whether the label should be visible.
    */
    public setVisible(visible: boolean): Label {
        this.line.setVisible(visible);
        this.text.setVisible(visible);
        this.visible = visible;
        return this;
    }

    /**
    * @returns Whether the label is visible.
    */
    public isVisible(): boolean {
        return this.visible && this.residue.isVisible();
    }

    /**
    * @param shift - Vector to translate the label by.
    * @returns The label.
    */
    public translate(shift: Vector2): Label {
        this.line.translate(shift);
        this.text.translate(shift);
        return this;
    }
}
