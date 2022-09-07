import { RNAData } from './interfaces'

const BLACK = 'rgb(0, 0, 0)';
const WHITE = 'rgb(255,255,255)';
const RED = 'rgb(255, 0, 255)';
const GREEN = 'rgb(0, 255, 0)';
const BLUE = 'rgb(0, 0, 255)';
const GRAY = 'rgb(204, 204, 204)';
const BROWN = 'rgb(211.65, 104.55, 30.6)';

export class Styles {
    public styles: Map<string, any> = new Map([
        [ 'text-black', { fill: BLACK } ],
        [ 'text-red', { fill: RED } ],
        [ 'text-green', { fill: GREEN } ],
        [ 'text-blue', { fill: BLUE } ],
        [ 'text-gray', { fill: GRAY } ],
        [ 'text-brown', { fill: BROWN } ],
        [ 'text', {
            fill: BLACK,
            textAnchor: 'middle',
            baseline: 'middle'
        }],
        [ 'circle-black', {
            stroke: BLACK,
            fill: 'none'
        }], 
        [ 'circle-red', {
            stroke: RED,
            fill: 'none'
        }],
        [ 'circle-green', {
            stroke: GREEN,
            fill: 'none'
        }],
        [ 'circle-blue', {
            stroke: BLUE,
            fill: 'none'
        }],
        [ 'circle-gray', {
            stroke: GRAY,
            fill: 'none'
        }],
        [ 'circle-brown', {
            stroke: BROWN,
            fill: 'none'
        }],
        [ 'circle', { stroke: BLACK } ],
        [ 'numbering-label', { fill: GRAY } ],
        [ 'numbering-line', { stroke: GRAY } ],
        [ 'template', { visibility: 'hidden' } ],
        [ 'bp-line', { stroke: BLACK } ],
        [ 'residue-circle', { fill: WHITE } ],
        [ 'res-line', { stroke: GRAY } ]
    ]);

    public constructor(data: RNAData) {
        data.classes.forEach((style: any) => {
            const name = style.name;
            delete style.name;
            this.styles.set(name, style);
        });
    }

    public set(name: string, value: any) {
        const v = this.get(name);
        if (v)
            Object.assign(v, value);
        this.styles.set(name, value);
    }

    public get(name: string): any {
        const returnStyles = {};
        name.split(' ').forEach((n) => Object.assign(returnStyles, this.styles.get(n)));
        return returnStyles;
    }

    public getProperty(name: string, property: string): any {
        const returnStyles = {};
        name.split(' ').forEach((n) => Object.assign(returnStyles, this.styles.get(n)));
        type ObjectKey = keyof typeof returnStyles;
        return returnStyles[property as ObjectKey];
    }
}
