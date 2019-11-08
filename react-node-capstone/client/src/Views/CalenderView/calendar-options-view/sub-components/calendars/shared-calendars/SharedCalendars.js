import React from "react";
import BaseCalendarsLayout from "../base-layout/BaseCalendarsLayout";
import {get} from "../../../../../../api-helper/ApiHelper";
import SocketContext from "../../../../../../Context/SocketContext";

const menuOptions = [
    {"name": "Share calendar", "key": "share"},
    {"name": "Delete calendar", "key": "delete"}
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

    componentWillUnmount() {
    }

    connectToSocket = () => {
        const socket = this.context.socket;

        console.log("Socket");
        console.log(socket);

        if (socket !== null) {
            socket.on('newCalendarShared', (data) => {
                if (data === undefined || data === null) {
                    return;
                }
                let newCal = {"calendarId": data.id, "calendarName": data.sharedCalendarName};
                console.log(newCal);
                const cals = this.state.cals.concat(newCal);
                this.setState({"cals": cals});
            });
        }
    };

    loadCalendars = () => {

        this.setState({"isLoading": true});

        get("calendar/sharedToUser", (res) => {

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
            this.props.context.showShareCalendarForm(calendarId);

        } else if (actionKey === "delete") {
            alert("imeplement");
        }
    };

    render() {

        return (
            <BaseCalendarsLayout
                title="Shared Calendars"
                menuOptions={menuOptions}
                onMenuClick={this.handleListMenuClick}
                isLoading={this.state.isLoading}
                handleCalsChange={this.handleCalsChange}
                cals={this.state.cals}
            />
        );

    }
}
