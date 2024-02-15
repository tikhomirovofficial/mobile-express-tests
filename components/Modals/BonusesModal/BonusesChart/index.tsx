import React from 'react'
import { BarChart } from 'react-native-chart-kit'
import { containerStyles } from '../../../AppContainer'
import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';
import { cs } from '../../../../common/styles';
import { useAppSelector } from '../../../../app/base/hooks';

const data = {
    labels: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек"
    ],
    datasets: [
        {
            data: [12800, 13332, 13456, 26000, 31488, 31488, 40456, 30000, 30475, 32500, 28465, 30374]
        }
    ]
};

const chartConfig: ChartConfig = {
    backgroundColor: 'black',
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    style: {
        backgroundColor: "red",
        flex: 1,

    },

    color: (opacity) => `#36CACB`, // Цвет линий графика
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.4,
    scrollableInfoOffset: 0,
    barRadius: 2,
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientToOpacity: 1,
    scrollableDotFill: "blue",
    scrollableDotStrokeWidth: 1,

    propsForBackgroundLines: {
        stroke: "#F0F0F0"
    },
    propsForDots: {
        stroke: "red"
    },
    propsForHorizontalLabels: {
        fill: cs.colorGray.color,
        fontSize: 8,
    },
    propsForVerticalLabels: {
        fill: cs.colorGray.color,
        fontSize: 6,
    },
    decimalPlaces: 0,
    useShadowColorFromDataset: false, // optional,
    labelColor: () => "red",
    scrollableDotStrokeColor: "green",

};

export const BonusesChart = () => {
    const { chartData } = useAppSelector(state => state.bonuses)
    return (
        <BarChart
            segments={5}
            data={chartData}
            fromZero={true}
            withInnerLines={true}
            fromNumber={Math.max(...chartData.datasets[0].data)}
            showValuesOnTopOfBars={true}
            showBarTops={false}
            width={containerStyles.container.maxWidth - 12}
            yLabelsOffset={6}
            withCustomBarColorFromData={false}
            xLabelsOffset={-10}
            height={150}
            yAxisSuffix={""}
            yAxisLabel={''}
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            style={{
                paddingLeft: 34,
                paddingRight: 34

            }}
        />
    )
}
