import { Styles } from '../styles';
import {
    Vector2,
    Residue,
    Rectangle,
    Text
} from '../components';
import { Draw } from '../draw';

export class Title {
    private texts: Text[];
    private background: Rectangle;
    private styles: Styles;
    private visible: boolean = false;

    public constructor(texts: Text[], background: Rectangle, styles: Styles) {
        this.texts = texts;
        this.background = background;
        this.styles = styles;
    }

    public getTexts(): Text[] {
        return this.texts;
    }

    public getBackground(): Rectangle {
        return this.background;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        Draw.Rectangle(this.background, ctx, this.styles);
        Draw.Texts(this.texts, ctx, this.styles);
    }

    public static fromResidues(residues: Residue[], canvasWidth: number, canvasHeight: number, styles: Styles) {
        const rightMostRes = Math.max(...residues.map(res => res.getTransformedX()));
        const topMostRes = Math.min(...residues.map(res => res.getTransformedY()));
        const margin = residues[0].circle.getScaledRadius();
        const padding = 3;
        const textHeight = +styles.getProperty(['title-text'], 'font-size').slice(0, -2);

        let x = rightMostRes + margin + padding;
        let y = topMostRes - margin + padding;

        const texts = residues
            .map((res, i) => {
                const text = `${res.index}.${res.name} (position.label in template: ${res.templateIndex}.${res.templateName})`;
                return new Text(new Vector2(x, y + (i * textHeight)), text, ['title-text']);
            });

        const textWidth = Math.max(...texts.map(t => t.width(styles)));
        const titleWidth = textWidth + (2 * padding);
        const titleHeight = texts.length * textHeight + (2 * padding);

        let rectX = rightMostRes + margin;
        let rectY = topMostRes - margin;

        if (x + textWidth > canvasWidth) {
            const leftMostRes = Math.min(...residues.map(res => res.getTransformedX()));
            x = leftMostRes - margin - padding - textWidth;
            texts.forEach(t => t.setX(x));
            rectX = leftMostRes - margin - titleWidth;
        }
        if (y + titleHeight > canvasHeight) {
            const bottomMostRes = Math.max(...residues.map(res => res.getTransformedY()));
            y = bottomMostRes - margin - titleHeight + padding;
            texts.forEach((t, i) => t.setY(y + (i * textHeight)));
            rectY = bottomMostRes - margin - titleHeight;
        }

        const background = new Rectangle(
            new Vector2(rectX, rectY),
            titleWidth,
            titleHeight,
            ['title-background']
        );

        return new Title(texts, background, styles);
    }
}
