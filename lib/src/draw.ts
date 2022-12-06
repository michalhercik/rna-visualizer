import * as d3 from 'd3';
import { Styles } from './classes';
import { Line, Text, Circle } from './interfaces';
import DataContainer from './dataContainer'

export function drawLines(lines: Array<Line>, ctx: CanvasRenderingContext2D, styles: Styles) {
    lines.forEach((line: Line) => {
        const lineStyles = styles.get(line.getClasses());
        ctx.strokeStyle = lineStyles['stroke'] || 'black';
        ctx.lineWidth = lineStyles['stroke-width'] || 1;

        ctx.beginPath();
        ctx.moveTo(line.getX1(), line.getY1());
        ctx.lineTo(line.getX2(), line.getY2());
        ctx.stroke();
    })
}

export function drawTexts(texts: Array<Text>, ctx: CanvasRenderingContext2D, styles: Styles) {
    const translate = new Map([
        ['start', 'left'],
        ['middle', 'center'],
        ['end', 'right']
    ]);

    texts.forEach((text: Text) => {
        const textStyles = styles.get(text.getClasses());
        const fontSize = () => {
            const k = textStyles['k'] || 1;
            return textStyles['font-size'].slice(0,-2) * k + 'px';
        }
        fontSize();
        ctx.font = 
            (textStyles['font-weight'] || 'normal') + ' ' + 
            (fontSize() || '6px') + ' ' + 
            (textStyles['font-family'] || 'Helvetica');
        ctx.fillStyle = textStyles['fill'] || 'black';
        ctx.textAlign = translate.get(textStyles['text-anchor'] || 'middle') as CanvasTextAlign;
        ctx.textBaseline = textStyles['baseline'] || 'middle';

        ctx.fillText(text.getText(), text.getX(), text.getY());
    })
}

export function drawCircles(circles: Array<Circle>, ctx: CanvasRenderingContext2D, styles: Styles) {
    circles.forEach((circle: Circle) => {
        const circleStyles = styles.get(circle.getClasses());
        ctx.strokeStyle = circleStyles['stroke'] || 'black';
        ctx.fillStyle = circleStyles['fill'] || 'white';
        ctx.lineWidth = circleStyles['stroke-width'] || 1;

        ctx.beginPath();
        ctx.arc(circle.getX(), circle.getY(), circle.getR(), 0, 2 * Math.PI);
        ctx.fill();
    })
}
