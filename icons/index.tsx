import Svg, {Circle, Path} from "react-native-svg";
import {FC} from "react";

export interface IconProps {
    width?: number,
    height?: number,
    stroke?: string
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
export const PhotoIcon: FC<IconProps> = ({width = 24, height = 22}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 28 24" fill="none">
            <Path fill-rule="evenodd" clip-rule="evenodd"
                  d="M21.517 5.47991V5.47991C21.0197 5.47991 20.569 5.19324 20.357 4.74524C19.9744 3.93458 19.4877 2.89858 19.1997 2.33458C18.7744 1.49591 18.085 1.00791 17.1304 1.00124C17.1144 0.999911 10.885 0.999911 10.869 1.00124C9.91438 1.00791 9.22638 1.49591 8.79972 2.33458C8.51305 2.89858 8.02638 3.93458 7.64372 4.74524C7.43172 5.19324 6.97972 5.47991 6.48372 5.47991V5.47991C3.82238 5.47991 1.66638 7.63591 1.66638 10.2959V18.2106C1.66638 20.8692 3.82238 23.0266 6.48372 23.0266H21.517C24.177 23.0266 26.333 20.8692 26.333 18.2106V10.2959C26.333 7.63591 24.177 5.47991 21.517 5.47991Z"
                  stroke="#4D4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <Path fill-rule="evenodd" clip-rule="evenodd"
                  d="M9.76185 13.7793C9.76052 16.1166 11.6685 18.0286 14.0019 18.0273C16.3312 18.0246 18.2339 16.1206 18.2379 13.7886C18.2419 11.4473 16.3405 9.53929 14.0045 9.53662C11.6552 9.53396 9.74319 11.474 9.76185 13.7793Z"
                  stroke="#4D4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <Path
                d="M20.5367 10.6601C20.4079 10.6469 20.2807 10.6133 20.1382 10.5559C19.9796 10.4855 19.8424 10.3959 19.7097 10.2611C19.4714 10.0076 19.3334 9.67603 19.3334 9.33398C19.3334 9.15229 19.3705 8.97221 19.4431 8.80908C19.5157 8.64381 19.6019 8.50439 19.7576 8.35274C19.876 8.24958 19.9974 8.16657 20.1632 8.09351C20.6551 7.89861 21.2402 8.01506 21.6058 8.38055C21.7154 8.48852 21.8077 8.61881 21.8589 8.72868L21.8892 8.80659C21.9629 8.97221 22 9.15229 22 9.33398C22 9.68296 21.8638 10.0057 21.6109 10.2744C21.3923 10.4944 21.1052 10.6297 20.799 10.6601L20.6667 10.6667L20.5367 10.6601Z"
                fill="#4D4D4D"/>
        </Svg>

    )
}
export const HeartIcon: FC<IconProps> = ({width = 16, height = 16}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
            <Path fill-rule="evenodd" clip-rule="evenodd"
                  d="M7.82076 14.6403C6.1928 13.6384 4.67833 12.4592 3.30447 11.1239C2.33858 10.1622 1.60325 8.98983 1.15482 7.69654C0.347858 5.18773 1.29045 2.31562 3.92834 1.46564C5.31471 1.01933 6.82884 1.27441 7.99707 2.15111C9.16575 1.27548 10.6793 1.02048 12.0658 1.46564C14.7037 2.31562 15.6531 5.18773 14.8461 7.69654C14.3977 8.98983 13.6623 10.1622 12.6965 11.1239C11.3226 12.4592 9.80812 13.6384 8.18016 14.6403L8.00385 14.75L7.82076 14.6403Z"
                  stroke="#4D4D4D" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
            <Path d="M10.8044 4.28979C11.6034 4.54502 12.1711 5.26232 12.2421 6.10628" stroke="#4D4D4D"
                  strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
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

export const ProfileIcon: FC<IconProps> = ({width = 17, height = 21, stroke = "#4D4D4D"}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 17 22" fill="none">
            <Circle cx="8.57894" cy="6.27803" r="4.77803" stroke={stroke} strokeWidth="1.5" stroke-linecap="round"
                    stroke-linejoin="round"/>
            <Path fill-rule="evenodd" clip-rule="evenodd"
                  d="M1.00002 17.7013C0.998732 17.3654 1.07385 17.0336 1.2197 16.7311C1.67736 15.8157 2.96798 15.3306 4.03892 15.1109C4.81128 14.9461 5.59431 14.836 6.38217 14.7814C7.84084 14.6533 9.30793 14.6533 10.7666 14.7814C11.5544 14.8366 12.3374 14.9467 13.1099 15.1109C14.1808 15.3306 15.4714 15.77 15.9291 16.7311C16.2224 17.3479 16.2224 18.0639 15.9291 18.6807C15.4714 19.6418 14.1808 20.0812 13.1099 20.2917C12.3384 20.4633 11.5551 20.5766 10.7666 20.6304C9.57937 20.731 8.38659 20.7494 7.19681 20.6853C6.92221 20.6853 6.65677 20.6853 6.38217 20.6304C5.59663 20.5772 4.81632 20.464 4.04807 20.2917C2.96798 20.0812 1.68652 19.6418 1.2197 18.6807C1.0746 18.3746 0.999552 18.04 1.00002 17.7013Z"
                  stroke={stroke} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    )
}
export const WalletIcon: FC<IconProps> = ({width = 22, height = 20, stroke = "#4D4D4D"}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 22 20" fill="none">
            <Path
                d="M20.6389 12.3957H16.5906C15.1042 12.3948 13.8993 11.1909 13.8984 9.70446C13.8984 8.21801 15.1042 7.01409 16.5906 7.01318H20.6389"
                stroke="#4D4D4D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M17.0485 9.64294H16.7369" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"
                  stroke-linejoin="round"/>
            <Path fill-rule="evenodd" clip-rule="evenodd"
                  d="M6.74766 1H15.3911C18.2892 1 20.6388 3.34951 20.6388 6.24766V13.4247C20.6388 16.3229 18.2892 18.6724 15.3911 18.6724H6.74766C3.84951 18.6724 1.5 16.3229 1.5 13.4247V6.24766C1.5 3.34951 3.84951 1 6.74766 1Z"
                  stroke={stroke} strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
            <Path d="M6.03564 5.5382H11.4346" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"
                  stroke-linejoin="round"/>
        </Svg>
    )
}

