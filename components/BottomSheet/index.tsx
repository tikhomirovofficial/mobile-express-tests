import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, useAnimatedValue } from 'react-native'
import { cs } from '../../common/styles'
import AppContainer from '../AppContainer'
import { BorderedProfileIcon } from '../../icons'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'



const { width, height } = Dimensions.get("screen")

export const BottomSheet = () => {
    const translateY = useSharedValue(0)

    const ctx = useSharedValue({ y: 0 })
    const gesture = Gesture.Pan()
        .onStart(e => {
            ctx.value = { y: translateY.value }
        }).
        onUpdate(e => {
            translateY.value = e.translationY + ctx.value.y
        })
    const bSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }]
        }
    })

    return (
        <GestureDetector gesture={gesture}>
            <View style={[styles.bottomSheetContainer,]}>
                <Animated.View style={[styles.bottomSheetBlock, bSheetStyle]}>
                    <View style={[styles.bottomSheetHeader]}>
                        <LinearGradient start={{ x: 0.2, y: 1 }}
                            end={{ x: 0.24, y: -0.4 }}
                            style={[{ height: "100%" }, styles.headerContent, cs.pRel, cs.fColumn]}
                            colors={["#12B2B3", "#56E0E0"]}>
                            <AppContainer>
                                <View style={[cs.fColumn, cs.spaceS]}>
                                    <View style={[styles.line]}></View>
                                    <Text style={[cs.title, cs.txtCenter, cs.colorWhite]}>Ахмет Ахматович</Text>
                                    <View style={[cs.flexOne, { backgroundColor: "black", position: "relative" }]}>
                                        <View style={[styles.avatar, cs.fCenterCol]}>
                                            <BorderedProfileIcon />
                                        </View>

                                    </View>
                                </View>
                            </AppContainer>
                        </LinearGradient>
                    </View>
                    <View style={[styles.patientSheetContent]}>

                        <AppContainer>
                            <Text>sasa</Text>
                        </AppContainer>
                    </View>
                </Animated.View>

            </View>


        </GestureDetector>
    )
}
const styles = StyleSheet.create({
    bottomSheetContainer: {
        top: 0,
        position: "absolute",
        height: "100%",
        backgroundColor: "rgba(1,1,1, 0.4)",
        width: "100%"
    },
    bottomSheetBlock: {
        height: height,
        position: "absolute",
        width: "100%",
        backgroundColor: "white",
        overflow: 'hidden',
        top: height / 1.5,
        borderRadius: 25
    },
    bottomSheetHeader: {
        maxHeight: 106,
    },
    headerContent: {
        padding: 8
    },
    line: {
        backgroundColor: "rgba(1,1,1, 0.3)",
        width: 30,
        height: 3,
        alignSelf: "center",
        borderRadius: 100
    },
    avatar: {
        height: 74,
        position: "absolute",
        top: 14,
        alignSelf: "center"
    },
    patientSheetContent: {
        paddingTop: 32
    }

})