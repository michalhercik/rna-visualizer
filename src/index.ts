import './style.css';
import { RNAVis } from './rnavis';
import data from '../example_data/mouse_from_human.colored.json'


const svgSpace = document.getElementById('svg-space');
const rnaVis = new RNAVis(svgSpace, data);
rnaVis.draw();

