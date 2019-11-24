import {get} from "../../../../ApiHelper/ApiHelper";
import LengthValidator from "../../../../utils/length-utils/LengthValidator";

export default class SharedCalendarEventsDataStore {

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
        const calendarName = this.getStateNameForSharedCalendarEvents(calendarId);
        this.calendarColors[calendarId] = color;
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
        const name = this.getStateNameForSharedCalendarEvents(calId);

        if (values.show) {

            if (!this.selectedCalendars.includes(calId)) {
                this.selectedCalendars.push(calId);
                this.onDataChange("sharedCals", this.selectedCalendars);
                this.loadSharedCalendarData(calId);
            }

        } else {

            this.selectedCalendars = this.selectedCalendars.filter((id) => {
                return id !== calId
            });
            this.onDataChange("sharedCals", this.selectedCalendars);
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

    loadSharedCalendarData = (calId) => {

        if (calId == null || calId.length === 0) {
            calId = "main";
        }

        let url = "/events/sharedCalendar/" + calId;

        this.loadEvents(url, this.getStateNameForSharedCalendarEvents(calId));
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
        let event = eventData;
        event["key"] = eventData.eventID;
        event["color"] = "white";
        event["id"] = eventData.eventID;
        event["backgroundColor"] = this.getBackgroundColorForSharedCalendar(eventData.calendar_id);
        return event;
    };

    getBackgroundColorForSharedCalendar = (calendarId) => {
        if (LengthValidator.isNotEmpty(calendarId) && this.calendarColors.hasOwnProperty(calendarId)) {
            return this.calendarColors[calendarId];
        } else {
            return "#E65100";
        }
    };

    getStateNameForSharedCalendarEvents = (calendarId) => {
        if (LengthValidator.isEmpty(calendarId)) {
            calendarId = "main";
        }
        return "sharedCalData-" + calendarId;
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
                this.onEventDeleted(data);
            });
        }
    };

    onEventDeleted = (deletedEvent) => {
        let calendarId = deletedEvent.calendar_id;
        if (calendarId === null || calendarId.length === 0) {
            calendarId = "main";
        }
        const name = this.getStateNameForSharedCalendarEvents(calendarId);
        const newEvents = this.stateData[name].filter((event) => event.eventID !== deletedEvent.eventID);
        this.callback({[name] : newEvents});
    };

    onNewEventAddedToCalendar = (data) => {
        if (data === undefined || data === null) {
            return;
        }
        let event = this.processSingleEvent(data);

        const calId = event.calendar_id || "main";
        const name = this.getStateNameForSharedCalendarEvents(calId);

        this.addNewEventToState(name, event);
    };

    addNewEventToState = (stateName, event) => {
        const currentEvents = this.stateData[stateName].concat(event);
        this.onDataChange(stateName, currentEvents);
    };


}