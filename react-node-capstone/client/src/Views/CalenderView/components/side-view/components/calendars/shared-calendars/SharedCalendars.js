import React from "react";
import BaseCalendarsLayout from "../base-layout/BaseCalendarsLayout";
import {get, post} from "../../../../../../../ApiHelper/ApiHelper";
import SocketContext from "../../../../../../../Context/SocketContext";
import CalendarActionsContext from "../../../../../context/CalendarActionsContext";

const menuOptions = [
    {"name": "Delete calendar", "key": "delete"},
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
        const socket = this.context.getSocket();

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

    handleDelete = (id) => {
        const data = {id};
        this.setState({isLoading: true});
        post("/calendar/sharedToUser/", data, (res) => {
            const cals = this.state.calendars.filter((cal) => cal.id !== id);
            this.setState({isLoading: false, cals});
        });
    };


    handleListMenuClick = (actionKey, calendarId) => {

        if (actionKey === "delete") {
            this.handleDelete(calendarId);
        } else if (actionKey === "color") {
            this.context.showColorDialog({scope: "shared", id: calendarId});
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
