import React from "react";
import {get, post} from "../../../../../../../ApiHelper/ApiHelper"
import BaseCalendarsLayout from "../base-layout/BaseCalendarsLayout";
import CustomIconButton from "../../../../../../GenericViews/IconButton";
import Icon from "@material-ui/core/Icon";
import SocketContext from "../../../../../../../Context/SocketContext";

const menuOptions = [
    { "name": "Share calendar", "key": "share" },
    { "name": "Delete calendar", "key": "delete" }
];

export default class CalendarFilter extends React.Component {

    static contextType = SocketContext;

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

        this.connectToSocket();
    }

    connectToSocket = () => {
        const socket = this.context.socket;
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
