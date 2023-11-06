import {NavigationProp} from "@react-navigation/native";

export type NavProps = {
    navigation: NavigationProp<any>; // Здесь нужно заменить any на тип вашего стека навигации
    // Другие пропсы, если они есть
};