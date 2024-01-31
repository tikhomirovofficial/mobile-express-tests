import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { cs } from "../../common/styles";
import { CheckedBorderedIcon, CheckedCircleIcon, ProfileIcon, UncheckedBorderedIcon, UncheckedCircleIcon } from "../../icons";
import { fs } from "../../navigation/AppNavigator";
import { PatientApi, PatientType } from "../../types/entities/patients.types";

type PatientItemProps = {
    selected?: boolean,
    isRadio?: boolean,
    neededBottomBorder?: boolean
    handlePress?: () => any,
} & PatientApi
const PatientItem: FC<PatientItemProps> = ({ selected, handlePress, neededBottomBorder = true, isRadio, first_name, last_name, bonus, phone, id }) => {
    const GetSelectedIcon = () => {
        if (selected !== undefined) {
            if (!selected) {
                return !isRadio ? <UncheckedBorderedIcon /> : <UncheckedCircleIcon />
            }
            return !isRadio ? <CheckedBorderedIcon /> : <CheckedCircleIcon />
        }
        return null
    }
    return (
        <TouchableOpacity onPress={handlePress} style={[styles.patientCard, cs.fRowBetw, cs.fAlCenter, (neededBottomBorder ? cs.bottomBorder : null)]}>
            <View style={[cs.fRow, cs.fAlCenter, cs.spaceM]}>
                <View style={[styles.patientAvatar, styles.patientAvatarEmpty, cs.circle, cs.fCenterCol]}>
                    <ProfileIcon height={12} />
                </View>
                <View style={[cs.fColumn]}>
                    <Text style={[cs.fzS, cs.fwSemi, cs.colorDark]}>{`${first_name} ${last_name}`}</Text>
                    <Text style={[cs.colorGray, fs.montR, cs.fzXS]}>{phone}</Text>
                </View>
            </View>
            <GetSelectedIcon />
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    patientCard: {
        paddingVertical: 16,

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