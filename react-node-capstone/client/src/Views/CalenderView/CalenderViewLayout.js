import React from "react";
import Calendar from "./calendar/Calendar";
import CalendarOptions from "./calendar-options-view/CalendarOptions"
import ls from "local-storage"
import {get} from "../../api-helper/ApiHelper"
import DetailView from "./calendar-detail-view/CalendarEventsDetailView";
import Progress from "./generic-components/Progress";
import FloatingAddButton from "./floating-action-button/FloatingAddButton";

import "./scroll.css";
import "./CalendarViewLayout.css";
import "./calendar-forms/dialog-styles.css";


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
                this.setState({"cals": [...this.state.cals, calId]})
            }
        } else {

            let nState = {};
            nState[name] = [];
            nState["cals"] = this.state.cals.filter((id) => {
                return id !== calId
            });
            this.setState(nState);
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

            let nState = {};

            nState[name] = [];
            nState["sharedCals"] = this.state.sharedCals.filter((id) => {
                return id !== calId
            });
            this.setState(nState);
        }
        console.log(values);
    }


    openPopup(name, data) {

        if (name === "eventDetails") {

            this.setState({"eventDetails": true});

        }
    }


    handlePopupClose(popupName) {

        this.setState({[popupName]: false})
    }


    loadData(calId) {

        if (calId == null || calId.length === 0) {
            calId = "main";
        }

        if (this.state.isLoading) {
            return;
        } else {
            this.setState({isLoading: true});
        }

        let url = "events/attending/";

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
                });
            }
            const name = "calData-" + calId;
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
            this.setState({isLoading: true});
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

        let title = "Selected Events";

        if (this.state.isLoading) {
            title = "Loading .....";
        }


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
