import { Styles } from '../styles';
import {
    Vector2,
    Residue,
    Rectangle,
    Text
} from '../components';
import { Draw } from '../draw';

/**
 * Class representing a Title with background.
 */
export class Title {
    private texts: Text[];
    private background: Rectangle;
    private styles: Styles;

    /**
     * Creates a new Title object.
     * @param texts - An array of Text objects to be displayed as the title text.
     * @param background - The Rectangle object representing the background of the title.
     * @param styles - The styles to be applied to the title.
     */
    public constructor(texts: Text[], background: Rectangle, styles: Styles) {
        this.texts = texts;
        this.background = background;
        this.styles = styles;
    }

    /**
     * Gets the Text objects of the Title.
     * @returns An array of Text objects.
     */
    public getTexts(): Text[] {
        return this.texts;
    }

    /**
     * Gets the background Rectangle of the Title.
     * @returns The background Rectangle object.
     */
    public getBackground(): Rectangle {
        return this.background;
    }

    /**
     * Draws the Title using the given CanvasRenderingContext2D.
     * @param ctx - The CanvasRenderingContext2D to use for drawing.
     */
    public draw(ctx: CanvasRenderingContext2D) {
        Draw.Rectangle(this.background, ctx, this.styles);
        Draw.Texts(this.texts, ctx, this.styles);
    }

    /**
     * Creates a new Title object from an array of Residue objects.
     * @param residues - An array of Residue objects to be used for creating the title.
     * @param canvasWidth - The width of the canvas the title will be drawn on.
     * @param canvasHeight - The height of the canvas the title will be drawn on.
     * @param styles - The styles to be applied to the title.
     * @returns A new Title object.
     */
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
