import { Dimensions, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
import { cs } from "../../common/styles";
import { fs } from "../../navigation/AppNavigator";
import { FC } from "react";

type OrderItemProps = {
    codeText: string
    bottomLeftText: string
    bottomRightText: string
    topRightText: string,
    topRightStyles?: ViewStyle | ViewStyle[]

}

export const OrderItem: FC<OrderItemProps> = ({ codeText = "code", bottomLeftText = "bottomLeftText", bottomRightText = "bottomRightText", topRightText="100", topRightStyles }) => {
    return (
        <TouchableOpacity style={[cs.fColumn, cs.spaceS, cs.bottomBorder, styles.orderItem]}>
            <View style={[cs.fRowBetw, cs.fAlCenter]}>
                <View style={[cs.fAlCenter, cs.fRow, cs.spaceM]}>
                    <Text style={[cs.fzS, cs.colorDark, fs.montR]}>Заказ №</Text>
                    <View style={[cs.lightGray]}>
                        <Text style={[fs.montR]}>{codeText}</Text>
                    </View>
                </View>
                <Text style={[cs.colorGray, cs.fzS, fs.montR, topRightStyles]}>
                    {topRightText}
                </Text>
            </View>
            <View style={[cs.fRowBetw, cs.fAlCenter]}>
                <Text style={[cs.colorGray, cs.fzS, fs.montR]}>{bottomLeftText}</Text>
                <Text style={[cs.colorGray, cs.fzS, fs.montR]}>{bottomRightText}</Text>
            </View>
        </TouchableOpacity>
    )
}
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