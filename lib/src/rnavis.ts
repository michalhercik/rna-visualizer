import * as d3 from 'd3';
import { RNAData } from './interfaces';
import { Styles } from './classes';
import { drawLines, drawTexts, drawCircles } from './draw';
import DataContainer from './dataContainer'
import { Title } from './titlePresenter';
import ContainerFactory from './containerFactory';
import { getBestGroup, Group, createGroups} from './align';
import { Vector2, Residue } from './rna/data-structures';
import { Animation, RnaPositionRecord } from './animation';
import { MappingLine } from './mappingLine';
import { ColorGenerator } from './colorGenerator';

export class Layer {
    public name: string;
    public data: DataContainer;
    public mappingLines: MappingLine[];
    public visible: boolean = true;

    constructor(data: DataContainer, name: string, mappingLines: MappingLine[], visible: boolean = true) {
        this.name = name;
        this.data = data;
        this.mappingLines = mappingLines;
        this.visible = visible;
    }
}

export class RNAVis {
    private margin = 10;
    public canvas;    
    public readonly layers: Layer[];
    private styles: Styles;
    private zoom;

    constructor(canvas: HTMLCanvasElement) {
        this.styles = new Styles();
        this.layers = new Array<Layer>();
        this.zoom = d3.zoom();

        this.canvas = d3.select(canvas)

        const ctx = this.canvas.node().getContext('2d');
        // this.titlePresenter = new TitlePresenter(ctx, this.styles);
    }

    public addZoom(): RNAVis {
        this.zoom
        .scaleExtent([0,10])
        .on('zoom', (event) => {
            this.layers.forEach(layer => layer.data.update(event));
            this.draw();
        });
        this.canvas.call(this.zoom);
        return this;
    }

    public draw(): void {
        const ctx = this.canvas.node().getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.layers.forEach((layer) => {
            if (layer.visible) {
                drawLines(layer.data.getLines(), ctx, layer.data.styles);
                drawLines(layer.mappingLines, ctx, this.styles);
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

    public drawHoverLabel(x: number, y: number) {
        const residues = this.layers
        .filter(layer => layer.visible)
        .map(layer => layer.data.getResByCoor(x, y))
        .filter(res => res !== null);

        if (residues.length > 0) {
            const canvas = this.canvas.node();
            const title = Title.fromResidues(residues, canvas.width, canvas.height, this.styles);
            const ctx = this.canvas.node().getContext('2d');
            title.draw(ctx);
        }
    }

    public addData(data: RNAData, name: string, visible: boolean = true): void {
        this.styles.addFrom(data.classes);
        const cont = new ContainerFactory().create(data, this.styles);
        let mappingLines: MappingLine[] = [];
        if (this.layers.length > 0) {
            const mappingName = name + 'mapping-line';
            const color = ColorGenerator.newColor();
            this.styles.set(mappingName, {stroke: color});
            mappingLines = MappingLine.createMappingLines(this.layers[0].data, cont, [mappingName]);
        }
        const newLayer = new Layer(cont, name, mappingLines, visible);
        this.layers.push(newLayer);
        const alpha = this.getDefaultAlpha();
        this.setAlpha(alpha);
    }

    public clear() {
        this.styles.reset();
        this.layers.length = 0;
        this.resetPositions();
        const ctx = this.canvas.node().getContext('2d', {alpha: false});
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    public align(groupIndex: number = -1, minGroupSize: number = 5): Vector2[] {
        let shifts: Vector2[] = [new Vector2(0, 0)];

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

    public getAlignmentToTempResidue(tempRes: Residue): RnaPositionRecord[] {
        let animTargets: RnaPositionRecord[] = [];
        const containers = this.getDataContainers();

        for (let i = 1; i < containers.length; ++i) {
            const residue = containers[i].residues.find(res => res.templateIndex === tempRes.index);
            if (residue) {
                const shift = Vector2.subtraction(tempRes.getCoor(), residue.getCoor());
                animTargets.push(RnaPositionRecord.fromTranslation(containers[i], shift));
            } else {
                animTargets.push(RnaPositionRecord.fromDataContainer(containers[i]));
            }
        }
        return animTargets;
    }

    public getLayerIndex(name: string): number {
        return this.layers.map(layer => layer.name).indexOf(name);
    }

    public translate(translations: Vector2[]): RNAVis {
        if (translations.length !== this.layers.length) {
            throw new Error('translations.length !== this.layers.length');
        } else {
            this.layers.forEach((layer, index) => layer.data.translate(translations[index]))
        }
        return this;
    }

    public getDefaultAlpha(): number {
        let visibleCount = this.layers.filter(l => l.visible).length
        visibleCount = visibleCount === 0 ? 1 : visibleCount;
        const alpha = 1 / visibleCount;
        return alpha;
    }

    public setAlpha(alpha: number): RNAVis {
        this.canvas.node().getContext('2d').globalAlpha = alpha;
        return this;
    }

    public setVisibility(index: number, visibility: boolean): RNAVis {
        this.layers[index].visible = visibility;
        return this;
    }

    public setVisibilityByName(name: string, visible: boolean): void {
        const index = this.getLayerIndex(name);
        if (index > -1) {
            this.setVisibility(index, visible);
        }
    }

    public setAllVisibility(visible: boolean): RNAVis {
        this.layers.forEach(layer => layer.visible = visible);
        return this;
    }

    public numberingLabelsVisibility(visible: boolean): void {
        this.layers
        .map(layer => layer.data.labels)
        .flat(1)
        .forEach(label => label.setVisible(visible));
    }

    public resetPositions() {
        this.canvas.call(this.zoom.transform, d3.zoomIdentity);
    }

    public getDataContainers(): Array<DataContainer> {
        return this.layers.map(layer => layer.data);
    }
}
