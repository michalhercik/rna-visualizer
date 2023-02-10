import * as d3 from 'd3';
import { DataBasePair, DataLabel, RNAData, DataLabelLine, DataLabelContent } from './interfaces';
import { Label, BasePair, Residue, ILine, Text, Circle, Transformation, Vector2 } from './rna/data-structures';
import { Styles } from './classes';

export default class DataContainer {
    public readonly styles;
    public width: number;
    public height: number;

    public residues: Residue[];
    public basePairs: BasePair[];
    public labels: Label[];

    public constructor(residues: Residue[], basePairs: BasePair[], labels: Label[], styles: Styles) {
        this.residues = residues;
        this.basePairs = basePairs;
        this.labels = labels;
        this.styles = styles;
    }

    public getLines(): ILine[] {
        return (this.basePairs as Array<unknown> as Array<ILine>)
        .concat(this.labels.map(l => l.line) as Array<unknown> as Array<ILine>);
    }

    public getText(): Text[] {
        return (this.residues.map(r => r.text))
        .concat(this.labels.map(l => l.text));
    }

    public getCircles(): Circle[] {
        return this.residues.map(r => r.circle);
    }

    public update(event: any) {
        const width = this.width;
        const height = this.height;
        const x = d3.scaleLinear().domain([0, width]).range([0, width]);
        const y = d3.scaleLinear().domain([0, height]).range([0,height]);

        x.range([0, width].map(d => event.transform.applyX(d)));
        y.range([0, height].map(d => event.transform.applyY(d)));

        const transform: Transformation = {applyX: x, applyY: y};

        this.residues.forEach((res: Residue) => {
            res.setTransform(transform);
            res.circle.setScale(event.transform.k);
        });

        this.labels.forEach((label: Label) => {
            label.setTransform(transform);
        });

        this.basePairs.forEach((bp: BasePair) => {
            bp.setTransform(transform);
        })

        this.styles.set('transform', {k: event.transform.k});
    }

    public getResByCoor(x: number, y: number): Residue {
        let result: Residue = null;
        this.residues.find((res: Residue) => {
            const resStyles = this.styles.get(res.getClasses()); 
            const k = resStyles['k'] || 1;
            const shift = (+resStyles['font-size'].slice(0, -2) || 7) * k / 2;

            if ( x >= res.getTransformedX() - shift 
               && x <= res.getTransformedX() + shift
               && y >= res.getTransformedY() - shift 
               && y <= res.getTransformedY() + shift ) {
                   result = res;
               }
        });
        return result;
    }

    public translate(shift: Vector2) {
        this.residues.forEach(res => {
            res.translate(shift);
        });

        this.labels.forEach(label => {
            label.translate(shift);
        });
    }
}
