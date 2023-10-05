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