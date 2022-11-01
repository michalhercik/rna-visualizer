import * as d3 from 'd3';
import { BasePair, Label, Style, Residue, RNAData } from './interfaces';
import { Styles } from './classes';
import { Drawer, createDrawer } from './draw';
import DataContainer from './dataContainer'
import TitlePresenter from './titlePresenter';
import ContainerUpdater from './containerUpdater';
import ContainerFactory from './containerFactory';
import { animation } from './animation';

export class RNAVis {
    private margin = 10;
    private canvas;    
    public readonly dataContainer: DataContainer;
    public templDataContainer: DataContainer;
    private titlePresenter: TitlePresenter;
    private updater: ContainerUpdater;
    private drawer: Drawer;

    constructor(element: HTMLElement, data: RNAData) {
        const styles = new Styles(data);
        this.dataContainer = new ContainerFactory().create(data, styles, "rna");
        this.updater = new ContainerUpdater();

        this.canvas = d3.select(element)
        .append('canvas')
        this.canvas.style('background-color', 'white');
        this.setDimensions();

        const context = this.canvas.node().getContext('2d', {alpha: false});
        this.titlePresenter = new TitlePresenter(context, styles);
        this.drawer = createDrawer(
            context,
            styles,
            this.dataContainer
        );
    }

    public addZoom() {
        const zoom = d3.zoom()
        .scaleExtent([1,10])
        .on('zoom', (event) => {
            this.updater.update(event, this.dataContainer);
            this.draw();
            this.titlePresenter.updateRes(null);
        });
        this.canvas.call(zoom);
    }

    public draw(): void {
        const ctx = this.canvas.node().getContext('2d', {alpha: false});
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.drawer.draw(this.dataContainer);
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

    public addTemplate(data: RNAData): void {
        this.templDataContainer = new ContainerFactory().create(data, this.dataContainer.styles, "template");

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

