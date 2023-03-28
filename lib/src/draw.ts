import { Styles } from './styles';
import {
    ILine,
    Text,
    Circle,
    Rectangle
} from './components';

export class Draw {
    public static Lines(lines: Array<ILine>, ctx: CanvasRenderingContext2D, styles: Styles) {
        ctx.save();
        ctx.beginPath();
        for (let line of lines) {
            if (line.isVisible()) {
                const lineStyles = styles.get(line.getClasses());
                ctx.strokeStyle = lineStyles['stroke'] || 'black';
                ctx.lineWidth = lineStyles['stroke-width'] || 1;

                ctx.moveTo(line.getTransformedX1(), line.getTransformedY1());
                ctx.lineTo(line.getTransformedX2(), line.getTransformedY2());
            }
        }
        ctx.stroke();
        ctx.restore();
    }

    public static Texts(texts: Array<Text>, ctx: CanvasRenderingContext2D, styles: Styles) {
        ctx.save();
        const translate = new Map([
            ['left', 'left'],
            ['right', 'right'],
            ['middle', 'center'],
            ['start', 'start'],
            ['end', 'end']
        ]);

        for (let text of texts) {
            if (!text.isVisible()) continue;

            const textStyles = styles.get(text.getClasses());
            const fontSize = () => {
                const k = textStyles['k'] || 1;
                return textStyles['font-size'].slice(0, -2) * k + 'px';
            };

            ctx.font =
                (textStyles['font-weight'] || 'normal') + ' ' +
                (fontSize() || '6px') + ' ' +
                (textStyles['font-family'] || 'Helvetica');
            ctx.fillStyle = textStyles['fill'] || 'black';
            ctx.textAlign = translate.get(textStyles['text-anchor'] || 'middle') as CanvasTextAlign;
            ctx.textBaseline = textStyles['baseline'] || 'middle';
            ctx.globalAlpha = textStyles['alpha'] || ctx.globalAlpha;

            ctx.fillText(text.getText(), text.getTransformedX(), text.getTransformedY());
        }
        ctx.restore();
    }

    public static Circles(circles: Array<Circle>, ctx: CanvasRenderingContext2D, styles: Styles) {
        ctx.save();
        ctx.beginPath();
        for (let circle of circles) {
            if (!circle.isVisible()) continue;

            const circleStyles = styles.get(circle.getClasses());
            ctx.strokeStyle = circleStyles['stroke'] || 'black';
            ctx.fillStyle = circleStyles['fill'] || 'white';
            ctx.lineWidth = circleStyles['stroke-width'] || 1;
            ctx.globalAlpha = 1;

            const r = circle.getScaledRadius();
            const x = circle.getTransformedX();
            const y = circle.getTransformedY();
            ctx.moveTo(x + r, y);
            ctx.arc(x, y, r, 0, 2 * Math.PI);
        }
        ctx.fill();
        ctx.restore();
    }

    public static Rectangle(rectangle: Rectangle, ctx: CanvasRenderingContext2D, styles: Styles) {
        ctx.save();
        const rectStyles = styles.get(rectangle.getClasses());
        ctx.strokeStyle = rectStyles['stroke'] || 'black';
        ctx.fillStyle = rectStyles['fill'] || 'white';
        ctx.globalAlpha = rectStyles['alpha'] || ctx.globalAlpha;
        ctx.fillRect(
            rectangle.getTransformedX(),
            rectangle.getTransformedY(),
            rectangle.getWidth(),
            rectangle.getHeight()
        );
        ctx.restore();
    }
}
