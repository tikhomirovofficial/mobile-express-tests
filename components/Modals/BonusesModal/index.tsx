import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { Dimensions, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import WhiteBordered from "../../../layouts/WhiteBordered";
import { cs } from "../../../common/styles";
import ButtonYellow from "../../Buttons/ButtonYellow";
import { DocumentIcon, HeartIcon, LogoLong, PhotoIcon } from "../../../icons";
import { fs } from "../../../navigation/AppNavigator";
import SelectableBtn from "../../SelectableBtn";
import { handleAboutModal, handleBonusesModal, handleOrdersFinancesModal, handleProfileEditModal } from "../../../app/features/modals/modalsSlice";
import PatientItem from '../../PatientItem';
import { BarChart } from 'react-native-chart-kit';
import { ChartConfig, ChartData } from 'react-native-chart-kit/dist/HelperTypes';
import { BarChartProps } from 'react-native-chart-kit/dist/BarChart';
import { containerStyles } from '../../AppContainer';

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

const OrderItem = () => {
    return (
        <TouchableOpacity style={[cs.fColumn, cs.spaceS, cs.bottomBorder, styles.orderItem]}>
            <View style={[cs.fRowBetw, cs.fAlCenter]}>
                <View style={[cs.fAlCenter, cs.fRow, cs.spaceM]}>
                    <Text style={[cs.fzS, cs.colorDark, fs.montR]}>Заказ №</Text>
                    <View style={[cs.lightGray]}>
                        <Text style={[fs.montR]}>02-014</Text>
                    </View>
                </View>
                <Text style={[cs.colorGray, cs.fzS, fs.montR]}>100</Text>
            </View>
            <View style={[cs.fRowBetw, cs.fAlCenter]}>
                <Text style={[cs.colorGray, cs.fzS, fs.montR]}>Владислав Тузов</Text>
                <Text style={[cs.colorGray, cs.fzS, fs.montR]}>Ожидание</Text>
            </View>
        </TouchableOpacity>
    )
}
const OrdersDateGroup = () => {
    return <View style={[cs.fColumn, cs.spaceM]}>
        <Text style={[cs.title]}>01.10.2023</Text>
        <View style={[cs.fColumn, cs.spaceM]}>
            <OrderItem />
            <OrderItem />
        </View>
    </View>
}
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

const OrdersFinancesModal = () => {
    const dispatch = useAppDispatch()
    const { bonusesModal } = useAppSelector(state => state.modals)

    const handleModal = () => {
        dispatch(handleBonusesModal())
    }

    return (
        <Modal animationType={"slide"} visible={bonusesModal} transparent={true}>
            <WhiteBordered style={{ ...cs.modalSlidedBottom, paddingBottom: 20 }}>
                <View style={[cs.flexOne, cs.fColumnBetw, cs.spaceXXL]}>
                    <View style={[cs.fRowBetw]}>
                        <Text onPress={handleModal}
                            style={[cs.yellowBtnText, cs.textYellow, cs.fzM]}>Закрыть</Text>
                        <View style={[cs.fAlCenter]}>
                            <Text style={[cs.fzM, cs.colorDark, cs.fzM, cs.colorDark, cs.fwSemi]}>Бонусы</Text>
                        </View>
                        <View style={{ flex: 0.4 }}></View>
                    </View>
                    <View style={[cs.flexOne, cs.spaceM]}>
                        <View style={[cs.fColumn, cs.spaceM]}>
                            <View style={[cs.wBlockShadow, cs.fCenterCol, { borderRadius: 16, paddingVertical: 10 }]}>
                                <BarChart
                                    segments={5}
                                    data={data}
                                    fromZero={true}
                                    withInnerLines={true}
                                    fromNumber={50000}
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
                            </View>



                            <ButtonYellow style={[cs.fCenterRow, cs.spaceS]} handlePress={() => { }}>
                                <HeartIcon />
                                <Text style={[cs.colorDark, cs.fwSemi, cs.fzM]}>Вывести бонусы</Text>
                            </ButtonYellow>
                        </View>
                        <View style={[cs.fColumn]}>
                            <PatientItem firstName={'Ахмед'} lastName={'Ахматов'} phone={'775 Бонусов'} avatarSrc={null} />
                            <PatientItem firstName={'Ахмед'} lastName={'Ахматов'} phone={'775 Бонусов'} avatarSrc={null} />
                            <PatientItem neededBottomBorder={false} firstName={'Ахмед'} lastName={'Ахматов'} phone={'775 Бонусов'} avatarSrc={null} />
                        </View>

                    </View>
                </View>
            </WhiteBordered>
        </Modal>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        paddingBottom: 16
    },
    bonusesBlock: {
        paddingVertical: 27,
        paddingHorizontal: 24,
        borderRadius: 16
    },
    bonusesBlockContent: {
        maxWidth: 190
    },
    progressBonuses: {
        borderRadius: 100,
        position: "relative",
        flex: 1,
        height: 2,
        backgroundColor: "#E1E1E1"
    },
    progressBonusesFilled: {
        backgroundColor: "#12B2B3",
        left: 0,
        top: 0,
        height: "100%",
    },
})
export default OrdersFinancesModal;