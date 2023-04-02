import { 
    IDataLabelContent,
    IDataLabelLine,
} from '../rna-input';

export interface IDataLabel {
    labelContent: IDataLabelContent;
    labelLine: IDataLabelLine;
    residueIndex: number;
}
