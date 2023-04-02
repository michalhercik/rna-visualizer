import * as d3 from 'd3';
import { Styles } from './styles';
import { IRnaInput } from './rna-input';
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
    Layer,
} from './components';

/**
 * RNA visualization tool for displaying RNA secondary structures
 * on a canvas element.
 */
export class RnaVis {
    /**
     * The canvas element to render the RNA secondary structures on.
     */
    public canvas;
    /**
     * An array of layers for each RNA secondary structure.
     */
    public readonly layers: Layer[];
    /**
     * The styles to use for rendering the RNA secondary structures.
     */
    private styles: Styles;
    /**
     * The zoom behavior for the canvas element.
     */
    private zoom;

    /**
     * Constructs a new RnaVis instance with the specified canvas element.
     * @param canvas - The canvas element to render the RNA secondary structures on.
     */
    constructor(canvas: HTMLCanvasElement) {
        this.styles = new Styles();
        this.layers = new Array<Layer>();
        this.zoom = d3.zoom();

        this.canvas = canvas;
    }

    /**
     * Adds zoom behavior to the canvas element.
     * @returns This RnaVis instance.
     */
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

    /**
     * Renders the RNA secondary structures on the canvas element.
     */
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

    /**
     * Draws the hover label for the specified coordinates.
     * @param x - The x-coordinate of the mouse pointer.
     * @param y - The y-coordinate of the mouse pointer.
     */
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

    /**
     * Adds a new layer for the specified RNA secondary structure
     * @param data - The input data for the RNA secondary structure.
     * @param name - The name to use for the new layer.
     * @param visible - Whether the new layer should be visible.
     */
    public addLayer(data: IRnaInput, name: string, visible: boolean = true): RnaVis {
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
        return this;
    }

