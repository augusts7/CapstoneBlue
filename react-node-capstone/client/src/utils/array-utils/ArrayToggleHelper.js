

export default class ArrayToggleUtils {


    static toggleStringValue (list, value) {
        let newList;
        if (list.includes(value)) {
            // remove the user
            newList = list.filter((listItem) => {
                return listItem !== value;
            });
        } else {
            // add the user
            newList = list;
            newList.push(value);
        }
        return newList;
    }
}