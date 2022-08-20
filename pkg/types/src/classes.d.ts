import { RNAData } from './interfaces';
export declare class Styles {
    styles: Map<string, any>;
    constructor(data: RNAData);
    set(name: string, value: any): void;
    get(name: string): any;
    getProperty(name: string, property: string): any;
}
export declare const classes: ({
    name: string;
    fill: string;
    'element-wise'?: undefined;
    'text-anchor'?: undefined;
    'dominant-baseline'?: undefined;
    stroke?: undefined;
    visibility?: undefined;
} | {
    'element-wise': boolean;
    name: string;
    fill: string;
    'text-anchor': string;
    'dominant-baseline': string;
    stroke?: undefined;
    visibility?: undefined;
} | {
    name: string;
    stroke: string;
    fill: string;
    'element-wise'?: undefined;
    'text-anchor'?: undefined;
    'dominant-baseline'?: undefined;
    visibility?: undefined;
} | {
    name: string;
    stroke: string;
    fill?: undefined;
    'element-wise'?: undefined;
    'text-anchor'?: undefined;
    'dominant-baseline'?: undefined;
    visibility?: undefined;
} | {
    name: string;
    visibility: string;
    fill?: undefined;
    'element-wise'?: undefined;
    'text-anchor'?: undefined;
    'dominant-baseline'?: undefined;
    stroke?: undefined;
})[];
