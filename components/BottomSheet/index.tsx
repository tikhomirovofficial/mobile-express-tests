import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, useAnimatedValue, Touchable, TouchableOpacity, FlatList } from 'react-native'
import { cs } from '../../common/styles'
import AppContainer from '../AppContainer'
import { BorderedProfileIcon } from '../../icons'
import { Gesture, GestureDetector, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Animated, { SlideInDown, SlideOutDown, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { OrderItem } from '../OrderItem'
import { useAppDispatch, useAppSelector } from '../../app/base/hooks'
import { handleBonusesBottomSheet } from '../../app/features/modals/modalsSlice'
import { normalizeDate } from '../../utils/normalizeDate'



const { width, height } = Dimensions.get("screen")

export const BottomSheet = () => {
    const dispatch = useAppDispatch()
    const { patientInfo } = useAppSelector(state => state.currentData)
    const translateY = useSharedValue(1)
    const ctx = useSharedValue({ y: 1 })
    const closeSheet = () => {
        dispatch(handleBonusesBottomSheet())
    }

    const gesture = Gesture.Pan()
        .onStart(e => {
            ctx.value = { y: translateY.value }
        }).
        onUpdate(e => {
            translateY.value = e.translationY + ctx.value.y
            translateY.value = Math.max(translateY.value, -height + 40)
        }).
        onFinalize(() => {
            if (translateY.value > -height / 4) {
                translateY.value = withSpring(0, { damping: 50 }, () => {
                    runOnJS(closeSheet)()
                })
            } else if (translateY.value < -height / 2) {
                translateY.value = withSpring(-height + 40, { damping: 50 })
            }

        })


    const bSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }]
        }
    })

    useEffect(() => {
        translateY.value = withTiming(-height / 3)
    }, [])


    return (

        <GestureDetector gesture={gesture}>
            <View style={[styles.bottomSheetContainer]}>
                <TouchableWithoutFeedback onPress={closeSheet} style={{ backgroundColor: "rgba(1,1,1, 0.4)", height: "100%" }}>
                </TouchableWithoutFeedback>
                <Animated.View
                    entering={SlideInDown.springify().damping(10)}
                    exiting={SlideOutDown.springify().damping(10)}
                    style={[styles.bottomSheetBlock, bSheetStyle]}>

                    <View style={[styles.bottomSheetHeader]}>
                        <LinearGradient start={{ x: 0.2, y: 1 }}
                            end={{ x: 0.24, y: -0.4 }}
                            style={[{ height: "100%" }, styles.headerContent, cs.pRel, cs.fColumn]}
                            colors={["#12B2B3", "#56E0E0"]}>
                            <AppContainer>
                                <View style={[cs.fColumn, cs.spaceS]}>
                                    <View style={[styles.line]}></View>
                                    <Text style={[cs.title, cs.txtCenter, cs.colorWhite]}>{patientInfo.data.first_name} {patientInfo.data.last_name}</Text>
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

                        <AppContainer style={cs.flexOne}>
                            <View style={[cs.fRowBetw]}>
                                <Text style={[cs.title]}>Всего</Text>
                                <Text style={[cs.title]}>{patientInfo.data.bonus}</Text>
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false} style={cs.flexOne}>
                                {
                                    patientInfo.orders.map(item => (
                                        <OrderItem
                                            codeText={String(item.id)}
                                            bottomLeftText={`От ${normalizeDate(item.date)}`}
                                            bottomRightText={item.status}
                                            topRightText={String(item.bonus)}
                                        />
                                    ))
                                }

                            </ScrollView>
                            {/* <FlatList
                                    scrollEnabled={true}
                                    style={{flex: 1}}
                                    contentContainerStyle={[cs.fColumn]}
                                    data={patientInfo.orders}
                                    renderItem={({ item }) => (
                                        <OrderItem
                                            codeText={String(item.id)}
                                            bottomLeftText={`От ${normalizeDate(item.date)}`}
                                            bottomRightText={item.status}
                                            topRightText={String(item.bonus)}
                                        />)}
                                /> */}
                            {/* <View style={[cs.fColumn, cs.flexOne, { backgroundColor: "blue" }]}>
                                

                            </View> */}



                        </AppContainer>
                    </View>
                </Animated.View>
            </View>
        </GestureDetector >
    )
}

const styles = StyleSheet.create({
    bottomSheetContainer: {
        top: 0,
        position: "absolute",
        zIndex: 10,
        height: "100%",
        width: "100%"
    },
    bottomSheetBlock: {
        height: height,
        position: "absolute",
        width: "100%",
        backgroundColor: "white",
        overflow: 'hidden',
        top: height,
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
        paddingTop: 40,
        paddingBottom: 60,
        flex: 1
    }

})