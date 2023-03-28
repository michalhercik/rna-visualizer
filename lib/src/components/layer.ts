import { DataContainer } from '../data';
import { MappingLine } from '../components';

export class Layer {
    public name: string;
    public data: DataContainer;
    public mappingLines: MappingLine[];
    public visible: boolean = true;

    constructor(data: DataContainer, name: string, mappingLines: MappingLine[], visible: boolean = true) {
        this.name = name;
        this.data = data;
        this.mappingLines = mappingLines;
        this.visible = visible;
    }
}
