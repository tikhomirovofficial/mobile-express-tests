import {StatusBar} from 'expo-status-bar';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import AppContainer from "./components/AppContainer";
import ContentWrapper from "./components/ContentWrapper";
import {commonStyles} from "./common/styles";
import {LinearGradient} from "expo-linear-gradient";
import * as Font from 'expo-font';
import {useEffect, useState} from "react";
import {CheckboxIcon} from "./components/icons";

async function loadFonts() {
    await Font.loadAsync({
        'MontserratRegular': require('./assets/fonts/Montserrat-Regular.ttf'),
        'MontserratMedium': require('./assets/fonts/Montserrat-Medium.ttf'),
        'MontserratSemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
        'MontserratBold': require('./assets/fonts/Montserrat-Bold.ttf'),
    })
}

function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    // Вызываем функцию для загрузки шрифта
    if (!fontsLoaded) {
        loadFonts().then(() => {
            setFontsLoaded(true);
        });
    }

    if(fontsLoaded) {
        return (
            <View style={styles.main}>

                <View style={styles.backgroundWrapper}>
                    <ImageBackground style={[styles.background]} resizeMode={"cover"}
                                     source={require("./assets/step_1.jpg")}>
                        <LinearGradient style={{height: "55%", position: "absolute", bottom: 0, left: 0, width: "100%"}}
                                        colors={['rgba(255, 0, 0, 0.0)', 'white']}>

                        </LinearGradient>
                        <ContentWrapper style={{height: "100%"}}>
                            <AppContainer style={{height: "100%"}}>
                                <View style={[commonStyles.fColumnBetw, {flex: 1, paddingBottom: 30}]}>
                                    <Text style={[styles.textSkip, commonStyles.textYellow]} onPress={() => alert("sas")}>Пропустить</Text>
                                    <Text style={[commonStyles.fwBold, commonStyles.fzXL, styles.welcomeStepTitle]}>Работа с вашими пациентами</Text>
                                </View>


                            </AppContainer>
                        </ContentWrapper>

                    </ImageBackground>

                </View>
                <AppContainer style={{flex: 1}}>
                    <View style={[commonStyles.fColumn, styles.welcomeStepFeatures]}>
                        <View style={[commonStyles.dF, {flexDirection: "row", gap: 8}]}>
                            <CheckboxIcon/>
                            <Text style={[commonStyles.fzM, {marginTop: -3}]}>Приглашайте своих пациентов по номеру телефона</Text>
                        </View>
                        <View style={[commonStyles.dF, {flexDirection: "row", gap: 8}]}>
                            <CheckboxIcon/>
                            <Text style={[commonStyles.fzM, {marginTop: -3}]}>Приглашайте своих пациентов по номеру телефона</Text>
                        </View>
                        <View style={[commonStyles.dF, {flexDirection: "row", gap: 8}]}>
                            <CheckboxIcon/>
                            <Text style={[commonStyles.fzM, {marginTop: -3}]}>Приглашайте своих пациентов по номеру телефона</Text>
                        </View>
                        <View style={[commonStyles.dF, {flexDirection: "row", gap: 8}]}>
                            <CheckboxIcon/>
                            <Text style={[commonStyles.fzM, {marginTop: -3}]}>Приглашайте своих пациентов по номеру телефона</Text>
                        </View>
                    </View>

                    <View style={[styles.contentWelcome, commonStyles.fColumn]} >



                    </View>
                </AppContainer>

                <StatusBar style="auto"/>
            </View>
        )
    }
    return (
        <Text>Загрузка</Text>

    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: "column",
        gap: 16,
        backgroundColor: "#F4FAFA",
        paddingBottom: 30
    },
    welcomeStepFeatures: {
        gap: 15
    },
    textSkip:{
        fontFamily: "MontserratBold",
        paddingBottom: 40
    },
    backgroundWrapper: {
        borderBottomLeftRadius: 40,
        backgroundColor: "blue",
        maxHeight: "52%",
        overflow: "hidden",
        position: "relative",
    },
    welcomeStepTitle: {
        fontFamily: "MontserratBold",
        maxWidth: "90%"
    },
    background: {
        height: "100%",
        width: "100%",
    },
    contentWelcome: {
        backgroundColor: "red"
    }
});
export default App