    /**
     * Clears all layers and styles from the RnaVis instance, clears canvas and reset zoom.
     */
    public clear() {
        this.styles.reset();
        this.layers.length = 0;
        this.resetTransform();
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    /**
     * Creates translation vectors for aligning the RNA secondary structures to the template. 
     * @param groupIndex - The index of the generated translation group to use for alignment.
     * @param minGroupSize - The minimum size of a translation group.
     * @returns An array of translation vectors for each RNA secondary structure.
     */
    public align(groupIndex: number = -1, minGroupSize: number = 5): Vector2[] {
        let translations: Vector2[] = [new Vector2(0, 0)];

        if (this.layers.length < 2) {
            return translations;
        }

        const layers = this.layers;
        const containers = this.getDataContainers();
        let groups = TranslationGroups.create(containers[0], containers[1], null, minGroupSize);
        if (groupIndex >= groups.length) {
            return translations;
        }

        let group = groupIndex == -1 ? TranslationGroups.getBest(groups) : groups[groupIndex];
        if (group) {
            translations.push(
                new Vector2(group.xShift, group.yShift)
            );

            for (let i = 2; i < layers.length; ++i) {
                groups = TranslationGroups.create(layers[0].data, layers[i].data, group);
                if (groups.length > 0) {
                    let bestGroup = TranslationGroups.getBest(groups);
                    translations.push(
                        new Vector2(bestGroup.xShift, bestGroup.yShift)
                    );
                } else {
                    groups = TranslationGroups.create(layers[0].data, layers[i].data);
                    let bestGroup = TranslationGroups.getBest(groups);
                    translations.push(
                        new Vector2(bestGroup.xShift, bestGroup.yShift)
                    );
                }
            }
        }
        return translations;
    }

    /**
     * Gets the translation vectors for aligning the RNA secondary structures
     * to the specified template residue.
     * @param tempRes - The template residue to align the RNA secondary structures to.
     * @returns An array of translation vectors for each RNA secondary structure.
     */
    public getAlignmentToTempResidue(tempRes: Residue): Vector2[] {
        let translations: Vector2[] = [];
        const containers = this.getDataContainers();

        for (let i = 1; i < containers.length; ++i) {
            const residue = containers[i].residues.find(res => res.templateIndex === tempRes.index);
            if (residue) {
                translations.push(
                    Vector2.subtraction(tempRes.getCoor(), residue.getCoor())
                );
            } else {
                translations.push(Vector2.zero);
            }
        }
        return translations;
    }

    /**
     * Gets the index of the layer with the specified name.
     * @param name - The name of the layer.
     * @returns The index of the layer, or -1 if the layer was not found.
     */
    public getLayerIndex(name: string): number {
        return this.layers
            .map(layer => layer.name)
            .indexOf(name);
    }

    /**
     * Translates each RNA secondary structure by the specified vectors.
     * @param translations - An array of translation vectors for each RNA
     * secondary structure.
     * @returns This RnaVis instance.
     * @throws An error if the length of the translations array does not match
     * the number of RNA secondary structures.
     */
    public translate(translations: Vector2[]): RnaVis {
        if (translations.length !== this.layers.length) {
            throw new Error('translations.length !== this.layers.length');
        } else {
            this.layers.forEach((layer, index) => layer.data.translate(translations[index]));
        }
        return this;
    }

    /**
     * Gets the calculated alpha value based on the number of layers for
     * rendering the RNA secondary structures.
     * @returns The calculated alpha value.
     */
    public getDefaultAlpha(): number {
        let visibleCount = this.layers.filter(l => l.visible).length;
        visibleCount = visibleCount === 0 ? 1 : visibleCount;
        const alpha = 1 / visibleCount;
        return alpha;
    }

    /**
     * Set the global alpha value of the canvas context.
     * @param alpha - A number between 0 and 1 representing the opacity value.
     * @returns The RnaVis instance to allow for method chaining.
     */
    public setAlpha(alpha: number): RnaVis {
        this.canvas.getContext('2d').globalAlpha = alpha;
        return this;
    }

    /**
     * Set the visibility of a layer by its index.
     * @param index - The index of the layer to modify.
     * @param visibility - A boolean indicating whether the layer should be visible.
     * @returns The RnaVis instance to allow for method chaining.
     */
    public setVisibility(index: number, visibility: boolean): RnaVis {
        this.layers[index].visible = visibility;
        return this;
    }

    /**
     * Set the visibility of a layer by its name.
     * @param name - The name of the layer to modify.
     * @param visibility - A boolean indicating whether the layer should be visible.
     * @returns The RnaVis instance to allow for method chaining.
     */
    public setVisibilityByName(name: string, visible: boolean): RnaVis {
        const index = this.getLayerIndex(name);
        if (index > -1) {
            this.setVisibility(index, visible);
        }
        return this;
    }

    /**
     * Set the visibility of all layers.
     * @param visible - A boolean indicating whether all layers should be visible.
     * @returns The RnaVis instance to allow for method chaining.
     */
    public setAllVisibility(visible: boolean): RnaVis {
        this.layers.forEach(layer => layer.visible = visible);
        return this;
    }

    /**
     * Set the visibility of all numbering labels showing the order of residues.
     * @param visible - A boolean indicating whether all numbering labels
     * should be visible.
     * @returns The RnaVis instance to allow for method chaining.
     */
    public numberingLabelsVisibility(visible: boolean): RnaVis {
        this.layers
            .map(layer => layer.data.labels)
            .flat(1)
            .forEach(label => label.setVisible(visible));
        return this;
    }

    /**
     * Discards zooming and panning of the canvas.
     * @returns The RnaVis instance to allow for method chaining.
     */
    public resetTransform(): RnaVis {
        d3.select(this.canvas)
            .call(this.zoom.transform, d3.zoomIdentity);
        return this;
    }

    /**
     * Get an array of DataContainer instances representing the data for each
     * layer.
     * @returns An array of DataContainer instances.
     */
    public getDataContainers(): Array<DataContainer> {
        return this.layers.map(layer => layer.data);
    }
}
