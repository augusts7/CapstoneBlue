import React from "react";
import Calendar from "../generic/calendar/Calendar";
import CalendarOptions from "../side-view/CalendarOptions"
import ls from "local-storage"
import {get} from "../../../../ApiHelper/ApiHelper"
import DetailView from "../calendar-click-popup/CalendarEventsDetailView";
import Progress from "../generic/Progress";
import FloatingAddButton from "../floating-button/FloatingAddButton";
import SocketContext from "../../../../Context/SocketContext";

import "../../styles/scroll-bar/scroll-bar.css";
import "./styles/calendar-view-layout.css";


class CalenderViewLayout extends React.Component {

    static contextType = SocketContext;

    state = {
        "userType": ls.get("user_type"),
        "isLoading": false,
        "formMode": "event",
        "advisingSlotForm": false,
        "cals": ["main"],
        "sharedCals": [],
        "eventsDetailView": false,
        "eventsDetailViewData": {},
    };

    constructor(props) {
        super(props);

        this.onChangeCalendarData = this.onChangeCalendarData.bind(this);
        this.getProcessedEventsToDisplay = this.getProcessedEventsToDisplay.bind(this);
        this.handlePopupClose = this.handlePopupClose.bind(this);

        this.isSocketConnected = false;
    }

    onChangeCalendarData(action, values) {

        if (action === "cal") {
            this.onChangeCalendarOptions(values);
        } else if (action === "sharedCal") {
            this.onChangeSharedCalendarOptions(values);
        }
    }

    onChangeCalendarOptions = (values) => {

        const calId = values.id;
        const name = "calData-" + calId;

        if (values.show) {
            if (this.state[name] == null || this.state[name].length === 0) {
                this.loadData(calId);
                this.setState({cals: [...this.state.cals, calId]})
            }
        } else {
            let newCalIds = this.state.cals.filter((id) => {
                return id !== calId
            });
            this.setState({[name]: [], cals: newCalIds});
        }
    };

    onChangeSharedCalendarOptions(values) {

        const calId = values.id;
        const name = "sharedCalData-" + calId;

        if (values.show) {

            if (this.state[name] == null || this.state[name].length === 0) {
                this.loadSharedCalendarData(calId);
                this.setState({"sharedCals": [...this.state.sharedCals, calId]})
            }

        } else {

            let newSharedCals = this.state.sharedCals.filter((id) => {
                return id !== calId
            });
            this.setState({[name]: [], sharedCals: newSharedCals});
        }
        console.log(values);
    }


    handlePopupClose(popupName) {

        this.setState({[popupName]: false})
    }


    loadData = (calId) => {

        if (calId == null || calId.length === 0) {
            calId = "main";
        }

        let url = "/events/attending/" + calId;

        this.loadEvents(url, "calData-" + calId, "#880E4F");

    };

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

    getStateNameForCalendarEvents = (calendarId) => {
        return "calData-" + calendarId;
    };

    getStateNameForSharedCalendarEvents = (sharedCalendarId) => {
        const name = "sharedCalData-" + sharedCalendarId;
    };

    connectToSocket = () => {
        const socket = this.context.socket;

        if (socket !== null && !this.isSocketConnected) {
            this.isSocketConnected = true;
            socket.on('newAttendingEventAdded', (data) => {
                this.onNewEventAddedToCalendar(data);
            });
            socket.on('newAttendingEventAddedInSharedCalendar', (data) => {
                this.onNewEventAddedToSharedCalendar(data);
            });
        }
    };

    onNewEventAddedToCalendar = (data) => {
        if (data === undefined || data === null) {
            return;
        }
        let event = this.processSingleEvent(data, "#880E4F");

        const calId = event.calendar_id || "main";
        const name = this.getStateNameForCalendarEvents(calId);

        this.addNewEventToState(name, event);
    };

    onNewEventAddedToSharedCalendar = (data) => {
        if (data === undefined || data === null) {
            return;
        }
        let event = this.processSingleEvent(data, "#E65100");

        const calId = event.calendar_id || "main";
        const name = this.getStateNameForSharedCalendarEvents(calId);

        this.addNewEventToState(name, event);
    };

    addNewEventToState = (stateName, event) => {
        const currentEvents = this.state[stateName].concat(event);
        this.setState({[stateName]: currentEvents});
    };

    loadSharedCalendarData(calId) {

        let url = "/events/sharedCalendar/" + calId;

        this.loadEvents(url, "sharedCalData-" + calId, "#E65100");
    }


    componentDidMount() {

        this.loadData("main");
        this.connectToSocket();
    }

    getProcessedEventsToDisplay() {
        let events = [];

        this.state.cals.forEach(id => {
            const name = "calData-" + id;
            const currentEvents = this.state[name];

            if (currentEvents != null && currentEvents.length > 0) {
                events = events.concat(currentEvents);
            }
        });
        this.state.sharedCals.forEach((sCal) => {

            const name = "sharedCalData-" + sCal;
            const list = this.state[name];
            if (list != null && list.length > 0) {
                events = events.concat(list);
            }

        });
        return events;
    }

    onDateClick = (date) => {
        this.setState({"eventsDetailView": true, "eventsDetailViewData": {"sortBy": "date", "date": date}});
    };

    onEventClick = (event) => {
        this.setState({"eventsDetailView": true, "eventsDetailViewData": {"sortBy": "id", "id": event.id}});
    };

    render() {

        let events = this.getProcessedEventsToDisplay();

        return (
            <div className="flex-full mdl-color--white">

                <DetailView data={this.state.eventsDetailViewData} events={events}
                            onCancel={() => this.handlePopupClose("eventsDetailView")}
                            onClose={() => this.handlePopupClose("eventsDetailView")}
                            open={this.state.eventsDetailView}/>

                <div className="CalendarViewContentContainer">
                    <CalendarOptions isLoading={this.state.isLoading}
                                     onChangeCalendarData={this.onChangeCalendarData}
                                     events={events} userType={this.state.userType}/>

                    <div>
                        <Progress show={this.state.isLoading}/>
                        <Calendar onEventClick={this.onEventClick} onDateClick={this.onDateClick} events={events}/>
                        <FloatingAddButton/>
                    </div>
                </div>
            </div>
        );
    }
}


export default CalenderViewLayout;
