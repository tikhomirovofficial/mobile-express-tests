import React, { FC, useState } from 'react'
import { View, StyleSheet, TextInput, KeyboardType, Text } from 'react-native'
import { cs } from '../../common/styles'
import { fs } from '../../navigation/AppNavigator'
import MaskInput from 'react-native-mask-input'
import { useAppTheme } from '../../hooks/useTheme'

type InputFieldProps = {
    mask?: string | RegExp | RegExp[] | (string | RegExp)[],
    label?: string,
    idInput?: string,
    error?: string,
    placeholder?: string
    type?: KeyboardType
    val: string,
    onChange: (val: string, unmasked?: string) => void

}
export const InputField: FC<InputFieldProps> = ({ mask, label, placeholder, val, type, onChange, idInput, error }) => {
    const theme = useAppTheme()
    const [focused, setFocused] = useState(false)

    if (label) {
        return (
            <View style={[cs.fColumn, cs.spaceM]}>
                <Text style={[cs.fzS, fs.montR, { color: theme.title }, (error ? cs.colorRed : null)]}
                    nativeID="labelFirstName">{error || label}</Text>
                {
                    mask ? <MaskInput
                        mask={mask}
                        value={val}
                        keyboardType={type}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        nativeID={idInput}
                        onChangeText={onChange}
                        placeholderTextColor={theme.text_label}
                        accessibilityLabelledBy={idInput}
                        placeholder={placeholder}
                        style={[styles.inputField, cs.fzM, { backgroundColor: theme.card_bg, borderColor: theme.input_border, color: theme.title }, fs.montR, (error ? [cs.errBorderColor, cs.colorRed] : null), (focused ? cs.focusedInput : null)]} />
                        :
                        <TextInput
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            value={val}
                            keyboardType={type}
                            nativeID={idInput}
                            placeholderTextColor={theme.text_label}
                            onChangeText={onChange}
                            accessibilityLabelledBy={idInput}
                            placeholder={placeholder}
                            style={[styles.inputField, cs.fzM, { backgroundColor: theme.card_bg || "transparent", borderColor: theme.input_border, color: theme.title }, fs.montR, (error ? [cs.errBorderColor, cs.colorRed] : null), (focused ? cs.focusedInput : null)]} />
                }
            </View>
        )
    }

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
                style={[styles.inputField, cs.fzM, fs.montR, (error ? [cs.errBorderColor, cs.colorRed] : null), (focused ? cs.focusedInput : null)]} />
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
            style={[styles.inputField, cs.fzM, fs.montR, (error ? [cs.errBorderColor, cs.colorRed] : null), (focused ? cs.focusedInput : null)]} />
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