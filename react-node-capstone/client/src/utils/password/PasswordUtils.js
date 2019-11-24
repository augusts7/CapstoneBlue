import LengthValidator from "../length-utils/LengthValidator";


export default class PasswordUtils {

    static MINIMUM_PASSWORD_LENGTH = 1;

    static isValid (password) {
        if (LengthValidator.isEmpty(password)) {
            return false;
        }
        if (password.length > this.MINIMUM_PASSWORD_LENGTH) {
            return true;
        }
    };

    static twoPasswordsMatch (password, confirmPassword) {
        return this.isValid(password) && this.isValid(confirmPassword) && password === confirmPassword;
    }

}