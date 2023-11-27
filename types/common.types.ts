import {NavigationProp, ParamListBase, RouteProp} from "@react-navigation/native";

export type NavProps = {
    navigation: NavigationProp<any>
};
export type PopupProps = {
    opened: boolean,
    handlePopup: () => any
}