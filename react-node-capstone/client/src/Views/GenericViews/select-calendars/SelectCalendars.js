import React from "react";
import GroupedSelect from "./GroupedSelect";
import {get} from "../../../ApiHelper/ApiHelper";

export default class SelectCalendar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            progress: false,
            calendarOptions: []
        };
    }

    componentDidMount() {
        this.loadCalendars();
    }

    loadCalendars = () => {
        this.setState({"progress": true});

        get("calendar/", (res) => {
            if (res.success) {

                let calendarOptions = [];

                if (res.results) {
                    res.results.forEach((item) => {
                        calendarOptions.push({"name": item.calendarName, "value": item.calendarId});
                    });
                }

                this.setState({"progress": false, "calendarOptions": calendarOptions});

            } else {
                this.setState({"progress": false, message: res.message});
            }
        });

        get("calendar/sharedToUser", (res) => {
            if (res.success) {

                let calendarOptions = [];

                if (res.results) {
                    res.results.forEach((item) => {
                        calendarOptions.push({"name": item.sharedCalendarName, "value": item.sharedCalendarId});
                    });
                }

                this.setState({"progress": false, "sharedCalendarOptions": calendarOptions});

            } else {
                this.setState({"progress": false, message: res.message});
            }
        });

        get("calendar/groupCalendars", (res) => {
            if (res.success) {

                let calendarOptions = [];

                if (res.results) {
                    res.results.forEach((item) => {
                        calendarOptions.push({"name": item.group_name, "value": item.group_id});
                    });
                }

                this.setState({"progress": false, "groupCalendarOptions": calendarOptions});

            } else {
                this.setState({"progress": false, message: res.message});
            }
        });

    };

    componentWillReceiveProps() {
        this.loadCalendars();
    }

    render() {

        const calendarOptions = this.state.calendarOptions;
        const sharedCalendars = this.state.sharedCalendarOptions;

        let options = [
            {name: "Your Calendars", options: calendarOptions},
            {name: "Shared Calendars", options: sharedCalendars},
        ];

        return (
            <GroupedSelect onChange={this.props.onChange} helperText="Select the Calendar to associate this event in" title="Select Calendar" options={options}/>
        );
    }
}