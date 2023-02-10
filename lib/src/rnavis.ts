import * as d3 from 'd3';
import { RNAData } from './interfaces';
import { Styles } from './classes';
import { drawLines, drawTexts, drawCircles } from './draw';
import DataContainer from './dataContainer'
import TitlePresenter from './titlePresenter';
import ContainerFactory from './containerFactory';
import { getBestGroup, Group, createGroups} from './align';
import { identity, Vector2 } from './rna/data-structures';
import { Animation, AnimationState } from './animation';

class Layer {
    public name;
    public data;
    public visible = true;

    constructor(data: DataContainer, name: string, visible: boolean = true) {
        this.name = name;
        this.data = data;
        this.visible = visible;
    }
}

export class RNAVis {
    private margin = 10;
    private canvas;    
    public readonly layers: Layer[];
    private titlePresenter: TitlePresenter;
    private styles: Styles;
    private zoom;

    constructor(element: HTMLElement) {
        this.styles = new Styles();
        this.layers = new Array<Layer>();
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
            Array.from(this.layers.values()).forEach((layer) => layer.data.update(event));
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
            if (layer.visible) {
                drawLines(layer.data.getLines(), ctx, layer.data.styles);
            }
        });

        layers.forEach((layer) => {
            if (layer.visible) {
                drawCircles(layer.data.getCircles(), ctx, layer.data.styles);
            }
        });

        layers.forEach((layer) => {
            if (layer.visible) {
                drawTexts(layer.data.getText(), ctx, layer.data.styles);
            }
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

    public addData(data: RNAData, name: string, visible: boolean = true): void {
        this.styles.addFrom(data.classes);
        const cont = new ContainerFactory().create(data, this.styles);
        const newLayer = new Layer(cont, name, !visible);
        this.layers.push(newLayer);
        this.updateDimensions(cont);
        const index = this.layers.length - 1;
        if (visible) {
            this.showByIndex(index);
        } else {
            this.hideByIndex(index);
        }
    }

    public clear() {
        this.styles.reset();
        this.layers.length = 0;
        this.setDimensions(100, 100, 1);
    }

    public align(groupIndex: number = -1, minGroupSize: number = 5, duration: number = 0) {
        if (this.layers.length < 2) {
            return;
        }

        const layers = this.layers;
        const containers = this.getDataContainers();
        let groups = createGroups(containers[0], containers[1], null, minGroupSize);

        if (groupIndex >= groups.length) {
            console.log("group index is too big!");
            return;
        }


        let group = groupIndex == -1 ? getBestGroup(groups) : groups[groupIndex];
        if (group) {
            let targets: AnimationState[] = [];

            targets.push(AnimationState.fromTranslation(containers[1], new Vector2(group.xShift, group.yShift)));

            for (let i = 2; i < layers.length; ++i) {
                groups = createGroups(layers[0].data, layers[i].data, group);
                let bestGroup = getBestGroup(groups);
                targets.push(AnimationState.fromTranslation(layers[i].data, new Vector2(bestGroup.xShift, bestGroup.yShift)));
            }

            new Animation(containers.slice(1), targets).animate(this, duration);
        }

    }

    public addClickAlign(duration: number = 0) {
        this.canvas.node().onclick = (event) => {
            const rect = this.canvas.node().getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const containers = this.getDataContainers();
            const bla = containers[0].getResByCoor(x, y); 

            if (bla !== null) {
                const target = bla;
                let animTargets: AnimationState[] = []
                for (let i = 1; i < containers.length; ++i) {
                    for (let residue of containers[i].residues) {
                        if (residue.templateIndex === target.index) {
                            const shift = Vector2.subtraction(target.getCoor(), residue.getCoor());
                            animTargets.push(AnimationState.fromTranslation(containers[i], shift));
                            break;
                        }
                    }
                }
                const anim = new Animation(containers.slice(1), animTargets);
                anim.animate(this, duration);
            }
        };
    }

    public getLayerIndex(name: string): number {
        return this.layers.map(layer => layer.name).indexOf(name);
    }

    public showByName(name: string): void {
        this.showByIndex(this.getLayerIndex(name));
    }

    public hideByName(name: string): void {
        this.hideByIndex(this.getLayerIndex(name));
    }

    public showByIndex(index: number) {
        if (!this.layers[index].visible) {
            this.layers[index].visible = true;
            if (this.layers.filter(l => l.visible).length > 1) {
                let oldAlpha = this.canvas.node().getContext('2d').globalAlpha;
                oldAlpha = oldAlpha > 0 ? oldAlpha : 1;
                const newAlpha = 1 / (Math.round(1 / oldAlpha) + 1);
                this.canvas.node().getContext('2d').globalAlpha = newAlpha;
            }
        }
    }

    public hideByIndex(index: number) {
        if (this.layers[index].visible) {
            this.layers[index].visible = false;
            if (this.layers.filter(l => l.visible).length > 0) {
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
            layer.data.update(identity);
        }
    }

    public getDataContainers(): Array<DataContainer> {
        return this.layers.map(layer => layer.data);
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

