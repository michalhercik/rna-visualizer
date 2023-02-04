import * as d3 from 'd3';
import { BasePair, Label, Style, Residue, RNAData } from './interfaces';
import { Styles } from './classes';
import { drawLines, drawTexts, drawCircles } from './draw';
import DataContainer from './dataContainer'
import TitlePresenter from './titlePresenter';
import ContainerUpdater from './containerUpdater';
import ContainerFactory from './containerFactory';
import { getBestGroup, Group, createGroups, translate } from './align';

class Layer {
    public id;
    public data;
    public visible = true;

    constructor(data: DataContainer, id: string, visible: boolean = true) {
        this.id = id;
        this.data = data;
        this.visible = visible;
    }
}

export class RNAVis {
    private margin = 10;
    private canvas;    
    // public readonly dataContainer: Array<DataContainer>;
    public readonly layers: Map<string, Layer>;
    private titlePresenter: TitlePresenter;
    private updater: ContainerUpdater;
    private styles: Styles;
    private zoom;

    constructor(element: HTMLElement) {
        this.styles = new Styles();
        this.layers = new Map<string, Layer>();
        this.updater = new ContainerUpdater();
        this.zoom = d3.zoom();

        this.canvas = d3.select(element)
        .append('canvas')
        this.canvas.style('background-color', 'white');

        const ctx = this.canvas.node().getContext('2d');
        this.titlePresenter = new TitlePresenter(ctx, this.styles);
    }

    public addZoom() {
        this.zoom
        .scaleExtent([1,10])
        .on('zoom', (event) => {
            Array.from(this.layers.values()).forEach((layer) => this.updater.update(event, layer.data));
            this.draw();
            this.titlePresenter.updateRes(null);
        });
        this.canvas.call(this.zoom);
    }

    public draw(): void {
        const ctx = this.canvas.node().getContext('2d', {alpha: false});
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        let layers = Array.from(this.layers.values());
        layers.forEach((layer) => {
            if (layer.visible)
                drawLines(layer.data.getLines(), ctx, layer.data.styles);
        });
        layers.forEach((layer) => {
            if (layer.visible)
                drawCircles(layer.data.getCircles(), ctx, layer.data.styles);
        });
        layers.forEach((layer) => {
            if (layer.visible)
                drawTexts(layer.data.getTexts(), ctx, layer.data.styles);
        });
    }

    public addHoverLabel() {
        this.canvas.node().onmousemove = (event) => {
            const rect = this.canvas.node().getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const res = Array.from(this.layers.values())[0].data.getResByCoor(x, y); 
            if (this.titlePresenter.updateRes(res)) {
                this.draw();
                if (res)
                    this.titlePresenter.presentResTitle();
            }
        };
    }

    public addData(data: RNAData, id: string, visible: boolean = true): void {
        this.styles.addFrom(data.classes);
        const cont = new ContainerFactory().create(data, this.styles);
        const newLayer = new Layer(cont, id, !visible);
        this.layers.set(id, newLayer);
        this.updateDimensions(cont);
        if (visible) {
            this.show(id);
        } else {
            this.hide(id);
        }
        this.align();
    }

    public clear() {
        this.styles.reset();
        this.layers.clear();
        this.setDimensions(100, 100, 1);
    }

    public align(groupIndex: number = -1, minGroupSize: number = 5) {
        if (this.layers.size < 2) {
            return;
        }

        const layers = Array.from(this.layers.values());
        const containers = this.getDataContainers();
        let groups = createGroups(containers[0], containers[1], null, minGroupSize);

        if (groupIndex >= groups.length) {
            console.log("group index is too big!");
            return;
        }

        let group = groupIndex == -1 ? getBestGroup(groups) : groups[groupIndex];
        if (group) {
            translate(containers[1], group.xShift, group.yShift);

            for (let i = 2; i < layers.length; ++i) {
                groups = createGroups(layers[0].data, layers[i].data, group);
                let bestGroup = getBestGroup(groups);
                translate(layers[i].data, bestGroup.xShift, bestGroup.yShift);
            }
        }
    }

    public addClickAlign() {
        this.canvas.node().onclick = (event) => {
            const rect = this.canvas.node().getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const containers = this.getDataContainers();
            const bla = containers[0].getResByCoor(x, y); 

            if (bla !== null) {
                const target = bla.residue;
                containers.forEach(container => {
                    for (let residue of container.getResidues()) {
                        if (residue.templateResidueIndex === target.residueIndex) {
                            translate(container, target.x - residue.x, target.y - residue.y);
                            break;
                        }
                    }
                })
                this.draw();
            }
        };
    }

    public show(id: string) {
        if (!this.layers.get(id).visible) {
            this.layers.get(id).visible = true;
            if (Array.from(this.layers.values()).filter(l => l.visible).length > 1) {
                let oldAlpha = this.canvas.node().getContext('2d').globalAlpha;
                oldAlpha = oldAlpha > 0 ? oldAlpha : 1;
                const newAlpha = 1 / (Math.round(1 / oldAlpha) + 1);
                this.canvas.node().getContext('2d').globalAlpha = newAlpha;
            }
        }
    }

    public hide(id: string) {
        if (this.layers.get(id).visible) {
            this.layers.get(id).visible = false;
            if (Array.from(this.layers.values()).filter(l => l.visible).length > 0) {
                let oldAlpha = this.canvas.node().getContext('2d').globalAlpha;
                oldAlpha = oldAlpha > 0 ? oldAlpha : 1;
                let visible = Math.round(1 / oldAlpha) - 1;
                visible = visible > 0 ? visible : 1;
                this.canvas.node().getContext('2d').globalAlpha = 1 / visible;
            }
        }
    }

    public resetPositions() {
        this.canvas.call(this.zoom.transform, d3.zoomIdentity);
        for (let layer of Array.from(this.layers.values())) {
            this.updater.update(d3.zoomIdentity, layer.data);
        }
    }

    public getDataContainers(): Array<DataContainer> {
        let containers = new Array<DataContainer>();
        for (let l of Array.from(this.layers.values())) {
            containers.push(l.data);
        }
        return containers
    }

    private setDimensions(width: number, height: number, scale: number = 2) {
        this.canvas
        .attr('height', scale * height)
        .attr('width', scale * width)
        .style('width', width + 'px');
        this.canvas.node().getContext('2d').scale(scale, scale);
    }

    private updateDimensions(data: DataContainer): void {
        let alpha = this.canvas.node().getContext('2d').globalAlpha;
        const scale = 2;
        if (scale * data.width > +this.canvas.attr('width')) {
            this.canvas
            .attr('width', scale * data.width)
            .style('width', (data.width) + 'px');
        }
        if (scale * data.height > +this.canvas.attr('height')) {
            this.canvas.attr('height', scale * data.height)
        }
        this.canvas.node().getContext('2d').scale(scale, scale);
        this.canvas.node().getContext('2d').globalAlpha = alpha;
    }
}

