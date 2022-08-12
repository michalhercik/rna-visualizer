import * as d3 from 'd3';
import { Styles } from './classes';

abstract class DrawTemplate {
    protected styles;

    public constructor(style: Styles) {
        this.styles = style;
    }

    public draw(context: CanvasRenderingContext2D, classComb: Set<unknown>, dataContainer: any) {
        classComb.forEach((comb: string) => {
            const objectStyles = this.styles.get(comb)
            this.setContext(context, objectStyles);
            // TODO: probably better way to do this
            const a = this.do;
            dataContainer
            .selectAll('[class="' + comb + '"]')
            .each(function() {
                const node = d3.select(this);
                a(context, node);
            });
        });
    }

    protected abstract setContext(ctx: CanvasRenderingContext2D, objectStyles: any): void;
    protected abstract do(context: CanvasRenderingContext2D, shape: object): void;
}

export class LinesDrawer extends DrawTemplate {
    protected setContext(context: CanvasRenderingContext2D, objectStyles: any): void {
        context.strokeStyle = objectStyles['stroke'] || 'black';
        context.lineWidth = objectStyles['stroke-width'] || 1;
    }

    protected do(context: CanvasRenderingContext2D, shape: any): void {
        context.beginPath();
        context.moveTo(+shape.attr('x1'), +shape.attr('y1'));
        context.lineTo(+shape.attr('x2'), +shape.attr('y2'));
        context.stroke();
    }
}

export class CirclesDrawer extends DrawTemplate {
    protected setContext(context: CanvasRenderingContext2D, objectStyles: any): void {
        context.strokeStyle = objectStyles['stroke'] || 'black';
        context.fillStyle = objectStyles['fill'] || 'white';
        context.lineWidth = objectStyles['stroke-width'] || 1;
    }

    protected do(context: CanvasRenderingContext2D, shape: any): void {
        context.beginPath();
        context.arc(+shape.attr('cx'), +shape.attr('cy'), +shape.attr('r'), 0, 2 * Math.PI);
        context.fill();
    }
}

export class TextDrawer extends DrawTemplate {
    private translate = new Map();

    public constructor(style: Styles) {
        super(style);
        this.translate.set('start', 'left');
        this.translate.set('middle', 'center');
        this.translate.set('end', 'right');
    }
    protected setContext(context: CanvasRenderingContext2D, objectStyles: any): void {
        context.font = 
            (objectStyles['font-weight'] || 'normal') + ' ' + 
            (objectStyles['font-size'] || '6px') + ' ' + 
            (objectStyles['font-family'] || 'Helvetica');
        context.fillStyle = objectStyles['fill'] || 'black';
        context.textAlign = this.translate.get(objectStyles['text-anchor'] || 'middle');
        context.textBaseline = objectStyles['baseline'] || 'middle';
    }

    protected do(context: CanvasRenderingContext2D, shape: any): void {
        context.fillText(shape.attr('text'), +shape.attr('x'), +shape.attr('y'));
    }
}
