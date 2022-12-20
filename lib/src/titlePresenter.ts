import { Styles } from './classes'

export default class TitlePresenter {
    private res: any;
    private styles;
    private context;
    private fontSize = 11;

    public constructor(context: CanvasRenderingContext2D, styles: Styles) {
        this.context = context;
        this.styles = styles;
    }
    public presentResTitle(): void {
        if (!this.res)
            return;
        const resStyles = this.styles.get(this.res.getClasses());
        const size = +resStyles['font-size'].slice(0,-2) * (+resStyles['k'] || 1); 
        const margin = size/2;
        const titleOverflow = this.doesTitleOverflow(margin);
        this.context.save();
        this.setBgContext();
        this.drawBg(margin, titleOverflow);
        this.setTextContext();
        this.drawText(margin, titleOverflow);
        this.context.restore();
    }
    public updateRes(res: any): boolean {
        const change = JSON.stringify(this.res) !== JSON.stringify(res);
        if (change)
            this.res = res;
        return change;
    }
    private doesTitleOverflow(margin: number): boolean {
        const canvasWidth = this.context.canvas.clientWidth;
        const titleWidth = this.getTitleWidth();
        const titleEnd = this.res.getX() + margin + titleWidth;
        return titleEnd >= canvasWidth;
    }
    private setBgContext(): void {
        this.context.globalAlpha = 1;
        this.context.strokeStyle = '#ccc';
        this.context.lineWidth = 1;
        this.context.fillStyle = '#eee';
    }
    private drawBg(margin: number, left: boolean): void {
        this.setFont();
        const titleWidth = this.getTitleWidth();
        const padding = 5;
        const x = left ? (this.res.getX() - margin - this.getTitleWidth()) : (this.res.getX() + margin)
        this.context.fillRect(
            x - padding, 
            this.res.getY() - margin, 
            titleWidth + 2 * padding, 
            this.fontSize + padding);
        this.context.strokeRect(
            x - padding, 
            this.res.getY() - margin, 
            titleWidth + 2 * padding, 
            this.fontSize + padding);
    }
    private getTitleWidth(): number {
        this.setFont(); 
        return this.context.measureText(this.res.getTitle()).width;
    }
    private setFont(): void {
        this.context.font = `normal ${this.fontSize}px Helvetica`;
    }
    private setTextContext(): void {
        this.setFont();
        this.context.globalAlpha = 1;
        this.context.fillStyle = 'black';
        this.context.textAlign = 'left';
        this.context.textBaseline = 'top';
    }
    private drawText(margin: number, left: boolean): void {
        const x = left ? (this.res.getX() - margin - this.getTitleWidth()) : (this.res.getX() + margin)
        this.context.fillText(
            this.res.getTitle(), 
            x, 
            this.res.getY() - margin + 4);
    }
}
