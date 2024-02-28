import React, { FC, useEffect } from 'react';
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { cs } from "../../../common/styles";
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { HeartIcon, LightThemeIcon, Logo, LogoutIcon, PhotoIcon, ProfileIcon, ProfilesIcon, ThemeIcon, WalletIcon } from "../../../icons";
import { fs } from "../../../navigation/AppNavigator";
import { handleAboutModal, handleOrdersFinancesModal, handlePatientsModal, handleProfileEditModal } from "../../../app/features/modals/modalsSlice";
import ProfileEditModal from "../../../components/Modals/ProfileEditModal";
import PatientsModal from "../../../components/Modals/PatientsModal";
import AboutAppModal from "../../../components/Modals/AboutAppModal";
import { NavProps } from "../../../types/common.types";
import Constants from 'expo-constants';
import OrdersFinancesModal from '../../../components/Modals/OrdersFinancesModal';
import { BottomSheet } from '../../../components/BottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SkeletonView } from '../../../components/SkeletonView';
import { SkeletonContainer } from 'react-native-skeleton-component';
import { logout } from '../../../app/features/login/loginSlice';
import { resetAccess } from '../../../app/features/access/accessSlice';
import { resetProfileData } from '../../../app/features/profile/profileSlice';
import { formatBonus } from '../../../utils/formatBonusesString';
import { usePagination } from '../../../hooks/usePagination';
import { useRefresh } from '../../../hooks/useRefresh';
import { setTheme } from '../../../app/features/settings/settingsSlice';
import { useAppTheme } from '../../../hooks/useTheme';
import { storeTheme } from '../../../utils/storeTheme';
import { useLogout } from '../../../hooks/useLogout';


