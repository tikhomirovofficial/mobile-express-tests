import React, {FC, ReactNode} from 'react';
import {Dimensions, ScrollView, StyleSheet, View, ViewStyle} from "react-native";
import AppContainer from "../../components/AppContainer";
import {cs} from "../../common/styles";

type WhiteBorderedProps = {
    children: ReactNode,
    style?: ViewStyle
}
const minContainerHeight = Dimensions.get("window").height - 60

const WhiteBorderedLayout: FC<WhiteBorderedProps> = ({children, style}) => {
    return (
        <View style={styles.baseView}>
            <ScrollView contentContainerStyle={styles.scrollContainer} style={cs.flexOne}>
                <View style={styles.containerWrapperScroll}>
                    <View style={[styles.whiteContainer, style]}>
                        <AppContainer>
                            {children}
                        </AppContainer>
                    </View>
                </View>
            </ScrollView>

        </View>


    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        minHeight: "100%"
    },

    baseView: {
        flex: 1,
        minHeight: "100%"

    },
    containerWrapper: {
        flex: 1,

    },
    containerWrapperScroll: {
        display: "flex",
        minHeight: "100%",
        flex: 1,
        paddingTop: 80,
        justifyContent: "flex-end",
        flexDirection: "column"

    },
    whiteContainer: {
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.1,
        minHeight: minContainerHeight,
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    }
})
export default WhiteBorderedLayout;