import React, { FC, ReactNode } from 'react';
import { Dimensions, ScrollView, StyleSheet, View, ViewStyle, Text } from "react-native";
import AppContainer from "../../components/AppContainer";
import { cs } from "../../common/styles";
import { IOScrollView } from 'react-native-intersection-observer';

type WhiteBorderedProps = {
    children: ReactNode,
    scrollable?: boolean
    style?: ViewStyle | ViewStyle[],
    topContent?: ReactNode
}
const minContainerHeight = Dimensions.get("window").height / 100 * 92

const WhiteBorderedLayout: FC<WhiteBorderedProps> = ({ children, topContent, style, scrollable = true }) => {
    return (
        <View style={styles.baseView}>
            {
                scrollable ?
                    <IOScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer} style={cs.flexOne}>
                        <View style={styles.containerWrapperScroll}>
                            {topContent}
                            <View style={[styles.whiteContainer, style]}>
                                <AppContainer>
                                    {children}
                                </AppContainer>
                            </View>
                        </View>
                    </IOScrollView> :
                    <View style={[cs.flexOne, styles.scrollContainer]}>
                        <View style={styles.containerWrapperScroll}>
                            {topContent}
                            <View style={[styles.whiteContainer, style]}>
                                <AppContainer style={{flex: 1}}>
                                    {children}
                                </AppContainer>
                            </View>
                        </View>
                    </View>
            }

        </View>


    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        minHeight: "100%"
    },

    baseView: {
        minHeight: "100%"
    },
    containerWrapper: {
        flex: 1,
    },
    containerWrapperScroll: {
        display: "flex",
        minHeight: "100%",
        gap: 16,
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
        maxHeight: "100%",
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    }
})
export default WhiteBorderedLayout;