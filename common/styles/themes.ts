import { ViewStyle } from "react-native"
import { cs } from "."

export const getColors = (theme: "light" | "dark") => {
    const is_lt = theme === "light"

    return {
        //common
        title: is_lt ? "black" : "white",
        text_label: is_lt ? "#A9A9A9" : "#A9A9A9",
        text_val: is_lt ? "#A9A9A9" : "#A9A9A9",
        text_subtitle: is_lt ? "#4d4d4d" : "#B6B6B6",
        main_bg: is_lt ? cs.rootBg.backgroundColor : "#1c1c1e",
        //inputs
        card_bg: is_lt ? null : "#404040",
        pin_btns: is_lt ? "#F4FAFA" : "#1c1c1e",
        borderedBg: is_lt ? "white" : "black",
        yellow: is_lt ? "#F4FAFA" : "rgba(255, 255, 0, 1)",
        //chart
        chart: is_lt ? "white" : "#1c1c1e",
        theme_chart_bg_lines: is_lt ? "#F0F0F0" : "#393939",
    }
} 