import React, { FC } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { cs } from '../../common/styles'
import { fs } from '../../navigation/AppNavigator'
import MaskInput from 'react-native-mask-input'

type InputFieldProps = {
    mask?: string,
    idInput?: string,
    placeholder?: string
    type?: string
    val: string,
    onChange: (val: string, unmasked?: string) => void

}
export const InputField: FC<InputFieldProps> = ({ mask, placeholder, val, onChange, idInput, }) => {
    if (mask) {
        return (
            <MaskInput
                value={val}
                nativeID={idInput}
                onChangeText={onChange}
                accessibilityLabelledBy={idInput}
                placeholder={placeholder}
                style={[styles.inputField, cs.fzM, fs.montR]} />
        )
    }
    return (
        <TextInput
            value={val}
            nativeID={idInput}
            onChangeText={onChange}
            accessibilityLabelledBy={idInput}
            placeholder={placeholder}
            style={[styles.inputField, cs.fzM, fs.montR]} />
    )
}
const styles = StyleSheet.create({
    inputField: {
        paddingVertical: 16,
        paddingHorizontal: 22,
        borderStyle: "solid",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#E2E2E9"
    },
})