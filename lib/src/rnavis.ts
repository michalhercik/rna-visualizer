import * as d3 from 'd3';
import { BasePair, Label, Style, Residue, RNAData } from './interfaces';
import { Styles } from './classes';
import { drawLines, drawTexts, drawCircles } from './draw';
import DataContainer from './dataContainer'
import TitlePresenter from './titlePresenter';
import ContainerUpdater from './containerUpdater';
import ContainerFactory from './containerFactory';

export class RNAVis {
    private margin = 10;
    private canvas;    
    public readonly dataContainer: Array<DataContainer>;
    private titlePresenter: TitlePresenter;
    private updater: ContainerUpdater;

    constructor(element: HTMLElement, data: RNAData) {
        const styles = new Styles(data);
        this.dataContainer = new Array<DataContainer>();
        this.dataContainer.push(new ContainerFactory().create(data, styles));
        this.updater = new ContainerUpdater();

        this.canvas = d3.select(element)
        .append('canvas')
        this.canvas.style('background-color', 'white');
        this.setDimensions();

        const ctx = this.canvas.node().getContext('2d');
        ctx.globalAlpha = 0.4;
        this.titlePresenter = new TitlePresenter(ctx, styles);
    }

    public addZoom() {
        const zoom = d3.zoom()
        .scaleExtent([1,10])
        .on('zoom', (event) => {
            this.dataContainer.forEach((container) => this.updater.update(event, container));
            this.draw();
            this.titlePresenter.updateRes(null);
        });
        this.canvas.call(zoom);
    }

    public draw(): void {
        const ctx = this.canvas.node().getContext('2d', {alpha: false});
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.dataContainer.forEach((container) => {
            drawLines(container.getLines(), ctx, container.styles);
            drawCircles(container.getCircles(), ctx, container.styles);
            drawTexts(container.getTexts(), ctx, container.styles);
        });
    }

    public addHoverLabel() {
        this.canvas.node().onmousemove = (event) => {
            const rect = this.canvas.node().getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const res = this.dataContainer[0].getResByCoor(x, y); 
            if (this.titlePresenter.updateRes(res)) {
                this.draw();
                if (res)
                    this.titlePresenter.presentResTitle();
            }
        };
    }

    public addData(data: RNAData): void {
        this.dataContainer.push(new ContainerFactory().create(data, this.dataContainer[0].styles));

    }
    
    private setDimensions(): void {
        const scale = 2;
        this.canvas
        .attr('width', scale * this.dataContainer[0].width)
        .attr('height', scale * this.dataContainer[0].height)
        .style('width', (+this.canvas.attr('width') / scale) + 'px');
        this.canvas.node().getContext('2d').scale(scale, scale);
    }
}

