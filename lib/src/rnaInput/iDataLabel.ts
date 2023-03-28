import { IDataLabelContent } from '../rnaInput';
import { IDataLabelLine } from '../rnaInput';

export interface IDataLabel {
    labelContent: IDataLabelContent;
    labelLine: IDataLabelLine;
    residueIndex: number;
}
