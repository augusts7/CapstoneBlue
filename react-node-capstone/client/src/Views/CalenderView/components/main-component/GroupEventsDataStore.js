import {get} from "../../../../ApiHelper/ApiHelper";
import LengthValidator from "../../../../utils/length-utils/LengthValidator";

export default class GroupCalendarEventsDataStore {

    constructor(socket, dataChangeListener, progressListener) {
        this.socket = socket;

        this.stateData = {};
        this.calendarColors = {};
        this.selectedCalendars = [];
        this.isSocketConnected = false;

        this.callback = dataChangeListener;
        this.onProgress = progressListener;

        this.init();

    }

    init = () => {
        this.connectToSocket();
    };

    setCalendarColor (calendarId, color) {
        if (LengthValidator.isEmpty(calendarId) || LengthValidator.isEmpty(color)) {
            return false;
        }
        const calendarName = this.getStateNameForGroupEvents(calendarId);
        this.calendarColors[calendarName] = color;
        console.log(this.calendarColors);
        const newEvents = [];
        const calEvents = this.stateData[calendarName];
        if (LengthValidator.isNotEmpty(calEvents)) {
            calEvents.forEach ((event) => {
                newEvents.push(this.processSingleEvent(event, calendarId));
            });
            this.onDataChange(calendarName, newEvents);
        }
    }

    setSelectedCalendar (values) {
        const calId = values.id;
        const name = this.getStateNameForGroupEvents(calId);

        if (values.show) {

            console.log("Get group data " + calId);

            if (!this.selectedCalendars.includes(calId)) {
                this.selectedCalendars.push(calId);
                this.onDataChange("groupCals", this.selectedCalendars);
                this.loadGroupCalendarData(calId);
            }

        } else {

            this.selectedCalendars = this.selectedCalendars.filter((id) => {
                return id !== calId
            });
            this.onDataChange("groupCals", this.selectedCalendars);
            this.onDataChange(name, []);
        }
        console.log(values);
    }

    onDataChange = (nameInState, data) => {
        this.stateData[nameInState] = data;
        this.callback({[nameInState] : data});
    };

    onLoading = (loading) => {
        this.onProgress(loading);
    };

    loadGroupCalendarData = (calId) => {

        if (LengthValidator.isEmpty(calId)) {
            calId = "main";
        }

        let url = "/groups/groupEvents/" + calId;

        this.loadEvents(url, this.getStateNameForGroupEvents(calId), calId);
    };

    loadEvents = (url, nameInState, calId) => {

        this.onLoading(true);

        get(url, (res) => {

            let data = [];

            console.log("Group events");
            console.log(res);

            if (LengthValidator.isNotEmpty(res)) {

                res.forEach(d => {
                    data.push(this.processSingleEvent(d, calId));
                });
                this.onDataChange(nameInState, data);

            } else {
                console.log("ERROR");
            }
            this.onLoading(false);
        });
    };

    processSingleEvent = (eventData, calendarId) => {
        let event = {...eventData};
        event["textColor"] = "white";
        event["id"] = eventData.eventID;
        event["key"] = eventData.eventID;
        event["calScope"] = "group";
        event["color"] = this.getBackgroundColorForGroupCalendar(calendarId);
        return event;
    };

    getBackgroundColorForGroupCalendar = (calendarId) => {
        const name = this.getStateNameForGroupEvents(calendarId);
        if (this.calendarColors.hasOwnProperty(name)) {
            return this.calendarColors[name];
        } else {
            return "#4A148C";
        }
    };

    getStateNameForGroupEvents = (calendarId) => {
        if (LengthValidator.isEmpty(calendarId)) {
            calendarId = "main";
        }
        return "groupCalData-" + calendarId;
    };

    connectToSocket = () => {
        const socket = this.socket;

        if (socket !== null) {
            socket.on('newGroupEventAdded', (data) => {
                console.log("Socket: Group event added");
                console.log(data);
                this.onNewEventAddedToCalendar(data);
            });
            socket.on('removedGroupEvent', (data) => {
                console.log("Socket: Group event removed");
                console.log(data);
                this.onEventDeleted(data);
            });
        }
    };

    onEventDeleted = (deletedEvent) => {
        let calendarId = deletedEvent.calendar_id;
        if (LengthValidator.isEmpty(calendarId)) {
            calendarId = "main";
        }
        const name = this.getStateNameForGroupEvents(calendarId);
        const newEvents = this.stateData[name].filter((event) => event.eventID !== deletedEvent.eventID);
        this.callback({[name] : newEvents});
    };

    onNewEventAddedToCalendar = (data) => {
        if (LengthValidator.isEmpty(data)) {
            return;
        }
        let event = this.processSingleEvent(data);

        const calId = event.calendar_id || "main";
        const name = this.getStateNameForGroupEvents(calId);

        this.addNewEventToState(name, event);
    };

    addNewEventToState = (stateName, event) => {
        if (!this.stateData.hasOwnProperty(stateName)) {
            this.stateData[stateName] = [];
        }
        this.stateData[stateName].push(event);
        this.onDataChange(stateName, this.stateData[stateName]);
    };


}