export const ProfilesIcon: FC<IconProps> = ({width = 21, height = 21, stroke = "#4D4D4D"}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 23 18" fill="none">
            <Path
                d="M17.5948 7.93189C19.1972 7.93189 20.497 6.63298 20.497 5.03064C20.497 3.42831 19.1972 2.12939 17.5948 2.12939"
                stroke={stroke} strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
            <Path
                d="M18.9291 11.0847C19.4076 11.1177 19.8833 11.1856 20.3517 11.291C21.0026 11.4184 21.7854 11.6851 22.0641 12.2691C22.2419 12.6431 22.2419 13.0785 22.0641 13.4534C21.7863 14.0373 21.0026 14.3031 20.3517 14.437"
                stroke={stroke} strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
            <Path
                d="M6.28998 7.93189C4.68765 7.93189 3.38782 6.63298 3.38782 5.03064C3.38782 3.42831 4.68765 2.12939 6.28998 2.12939"
                stroke={stroke} strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
            <Path
                d="M4.95577 11.0847C4.47727 11.1177 4.00152 11.1856 3.5331 11.291C2.88227 11.4184 2.09943 11.6851 1.82168 12.2691C1.64293 12.6431 1.64293 13.0785 1.82168 13.4534C2.09852 14.0373 2.88227 14.3031 3.5331 14.437"
                stroke={stroke} strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
            <Path fill-rule="evenodd" clip-rule="evenodd"
                  d="M11.9378 11.7095C15.1846 11.7095 17.9584 12.2008 17.9584 14.1671C17.9584 16.1324 15.2029 16.6421 11.9378 16.6421C8.69003 16.6421 5.91711 16.1507 5.91711 14.1845C5.91711 12.2182 8.67261 11.7095 11.9378 11.7095Z"
                  stroke={stroke} strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
            <Path fill-rule="evenodd" clip-rule="evenodd"
                  d="M11.9377 8.90492C9.79638 8.90492 8.07947 7.188 8.07947 5.04575C8.07947 2.90442 9.79638 1.1875 11.9377 1.1875C14.0791 1.1875 15.796 2.90442 15.796 5.04575C15.796 7.188 14.0791 8.90492 11.9377 8.90492Z"
                  stroke={stroke} strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
        </Svg>
    )
}
export const CallIcon: FC<IconProps> = ({width = 21, height = 21, stroke = "#4D4D4D"}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 22 22" fill="none">
            <Path fill-rule="evenodd" clip-rule="evenodd"
                  d="M1.98995 3.87351C2.30627 3.34875 4.05018 1.44377 5.2929 1.50127C5.66469 1.53311 5.99334 1.75698 6.26037 2.01783H6.2614C6.87351 2.61756 8.62974 4.88094 8.72834 5.35745C8.97175 6.52611 7.57806 7.19978 8.00428 8.37769C9.09089 11.0364 10.9632 12.9086 13.6232 13.994C14.8002 14.4212 15.4739 13.0287 16.6427 13.2711C17.1192 13.3707 19.3839 15.1257 19.9826 15.7388V15.7388C20.2425 16.0048 20.4684 16.3344 20.4992 16.7062C20.5454 18.0155 18.5222 19.7829 18.1278 20.0088C17.1973 20.6753 15.9833 20.663 14.5034 19.975C10.3737 18.2569 3.77391 11.782 2.02384 7.49657C1.35421 6.02496 1.30902 4.8029 1.98995 3.87351Z"
                  stroke={stroke} strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
            <Path d="M13.5654 1.75C17.2674 2.161 20.1904 5.081 20.6064 8.782" stroke={stroke} strokeWidth="1.5"
                  strokeLinecap="round" stroke-linejoin="round"/>
            <Path d="M13.5654 5.29297C15.3354 5.63797 16.7184 7.02097 17.0634 8.79097" stroke={stroke}
                  strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
        </Svg>
    )
}
export const HomeIcon: FC<IconProps> = ({width = 20, height = 21, stroke = "#4D4D4D"}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 22 22" fill="none">
            <Path
                d="M8.15722 19.7714V16.7047C8.1572 15.9246 8.79312 15.2908 9.58101 15.2856H12.4671C13.2587 15.2856 13.9005 15.9209 13.9005 16.7047V16.7047V19.7809C13.9003 20.4432 14.4343 20.9845 15.103 21H17.0271C18.9451 21 20.5 19.4607 20.5 17.5618V17.5618V8.83784C20.4898 8.09083 20.1355 7.38935 19.538 6.93303L12.9577 1.6853C11.8049 0.771566 10.1662 0.771566 9.01342 1.6853L2.46203 6.94256C1.86226 7.39702 1.50739 8.09967 1.5 8.84736V17.5618C1.5 19.4607 3.05488 21 4.97291 21H6.89696C7.58235 21 8.13797 20.4499 8.13797 19.7714V19.7714"
                stroke={stroke} strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
        </Svg>

    )
}

export const DownloadIcon: FC<IconProps> = ({width = 21, height = 20}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 21 20" fill="none">
            <Path d="M10.1222 13.436L10.1222 1.39502" stroke="#D7D7D7" strokeWidth="2" strokeLinecap="round"
                  stroke-linejoin="round"/>
            <Path d="M13.0382 10.5083L10.1222 13.4363L7.20619 10.5083" stroke="#D7D7D7" strokeWidth="1.5"
                  strokeLinecap="round" stroke-linejoin="round"/>
            <Path opacity="0.4"
                  d="M14.755 6.12793H15.688C17.723 6.12793 19.372 7.77693 19.372 9.81293V14.6969C19.372 16.7269 17.727 18.3719 15.697 18.3719L4.55699 18.3719C2.52199 18.3719 0.871994 16.7219 0.871994 14.6869V9.80193C0.871994 7.77293 2.51799 6.12793 4.54699 6.12793H5.48899"
                  stroke="#D7D7D7" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
        </Svg>
    )
}
