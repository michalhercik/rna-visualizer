const BLACK = 'rgb(0, 0, 0)';
const WHITE = 'rgb(255,255,255)';
const RED = 'rgb(255, 0, 255)';
const GREEN = 'rgb(0, 255, 0)';
const BLUE = 'rgb(0, 0, 255)';
const GRAY = 'rgb(204, 204, 204)';
const BROWN = 'rgb(211.65, 104.55, 30.6)';

/**
 * A class for defining and managing styles for RNA visualization.
 */
export class Styles {
    /**
     * The name of the class to add to transformed structure.
     */
    public static TRANSFORMED_CLASS = 'transform';

    /**
     * The default map of styles for RNA visualization.
     */
    private default: Map<string, Object> = new Map([
        ['text-black', { fill: BLACK }],
        ['text-red', { fill: RED }],
        ['text-green', { fill: GREEN }],
        ['text-blue', { fill: BLUE }],
        ['text-gray', { fill: GRAY }],
        ['text-brown', { fill: BROWN }],
        ['text', {
            fill: BLACK,
            'text-anchor': 'middle',
            baseline: 'middle'
        }],
        ['circle-black', {
            stroke: BLACK,
            fill: 'none'
        }],
        ['circle-red', {
            stroke: RED,
            fill: 'none'
        }],
        ['circle-green', {
            stroke: GREEN,
            fill: 'none'
        }],
        ['circle-blue', {
            stroke: BLUE,
            fill: 'none'
        }],
        ['circle-gray', {
            stroke: GRAY,
            fill: 'none'
        }],
        ['circle-brown', {
            stroke: BROWN,
            fill: 'none'
        }],
        ['circle', { stroke: BLACK }],
        ['numbering-label', { fill: GRAY }],
        ['numbering-line', { stroke: GRAY }],
        ['template', { visibility: 'hidden' }],
        ['bp-line', { stroke: BLACK }],
        ['residue-circle', { fill: WHITE }],
        ['res-line', { stroke: GRAY }],
        ['mapping-line', { stroke: 'yellow' }],
        ['title-text', {
            fill: 'black',
            baseline: 'top',
            alpha: 1,
            'text-anchor': 'start',
            'font-size': '11px',
            'font-weight': 'normal',
            'font-family': 'Helvetica'
        }],
        ['title-background', {
            stroke: WHITE,
            fill: WHITE,
            alpha: 1
        }]
    ]);

    /**
     * The map of custom styles for RNA visualization.
     */
    public styles: Map<string, Object> = new Map(this.default);

    /**
     * Adds a set of styles to the custom styles map.
     * @param classes - An array of style objects to add to the map.
     */
    public addFrom(classes: Array<Object>): void {
        classes.forEach((style: any) => {
            const name = style.name;
            this.styles.set(name, style);
        });
    }

    /**
     * Sets a style value in the custom styles map.
     * @param name - The name of the style to set.
     * @param value - The value to set for the style.
     */
    public set(name: string, value: Object): void {
        const v = this.get([name]);
        if (v)
            Object.assign(v, value);
        this.styles.set(name, value);
    }

    /**
     * Gets the style values for one or more style names combine in one object.
     * @param names - An array of style names to get.
     * @returns An object containing the style values.
     */
    public get(names: Array<string>): any {
        const returnStyles = {};
        names.forEach((n) => Object.assign(returnStyles, this.styles.get(n)));
        return returnStyles;
    }

    /**
     * Gets the value of a specific property for one or more style names.
     * @param names - An array of style names to get.
     * @param property - The name of the property to get.
     * @returns The value of the specified property.
     */
    public getProperty(names: Array<string>, property: string): string {
        const returnStyles = this.get(names);
        type ObjectKey = keyof typeof returnStyles;
        return returnStyles[property as ObjectKey];
    }

    /**
     * Resets the custom styles map to its default values.
     */
    public reset(): void {
        this.styles = new Map(this.default);
    }

    /**
     * Generates a random hexadecimal color code.
     * @returns A randomly generated hexadecimal color code.
     */
    public static randomHexColor(): string {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
}
