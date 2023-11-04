import Svg, {Path} from "react-native-svg";
import {FC} from "react";

export interface IconProps {
    width?: number,
    height?: number
}

export const CheckboxIcon: FC<IconProps> = ({width = 18, height = 18}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
            <Path
                d="M2.51466 6.71282C3.00328 4.62975 4.62976 3.00328 6.71282 2.51466C8.21719 2.16178 9.78281 2.16178 11.2872 2.51466C13.3702 3.00328 14.9967 4.62976 15.4853 6.71283C15.8382 8.21719 15.8382 9.78281 15.4853 11.2872C14.9967 13.3702 13.3702 14.9967 11.2872 15.4853C9.78281 15.8382 8.21719 15.8382 6.71283 15.4853C4.62976 14.9967 3.00328 13.3702 2.51466 11.2872C2.16178 9.78281 2.16178 8.21719 2.51466 6.71282Z"
                fill="#36CACB" fillOpacity={0.15} stroke="#36CACB" strokeWidth={1.125}
            />
            <Path
                d="M6.9375 8.8125L8.4375 10.3125L11.0625 7.5"
                stroke="#36CACB" strokeWidth={1.125}
                strokeLinecap="round" strokeLinejoin="round"
            />
        </Svg>

    )
}
export const Logo: FC<IconProps> = ({width = 44, height = 64}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 44 64" fill="none">
            <Path d="M0.0854874 -0.000250816L0.0854874 12.1504L43.6949 12.1504V-0.000250816L0.0854874 -0.000250816Z"
                  fill="#FFCF00"/>
            <Path
                d="M43.6095 18.2231H11.5754H0V30.3738V63.9997H11.5754V38.9639L35.426 63.9997L43.6095 55.4096L19.7589 30.3738H43.6095V18.2231Z"
                fill="#FFCF00"/>
        </Svg>
    )
}
export const DownloadIcon: FC<IconProps> = ({width = 21, height = 20}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 21 20" fill="none">
            <Path d="M10.1222 13.436L10.1222 1.39502" stroke="#D7D7D7" strokeWidth="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <Path d="M13.0382 10.5083L10.1222 13.4363L7.20619 10.5083" stroke="#D7D7D7" strokeWidth="1.5"
                  stroke-linecap="round" stroke-linejoin="round"/>
            <Path opacity="0.4"
                  d="M14.755 6.12793H15.688C17.723 6.12793 19.372 7.77693 19.372 9.81293V14.6969C19.372 16.7269 17.727 18.3719 15.697 18.3719L4.55699 18.3719C2.52199 18.3719 0.871994 16.7219 0.871994 14.6869V9.80193C0.871994 7.77293 2.51799 6.12793 4.54699 6.12793H5.48899"
                  stroke="#D7D7D7" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    )
}
