import * as d3 from 'd3';
import { RNAData } from './interfaces';
import { Styles } from './classes';
import { drawLines, drawTexts, drawCircles } from './draw';
import DataContainer from './dataContainer'
import TitlePresenter from './titlePresenter';
import ContainerFactory from './containerFactory';
import { getBestGroup, Group, createGroups} from './align';
import { Vector2, Residue } from './rna/data-structures';
import { Animation, AnimationState } from './animation';

export class Layer {
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
    public canvas;    
    public readonly layers: Layer[];
    private titlePresenter: TitlePresenter;
    private styles: Styles;
    private zoom;

    constructor(element: HTMLCanvasElement) {
        this.styles = new Styles();
        this.layers = new Array<Layer>();
        this.zoom = d3.zoom();

        this.canvas = d3.select(element)

        const ctx = this.canvas.node().getContext('2d');
        this.titlePresenter = new TitlePresenter(ctx, this.styles);
    }

    public addZoom() {
        this.zoom
        .scaleExtent([0,10])
        .on('zoom', (event) => {
            Array.from(this.layers.values()).forEach((layer) => layer.data.update(event));
            this.draw();
            this.titlePresenter.updateRes(null);
        });
        this.canvas.call(this.zoom);
    }

    public draw(): void {
        const ctx = this.canvas.node().getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.updateAlpha();

        this.layers.forEach((layer) => {
            if (layer.visible) {
                drawLines(layer.data.getLines(), ctx, layer.data.styles);
            }
        });

        this.layers.forEach((layer) => {
            if (layer.visible) {
                drawCircles(layer.data.getCircles(), ctx, layer.data.styles);
            }
        });

        this.layers.forEach((layer) => {
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
        const ctx = this.canvas.node().getContext('2d', {alpha: false});
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    public align(groupIndex: number = -1, minGroupSize: number = 5): Vector2[] {
        let shifts: Vector2[] = [];

        if (this.layers.length < 2) {
            return shifts;
        }

        const layers = this.layers;
        const containers = this.getDataContainers();
        let groups = createGroups(containers[0], containers[1], null, minGroupSize);
        if (groupIndex >= groups.length) {
            console.log("group index is too big!");
            return shifts;
        }


        let group = groupIndex == -1 ? getBestGroup(groups) : groups[groupIndex];
        if (group) {
            shifts.push(new Vector2(group.xShift, group.yShift));

            for (let i = 2; i < layers.length; ++i) {
                groups = createGroups(layers[0].data, layers[i].data, group);
                if (groups.length > 0) {
                    let bestGroup = getBestGroup(groups);
                    shifts.push(new Vector2(bestGroup.xShift, bestGroup.yShift));
                } else {
                    groups = createGroups(layers[0].data, layers[i].data);
                    let bestGroup = getBestGroup(groups);
                    shifts.push(new Vector2(bestGroup.xShift, bestGroup.yShift));
                }
            }
        }
        return shifts;
    }

    public getAlignmentToTempResidue(tempRes: Residue): AnimationState[] {
        let animTargets: AnimationState[] = [];
        const containers = this.getDataContainers();

        for (let i = 1; i < containers.length; ++i) {
            const residue = containers[i].residues.find(res => res.templateIndex === tempRes.index);
            if (residue) {
                const shift = Vector2.subtraction(tempRes.getCoor(), residue.getCoor());
                animTargets.push(AnimationState.fromTranslation(containers[i], shift));
            } else {
                animTargets.push(AnimationState.fromDataContainer(containers[i]));
            }
        }
        return animTargets;
    }

    public getLayerIndex(name: string): number {
        return this.layers.map(layer => layer.name).indexOf(name);
    }

    public updateAlpha(): RNAVis {
        let visibleCount = this.layers.filter(l => l.visible).length
        visibleCount = visibleCount === 0 ? 1 : visibleCount;
        this.canvas.node().getContext('2d').globalAlpha = 1 / visibleCount;
        return this;
    }


    public setVisibility(index: number, visibility: boolean): RNAVis {
        if (this.layers[index].visible !== visibility) {
            this.layers[index].visible = visibility;
        }
        return this;
    }

    public showByName(name: string): RNAVis {
        const index = this.getLayerIndex(name);
        if (index > -1) {
            this.showByIndex(index);
        }
        return this;
    }

    public hideByName(name: string): RNAVis {
        const index = this.getLayerIndex(name);
        if (index > -1) {
            this.hideByIndex(index);
        }
        return this;
    }

    public showByIndex(index: number): RNAVis {
        this.setVisibility(index, true);
        return this;
    }

    public hideByIndex(index: number): RNAVis {
        this.setVisibility(index, false);
        return this;
    }

    public hideAll(): RNAVis {
        for (let i = 0; i < this.layers.length; ++i) {
            this.hideByIndex(i);
        }
        return this;
    }

    public resetPositions() {
        this.canvas.call(this.zoom.transform, d3.zoomIdentity);
    }

    public getDataContainers(): Array<DataContainer> {
        return this.layers.map(layer => layer.data);
    }
}

