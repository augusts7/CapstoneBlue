import {get} from "../../../../ApiHelper/ApiHelper";

export default class CalendarEventsDataStore {

    constructor(socket, dataChangeListener, progressListener) {
        this.socket = socket;

        this.notificationsList = [];
        this.isSocketConnected = false;

        this.init();
        this.callback = dataChangeListener;
        this.onProgress = progressListener;
    }

    init = () => {
        this.loadData();
        this.connectToSocket();
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


    loadData = (calId) => {

        if (calId == null || calId.length === 0) {
            calId = "main";
        }

        let url = "/events/attending/" + calId;

        this.loadEvents(url, "calData-" + calId, "#880E4F");

    };

    loadSharedCalendarData(calId) {

        let url = "/events/sharedCalendar/" + calId;

        this.loadEvents(url, "sharedCalData-" + calId, "#E65100");
    }

    loadEvents = (url, nameInState, backgroundColor) => {

        if (this.state.isLoading) {
            return;
        } else {
            this.setState({isLoading: true});
        }

        get(url, (res) => {

            let data = [];

            if (res.success) {

                res.results.forEach(d => {
                    data.push(this.processSingleEvent(d, backgroundColor));
                });

            } else {
                console.log("ERROR");
                console.log(res.message);
                console.log("ERROR");

            }
            this.setState({[nameInState]: data, "isLoading": false});
        });
    };

    processSingleEvent = (eventData, backgroundColor) => {
        let event = eventData;
        event["key"] = eventData.eventID;
        event["color"] = "white";
        event["id"] = eventData.eventID;
        event["backgroundColor"] = backgroundColor;
        return event;
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


    getStateNameForCalendarEvents = (calendarId) => {
        return "calData-" + calendarId;
    };

    getStateNameForSharedCalendarEvents = (sharedCalendarId) => {
        const name = "sharedCalData-" + sharedCalendarId;
    };


}