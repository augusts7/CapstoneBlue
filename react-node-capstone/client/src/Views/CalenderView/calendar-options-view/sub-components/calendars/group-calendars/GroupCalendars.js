import React from "react";
import {get, post} from "../../../../../../api-helper/ApiHelper"
import BaseCalendarsLayout from "../base-layout/BaseCalendarsLayout";
import CalendarActionsContext from "../../../../context/CalendarActionsContext";

const menuOptions = [
    {"name": "Share calendar", "key": "share"},
    {"name": "Delete calendar", "key": "delete"}
];


export default class GroupCalendars extends React.Component {

    static contextType = CalendarActionsContext;

    constructor(props) {
        super(props);

        this.state = {
            "cals": [],
            "isLoading": false,
        };
    }

    handleCalsChange = (id, event) => {

        const checked = event.target.checked;

        const name = "id-" + id;

        this.setState({[name]: checked}, () => {
            this.props.onChangeCalendarData("sharedCal", {"id": id, "show": checked});
        });
    };

    componentDidMount() {

        this.loadCalendars();
    }

    loadCalendars = () => {

        this.setState({"isLoading": true});

        get("calendar/groupCalendars", (res) => {

            var cals = [];

            if (res.success) {

                res.results.forEach((cal) => {
                    cals.push({"calendarId": cal.id, "calendarName": cal.sharedCalendarName});
                });
            }

            this.setState({"cals": cals, "isLoading": false});
        });
    };


    handleListMenuClick = (actionKey, calendarId) => {

        if (actionKey === "share") {
            this.context.showShareCalendarForm(calendarId);

        } else if (actionKey === "delete") {
            alert("imeplement");
        }
    };

    render() {

        return (
            <BaseCalendarsLayout
                title="Group Calendars"
                menuOptions={menuOptions}
                onMenuClick={this.handleListMenuClick}
                isLoading={this.state.isLoading}
                handleCalsChange={this.handleCalsChange}
                cals={this.state.cals}
            />
        );

    }
}
