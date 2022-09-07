import * as d3 from 'd3';
import { BasePair, Label, Style, Residue, RNAData } from './interfaces';
import { Styles } from './classes';
import { LinesDrawer, CirclesDrawer, TextDrawer } from './draw';
import DataContainer from './dataContainer';
import TitlePresenter from './titlePresenter';

export * from './interfaces';

export class RNAVis {
    private margin = 10;
    private canvas;    
    private dataContainer;
    private linesDrawer;
    private circlesDrawer;
    private textDrawer;
    private titlePresenter

    constructor(element: HTMLElement, data: RNAData) {
        const styles = new Styles(data);
        this.dataContainer = new DataContainer(data, styles);
        this.canvas = d3.select(element)
        .append('canvas')
        this.setDimensions();
        const context = this.canvas.node().getContext('2d');
        this.titlePresenter = new TitlePresenter(context, styles);
        this.linesDrawer = new LinesDrawer(styles, 
            this.canvas.node().getContext('2d'), 
            this.dataContainer.classComb.line, 
            this.dataContainer);
        this.circlesDrawer = new CirclesDrawer(styles,
            this.canvas.node().getContext('2d'), 
            this.dataContainer.classComb.circle, 
            this.dataContainer);
        this.textDrawer = new TextDrawer(styles,
            this.canvas.node().getContext('2d'), 
            this.dataContainer.classComb.text, 
            this.dataContainer);
    }
    private setDimensions(): void {
        const scale = 2;
        this.canvas
        .attr('width', scale * this.dataContainer.getWidth())
        .attr('height', scale * this.dataContainer.getHeight())
        .attr('style', 'width: ' + (+this.canvas.attr('width') / scale) + 'px');
        this.canvas.node().getContext('2d').scale(scale, scale);
    }
    private mouseMove(event: any) {
        const rect = this.canvas.node().getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const res = this.dataContainer.getResByCoor(x, y); 
        if (this.titlePresenter.updateRes(res)) {
            this.draw();
            if (res)
                this.titlePresenter.presentResTitle();
        }
    }
    public addZoom() {
        const zoom = d3.zoom()
        .scaleExtent([1,10])
        .on('zoom', (event) => {
            this.dataContainer.update(event);
            this.draw();
            this.mouseMove(event.sourceEvent);
            const rect = this.canvas.node().getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const res = this.dataContainer.getResByCoor(x, y); 
            this.titlePresenter.updateRes(res)
            if (res) {
                this.titlePresenter.presentResTitle();
            }
        });
        this.canvas.call(zoom);
    }
    public draw(): void {
        const context = this.canvas.node().getContext('2d');
        context.fillStyle = '#fff';
        context.rect(0, 0, +this.canvas.attr('width'), +this.canvas.attr('height'));
        context.fill();
        this.linesDrawer.draw();
        this.circlesDrawer.draw();
        this.textDrawer.draw();
    }
    public addHoverLabel() {
        this.canvas.node().onmousemove = (event) => {
            const rect = this.canvas.node().getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const res = this.dataContainer.getResByCoor(x, y); 
            if (this.titlePresenter.updateRes(res)) {
                this.draw();
                if (res)
                    this.titlePresenter.presentResTitle();
            }
        };
    }
}

