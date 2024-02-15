import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native";

export type HasId = {
    id: number
}
export type HasLoading = {
    loading: boolean
}
export type HasPart = {
    part: boolean
}
export type HasNextPart = {
    can_next: boolean
}

export type NavProps = {
    navigation: NavigationProp<any>
};
export type PopupProps = {
    opened: boolean,
    handlePopup: () => any
}
export type ResponseStatus = {
    status: boolean
}
export type JWT = {
    refresh: string
    access: string
}