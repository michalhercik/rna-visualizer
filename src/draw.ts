import * as d3 from 'd3';
import { Styles } from './classes';

abstract class DrawTemplate {
    protected styles;
    protected classComb;
    protected context;
    protected dataContainer

    public constructor(style: Styles, 
                       context: CanvasRenderingContext2D, 
                       classComb: Set<unknown>, 
                       dataContainer: any) {
        this.styles = style;
        this.classComb = classComb;
        this.context = context;
        this.dataContainer = dataContainer;
    }

    public draw() {
        this.classComb.forEach((comb: string) => {
            const objectStyles = this.styles.get(comb)
            this.setContext(objectStyles);
            const r = this.render;
            const ctx = this.context;
            this.dataContainer
            .selectAll(`[class="${comb}"]`)
            .each(function() {
                r(d3.select(this), ctx);
            });
        });
    }

    protected abstract setContext(objectStyles: any): void;
    protected abstract render(shape: object, context: CanvasRenderingContext2D): void;
}

export class LinesDrawer extends DrawTemplate {
    protected setContext(objectStyles: any): void {
        this.context.strokeStyle = objectStyles['stroke'] || 'black';
        this.context.lineWidth = objectStyles['stroke-width'] || 1;
    }

    protected render(shape: any, context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.moveTo(+shape.attr('x1'), +shape.attr('y1'));
        context.lineTo(+shape.attr('x2'), +shape.attr('y2'));
        context.stroke();
    }
}

export class CirclesDrawer extends DrawTemplate {
    protected setContext(objectStyles: any): void {
        this.context.strokeStyle = objectStyles['stroke'] || 'black';
        this.context.fillStyle = objectStyles['fill'] || 'white';
        this.context.lineWidth = objectStyles['stroke-width'] || 1;
    }

    protected render(shape: any, context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.arc(+shape.attr('cx'), +shape.attr('cy'), +shape.attr('r'), 0, 2 * Math.PI);
        context.fill();
    }
}

export class TextDrawer extends DrawTemplate {
    private translate = new Map([
        ['start', 'left'],
        ['middle', 'center'],
        ['end', 'right']
    ]);

    protected setContext(objectStyles: any): void {
        const fontSize = () => {
            const k = objectStyles['k'] || 1;
            return objectStyles['font-size'].slice(0,-2) * k + 'px';
        }
        fontSize();
        this.context.font = 
            (objectStyles['font-weight'] || 'normal') + ' ' + 
            (fontSize() || '6px') + ' ' + 
            (objectStyles['font-family'] || 'Helvetica');
        this.context.fillStyle = objectStyles['fill'] || 'black';
        this.context.textAlign = this.translate.get(objectStyles['text-anchor'] || 'middle') as CanvasTextAlign;
        this.context.textBaseline = objectStyles['baseline'] || 'middle';
    }

    protected render(shape: any, context: CanvasRenderingContext2D): void {
        context.fillText(shape.attr('text'), +shape.attr('x'), +shape.attr('y'));
    }
}
