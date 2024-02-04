import React, { FC, useState } from 'react'
import { View, StyleSheet, TextInput, KeyboardType } from 'react-native'
import { cs } from '../../common/styles'
import { fs } from '../../navigation/AppNavigator'
import MaskInput from 'react-native-mask-input'

type InputFieldProps = {
    mask?: string | RegExp | RegExp[] | (string | RegExp)[],
    idInput?: string,
    placeholder?: string
    type?: KeyboardType
    val: string,
    onChange: (val: string, unmasked?: string) => void

}
export const InputField: FC<InputFieldProps> = ({ mask, placeholder, val, type, onChange, idInput, }) => {
    const [focused, setFocused] = useState(false)
    if (mask) {
        return (
            <MaskInput
                mask={mask}
                value={val}
                keyboardType={type}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                nativeID={idInput}
                onChangeText={onChange}
                accessibilityLabelledBy={idInput}
                placeholder={placeholder}
                style={[styles.inputField, cs.fzM, fs.montR, (focused ? cs.focusedInput : null)]} />
        )
    }
    return (
        <TextInput
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={val}
            keyboardType={type}
            nativeID={idInput}
            onChangeText={onChange}
            accessibilityLabelledBy={idInput}
            placeholder={placeholder}
            style={[styles.inputField, cs.fzM, fs.montR, (focused ? cs.focusedInput : null)]} />
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