import * as d3 from 'd3';
import { Styles } from './styles';
import { IRnaInput } from './rnaInput';
import { Draw } from './draw';
import {
    DataContainer,
    ContainerFactory,
    TranslationGroups,
} from './data';
import {
    Title,
    Vector2,
    Residue,
    MappingLine,
    PositionRecord,
    Layer,
} from './components';

export class RnaVis {
    public canvas;
    public readonly layers: Layer[];
    private styles: Styles;
    private zoom;

    constructor(canvas: HTMLCanvasElement) {
        this.styles = new Styles();
        this.layers = new Array<Layer>();
        this.zoom = d3.zoom();

        this.canvas = canvas;
    }

    public addZoom(): RnaVis {
        this.zoom
            .scaleExtent([0, 10])
            .on('zoom', (event) => {
                this.layers.forEach(layer => layer.data.update(event));
                this.draw();
            });
        d3.select(this.canvas).call(this.zoom);
        return this;
    }

    public draw(): void {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.layers.forEach((layer) => {
            if (layer.visible) {
                Draw.Lines(layer.data.getLines(), ctx, layer.data.styles);
                Draw.Lines(layer.mappingLines, ctx, this.styles);
            }
        });

        this.layers.forEach((layer) => {
            if (layer.visible) {
                Draw.Circles(layer.data.getCircles(), ctx, layer.data.styles);
            }
        });

        this.layers.forEach((layer) => {
            if (layer.visible) {
                Draw.Texts(layer.data.getText(), ctx, layer.data.styles);
            }
        });
    }

    public drawHoverLabel(x: number, y: number) {
        const residues = this.layers
            .filter(layer => layer.visible)
            .map(layer => layer.data.getResByCoor(x, y))
            .filter(res => res !== null);

        if (residues.length > 0) {
            const title = Title.fromResidues(residues, this.canvas.width, this.canvas.height, this.styles);
            const ctx = this.canvas.getContext('2d');
            title.draw(ctx);
        }
    }

    public addData(data: IRnaInput, name: string, visible: boolean = true): void {
        this.styles.addFrom(data.classes);
        const cont = new ContainerFactory().create(data, this.styles);
        let mappingLines: MappingLine[] = [];
        if (this.layers.length > 0) {
            const mappingName = name + 'mapping-line';
            const color = Styles.randomHexColor();
            this.styles.set(mappingName, { stroke: color });
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
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    public align(groupIndex: number = -1, minGroupSize: number = 5): Vector2[] {
        let shifts: Vector2[] = [new Vector2(0, 0)];

        if (this.layers.length < 2) {
            return shifts;
        }

        const layers = this.layers;
        const containers = this.getDataContainers();
        let groups = TranslationGroups.create(containers[0], containers[1], null, minGroupSize);
        if (groupIndex >= groups.length) {
            return shifts;
        }

        let group = groupIndex == -1 ? TranslationGroups.getBest(groups) : groups[groupIndex];
        if (group) {
            shifts.push(
                new Vector2(group.xShift, group.yShift)
            );

            for (let i = 2; i < layers.length; ++i) {
                groups = TranslationGroups.create(layers[0].data, layers[i].data, group);
                if (groups.length > 0) {
                    let bestGroup = TranslationGroups.getBest(groups);
                    shifts.push(
                        new Vector2(bestGroup.xShift, bestGroup.yShift)
                    );
                } else {
                    groups = TranslationGroups.create(layers[0].data, layers[i].data);
                    let bestGroup = TranslationGroups.getBest(groups);
                    shifts.push(
                        new Vector2(bestGroup.xShift, bestGroup.yShift)
                    );
                }
            }
        }
        return shifts;
    }

    public getAlignmentToTempResidue(tempRes: Residue): PositionRecord[] {
        let animTargets: PositionRecord[] = [];
        const containers = this.getDataContainers();

        for (let i = 1; i < containers.length; ++i) {
            const residue = containers[i].residues.find(res => res.templateIndex === tempRes.index);
            if (residue) {
                const shift = Vector2.subtraction(tempRes.getCoor(), residue.getCoor());
                animTargets.push(
                    PositionRecord.fromTranslation(containers[i], shift)
                );
            } else {
                animTargets.push(
                    PositionRecord.fromDataContainer(containers[i])
                );
            }
        }
        return animTargets;
    }

    public getLayerIndex(name: string): number {
        return this.layers
            .map(layer => layer.name)
            .indexOf(name);
    }

    public translate(translations: Vector2[]): RnaVis {
        if (translations.length !== this.layers.length) {
            throw new Error('translations.length !== this.layers.length');
        } else {
            this.layers.forEach((layer, index) => layer.data.translate(translations[index]));
        }
        return this;
    }

    public getDefaultAlpha(): number {
        let visibleCount = this.layers.filter(l => l.visible).length;
        visibleCount = visibleCount === 0 ? 1 : visibleCount;
        const alpha = 1 / visibleCount;
        return alpha;
    }

    public setAlpha(alpha: number): RnaVis {
        this.canvas.getContext('2d').globalAlpha = alpha;
        return this;
    }

    public setVisibility(index: number, visibility: boolean): RnaVis {
        this.layers[index].visible = visibility;
        return this;
    }

    public setVisibilityByName(name: string, visible: boolean): void {
        const index = this.getLayerIndex(name);
        if (index > -1) {
            this.setVisibility(index, visible);
        }
    }

    public setAllVisibility(visible: boolean): RnaVis {
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
        d3.select(this.canvas)
            .call(this.zoom.transform, d3.zoomIdentity);
    }

    public getDataContainers(): Array<DataContainer> {
        return this.layers.map(layer => layer.data);
    }
}
