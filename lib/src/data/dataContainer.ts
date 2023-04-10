import * as d3 from 'd3';
import {
    Label,
    BasePair,
    Residue,
    ILine,
    Text,
    Circle,
    Transformation,
    Vector2
} from '../components';
import { Styles } from '../styles';

/**
 * Represents a container that holds data for rendering a visualization.
 */
export class DataContainer {
    public readonly styles;
    public width: number;
    public height: number;

    public residues: Residue[];
    public basePairs: BasePair[];
    public labels: Label[];

    /**
     * Initializes a new instance of the DataContainer class.
     * @param residues - The residues to render.
     * @param basePairs - The base pairs to render.
     * @param labels - The labels to render.
     * @param styles - The styles to apply.
     */
    public constructor(residues: Residue[], basePairs: BasePair[], labels: Label[], styles: Styles) {
        this.residues = residues;
        this.basePairs = basePairs;
        this.labels = labels;
        this.styles = styles;
    }

    /**
     * Gets an array of ILine objects that represent the lines to render.
     * @returns An array of ILine objects.
     */
    public getLines(): ILine[] {
        return (this.basePairs as Array<unknown> as Array<ILine>)
            .concat(this.labels.map(l => l.line) as Array<unknown> as Array<ILine>);
    }

    /**
     * Gets an array of Text objects that represent the text to render.
     * @returns An array of Text objects.
     */
    public getText(): Text[] {
        return (this.residues.map(r => r.text))
            .concat(this.labels.map(l => l.text));
    }

    /**
     * Gets an array of Circle objects that represent the circles to render.
     * @returns An array of Circle objects.
     */
    public getCircles(): Circle[] {
        return this.residues.map(r => r.circle);
    }

    /**
     * Updates the visualization with the specified event.
     * @param event - The event to use for the update.
     */
    public update(event: any) {
        const width = this.width;
        const height = this.height;
        const x = d3.scaleLinear().domain([0, width]).range([0, width]);
        const y = d3.scaleLinear().domain([0, height]).range([0, height]);

        x.range([0, width].map(d => event.transform.applyX(d)));
        y.range([0, height].map(d => event.transform.applyY(d)));

        const transform: Transformation = { applyX: x, applyY: y };

        this.residues.forEach((res: Residue) => {
            res.setTransform(transform);
            res.circle.setScale(event.transform.k);
        });

        this.labels.forEach((label: Label) => {
            label.setTransform(transform);
        });

        this.styles.set(Styles.TRANSFORMED_CLASS, { k: event.transform.k });
    }

    /**
     * Gets the residue at the specified coordinates.
     * @param x - The x-coordinate.
     * @param y - The y-coordinate.
     * @returns The residue at the specified coordinates, or null if no such residue exists.
     */
    public getResByCoor(x: number, y: number): Residue {
        let result: Residue = null;
        this.residues.find((res: Residue) => {
            const resStyles = this.styles.get(res.getClasses());
            const k = resStyles['k'] || 1;
            const shift = (+resStyles['font-size'].slice(0, -2) || 7) * k / 2;

            if (x >= res.getTransformedX() - shift
                && x <= res.getTransformedX() + shift
                && y >= res.getTransformedY() - shift
                && y <= res.getTransformedY() + shift) {
                result = res;
            }
        });
        return result;
    }

    /**
     * Gets the closest residue to the specified coordinates within the specified maximum distance.
     * @param x - The x-coordinate.
     * @param y - The y-coordinate.
     * @param maxDistance - The maximum distance from the specified coordinates.
     * @returns The closest residue to the specified coordinates within the specified maximum distance, or null if no such residue exists.
     */
    public getClosestResByCoor(x: number, y: number, maxDistance = 100): Residue {
        let result: Residue = null;
        let resultDistance = Number.MAX_SAFE_INTEGER;
        const clickPosition = new Vector2(x, y);

        this.residues.forEach((res: Residue) => {
            const resCoor = res.getTransformedCoor();
            const distance = Vector2.distance(clickPosition, resCoor);
            if (distance < resultDistance) {
                result = res;
                resultDistance = distance;
            }
        });

        result = resultDistance <= maxDistance ? result : null;

        return result;
    }

    /**
     * Gets an array of residues that cannot be mapped to a template.
     * @returns An array of unmappable residues.
     */
    public getUnmappableResidues(): Residue[] {
        return this.residues.filter(res => res.templateIndex === -1);
    }

    /**
     * Gets an array of residues that can be mapped to a template.
     * @returns An array of mappable residues.
     */
    public getMappableResidues(): Residue[] {
        return this.residues.filter(res => res.templateIndex !== -1);
    }

    /**
     * Translates the objects by the specified amount.
     * @param shift - The amount to translate the visualization.
     */
    public translate(shift: Vector2) {
        this.residues.forEach(res => {
            res.translate(shift);
        });

        this.labels.forEach(label => {
            label.translate(shift);
        });
    }
}
