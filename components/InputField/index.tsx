import React from 'react'
import { View, StyleSheet } from 'react-native'

type InputFieldProps = () => {
    mask?: string,
    
}
export const InputField = () => {
    return (
        <View></View>
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