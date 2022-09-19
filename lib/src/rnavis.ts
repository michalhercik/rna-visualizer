import * as d3 from 'd3';
import { BasePair, Label, Style, Residue, RNAData } from './interfaces';
import { Styles } from './classes';
import { LinesDrawer, CirclesDrawer, TextDrawer } from './draw';
import DataContainer from './dataContainer';
import TitlePresenter from './titlePresenter';

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
        this.canvas.style('background-color', 'white');
        this.setDimensions();
        const context = this.canvas.node().getContext('2d', {alpha: false});
        this.titlePresenter = new TitlePresenter(context, styles);
        this.linesDrawer = new LinesDrawer(styles, 
            context,
            this.dataContainer.classComb.line, 
            this.dataContainer);
        this.circlesDrawer = new CirclesDrawer(styles,
            context,
            this.dataContainer.classComb.circle, 
            this.dataContainer);
        this.textDrawer = new TextDrawer(styles,
            context,
            this.dataContainer.classComb.text, 
            this.dataContainer);
    }

    public addZoom() {
        const zoom = d3.zoom()
        .scaleExtent([1,10])
        .on('zoom', (event) => {
            this.dataContainer.update(event);
            this.draw();
            this.titlePresenter.updateRes(null);
        });
        this.canvas.call(zoom);
    }

    public draw(): void {
        const context = this.canvas.node().getContext('2d', {alpha: false});
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
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
    
    private setDimensions(): void {
        const scale = 2;
        this.canvas
        .attr('width', scale * this.dataContainer.width)
        .attr('height', scale * this.dataContainer.height)
        .style('width', (+this.canvas.attr('width') / scale) + 'px');
        this.canvas.node().getContext('2d').scale(scale, scale);
    }
}

