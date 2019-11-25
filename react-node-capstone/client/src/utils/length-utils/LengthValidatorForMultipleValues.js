import LengthValidator from "./LengthValidator";

export default class LengthValidatorForMultipleValues {

    static allContainValue(arrayOfValues) {

        let containsValue = true;

        if (LengthValidator.isEmpty(arrayOfValues)) {
            return false;
        }
        arrayOfValues.forEach((value) => {
            if (LengthValidator.isEmpty(value)) {
                containsValue = false;
            }
        });
        return containsValue;
    }

    static containsEmptyValue(arrayOfValues) {

        if (LengthValidator.isEmpty(arrayOfValues)) {
            return true;
        }
        let containsEmptyValue = false;

        arrayOfValues.forEach((value) => {
            if (LengthValidator.isEmpty(value)) {
                containsEmptyValue = true;
            }
        });
        return containsEmptyValue;
    }
}