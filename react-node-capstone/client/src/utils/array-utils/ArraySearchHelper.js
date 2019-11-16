import LengthValidator from "../length-utils/LengthValidator";


export default class ArraySearchHelper {

    static search (list, searchValue, onSearchSingleItemCallback) {

        if (LengthValidator.isEmpty(list)) {
            return [];
        }
        if (LengthValidator.isEmpty(searchValue)) {
            return list;
        }

        let results = [];

        list.forEach((listItem) => {
            let valueInArray = onSearchSingleItemCallback(listItem);
            let searchText = valueInArray.toUpperCase();
            let searchFor = searchValue.toUpperCase();
            if (searchText.includes(searchFor)) {
                results.push(listItem);
            }
        });
        return results;
    }
}