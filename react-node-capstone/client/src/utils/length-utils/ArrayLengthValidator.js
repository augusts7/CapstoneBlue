

export default class ArrayLengthValidator {

    static containsItems (jsonArray) {

        return jsonArray !== undefined && jsonArray !== null && jsonArray.length > 0;
    }

    static isEmpty (jsonArray) {
        return jsonArray === undefined || jsonArray === null || jsonArray.length ===0;
    }
}