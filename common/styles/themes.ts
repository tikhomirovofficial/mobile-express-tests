export const getColors = (theme: "light" | "dark") => {
    const is_lt = theme === "light"

    return {
        borderedBg: is_lt ? "white" : "#121212",
        yellow: is_lt ? "#F4FAFA" : "rgba(255, 255, 0, 1)",
        chart: is_lt ? "white" : "#1c1c1e",
        theme_chart_bg_lines: is_lt ? "#F0F0F0" : "#393939"
    }
} 