import React, {FC} from "react";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {cs} from "../common/styles";
import {CallIcon, DownloadIcon, HomeIcon, ProfileIcon} from "../icons";
import {routesNames} from "./routes";

const AppTab: FC<BottomTabBarProps> = ({state, descriptors,  navigation}) => {

    return (
        <View key={state.index} style={[cs.dF, cs.fRow, styles.tabsContainer]}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const isFocused = state.index === index;
                const TabIcon = () => {
                    switch (route.name) {
                        case "support":
                            return <CallIcon stroke={isFocused ? "#36CACB": "#4D4D4D"}/>
                        case "profile":
                            return <ProfileIcon stroke={isFocused ? "#36CACB": "#4D4D4D"}/>
                        default:
                            return <HomeIcon stroke={isFocused ? "#36CACB": "#4D4D4D"}/>
                    }
                }
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? {selected: true} : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={cs.fAlCenter}
                    >

                        <TabIcon/>
                        <Text style={[{color: isFocused ? '#36CACB' : cs.colorDark.color}, cs.fzXS]}>
                            {routesNames[route.name] || ""}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
const styles = StyleSheet.create({
    tabsContainer: {
        justifyContent: "space-around",
        paddingVertical: 14,
        paddingBottom: 20,
        backgroundColor: "white",
        borderTopColor: "rgba(53, 53, 53, 0.10)",
        borderTopWidth: 1
    }
})
export default AppTab