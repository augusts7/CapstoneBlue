import React from "react";
import GroupedSelect from "./GroupedSelect";
import {get} from "../../../../ApiHelper/ApiHelper";

export default class SelectUsersCalendars extends React.Component {

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
                    calendarOptions.push({name: "Default", "value": "main"});

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

        const calendarOptions = this.state.calendarOptions;

        let options = [
            {name: "Calendars Options", options: calendarOptions},
        ];

        return (
            <GroupedSelect value={this.props.value} onChange={this.props.onChange} helperText="Select the Calendar to associate this event in" label="Select Calendar" options={options}/>
        );
    }
}