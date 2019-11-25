import React from "react";
import {get, post} from "../../../../../../../ApiHelper/ApiHelper"
import BaseCalendarsLayout from "../base-layout/BaseCalendarsLayout";
import CustomIconButton from "../../../../../../GenericViews/IconButton";
import Icon from "@material-ui/core/Icon";
import CalendarActionsContext from "../../../../../context/CalendarActionsContext";
import SocketHelper from "../../../../../../../ApiHelper/Socket";

const menuOptions = [
    { "name": "Share calendar", "key": "share" },
    { "name": "Delete calendar", "key": "delete" },
    { "name": "Select Color", "key": "color" },
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
            this.props.onChangeCalendarData("cal", {"id": id, "show": checked});
        });
    };

    componentDidMount() {

        this.loadCalendars();

        this.connectToSocket();
    }

    connectToSocket = () => {
        const socket = SocketHelper.getSocket();
        if (socket !== null) {
            socket.on('newCalendarAdded', (data) => {
                if (data === undefined || data === null) {
                    return;
                }
                let newCal = {"calendarId": data.calendarId, "calendarName": data.calendarName};
                console.log(newCal);
                const cals = this.state.cals.concat(newCal);
                this.setState({"cals": cals});
            });
        }
    };

    loadCalendars = () => {

        this.setState({"isLoading": true});

        get("calendar/", (res) => {

            let cals = [];

            if (res.success) {
                cals.push({"calendarId": "main", calendarName: "Default"});

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
            this.handleDelete(calendarId);
        } else if (actionKey === "color") {
            this.context.showColorDialog({scope: "user", id: calendarId});
        }
    };

    handleDelete = (id) => {
        const data = {id};
        this.setState({isLoading: true});
        post("/calendar/delete", data, (res) => {
            const cals = this.state.cals.filter((cal) => cal.calendarId !== id);
            this.setState({isLoading: false, cals});
        });
    };

    handleAddCalendar = () => {
        this.props.context.showAddCalendarForm();
    };

    render() {

        const headerIcon = <CustomIconButton onClick={this.handleAddCalendar}><Icon>add</Icon></CustomIconButton>;

        return (
            <BaseCalendarsLayout title="Calendars" headerIcon={headerIcon} menuOptions={menuOptions} onMenuClick={this.handleListMenuClick} isLoading={this.state.isLoading}
                                 handleCalsChange={this.handleCalsChange} cals={this.state.cals}/>
        );

    }
}
