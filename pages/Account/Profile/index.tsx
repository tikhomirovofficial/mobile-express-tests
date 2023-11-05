import React, {useEffect} from 'react';
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import {Animated, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {cs} from "../../../common/styles";
import {useAppDispatch, useAppSelector} from "../../../app/base/hooks";
import {HeartIcon, Logo, PhotoIcon, ProfileIcon, ProfilesIcon, WalletIcon} from "../../../icons";
import {fs} from "../../../navigation/AppNavigator";


const Profile = () => {
    const dispatch = useAppDispatch()
    const {orderInfoModal} = useAppSelector(state => state.modals)
    const scaleValue = new Animated.Value(1);

    useEffect(() => {
        if (orderInfoModal) {
            Animated.spring(scaleValue, {
                toValue: .8,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(scaleValue, {
                toValue: 1,
                useNativeDriver: true
            }).start();
        }
    }, [orderInfoModal, scaleValue]);
    return (
        <Animated.ScrollView style={{transform: [{scale: scaleValue}]}}>
            <WhiteBorderedLayout style={{
                paddingTop: 32
            }}>
                <View style={[cs.fColumn, cs.spaceXXL]}>
                    <View style={[cs.fCenterCol, ]}>
                        <View style={[cs.spaceM, cs.fAlCenter, styles.profileInfo]}>
                            <View style={[styles.avatarBlock, cs.circle, cs.fCenterCol]}>
                                <PhotoIcon/>
                            </View>
                            <Text style={[cs.fwBold, cs.fzXL, cs.txtCenter]}>
                                Подосёнов Вячеслав Сергеевич
                            </Text>
                            <View style={[styles.bonuses, cs.bgYellow, cs.fAlCenter, cs.fRow, cs.spaceS, cs.circle]}>
                                <HeartIcon/>
                                <Text style={[cs.fwSemi, cs.colorDark]}>54 бонуса</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[cs.fColumn, cs.spaceM]}>
                        <View style={[cs.fRowBetw, cs.spaceM, {flexWrap: "wrap"}]}>
                            <TouchableOpacity style={[styles.profileHubItem, cs.wBlockShadow, cs.fAlCenter, cs.flexOne]}>
                                <View style={[styles.profileItemIcon, cs.rootBg, cs.circle, cs.fCenterCol]}>
                                    <ProfileIcon/>
                                </View>
                                <View style={[cs.fAlCenter]}>
                                    <Text style={[cs.fzS, fs.montR, cs.txtCenter, cs.fwMedium]}>Личные данные</Text>
                                    <Text style={[cs.fzXS, fs.montR, cs.txtCenter, cs.colorGray]}>ФИО, пол, фото</Text>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.profileHubItem, cs.wBlockShadow, cs.fAlCenter, cs.flexOne]}>
                                <View style={[styles.profileItemIcon, cs.rootBg, cs.circle, cs.fCenterCol]}>
                                    <WalletIcon/>
                                </View>
                                <View style={[cs.fAlCenter]}>
                                    <Text style={[cs.fzS, fs.montR, cs.txtCenter, cs.fwMedium]}>Финансы</Text>
                                    <Text style={[cs.fzXS, fs.montR, cs.txtCenter, cs.colorGray]}>Бонусы и реквизиты</Text>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.profileHubItem, cs.wBlockShadow, cs.fAlCenter, cs.flexOne]}>
                                <View style={[styles.profileItemIcon, cs.rootBg, cs.circle, cs.fCenterCol]}>
                                    <ProfilesIcon/>
                                </View>
                                <View style={[cs.fAlCenter]}>
                                    <Text style={[cs.fzS, fs.montR, cs.txtCenter, cs.fwMedium]}>Мои пациенты</Text>
                                    <Text style={[cs.fzXS, fs.montR, cs.txtCenter, cs.colorGray]}>Список ваших пациентов</Text>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.profileHubItem, cs.wBlockShadow, cs.fAlCenter, cs.flexOne]}>
                                <View style={[styles.profileItemIcon, cs.rootBg, cs.circle, cs.fCenterCol]}>
                                    <Logo height={24} width={16}/>
                                </View>
                                <View style={[cs.fAlCenter]}>
                                    <Text style={[cs.fzS, fs.montR, cs.txtCenter, cs.fwMedium]}>О приложении</Text>
                                    <Text style={[cs.fzXS, fs.montR, cs.txtCenter, cs.colorGray]}>Правовая информация</Text>
                                </View>

                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <Text style={[cs.fzM, fs.montR, cs.fwMedium, cs.txtCenter, cs.colorRed]}>Выйти из приложения</Text>
                        </TouchableOpacity>

                    </View>

                </View>



            </WhiteBorderedLayout>
        </Animated.ScrollView>

    );
};
const styles = StyleSheet.create({
    profileInfo: {
        maxWidth: 228
    },
    avatarBlock: {
        backgroundColor: cs.rootBg.backgroundColor,
        height: 80,
        width: 80,
    },
    bonuses: {
        paddingHorizontal: 15,
        paddingVertical: 6
    },
    profileHubItem: {
        paddingVertical: 14,
        borderRadius: 16,
        overflow: "hidden",
        gap: 18,
        minWidth: 140
    },
    profileItemIcon:{
        height: 64,
        width: 64
    }
})
export default Profile;