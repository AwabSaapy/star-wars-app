import {BarDatum, BarTooltipProps, ResponsiveBar} from "@nivo/bar";
import './bar-chart.component.scss';

interface BarChartProps {
    xAxisLabel?: string;
    yAxisLabel?: string;
    height?: number;
    data: any;
    indexBy: string;
    keys: string[];
    colors?: string;
}

const BarChart = (props: BarChartProps) => {

    const {
        xAxisLabel,
        yAxisLabel,
        indexBy,
        keys,
        height = 300,
        colors = '#4fa8ff',
        data,
    } = props;

    const createCustomTooltip = (point: BarTooltipProps<BarDatum>) => {
        if (point?.data?.tooltip) {
            return (
                <div className="custom-tooltip">
                    <p className="text"> {point.data.tooltip} </p>
                </div>
            );
        }
    };

    return (
        <div className="bar-chart-component" style={{height}}>
            <ResponsiveBar
                data={data}
                keys={keys}
                indexBy={indexBy}
                margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={colors}
                borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                axisTop={null}
                axisLeft={{ legend: yAxisLabel, legendPosition: 'middle', legendOffset: -50}}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: xAxisLabel,
                    legendPosition: "middle",
                    legendOffset: 40
                }}
                tooltip={point => createCustomTooltip(point)}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                animate={true}
            />
        </div>
    )
}

export default BarChart;
