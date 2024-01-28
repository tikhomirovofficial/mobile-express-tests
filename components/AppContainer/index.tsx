import React, {FC} from 'react';
import {Dimensions, StyleSheet, View, ViewStyle} from "react-native";

const AppContainer: FC<{children: React.ReactNode, style?: ViewStyle}> = ({children, style = null}) => {
    return (
        <View style={[containerStyles.container, style]}>
            {children}
        </View>
    );
};

export const containerStyles = StyleSheet.create({
    container: {
        alignSelf: "center",
        maxWidth: Dimensions.get("window").width - 60,
        width: "100%",
        paddingBottom: 30
    }
})
export default AppContainer;