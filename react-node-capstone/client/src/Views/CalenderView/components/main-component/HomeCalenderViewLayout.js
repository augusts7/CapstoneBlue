import React from "react";
import Calendar from "../../../GenericViews/calendar/Calendar";
import ls from "local-storage"
import DetailView from "../calendar-click-popup/CalendarEventsDetailView";
import Progress from "../../../GenericViews/Progress/Progress";
import SocketContext from "../../../../Context/SocketContext";
import "../../styles/scroll-bar/scroll-bar.css";
import "./styles/calendar-view-layout.css";
import CalendarEventsDataStore from "./CalendarEventsDataStore";
import SharedCalendarEventsDataStore from "./SharedCalendarEventsDataStore";
import GroupCalendarEventsDataStore from "./GroupEventsDataStore";
import CalendarColorHandler from "./CalendarColorHandler";
import LengthValidator from "../../../../utils/length-utils/LengthValidator";


class HomeCalenderViewLayout extends React.Component {

    static contextType = SocketContext;

    state = {
        "userType": ls.get("user_type"),
        "isLoading": false,
        "formMode": "event",
        "advisingSlotForm": false,
        "cals": [],
        "sharedCals": [],
        groupCals: [],
        "eventsDetailView": false,
        "eventsDetailViewData": {},
    };

    constructor(props) {
        super(props);

        this.onChangeCalendarData = this.onChangeCalendarData.bind(this);
        this.getProcessedEventsToDisplay = this.getProcessedEventsToDisplay.bind(this);
        this.handlePopupClose = this.handlePopupClose.bind(this);
    }

    onChangeCalendarData(action, values) {

        if (action === "cal") {
            this.onChangeCalendarOptions(values);
        } else if (action === "sharedCal") {
            this.onChangeSharedCalendarOptions(values);
        } else if (action === "groupCal") {
            this.onGroupCalendarOptionsChange(values);
        }
    }

    onChangeCalendarOptions = (values) => {
        this.calDataStore.setSelectedCalendar(values);
    };

    onGroupCalendarOptionsChange = (values) => {
        this.groupCalDataStore.setSelectedCalendar(values);
    };

    onChangeSharedCalendarOptions(values) {
        this.sharedCalDataStore.setSelectedCalendar(values);
    }


    handlePopupClose(popupName) {

        this.setState({[popupName]: false})
    }


    componentDidMount() {
        this.groupCalDataStore = new GroupCalendarEventsDataStore(this.context.socket, this.onDataChange, this.onProgressChange);
        this.sharedCalDataStore = new SharedCalendarEventsDataStore(this.context.socket, this.onDataChange, this.onProgressChange);
        this.calDataStore = new CalendarEventsDataStore(this.context.socket, this.onDataChange, this.onProgressChange, this.reloadAllEvents);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.hasOwnProperty("colorScope") && nextProps.hasOwnProperty("colorData")) {
            const scope = nextProps.colorScope;
            const color = nextProps.colorData;
            if (LengthValidator.isNotEmpty(scope) && LengthValidator.isNotEmpty(color)) {
                CalendarColorHandler.setColor(scope, color, this.calDataStore, this.sharedCalDataStore, this.groupCalDataStore);
            }
        }
    }

    onProgressChange = (showProgress) => {
        this.setState({isLoading: showProgress});
    };

    onDataChange = (newState) => {
        this.setState(newState);
    };

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
        this.state.groupCals.forEach((sCal) => {

            const name = "groupCalData-" + sCal;
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

        console.log("State");
        console.log(this.state);

        let events = this.getProcessedEventsToDisplay();

        return (
            <div className="flex-full mdl-color--white">

                <DetailView data={this.state.eventsDetailViewData} events={events}
                    onCancel={() => this.handlePopupClose("eventsDetailView")}
                    onClose={() => this.handlePopupClose("eventsDetailView")}
                    open={this.state.eventsDetailView}/>

                <div>
                    <Progress show={this.state.isLoading}/>
                    <Calendar onEventClick={this.onEventClick} onDateClick={this.onDateClick} events={events}/>
                
                </div>
            </div>
        );
    }
}


export default HomeCalenderViewLayout;
