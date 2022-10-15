import { Axis } from 'd3-axis';
import { NumberValue, ScaleLinear } from 'd3-scale';
import { Selection } from 'd3-selection';
import { Line } from 'd3-shape';
import EventEmitter from 'event-emitter-es6';
import type { DeepRequired } from 'ts-essentials';
export declare type Config = {
    /**
     * @default 'svg'
     */
    target?: string;
    /**
     * @default 900
     */
    width?: number;
    /**
     * @default 300
     */
    height?: number;
    /**
     * @default false
     */
    preview?: boolean;
    /**
     * @default false
     */
    darkMode?: boolean;
    /**
     * @default 'transparent'
     */
    backgroundColor?: string | boolean;
    footerText?: {
        /**
         * @default true
         */
        show?: boolean;
        /**
         * @default 0.75
         */
        fontSize?: number;
    };
    margin?: {
        /**
         * @default 20
         */
        top?: number;
        /**
         * @default 20
         */
        right?: number;
        /**
         * @default 40
         */
        bottom?: number;
        /**
         * @default 20
         */
        left?: number;
    };
};
export declare type DataPoint = {
    id?: string;
    color: string;
    description: string;
    link?: string;
    /**
     * @default 10
     */
    size?: number;
    /**
     * @default 0
     */
    x?: number;
    /**
     * @default 0
     */
    y?: number;
};
export declare type Data = DataPoint[];
export declare type ConfigInternal = DeepRequired<Config>;
export declare type DataPointInternal = DeepRequired<DataPoint>;
export declare type DataInternal = DataPointInternal[];
export interface IHillChartClass extends EventEmitter, ConfigInternal {
    data: DataInternal;
    chartWidth: number;
    chartHeight: number;
    colorScheme: 'hill-chart-dark' | 'hill-chart-light';
    svg: Selection<SVGGElement, DataPointInternal, HTMLElement, any>;
    xScale: ScaleLinear<number, number, never>;
    yScale: ScaleLinear<number, number, never>;
    bottomLine: Axis<NumberValue>;
    mainLineCurvePoints: {
        x: number;
        y: number;
    }[];
    line: Line<Pick<DataPointInternal, 'x' | 'y'>>;
    /**
     * Methods
     */
    render: () => void;
    replaceAndUpdate: (data: Partial<DataPointInternal>[]) => void;
}
