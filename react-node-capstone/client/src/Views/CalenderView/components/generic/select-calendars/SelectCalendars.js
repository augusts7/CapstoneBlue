import React from "react";
import GroupedSelect from "./GroupedSelect";
import {get} from "../../../../../ApiHelper/ApiHelper";

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
    };

    componentWillReceiveProps() {
        this.loadCalendars();
    }

    render() {
        return (
            <GroupedSelect options={this.state.calendarOptions}/>
        );
    }
}