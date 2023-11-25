import {CSSProperties} from "react";
import {StyleSheet} from "react-native";

const cs = StyleSheet.create({

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
    fRow:{
        display: "flex",
        flexDirection: "row"
    },
    fCenterCol: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
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
        fontWeight: "bold",
        fontFamily: "MontserratBold",
    },
    fzXS: {
      fontSize: 12
    },
    fzS: {
       fontSize: 14
    },
    fzM: {
        fontSize: 16
    },
    fzXL: {
        fontSize: 20
    },
    fwMedium: {
        fontWeight: "500",
        fontFamily: "MontserratMedium",
    },
    fwSemi: {
        fontWeight: "600"
    },
    wBlockShadow: {
        shadowColor: "rgba(19, 101, 101, 0.3)",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        backgroundColor: "white",
        elevation: 4,
    },
    yellowBtn: {
        padding: 15,
        borderRadius: 6,
        textAlign: "center"
    },
    lightGray: {
        borderRadius: 2,
        backgroundColor: "#F8F8F8",
        paddingHorizontal: 10,
        paddingVertical: 3
    },
    yellowBtnText: {
        fontFamily: "MontserratSemiBold",
    },
    flexOne: {
        flex: 1
    },
    bgYellow: {
        backgroundColor: "#FFCF00",
    },
    fClickableGray: {
        fontWeight: "500",
        color: "#D7D7D7"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    colorWhite: {
        color: "#fff"
    },
    colorDark: {
      color: "#4D4D4D"
    },
    colorRed: {
        color: "#F40F0F"
    },
    colorGray: {
        color: "#A9A9A9"
    },
    txtCenter: {
        textAlign: "center"
    },
    spaceXXL: {
        gap: 40
    },
    spaceXL: {
        gap: 32
    },
    spaceL: {
        gap: 24
    },
    spaceM: {
        gap: 16
    },
    spaceS: {
        gap: 8
    },
    circle: {
        borderRadius: 1000
    },
    statusGray: {
        borderRadius: 2,
        backgroundColor: "#d7d7d7"
    },
    statusGreen: {
        borderRadius: 2,
        backgroundColor: "#7ED321"
    },
    modalSlidedBottom: {
        flex: 1,
        paddingTop: 24,
        backgroundColor: "white",
        shadowColor: "rgba(19, 101, 101, 0.5)",
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 90,
        shadowRadius: 10,
        elevation: 20,
    },
    rootBg: {
        backgroundColor: "#F4FAFA"
    },
    sliderDot: {
        height: 6,
        width: 6,
        borderRadius: 3,
        backgroundColor: "rgba(54, 202, 203, 1)"
    },
    sliderDotActive: {
        transform: "scale(1.8)"
    },
    textBlue: {
        color: "rgba(18, 178, 179, 1)"
    }

})
export {
    cs
}