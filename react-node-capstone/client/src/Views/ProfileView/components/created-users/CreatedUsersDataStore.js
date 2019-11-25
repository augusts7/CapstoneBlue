import {get, post} from "../../../../ApiHelper/ApiHelper";
import SocketHelper from "../../../../ApiHelper/Socket";
import LengthValidator from "../../../../utils/length-utils/LengthValidator";

export default class CreatedUsersDataStore {

    constructor (dataChangeCallback, progressChangeCallback) {

        this.dataChangeCallback = dataChangeCallback;
        this.progressChangeCallback = progressChangeCallback;
        this.stateData = {
            createdUsers: []
        };

        this.init();
    }

    init() {
        this.loadAllCreatedUsers();
    }

    onProgressChange (showProgress) {
        this.progressChangeCallback(showProgress);
    }

    onDataChange (stateName, data) {
        this.stateData[stateName] = data;
        this.dataChangeCallback({[stateName]: data});
    }

    loadAllCreatedUsers () {
        this.onProgressChange(true);
        get("user_info/createdUsers", (res) => {
            this.onProgressChange(false);
            console.log(res);
            if (LengthValidator.isNotEmpty(res.results)) {
                const users = [];
                res.results.forEach((user) => {
                    users.push(this.processSingleUser(user));
                });
                this.onDataChange("createdUsers", users);
            }
        });
    }

    processSingleUser (user) {
        user.id = user.user_id;
        return user;
    }

    deleteUser (user_id) {
        const data = {user_id};
        this.onProgressChange(true);
        post("user_info/createdUsers/delete", data, (res) => {

            let currentList = this.stateData["createdUsers"];

            if (LengthValidator.isNotEmpty(currentList)) {
                currentList = currentList.filter((user) => user.user_id !== user_id);
                this.onDataChange("createdUsers", currentList);
            }

            this.onProgressChange(false);
        });
    };
}