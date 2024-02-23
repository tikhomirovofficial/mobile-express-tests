import { ViewStyle } from "react-native"
import { cs } from "."

export const getColors = (theme: "light" | "dark") => {
    const is_lt = theme === "light"

    return {
        //common
        title: is_lt ? "black" : "white",
        card_bg: is_lt ? null : "#1C1C1E",
        text_label: is_lt ? "#4d4d4d" : "#A9A9A9",
        text_val: is_lt ? "#A9A9A9" : "#A9A9A9",
        text_subtitle: is_lt ? "#4d4d4d" : "#B6B6B6",
        text_status: is_lt ? "white" : "#4d4d4d",
        main_bg: is_lt ? cs.rootBg.backgroundColor : "#1c1c1e",
        light_gray_bg: is_lt ? cs.lightGray.backgroundColor : "#3F3F3F",
        
        //inputs
        input_border: is_lt ? "#E2E2E9": "#404040",
        card_border: is_lt ? "#FAFAFA": "transparent",
      
        pin_btns: is_lt ? "#F4FAFA" : "#1c1c1e",
        borderedBg: is_lt ? "white" : "black",
        yellow: is_lt ? "#F4FAFA" : "rgba(255, 255, 0, 1)",
        //chart
        chart: is_lt ? "white" : "#1c1c1e",
        theme_chart_bg_lines: is_lt ? "#F0F0F0" : "#393939",
    }
} 