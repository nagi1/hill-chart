import EventEmitter from 'event-emitter-es6';
import { Selection } from 'd3-selection';
import './styles.css';
import { Config, Data, DataPointInternal, IHillChartClass } from './types';
export default class HillChart extends EventEmitter implements IHillChartClass {
    data: IHillChartClass['data'];
    target: string;
    width: number;
    height: number;
    preview: boolean;
    darkMode: boolean;
    backgroundColor: string | boolean;
    footerText: {
        show: boolean;
        fontSize: number;
    };
    margin: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    chartWidth: number;
    chartHeight: number;
    colorScheme: IHillChartClass['colorScheme'];
    svg: IHillChartClass['svg'];
    xScale: IHillChartClass['xScale'];
    yScale: IHillChartClass['yScale'];
    bottomLine: IHillChartClass['bottomLine'];
    mainLineCurvePoints: IHillChartClass['mainLineCurvePoints'];
    line: IHillChartClass['line'];
    constructor(data: Data, config?: Config);
    init(): void;
    normalizeData(): void;
    replaceData(data: Partial<DataPointInternal>[]): void;
    replaceAndUpdate(data: Partial<DataPointInternal>[]): void;
    undraggablePoint(): Selection<SVGGElement, {
        id: string;
        color: string;
        description: string;
        link: string;
        size: number;
        x: number;
        y: number;
    }, SVGGElement, {
        id: string;
        color: string;
        description: string;
        link: string;
        size: number;
        x: number;
        y: number;
    }>;
    render(): void;
    renderGroup(): void;
    renderMainCurve(): void;
    renderBottomLine(marginTop?: number): void;
    renderMiddleLine(): void;
    renderFooterText(): void;
}
