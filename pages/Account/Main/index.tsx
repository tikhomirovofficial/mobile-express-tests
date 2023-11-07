import React, {FC} from 'react';
import WhiteBordered from "../../../layouts/WhiteBordered";
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import {Animated, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {cs} from "../../../common/styles";
import {Logo} from "../../../icons";
import AnalysisCard from "../../../components/Cards/AnalysisCard";
import {OrderAnalysisType} from "../../../types/analysis.types";
import {useAppDispatch, useAppSelector} from "../../../app/base/hooks";
import {handleOrderInfoModal} from "../../../app/features/modals/modalsSlice";
import {NavProps} from "../../../types/common.types";

const analysisData: OrderAnalysisType[] = [
    {
        customer: "Владислав Тузов",
        date: "25.09.2023",
        orderNumber: "02-014",
        status: "PAID"
    },
    {
        customer: "Александр Тузов",
        date: "25.09.2023",
        orderNumber: "02-016",
        status: "NOT_PAID"
    },
    {
        customer: "Артём Тихомиров",
        date: "25.09.2023",
        orderNumber: "02-016",
        status: "NOT_PAID"
    },
    {
        customer: "Дмитрий Тихомиров",
        date: "25.09.2023",
        orderNumber: "02-016",
        status: "NOT_PAID"
    }
]

const Main: FC<NavProps> = ({navigation}) => {
    const dispatch = useAppDispatch()
    const {orderInfoModal} = useAppSelector(state => state.modals)
    //const scaleValue = new Animated.Value(1);
    //
    // useEffect(() => {
    //     if (orderInfoModal) {
    //         Animated.spring(scaleValue, {
    //             toValue: .84,
    //             useNativeDriver: true,
    //         }).start();
    //     } else {
    //         Animated.spring(scaleValue, {
    //             toValue: 1,
    //             useNativeDriver: true
    //         }).start();
    //     }
    // }, [orderInfoModal, scaleValue]);
    return (
        <Animated.ScrollView>
            <WhiteBorderedLayout style={{
                paddingTop: 32
            }}>
                <View style={[cs.spaceL, cs.fColumn]}>
                    <Text style={cs.title}>Вячеслав, добрый день!</Text>
                    <View style={[cs.fRowBetw, styles.buttonsTopContainer]}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("register")}
                            style={[
                                cs.fColumn,
                                styles.buttonTop,
                                cs.flexOne,
                                styles.buttonDark
                            ]}>
                            <Logo/>
                            <Text style={[cs.fzS, cs.colorWhite, cs.txtCenter]}>Пригласить в Экспресс Тест</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                cs.wBlockShadow,
                                cs.fColumn,
                                styles.buttonTop,
                                cs.flexOne
                            ]}>
                            <Logo/>
                            <Text style={[cs.fzS, cs.txtCenter]}>Назначить анализы</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[cs.spaceL, cs.fColumn]}>
                    <Text style={cs.title}>Заказы анализов</Text>
                    <View style={[cs.fColumn, cs.spaceM]}>
                        {
                            analysisData.map((item, index) => (
                                <AnalysisCard key={index} status={item.status}
                                              handlePress={() => dispatch(handleOrderInfoModal())}
                                              date={item.date} orderNumber={item.orderNumber} customer={item.customer}
                                              analysisList={item.analysisList}/>
                            ))
                        }
                    </View>
                </View>
            </WhiteBorderedLayout>
            <Modal animationType={"slide"} visible={orderInfoModal} transparent={true}>
                <WhiteBordered style={cs.modalSlidedBottom}>
                    <View style={styles.analysisOrderContent}>
                        <View style={[cs.fRowBetw]}>
                            <Text onPress={() => dispatch(handleOrderInfoModal())}
                                  style={[cs.yellowBtnText, cs.textYellow, cs.fzM]}>Закрыть</Text>
                            <View style={[cs.fAlCenter]}>
                                <Text style={[cs.fzM, cs.colorDark, styles.labelOrderNum]}>Заказ №</Text>
                                <View style={[cs.lightGray]}>
                                    <Text style={[cs.colorDark, styles.orderNumber]}>102-20</Text>
                                </View>
                            </View>
                            <Text style={[cs.fzM, cs.colorGray]}>25.09.2023</Text>
                        </View>
                        <View style={[styles.analysisOrderColumn]}>
                            <View style={[cs.spaceM]}>
                                <Text style={[cs.fzXL, cs.fwBold]}>Информация о заказе</Text>
                                <View style={[styles.orderInfo]}>
                                    <View style={[cs.fRowBetw]}>
                                        <Text style={[cs.colorGray, cs.fzM]}>Статус</Text>
                                        <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>Отправлен</Text>
                                    </View>
                                    <View style={[cs.fRowBetw]}>
                                        <Text style={[cs.colorGray, cs.fzM]}>Назначил(а)</Text>
                                        <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>Подосёнов В. С.</Text>
                                    </View>
                                    <View style={[cs.fRowBetw]}>
                                        <Text style={[cs.colorGray, cs.fzM]}>Пациент</Text>
                                        <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>Тузов В.В.</Text>
                                    </View>


                                </View>
                            </View>
                            <View style={[cs.spaceM]}>
                                <Text style={[cs.fzXL, cs.fwBold]}>Результаты анализов</Text>
                                <Text style={[cs.colorGray, cs.fzM]}>
                                    Здесь появится возможность скачать результаты анализов после того, как пациент
                                    оплатит и сдаст анализы в нашей лаборатории.
                                </Text>
                            </View>
                            <View style={[cs.spaceM]}>
                                <View style={[cs.dF, cs.fRow, cs.fAlCenter, cs.spaceS]}>
                                    <Text style={[styles.analysisCount, cs.fzXL, cs.fwBold]}>Список анализов</Text>
                                    <View style={[cs.fAlCenter, cs.fRow, styles.analysisCountCircle, cs.bgYellow]}>
                                        <Text style={[]}>2</Text>
                                    </View>

                                </View>

                                <View style={[cs.fColumn]}>
                                    <Text style={[cs.fwMedium, cs.colorDark, cs.fzM]}>1. Бактериальная панель (IgE)
                                        (П)</Text>
                                    <Text style={[cs.fwMedium, cs.colorDark, cs.fzM]}>2. Т3 свободный (П)</Text>
                                    <Text style={[cs.fwMedium, cs.colorDark, cs.fzM]}>3. ФСГ (фолликулостимулирующий
                                        гормон) (П)</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </WhiteBordered>
            </Modal>
        </Animated.ScrollView>

    );
};
const styles = StyleSheet.create({
    analysisOrderContent: {
        gap: 40
    },
    analysisOrderColumn: {
        gap: 32
    },
    analysisCount: {

        marginTop: 3,
        borderRadius: 50,
        fontSize: 11,
        fontWeight: "600"
    },
    analysisCountCircle: {
      backgroundColor: "orange",
        borderRadius: 1000,
        paddingHorizontal: 7,
        paddingVertical: 2,
        marginTop: 3
    },
    orderInfo: {
        maxWidth: 240,
        gap: 8
    },
    buttonsTopContainer: {
        gap: 16,
        marginBottom: 48
    },
    orderNumber: {
        fontSize: 13
    },
    buttonTop: {
        padding: 20,
        alignItems: "center",
        gap: 10,
        borderRadius: 16,
        height: 150
    },
    labelOrderNum: {
        fontWeight: "500"
    },
    buttonDark: {
        backgroundColor: "#4D4D4D",
    },
    buttonWhite: {
        shadowColor: "black",
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 10,
        backgroundColor: "white",
        shadowRadius: 30,
        elevation: 10,
    }
})
export default Main;