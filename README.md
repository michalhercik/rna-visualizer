# RNA visualizer

NPM library for visualizing and comparing multiple RNA secondary structures
using canvas.
 - [documentation](./lib/docs/README.md)
 - [demo](https://michalhercik.github.io/rna-visualizer/)

## Install

### Requirements
 - Node ([download website](https://nodejs.org/en/download))
 - Git ([download website](https://git-scm.com/downloads))

### In own project

For use in your own npm project simply run the following command to install this
library and save dependency to your package.json file.

```
npm install --save rna-visualizer
```

### Clone repository

```
git clone git@github.com:michalhercik/rna-visualizer.git
```

### Build library

```
cd rna-visualizer/lib
npm install
npm run build
```

### Build demo

```
cd rna-visualizer/demo
npm install
npm run build
```

## Example

For more complex example that demonstrate all functionality checkout demo [source code](./demo/src).

```typescript
import { RnaVis, IRnaInput } from 'rna-visualizer';

let template: IRnaInput = {
    classes: [
	{
	    "font-size": "8.334300px",
	    "name": "font"
	},
	{
	    "name": "bp-line",
	    "stroke-width": 1.0418
	}
    ]
    rnaComplexes: [
    rnaMolecules: [
	basePairs: [],
    labels: [],
    sequence: [
	{
	    "classes": [
		"font"
	    ],
	    "info": "",
	    "residueIndex": 0,
	    "residueName": "5'",
	    "templateNumberingLabel": "",
	    "templateResidueIndex": 0,
	    "templateResidueName": "5'",
	    "x": 40.87118826578342,
	    "y": 24.000074999171886
	},
	{
	    "classes": [
		"font"
	    ],
	    "info": "",
	    "residueIndex": 1,
	    "residueName": "C",
	    "templateNumberingLabel": "",
	    "templateResidueIndex": 1,
	    "templateResidueName": "",
	    "x": 40.87118826578342,
	    "y": 32.00009999889585
	},
    ]
]
]
};

// Creating canvas on which will be rna secondary structure drawn.
let canvas = document.createElement('canvas');
document.body.appendChild(canvas);

// creating RnaVis object with template. Adding zoom and panning functionality.
let rnaVis = new RnaVis(canvas);
rnaVis
    .addLayer(template)
    .addZoom()
    .draw();
```

