
const colors = [
    {name: "Red", color: "#B71C1C", id: "red"},
    {name: "Pink", color: "#C2185B", id: "pink"},
    {name: "Dark Pink", color: "#880E4F", id: "dark_pink"},
    {name: "Purple", color: "#9C27B0", id: "purple"},
    {name: "Dark Purple", color: "#4A148C", id: "dark_purple"},
    {name: "Deep Purple", color: "#512DA8", id: "deep_purple"},
    {name: "Dark Deep Purple", color: "#311B92", id: "dark_deep_purple"},
    {name: "Indigo", color: "#303F9F", id: "indigo"},
    {name: "Dark Indigo", color: "#1A237E", id: "dark_indigo"},
    {name: "Blue", color: "#1565C0", id: "blue"},
    {name: "Dark Blue", color: "#0D47A1", id: "dark_blue"},
    {name: "Light Blue", color: "#0288D1", id: "light_blue"},
    {name: "Dark Light Blue", color: "#01579B", id: "dark_light_blue"},
    {name: "Cyan", color: "#00838F", id: "cyan"},
    {name: "Dark Cyan", color: "#006064", id: "dark_cyan"},
    {name: "Teal", color: "#00796B", id: "teal"},
    {name: "Green", color: "#2E7D32", id: "green"},
    {name: "Dark Green", color: "#1B5E20", id: "dark_green"},
    {name: "Light Green", color: "#558B2F", id: "light_green"},
    {name: "Dark Light Green", color: "#33691E", id: "dark_light_green"},
    {name: "Orange", color: "#E65100", id: "orange"},
    {name: "Deep Orange", color: "#F4511E", id: "deep_orange"},
    {name: "Dark Orange", color: "#DD2C00", id: "dark_orange"},
    {name: "Dark Cyan", color: "#006064", id: "dark_cyan"},
    {name: "Brown", color: "#5D4037", id: "brown"},
    {name: "Gray", color: "#616161", id: "gray"},
    {name: "Blue Gray", color: "#455A64", id: "blue_gray"},
];


export default class ColorPalette {

    static getColors = () => {
        return colors;
    };

    static getColorFromId = (id) => {
        let result = null;
        colors.forEach((color) => {
            if (color.id === id) {
                result = color;
                return true;
            }
        });
        return result;
    };
}