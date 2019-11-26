import LengthValidator from "../../../../utils/length-utils/LengthValidator";


export function makeUppercase(stringValue) {
    if (LengthValidator.isEmpty(stringValue)) {
        return "";
    }
    return stringValue.charAt(0).toUpperCase() + stringValue.substring(1);
}