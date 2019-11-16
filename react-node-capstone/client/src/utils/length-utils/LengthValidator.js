


export default class LengthValidator {

    static isNotEmpty (jsonObject) {
        return !this.isEmpty(jsonObject);
    }

    static isEmpty(jsonObject) {
        return jsonObject === undefined || jsonObject === null || jsonObject.length === 0;
    }
}