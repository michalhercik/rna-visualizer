import * as d3 from 'd3';
import { BasePair, Label, Style, Residue, RNAData, DataLabelLine, LabelContent, Line, Circle, Text, SingleCoorObject } from './interfaces';
import { Styles } from './classes';

export default class DataContainer {
    public readonly styles;
    public width: number;
    public height: number;
    //public readonly container;
    public readonly data;
    public readonly classComb = {
        line: new Set(),
        circle: new Set(),
        text: new Set()
    };
    public bpLines: Array<BpLine> = [];
    public labelLines: Array<LabelLine> = [];
    public labelTexts: Array<LabelText> = [];
    public resCircles: Array<ResidueCircle> = []; 
    public resTitles: Array<ResidueTitle> = [];

    public constructor(data: RNAData, styles: Styles) {
        this.data = data;
        this.styles = styles;
    }

    public addBpLine(line: BpLine) {
        this.bpLines.push(line);
    }

    public addLabelLine(line: LabelLine) {
        this.labelLines.push(line);
    }

    public addLabelText(text: LabelText) {
        this.labelTexts.push(text);
    }

    public addResCircle(circle: ResidueCircle) {
        this.resCircles.push(circle);
    }

    public addResTitle(title: ResidueTitle) {
        this.resTitles.push(title);
    }

    public getCircles() {
        return this.resCircles as Array<Circle>;
    }

    public getLines() {
        return (this.bpLines as Array<unknown> as Array<Line>)
        .concat(this.labelLines as Array<unknown> as Array<Line>);
    }

    public getTexts() {
        return (this.labelTexts as Array<Text>)
        .concat(this.resTitles as Array<Text>);
    }

    public getSingleCoorObjects() {
        return (this.resCircles as Array<unknown> as Array<SingleCoorObject>)
        .concat(
            this.resTitles as Array<unknown> as Array<SingleCoorObject>,
            this.labelTexts as Array<unknown> as Array<SingleCoorObject>
        );
    }

    public getResByCoor(x: number, y: number): any {
        let residues = this.data.rnaComplexes[0].rnaMolecules[0].sequence;
        let result: ResidueTitle = null;
        this.resTitles.find((res: ResidueTitle) => {
            const resStyles = this.styles.get(res.getClasses()); 
            const k = resStyles['k'] || 1;
            const shift = (+resStyles['font-size'].slice(0, -2) || 7) * k / 2;

            if ( x >= res.getX() - shift 
               && x <= res.getX() + shift
               && y >= res.getY() - shift 
               && y <= res.getY() + shift ) {
                   result = res;
               }
        });
        return result;
    }
}

export class BpLine implements Line {
    private residue1: Residue;
    private residue2: Residue;
    private x1: number;
    private y1: number;
    private x2: number;
    private y2: number;
    private classes: Array<string>;

    public constructor(residue: Residue[], basePair: BasePair) {
        this.residue1 = residue[basePair.residueIndex1];
        this.residue2 = residue[basePair.residueIndex2];
        this.x1 = this.residue1.x;
        this.y1 = this.residue1.y;
        this.x2 = this.residue2.x;
        this.y2 = this.residue2.y;
        this.classes = basePair.classes;
    }

    public getX1() {
        return this.x1;
    }

    public getX2() {
        return this.x2;
    }

    public getY1() {
        return this.y1;
    }

    public getY2() {
        return this.y2;
    }

    public setX1(newX1: number) {
        this.x1 = newX1;
    }

    public setX2(newX2: number) {
        this.x2 = newX2;
    }

    public setY1(newY1: number) {
        this.y1 = newY1;
    }

    public setY2(newY2: number) {
        this.y2 = newY2;
    }

    public getOrigX1() {
        return this.residue1.x;
    }

    public getOrigX2() {
        return this.residue2.x;
    }

    public getOrigY1() {
        return this.residue1.y;
    }

    public getOrigY2() {
        return this.residue2.y;
    }

    public getClasses() {
        return this.classes;
    };
}

export class LabelLine implements Line {
    private data: DataLabelLine;
    private x1: number;
    private y1: number;
    private x2: number;
    private y2: number;

    public constructor(lineData: DataLabelLine) {
        this.data = lineData;
        this.x1 = this.data.x1;
        this.y1 = this.data.y1;
        this.x2 = this.data.x2;
        this.y2 = this.data.y2;
    }

    public getX1() {
        return this.x1;
    }

    public getX2() {
        return this.x2;
    }

    public getY1() {
        return this.y1;
    }

    public getY2() {
        return this.y2;
    }

    public setX1(newX1: number) {
        this.x1 = newX1;
    }

    public setX2(newX2: number) {
        this.x2 = newX2;
    }

    public setY1(newY1: number) {
        this.y1 = newY1;
    }

    public setY2(newY2: number) {
        this.y2 = newY2;
    }

    public getOrigX1() {
        return this.data.x1;
    }

    public getOrigX2() {
        return this.data.x2;
    }

    public getOrigY1() {
        return this.data.y1;
    }

    public getOrigY2() {
        return this.data.y2;
    }

    public getClasses() {
        return this.data.classes;
    }
}

export class LabelText implements Text {
    data: LabelContent;
    private x: number;
    private y: number;

    public constructor(label: LabelContent) {
        this.data = label;
        this.data.classes.push('transform');
        this.x = label.x;
        this.y = label.y;
    }

    public setX(newX: number) {
        this.x = newX;
    }

    public setY(newY: number) {
        this.y = newY;
    }

    public getX() {
        return this.x;
    }

    public getY() {
        return this.y;
    }

    public getOrigX() {
        return this.data.x;
    }

    public getOrigY() {
        return this.data.y;
    }

    public getText() {
        return this.data.label;
    }

    public getClasses() {
        return this.data.classes;
    }
}

export class ResidueCircle implements Circle {
    private residue: Residue;
    private r: number;
    private origR: number;
    private x: number;
    private y: number;

    public constructor(residue: Residue, r: number) {
        this.residue = residue;
        this.origR = r;
        this.r = r;
        this.x = residue.x;
        this.y = residue.y;
    }

    public getX() {
        return this.x;
    }

    public getY() {
        return this.y;
    }

    public setX(newX: number) {
        this.x = newX;
    }

    public setY(newY: number) {
        this.y = newY;
    }

    public getR() {
        return this.r;
    }

    public getOrigX() {
        return this.residue.x;
    }

    public getOrigY() {
        return this.residue.y;
    }

    public getClasses() {
        return ['res-circle', 'circle'];
    }

    public scaleRadius(k: number) {
        this.r = this.origR * k;
    }
}

export class ResidueTitle implements Text {
    private residue: Residue;
    private x: number;
    private y: number;

    public constructor(residue: Residue) {
        this.residue = residue;
        this.residue.classes.push('transform');
        this.x = residue.x;
        this.y = residue.y;
    }

    public setX(newX: number) {
        this.x = newX;
    }

    public setY(newY: number) {
        this.y = newY;
    }

    public getX() {
        return this.x;
    }

    public getY() {
        return this.y;
    }

    public getOrigX() {
        return this.residue.x;
    }

    public getOrigY() {
        return this.residue.y;
    }

    public getText() {
        return this.residue.residueName;
    }

    public getTitle() {
        const index = this.residue.residueIndex;
        const tIndex = this.residue.templateResidueIndex;
        const tName = this.residue.templateResidueName;
        return `${index} (position.label in template: ${tIndex}.${tName}\')`;
    }

    public getClasses() {
        return this.residue.classes;
    }

    public getResidue() {
        return this.residue;
    }
}

