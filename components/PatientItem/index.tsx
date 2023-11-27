import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {cs} from "../../common/styles";
import {CheckedBorderedIcon, CheckedCircleIcon, ProfileIcon, UncheckedBorderedIcon, UncheckedCircleIcon} from "../../icons";
import {fs} from "../../navigation/AppNavigator";
import {PatientType} from "../../types/patients.types";

type PatientItemProps = {
    selected?: boolean,
    isRadio?: boolean
    handlePress?: () => any,
} & PatientType
const PatientItem: FC<PatientItemProps> = ({selected, handlePress, isRadio, firstName, lastName, phone, avatarSrc}) => {
    const GetSelectedIcon = () => {
        if(selected !== undefined) {
            if(!selected) {
                return !isRadio ? <UncheckedBorderedIcon/> : <UncheckedCircleIcon/>
            }
            return !isRadio ? <CheckedBorderedIcon/> : <CheckedCircleIcon/>
        }
        return null
    }
    return (
        <TouchableOpacity onPress={handlePress} style={[styles.patientCard, cs.fRowBetw, cs.fAlCenter]}>
            <View style={[cs.fRow, cs.fAlCenter, cs.spaceM]}>
                <View style={[styles.patientAvatar, styles.patientAvatarEmpty, cs.circle, cs.fCenterCol]}>
                    <ProfileIcon height={12}/>
                </View>
                <View style={[cs.fColumn]}>
                    <Text style={[cs.fzS, cs.fwSemi, cs.colorDark]}>{`${firstName} ${lastName}`}</Text>
                    <Text style={[cs.colorGray, fs.montR, cs.fzXS]}>{phone}</Text>
                </View>
            </View>
            <GetSelectedIcon/>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    patientCard: {
        paddingVertical: 16,
        borderBottomColor: "#F3F3F3",
        borderBottomWidth: 1,
        borderStyle: "solid"

    },
    patientAvatarEmpty: {
        backgroundColor: cs.rootBg.backgroundColor,
    },
    patientAvatar: {
        height: 40,
        width: 40,
    }
})

export default PatientItem;