import * as d3 from 'd3';
import { BasePair, Label, Style, Residue, RNAData, SingleCoorObject, Line } from './interfaces';
import { ResidueTitle, ResidueCircle, LabelText, LabelLine, BpLine } from './dataContainer';
import { Styles } from './classes';
import DataContainer from './dataContainer';

export default class ContainerUpdater {

    public update(event: any, container: DataContainer) {
        const width = container.width;
        const height = container.height;
        const x = d3.scaleLinear().domain([0, width]).range([0, width]);
        const y = d3.scaleLinear().domain([0, height]).range([0,height]);

        x.range([0, width].map(d => event.transform.applyX(d)));
        y.range([0, height].map(d => event.transform.applyY(d)));

        container.getSingleCoorObjects().forEach((object: SingleCoorObject) => {
            object.setX(x(object.getOrigX()));
            object.setY(y(object.getOrigY()));
        });

        container.getLines().forEach((line: Line) => {
            line.setX1(x(line.getOrigX1()));
            line.setY1(y(line.getOrigY1()));
            line.setX2(x(line.getOrigX2()));
            line.setY2(y(line.getOrigY2()));
        });

        container.resCircles.forEach((circle: ResidueCircle) => {
            circle.scaleRadius(event.transform.k);
        })

        container.styles.set('transform', {k: event.transform.k});
    }

    public animationUpdate(t: number) {
        const x = (node: any) => {
            return +node.attr('sx') * (1 - t) + (+node.attr('tx')) * t;
        }
        const y = (node: any) => {
            return +node.attr('sy') * (1 - t) + (+node.attr('ty')) * t;
        }
    }

    private updateResidues(container: DataContainer, x: Function, y: Function) {
        // const rna = container.data.rnaComplexes[0].rnaMolecules[0];
        // rna.sequence.forEach((res: Residue) => {
        //     res.x = x(res.x);
        //     res.y = y(res.y);
        // })
        container.resTitles.forEach((res: ResidueTitle) => {
            res.setX(x(res.getResidue().x));
            res.setY(y(res.getResidue().y));
        })
    }

    private updateLabels(container: DataContainer, x: Function, y: Function) {
        const rna = container.data.rnaComplexes[0].rnaMolecules[0];
        rna.labels.forEach((label: Label) => {
            label.labelContent.x = x(label.labelContent.x);
            label.labelContent.y = y(label.labelContent.y);
            label.labelLine.x1 = x(label.labelLine.x1);
            label.labelLine.x2 = x(label.labelLine.x2);
            label.labelLine.y1 = y(label.labelLine.y1);
            label.labelLine.y2 = y(label.labelLine.y2);
        })
    }

    private updateScale(container: DataContainer, k: number) {
        container.styles.set('transform', {k: k});

        container.resCircles.forEach((circle: ResidueCircle) => {
            circle.scaleRadius(k);
        })
    }
}
