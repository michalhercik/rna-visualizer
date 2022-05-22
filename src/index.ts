import './style.css';
import {draw} from './rnavis';
import data from '../example_data/mouse_from_human.colored.json'


const canvas = document.getElementById('canvas');
draw(canvas, data);


