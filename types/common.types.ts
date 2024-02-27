import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native";
import { ReactNode } from "react";

export type HasId = {
    id: number
}
export type HasNodeChildren = {
    children: ReactNode
}
export type HasLoading = {
    loading: boolean
}
export type HasPart = {
    part: number
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