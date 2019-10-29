import React from "react";
import {get, post} from "../../../../../ApiHelper/ApiHelper"
import BaseCalendarsLayout from "../base-calendars-layout/BaseCalendarsLayout";
import CalendarActionsContext from "../../../context/CalendarActionsContext";
import CustomIconButton from "../../../generic-components/IconButton";
import Icon from "@material-ui/core/Icon";

const menuOptions = [
    { "name": "Share calendar", "key": "share" },
    { "name": "Delete calendar", "key": "delete" }
];

export default class CalendarFilter extends React.Component {

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

        get("calendar/", (res) => {

            let cals = [];

            if (res.success) {

                res.results.forEach((cal) => {
                    cals.push({"calendarId": cal.calendarId, "calendarName": cal.calendarName});
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

    handleAddCalendar = () => {
        this.context.showAddCalendarForm();
    };

    render() {

        const headerIcon = <CustomIconButton onClick={this.handleAddCalendar}><Icon>add</Icon></CustomIconButton>;

        return (
            <BaseCalendarsLayout headerIcon={headerIcon} menuOptions={menuOptions} onMenuClick={this.handleListMenuClick} isLoading={this.state.isLoading}
                                 handleCalsChange={this.handleCalsChange} cals={this.state.cals}/>
        );

    }
}
