import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js'
import  "./style.css";


const svgns = "http://www.w3.org/2000/svg";

function draw(element: HTMLElement) 
{
    let draw = SVG().addTo(element).size('100%', '100%').viewbox(0,0,800,1000)
    const recta = draw.rect(100, 100)
    .move(100, 50)
    .fill('#f06');

    recta.click(() => {
        recta.animate(2000, 0, 'now')
        .transform({
            rotate: 150,
            translate: [50,50]
        })
        .attr({ fill: '#000' })
        .loop(2,true,0);
    })


    const rect = draw.rect(100, 100)
    const path = draw.path("m 357.64532,453.84097 c 17.62007,8.02216 -2.12058,27.70935 -13.33334,29.28571 -30.3859,4.27185 -48.34602,-29.97426 -45.23807,-55.9524 5.5594,-46.46879 56.1311,-70.59787 98.57145,-61.19043 62.28294,13.8058 93.32728,82.57702 77.1428,141.19051 C 453.21679,585.29693 365.67122,623.42358 290.97859,600.26951 196.98554,571.13248 151.71003,464.56996 181.93108,373.84089 218.53281,263.95583 344.23687,211.49702 450.97875,248.84102 576.77037,292.84963 636.43303,437.76771 591.93099,560.50775 540.55162,702.21597 376.3736,769.09583 237.6452,717.41234 80.01319,658.68628 5.9069261,475.21736 64.788247,320.50751 130.84419,146.94643 333.62587,65.607117 504.31214,131.69819 693.80625,205.0718 782.38357,427.18225 709.07382,613.84113")
    const length = path.length()

    path.fill('none').stroke({width:2, color: '#f00'})
    let step = 0;
    let counter = 0;
    rect.animate(3200, 0, 'now').during(function(){
        ++counter; //3000: 179, 2000: 118, 1000: 60
        let p = path.pointAt(step * length);
        step += 0.005;
        rect.center(p.x, p.y);
    })
    .after(() => console.log(counter))
}

const canvas = document.getElementById('canvas');
draw(canvas);
