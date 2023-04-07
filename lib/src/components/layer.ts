import { DataContainer } from '../data';
import { MappingLine } from '../components';

/**
* A layer is a collection of data for structure and mapping lines to template.
*/
export class Layer {
    public name: string;
    public data: DataContainer;
    public mappingLines: MappingLine[];
    public visible = true;

    /**
    * @param data - The data container for the layer
    * @param name - The name of the layer
    * @param mappingLines - The mapping lines for the layer
    * @param visible - Whether the layer is visible or not
    */
    constructor(data: DataContainer, name: string, mappingLines: MappingLine[], visible = true) {
        this.name = name;
        this.data = data;
        this.mappingLines = mappingLines;
        this.visible = visible;
    }
}
