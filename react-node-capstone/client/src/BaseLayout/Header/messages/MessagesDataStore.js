import {get} from "../../../ApiHelper/ApiHelper";


export default class MessagesDataStore {

    constructor(socket, dataChangeListener, progressListener) {
        this.socket = socket;

        this.notificationsList = [];
        this.isSocketConnected = false;

        this.init();
        this.callback = dataChangeListener;
        this.onProgress = progressListener;
    }

    init = () => {
        this.loadAllData();
        this.connectToSocket();
    };

    connectToSocket = () => {

        if (this.socket !== null && this.isSocketConnected === false) {
            this.isSocketConnected = true;
            this.socket.on('newAppointmentInviteReceived', (data) => {
                if (data === undefined || data === null) {
                    return;
                }
                let newItem = {"calendarId": data.id, "calendarName": data.sharedCalendarName};
                console.log(newItem);
                this.notificationsList = this.notificationsList.concat(newItem);
                this.callback(this.notificationsList);
            });
        }
    };

    onLoading = (loading) => {
        this.onProgress(loading);
    };

    deleteItem = (id) => {
        if (this.notificationsList == null || this.notificationsList.length < 1) {
            return false;
        }
        this.notificationsList = this.notificationsList.filter((invitedEvent) => invitedEvent.eventID !== id);
        this.callback(this.notificationsList);
    };

    loadAllData = () => {
        get("/appointments/receivedInvite", (res) => {
            if (res.success) {
                if (res.results.length > 0) {
                    console.log(res.results);
                    this.notificationsList = Array.from(res.results);
                } else {
                    console.log("The length of the list of data is 0");
                }
            }
            this.callback(this.notificationsList);
        });
    };

}