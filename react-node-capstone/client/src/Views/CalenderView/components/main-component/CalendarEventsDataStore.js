import {get} from "../../../../ApiHelper/ApiHelper";
import LengthValidator from "../../../../utils/length-utils/LengthValidator";

export default class CalendarEventsDataStore {

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
        this.loadData();
        this.selectedCalendars.push("main");
        this.onDataChange("cals", this.selectedCalendars);
        this.connectToSocket();
    };

    setCalendarColor (calendarId, color) {
        if (LengthValidator.isEmpty(calendarId) || LengthValidator.isEmpty(color)) {
            return false;
        }
        const calendarName = this.getStateNameForCalendarEvents(calendarId);
        console.log(color);
        this.calendarColors[calendarName] = color;
        console.log(this.calendarColors);
        const newEvents = [];
        const calEvents = this.stateData[calendarName];
        if (LengthValidator.isNotEmpty(calEvents)) {
            calEvents.forEach ((event) => {
                newEvents.push(this.processSingleEvent(event));
            });
            this.onDataChange(calendarName, newEvents);
        }
    }

    setSelectedCalendar (values) {
        const calId = values.id;
        const name = this.getStateNameForCalendarEvents(calId);

        if (values.show) {
            if (this.stateData[name] == null || this.stateData[name].length === 0) {
                this.selectedCalendars.push(calId);
                this.onDataChange("cals", this.selectedCalendars);
                this.loadData(calId);
            }
        } else {
            this.selectedCalendars = this.selectedCalendars.filter((id) => {
                return id !== calId
            });
            this.onDataChange("cals", this.selectedCalendars);
            this.onDataChange(name, []);
        }
    }

    onDataChange = (nameInState, data) => {
        this.stateData[nameInState] = data;
        this.callback({[nameInState] : data});
    };

    onLoading = (loading) => {
        this.onProgress(loading);
    };

    loadData = (calId) => {

        if (LengthValidator.isEmpty(calId)) {
            calId = "main";
        }

        let url = "/events/attending/" + calId;

        this.loadEvents(url, this.getStateNameForCalendarEvents(calId));
    };

    loadEvents = (url, nameInState) => {

        this.onLoading(true);

        get(url, (res) => {

            let data = [];

            if (res.success) {

                res.results.forEach(d => {
                    data.push(this.processSingleEvent(d));
                });

            } else {
                console.log("ERROR");
                console.log(res.message);
                console.log("ERROR");

            }
            this.onLoading(false);
            this.onDataChange(nameInState, data);
        });
    };

    processSingleEvent = (eventData) => {
        let event = {...eventData};
        event["textColor"] = "white";
        event["id"] = eventData.eventID;
        event["key"] = eventData.eventID;
        event["calScope"] = "user";
        const backgroundColor = this.getBackgroundColorForCalendar(eventData.calendar_id);
        console.log(backgroundColor);
        event["color"] = backgroundColor;
        return event;
    };

    getBackgroundColorForCalendar = (calendarId) => {
        const name = this.getStateNameForCalendarEvents(calendarId);
        if (this.calendarColors.hasOwnProperty(name)) {
            return this.calendarColors[name];
        } else {
            return "#880E4F";
        }
    };

    getStateNameForCalendarEvents = (calendarId) => {
        if (LengthValidator.isEmpty(calendarId)) {
            calendarId = "main";
        }
        return "calData-" + calendarId;
    };

    connectToSocket = () => {
        const socket = this.socket;

        if (socket !== null) {
            socket.on('newAttendingEvent', (data) => {
                console.log("Socket: New event added");
                console.log(data);
                this.onNewEventAddedToCalendar(data);
            });
            socket.on('removedAttendingEvent', (data) => {
                console.log("Socket: Attending event removed");
                console.log(data);
                this.delete(data);
            });
        }
    };

    delete = (deletedEvent) => {
        let calendarId = deletedEvent.calendar_id;
        if (LengthValidator.isEmpty(calendarId)) {
            calendarId = "main";
        }
        const name = this.getStateNameForCalendarEvents(calendarId);
        const newEvents = this.stateData[name].filter((event) => event.eventID !== deletedEvent.eventID);
        this.callback({[name] : newEvents});
    };

    onNewEventAddedToCalendar = (data) => {
        if (LengthValidator.isEmpty(data)) {
            return;
        }
        let event = this.processSingleEvent(data);

        const calId = event.calendar_id || "main";
        const name = this.getStateNameForCalendarEvents(calId);

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