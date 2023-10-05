import {CSSProperties} from "react";
import {StyleSheet} from "react-native";

const commonStyles = StyleSheet.create({
    dF: {
        display: "flex",
    },
    fRowBetw: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    fColumn: {
        display: "flex",
        flexDirection: "column"
    },
    fColumnBetw: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
    },
    fAlCenter: {
        alignItems: "center"
    },
    textYellow: {
        color: "#FFCF00"
    },
    fwBold: {
        fontWeight: "bold"
    },
    fzS: {
       fontSize: 14
    },
    fzM: {
        fontSize: 16
    },
    fzXL: {
        fontSize: 20
    }

})
export {
    commonStyles
}