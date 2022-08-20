import { Styles } from './classes';
import DataContainer from './dataContainer';
declare abstract class DrawTemplate {
    protected styles: Styles;
    protected classComb: Set<unknown>;
    protected context: CanvasRenderingContext2D;
    protected dataContainer: DataContainer;
    constructor(style: Styles, context: CanvasRenderingContext2D, classComb: Set<unknown>, dataContainer: DataContainer);
    draw(): void;
    protected abstract setContext(objectStyles: any): void;
    protected abstract render(shape: object, context: CanvasRenderingContext2D): void;
}
export declare class LinesDrawer extends DrawTemplate {
    protected setContext(objectStyles: any): void;
    protected render(shape: any, context: CanvasRenderingContext2D): void;
}
export declare class CirclesDrawer extends DrawTemplate {
    protected setContext(objectStyles: any): void;
    protected render(shape: any, context: CanvasRenderingContext2D): void;
}
export declare class TextDrawer extends DrawTemplate {
    private translate;
    protected setContext(objectStyles: any): void;
    protected render(shape: any, context: CanvasRenderingContext2D): void;
}
export {};
