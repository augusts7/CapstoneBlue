import React from "react";
import Calendar from "./calendar/Calendar";
import CalendarOptions from "./calendar-options-view/CalendarOptions"
import ls from "local-storage"
import {get} from "../../ApiHelper/ApiHelper"
import EventTypesData from "./data/EventTypesData";
import DetailView from "./calendar-detail-view/CalendarEventsDetailView";
import DrawerHeader from "./side-drawer/DrawerHeader";
import Progress from "../../components/Container/Progress/Progress";
import FloatingAddButton from "./floating-action-button/FloatingAddButton";

import "./scroll.css"
import "./dialog-styles.css"


class CalenderViewLayout extends React.Component {

    state = {
        "userType": ls.get("user_type"),
        "isLoading": false,
        "formMode": "event",
        "advisingSlotForm": false,
        "cals": ["main"],
        "eventTypes": ["attendingEvents"],
        "sharedCals": [],
        "eventsDetailView": false,
        "eventsDetailViewData": {},
    };

    constructor(props) {
        super(props);

        this.loadData = this.loadData.bind(this);
        this.onChangeCalendarData = this.onChangeCalendarData.bind(this);
        this.getProcessedEventsToDisplay = this.getProcessedEventsToDisplay.bind(this);
        this.handlePopupClose = this.handlePopupClose.bind(this);
        this.openPopup = this.openPopup.bind(this);
    }

    onChangeCalendarData(action, values) {

        if (action === "eventTypes") {
            this.onDisplayEventTypesChange(values);
        } else if (action === "clear") {
            this.setState({"data": []});
        } else if (action === "cal") {
            this.onChangeCalendarOptions(values);
        } else if (action === "sharedCal") {
            this.onChangeSharedCalendarOptions(values);
        }

    }

    onChangeCalendarOptions = (values) => {

        const calId = values.id;

        if (values.show) {

            this.state.eventTypes.forEach((type) => {
                const name = type + calId;

                const allEvents = this.state[name];

                if (allEvents == null || allEvents.length === 0) {
                    this.loadData(type, calId);
                }
            });

            this.setState({"cals": [...this.state.cals, calId]})

        } else {

            let nState = {};

            this.state.eventTypes.forEach((type) => {
                const name = type + calId;
                nState[name] = [];
            });

            nState["cals"] = this.state.cals.filter((id) => {
                return id !== calId ? true : false
            });
            this.setState(nState);
        }
        console.log(values);
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

            let nState = {};

            nState[name] = [];
            nState["sharedCals"] = this.state.sharedCals.filter((id) => {
                return id !== calId ? true : false
            });
            this.setState(nState);
        }
        console.log(values);
    }

    onDisplayEventTypesChange = (showEventTypes) => {

        //this.setState({ "displayDataType": displayDataType });

        if (showEventTypes == null || showEventTypes.length === 0) {
            return;
        }

        let eventTypes = [];
        for (let eventType in showEventTypes) {

            const eType = eventType;

            if (showEventTypes[eType]) {
                const type = eType;
                this.state.cals.forEach((id) => {
                    const name = type + id;

                    console.log(this.state);
                    console.log(this.state[name]);

                    let currentData = this.state[name];
                    if (currentData == null || currentData.length === 0) {
                        this.loadData(eType, id);
                    }
                });

                eventTypes.push(eType);

            } else {
                let newState = {};
                this.state.cals.forEach(function (id) {
                    const name = eType + id;
                    newState[name] = [];
                });
                this.setState(newState);
            }
        }
        this.setState({"eventTypes": eventTypes});
        console.log(showEventTypes);
    };


    openPopup(name, data) {

        if (name === "eventDetails") {

            this.setState({"eventDetails": true});

        }
    }


    handlePopupClose(popupName) {

        this.setState({[popupName]: false})
    }


    loadData(displayDataType, calId) {

        if (calId == null || calId.length === 0) {
            calId = "main";
        }

        if (this.state.isLoading) {
            return;
        } else {
            this.setState({isLoading: true,});
        }

        let url = EventTypesData.dataMapping[displayDataType].url;

        if ((calId.length > 0)) {
            url += "/" + calId;
        }
        get(url, (res) => {

            let data = [];

            if (res.success) {

                res.results.forEach(d => {
                    console.log(d);
                    data.push({
                        "key": d.eventID,
                        "start": d.start,
                        "end": d.end,
                        "id": d.eventID,
                        "title": d.title,
                        "description": d.description,
                        "color": "white",
                        "backgroundColor": "#880E4F",
                        "event_type": d.event_type,
                    });
                    data = EventTypesData.addEventSpecificData(displayDataType, data);
                });

            }
            const name = displayDataType + calId;
            this.setState({[name]: data, "isLoading": false});
        });

    }

    loadSharedCalendarData(calId) {

        if (calId == null || calId.length === 0) {
            calId = "main";
        }

        if (this.state.isLoading) {
            return;
        }

        if (!this.state.isLoading) {
            this.setState({isLoading: true, "showSnackbar": true, "snackbarMessage": "Loading. Please Wait!"});
        }

        let url = "/events/sharedCalendar/" + calId;

        get(url, (res) => {

            let data = [];

            if (res.success) {

                res.results.forEach(d => {
                    console.log(d);
                    data.push({
                        "key": d.eventID,
                        "start": d.start,
                        "end": d.end,
                        "id": d.eventID,
                        "title": d.title,
                        "description": d.description,
                        "color": "white",
                        "backgroundColor": "#E65100",
                        "event_type": d.event_type,
                    });
                });

            } else {
                console.log("ERROR");
                console.log(res.message);
                console.log("ERROR");

            }
            const name = "sharedCalData-" + calId;
            this.setState({[name]: data, "isLoading": false});
        });

    }


    componentDidMount() {

        this.loadData("attendingEvents", "main");

    }

    getProcessedEventsToDisplay() {
        let events = [];

        this.state.eventTypes.forEach((type) => {

            this.state.cals.forEach(id => {
                const name = type + id;
                const currentEvents = this.state[name];
                console.log(name);
                console.log(currentEvents);
                if (currentEvents != null && currentEvents.length > 0) {

                    events = events.concat(currentEvents);
                }

            });
        });

        this.state.sharedCals.forEach((sCal) => {

            const name = "sharedCalData-" + sCal;
            const list = this.state[name];
            if (list != null && list.length > 0) {
                events = events.concat(list);
            }

        });

        console.log(events);
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

        let title = "Selected Events";

        if (this.state.isLoading) {
            title = "Loading .....";
        }

        return (
            <div className="calendarViewRoot mdl-layout mdl-layout--fixed-drawer">

                <DetailView data={this.state.eventsDetailViewData} events={events}
                            onCancel={() => this.handlePopupClose("eventsDetailView")}
                            onClose={() => this.handlePopupClose("eventsDetailView")}
                            open={this.state.eventsDetailView}/>

                <div className="mdl-layout__drawer styleScroll" style={{paddingBottom: "16px"}}>
                    <DrawerHeader/>
                    <CalendarOptions isLoading={this.state.isLoading} onChangeCalendarData={this.onChangeCalendarData}
                                     events={events} userType={this.state.userType}/>

                </div>
                <main className="mdl-layout__content">
                    <Progress show={this.state.isLoading}/>
                    <Calendar onEventClick={this.onEventClick} onDateClick={this.onDateClick} events={events}/>
                    <FloatingAddButton/>
                </main>


            </div>
        );
    }
}


export default CalenderViewLayout;
