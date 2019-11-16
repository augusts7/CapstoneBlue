import React from 'react';
import "./notifications.css"
import NotificationsPopup from "./popup-views/NotificationsPopup";
import Badge from "@material-ui/core/Badge";
import CustomIconButton from "../../../Views/CalenderView/components/generic/IconButton";
import SocketContext from "../../../Context/SocketContext";
import {get} from "../../../ApiHelper/ApiHelper";


export default class DrawerHeader extends React.Component {

    static contextType = SocketContext;

    constructor(props) {
        super(props);

        this.state = {
            showPopup: false,
            anchor: null,
            badgeCount: 0
        };

        this.isSocketConnected = false;
    }

    componentDidMount() {
        this.loadAllEventRequests();
        this.connectToSocket();
    }

    handlePopupClose = () => {
        this.setState({showPopup: false, anchor: null});
    };

    handleAvatarClick = (event) => {
        this.setState({showPopup: true, anchor: event.currentTarget});
    };

    connectToSocket = () => {
        const socket = this.context.socket;

        console.log("Socket");
        console.log(socket);

        if (socket !== null && this.isSocketConnected === false) {
            this.isSocketConnected = true;
            socket.on('newAppointmentInviteReceived', (data) => {
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

    onDeleteItem = (id) => {
        if (this.state.invitedEvents == null || this.state.invitedEvents.length < 1) {
            return false;
        }
        let newEvents = this.state.invitedEvents.filter((invitedEvent) => invitedEvent.eventID !== id);
        this.setState({"invitedEvents": newEvents});
    };

    loadAllEventRequests = () => {
        this.setState({isLoading: true});
        get("/appointments/receivedInvite", (res) => {
            let allEvents = [];
            if (res.success) {
                allEvents = res.results;
            }
            this.setState({"invitedEvents": allEvents, isLoading: false});
            if (allEvents.length === 0) {

            }
        });
    };

    render() {

        let icon = <i className="material-icons">notifications</i>;

        if (this.state.badgeCount > 0) {
            icon = <Badge badgeContent={this.props.badgeCount} color="primary">
                <i className="material-icons">notifications</i>
            </Badge>;
        }

        return (

            <div className="mdl-layout-title">
                <NotificationsPopup onDeleteItem={this.onDeleteItem} invitedEvents={this.state.invitedEvents} anchor={this.state.anchor} onClose={this.handlePopupClose}/>
                <div className="secondaryItem">
                    <CustomIconButton onClick={this.handleAvatarClick} aria-label="show 4 new mails" color="inherit">
                        {icon}
                    </CustomIconButton>

                </div>
            </div>
        );
    }
}