const Profile: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const _theme = useAppTheme()
    const { theme } = useAppSelector(state => state.settings)
    const { refreshing, sendRefresh } = useRefresh()
    const profile = useAppSelector(state => state.profile)
    const { ordersFinancesModal, patientsModal, aboutAppModal, profileEditModal } = useAppSelector(state => state.modals)
    const { handleLogout } = useLogout()

    const handleProfileDataModal = () => dispatch(handleProfileEditModal())

    const handlePatients = () => dispatch(handlePatientsModal())

    const handleAbout = () => dispatch(handleAboutModal())

    const handleTheme = async () => {
        if (theme === "light") {
            dispatch(setTheme("dark"))
            await storeTheme("dark")
            return
        }
        dispatch(setTheme("light"))
        await storeTheme("light")
    }
    
    const handleFinances = () => dispatch(handleOrdersFinancesModal())

    return (
        <>
            <WhiteBorderedLayout transparentBg={false} onRefresh={sendRefresh} refreshing={refreshing} style={{ paddingTop: 32 }}>
                <View style={[cs.fColumn, cs.spaceXXL]}>
                    <View style={[cs.fCenterCol,]}>
                        <View style={[cs.spaceM, cs.fAlCenter, styles.profileInfo]}>
                            <SkeletonContainer backgroundColor={_theme.skeleton}>
                                {
                                    profile.loadings.profile ?
                                        <SkeletonView circle height={styles.avatarBlock.height} width={styles.avatarBlock.width} /> : <View style={[styles.avatarBlock, cs.circle, cs.fCenterCol]}>
                                            <PhotoIcon />
                                        </View>
                                }
                                {
                                    profile.loadings.profile ?
                                        <SkeletonView height={50} width={180} /> :
                                        <Text style={[cs.fwBold, cs.fzXL, cs.txtCenter, { color: _theme.title }]}>
                                            {profile.data.last_name} {profile.data.first_name} {profile.data.subname}
                                        </Text>
                                }
                                {
                                    profile.loadings.profile ?
                                        <SkeletonView height={30} width={110} /> :
                                        <View style={[styles.bonuses, cs.bgYellow, cs.fAlCenter, cs.fRow, cs.spaceS, cs.circle]}>
                                            <HeartIcon />
                                            <Text style={[cs.fwSemi, cs.colorDark]}>{formatBonus(profile.data.bonus)}</Text>
                                        </View>
                                }
                            </SkeletonContainer>
                        </View>
                    </View>
                    <View style={[cs.fColumn, cs.spaceM]}>
                        <View style={[cs.fRowBetw, cs.spaceM, { flexWrap: "wrap" }]}>
                            <TouchableOpacity onPress={handleProfileDataModal}
                                style={[styles.profileHubItem, cs.wBlockShadow, cs.fAlCenter, cs.flexOne, { backgroundColor: _theme.card_bg || cs.wBlockShadow.backgroundColor }]}>
                                <View style={[styles.profileItemIcon, cs.rootBg, cs.circle, cs.fCenterCol]}>
                                    <ProfileIcon />
                                </View>
                                <View style={[cs.fAlCenter]}>
                                    <Text style={[cs.fzS, fs.montR, cs.txtCenter, cs.fwMedium, { color: _theme.title }]}>Личные данные</Text>
                                    <Text style={[cs.fzXS, fs.montR, cs.txtCenter, cs.colorGray]}>ФИО, пол, фото</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleFinances}
                                style={[styles.profileHubItem, cs.wBlockShadow, cs.fAlCenter, cs.flexOne, { backgroundColor: _theme.card_bg || cs.wBlockShadow.backgroundColor }]}>
                                <View style={[styles.profileItemIcon, cs.rootBg, cs.circle, cs.fCenterCol]}>
                                    <WalletIcon />
                                </View>
                                <View style={[cs.fAlCenter]}>
                                    <Text style={[cs.fzS, fs.montR, cs.txtCenter, cs.fwMedium, { color: _theme.title }]}>Финансы</Text>
                                    <Text style={[cs.fzXS, fs.montR, cs.txtCenter, cs.colorGray]}>Бонусы и
                                        реквизиты</Text>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlePatients}
                                style={[styles.profileHubItem, cs.wBlockShadow, cs.fAlCenter, cs.flexOne, { backgroundColor: _theme.card_bg || cs.wBlockShadow.backgroundColor }]}>
                                <View style={[styles.profileItemIcon, cs.rootBg, cs.circle, cs.fCenterCol]}>
                                    <ProfilesIcon />
                                </View>
                                <View style={[cs.fAlCenter]}>
                                    <Text style={[cs.fzS, fs.montR, cs.txtCenter, cs.fwMedium, { color: _theme.title }]}>Мои пациенты</Text>
                                    <Text style={[cs.fzXS, fs.montR, cs.txtCenter, cs.colorGray]}>Список ваших
                                        пациентов</Text>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleAbout}
                                style={[styles.profileHubItem, cs.wBlockShadow, cs.fAlCenter, cs.flexOne, { backgroundColor: _theme.card_bg || cs.wBlockShadow.backgroundColor }]}>
                                <View style={[styles.profileItemIcon, cs.rootBg, cs.circle, cs.fCenterCol]}>
                                    <Logo height={24} width={16} />
                                </View>
                                <View style={[cs.fAlCenter]}>
                                    <Text style={[cs.fzS, fs.montR, cs.txtCenter, cs.fwMedium, { color: _theme.title }]}>О приложении</Text>
                                    <Text style={[cs.fzXS, fs.montR, cs.txtCenter, cs.colorGray]}>Правовая
                                        информация</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleTheme}
                                style={[styles.profileHubItem, cs.wBlockShadow, cs.fAlCenter, cs.flexOne, { backgroundColor: _theme.card_bg || cs.wBlockShadow.backgroundColor }]}>
                                <View style={[styles.profileItemIcon, cs.rootBg, cs.circle, cs.fCenterCol]}>
                                    {
                                        theme === "dark" ?
                                            <LightThemeIcon stroke={"#4d4d4d"} /> :
                                            <ThemeIcon />
                                    }
                                </View>
                                <View style={[cs.fAlCenter]}>
                                    <Text style={[cs.fzS, fs.montR, cs.txtCenter, cs.fwMedium, { paddingBottom: 8 }, { color: _theme.title }]}>Включить {theme === "light" ? "тёмную" : "светлую"} тему</Text>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleLogout}
                                style={[styles.profileHubItem, cs.wBlockShadow, cs.fAlCenter, cs.flexOne, { backgroundColor: _theme.card_bg || cs.wBlockShadow.backgroundColor }]}>
                                <View style={[styles.profileItemIcon, cs.rootBg, cs.circle, cs.fCenterCol]}>
                                    <LogoutIcon />
                                </View>
                                <View style={[cs.fAlCenter]}>
                                    <Text style={[cs.fzS, fs.montR, cs.txtCenter, cs.fwMedium, cs.colorRed, { paddingBottom: 8 }]}>Выйти из приложения</Text>

                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </WhiteBorderedLayout>
            {patientsModal ? <PatientsModal navigation={navigation} /> : null}
            {profileEditModal ? <ProfileEditModal /> : null}
            {aboutAppModal ? <AboutAppModal /> : null}
            {ordersFinancesModal ? <OrdersFinancesModal /> : null}
        </>
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
        paddingHorizontal: 14,
        borderRadius: 16,
        gap: 18,
        minWidth: 140,
    },
    profileItemIcon: {
        height: 64,
        width: 64
    },
    profileDataBlock: {
        backgroundColor: "blue",
        minHeight: "100%"
    },
    profileDataContent: {
        backgroundColor: "red"
    }
})
export default Profile;