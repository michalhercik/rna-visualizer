import * as d3 from 'd3';
import { Selection } from 'd3';
import { IBasePair, ILabel, IStyle, IResidue, IRNAData } from './interfaces';
import { classes } from './classes';

const WIDTH = 1200;
const HEIGHT = 1400;
const MARGIN = 10;

// function add_residues(svg: Selection<HTMLElement>) 
// {
// 
// }

function round (num: number): string
{
    return num.toFixed(2);
}

function form_coor(coor: number): string
{
    return round(coor + MARGIN)
}

function get_font_size(classes: Array<any>): number
{
    return classes.find((style) => style.name == 'font')['font-size'].slice(0,-2);
}

export function draw(element: HTMLElement, data: IRNAData) 
{
    const rna = data.rnaComplexes[0].rnaMolecules[0];
    const svg = d3.select(element).append('svg')
        .attr("viewBox", [0, 0, WIDTH, HEIGHT]);

    // styles =========================================

    let styles = '';
    
    data.classes.concat(classes).forEach((style: IStyle) => {
        styles += '\n';
        styles += Object.keys(style).includes('element-wise') ? '' : '.';
        styles += style.name;
        styles += ' {';
        Object.entries(style).map(([key, value]) => {
            if (key !== 'name')
                styles += `\n\t${key}: ${value};`;
        });
        styles += '\n}';
    });

    svg.append('style')
        .attr('type', 'text/css')
        .text(styles);

    // base pairs =========================================

    const bp_x = (res_index: number) => form_coor(rna.sequence[res_index].x);
    const bp_y = (res_index: number) => form_coor(rna.sequence[res_index].y);

    const bps = svg.append('g').attr('class', 'bps');

    bps.selectAll('line')
        .data(rna.basePairs)
        .join('line')
        .attr('x1', (bp: IBasePair) => bp_x(bp.residueIndex1))
        .attr('y1', (bp: IBasePair) => bp_y(bp.residueIndex1))
        .attr('x2', (bp: IBasePair) => bp_x(bp.residueIndex2))
        .attr('y2', (bp: IBasePair) => bp_y(bp.residueIndex2))
        .attr('class', 'bp-line');

    // residues =========================================

    const res_x = (residue: IResidue) => form_coor(residue.x);
    const res_y = (residue: IResidue) => form_coor(residue.y);
    const res_title = (residue: IResidue) => 
        `${residue.residueIndex} (position.label in template: ${residue.residueIndex}.${residue.residueName}\')`;

    const residues = svg.append('g').attr('class', 'residues');

    residues.selectAll('circle')
        .data(rna.sequence)
        .join('circle')
        .attr('cx', res_x)
        .attr('cy', res_y)
        .attr('r', round(get_font_size(data.classes) * 0.75))
        .attr('class', 'residue-circle');

    residues.selectAll('g')
        .data(rna.sequence)
        .join('g')
        .append('title')
        .text(res_title);
    residues.selectAll('g').append('text')
        .attr('x', res_x)
        .attr('y', res_y)
        .attr('class', (residue: IResidue) => residue.classes.join(' '))
        .text((residue: IResidue) => residue.residueName);

    // labels =========================================

    const labels = svg.append('g').attr('class', 'labels');

    labels.selectAll('g')
        .data(rna.labels)
        .join('g')
        .attr('class', 'label')
        .append('text')
        .text((label: ILabel) => label.labelContent.label)
        .attr('x', (label: ILabel) => form_coor(label.labelContent.x))
        .attr('y', (label: ILabel) => form_coor(label.labelContent.y))
        .attr('class', (label: ILabel) => label.labelContent.classes.join(' '));
    labels.selectAll('g').append('line')
        .attr('x1', (label: ILabel) => form_coor(label.labelLine.x1))
        .attr('x2', (label: ILabel) => form_coor(label.labelLine.x2))
        .attr('y1', (label: ILabel) => form_coor(label.labelLine.y1))
        .attr('y2', (label: ILabel) => form_coor(label.labelLine.y2))
        .attr('class', (label: ILabel) => label.labelLine.classes.join(' '));
}

