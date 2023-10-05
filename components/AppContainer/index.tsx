import React, {FC} from 'react';
import {StyleSheet, View, ViewStyle} from "react-native";

const AppContainer: FC<{children: React.ReactNode, style?: ViewStyle}> = ({children, style = null}) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        maxWidth: "85.2%",
        width: "100%",
    }
})
export default AppContainer;