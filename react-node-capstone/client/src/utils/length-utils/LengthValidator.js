


export default class LengthValidator {

    static isNotEmpty (jsonObject) {
        return !this.isEmpty(jsonObject);
    }

    static isEmpty(jsonObject) {
        if (jsonObject === undefined) {
            return true;
        }
        if (Number.isInteger(jsonObject)) {
            return false;
        }

        return jsonObject === null || jsonObject.length === 0;
    }
}