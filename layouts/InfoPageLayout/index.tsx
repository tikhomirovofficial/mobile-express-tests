import React, { FC, ReactNode, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ContentWrapper from "../../components/ContentWrapper";
import AppContainer from "../../components/AppContainer";
import { cs } from "../../common/styles";
import { useAppTheme } from '../../hooks/useTheme';

interface WelcomeStepProps {
    title: string,
    image: ImageBitmap,
    content: ReactNode,
    handleSkip?: () => any
}

const InfoPageLayout: FC<WelcomeStepProps> = ({ title, image, content, handleSkip }) => {
    const theme = useAppTheme()
    return (
        <ScrollView contentContainerStyle={{ minHeight: "100%", backgroundColor: theme.borderedBg}}>
            <View style={styles.backgroundWrapper}>
                <ImageBackground style={[styles.background]} resizeMode={"cover"}
                    source={image}>
                    <LinearGradient start={{ x: 0.2, y: 0.09 }}
                        end={{ x: 0, y: 0.8 }}
                        style={{ height: "80%", position: "absolute", bottom: 0, left: 0, width: "100%" }}
                        colors={['rgba(255, 255, 255, 0)', 'white']}>
                    </LinearGradient>
                    <ContentWrapper style={{ height: "100%" }}>
                        <AppContainer style={{ height: "100%" }}>
                            <View style={[(handleSkip !== undefined ? { ...cs.fColumnBetw } : { justifyContent: 'flex-end' }), { flex: 1 }]}>
                                {
                                    handleSkip !== undefined ?
                                        <Text style={[styles.textSkip, cs.textYellow]}
                                            onPress={handleSkip}>Пропустить</Text>
                                        : null
                                }
                                <Text style={[cs.fwBold, cs.fzXL, styles.welcomeStepTitle]}>{title}</Text>

                            </View>
                        </AppContainer>
                    </ContentWrapper>
                </ImageBackground>
            </View>

            {content}
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    welcomeStepFeatures: {
        gap: 15,
        marginTop: 20,
        flex: 0.72,
    },
    welcomeStepFeatureText: {
        fontFamily: "MontserratMedium",
        marginTop: -3,
        flex: 1
    },
    textSkip: {
        fontFamily: "MontserratBold",
        paddingBottom: 40
    },
    backgroundWrapper: {
        borderBottomLeftRadius: 40,
        height: "100%",
        maxHeight: 420,
        overflow: "hidden",
        position: "relative",
        shadowColor: "rgba(0, 64, 128, 0.3)",
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    welcomeStepTitle: {
        fontFamily: "MontserratBold",
        maxWidth: "83%"
    },
    background: {
        height: "100%",
        width: "100%",
    },
    contentWelcome: {
    }

});
export default InfoPageLayout;