import React, {FC} from 'react';
import {StyleSheet, View, ViewStyle} from "react-native";

const ContentWrapper: FC<{children: React.ReactNode, style?: ViewStyle}> = ({children, style = null}) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50
    }
})
export default ContentWrapper;