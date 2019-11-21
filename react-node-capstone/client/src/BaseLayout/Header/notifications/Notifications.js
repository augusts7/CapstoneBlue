import React from 'react';
import "./notifications.css"
import NotificationsPopup from "./popup-views/NotificationsPopup";
import Badge from "@material-ui/core/Badge";
import CustomIconButton from "../../../Views/GenericViews/IconButton";
import SocketContext from "../../../Context/SocketContext";
import {get} from "../../../ApiHelper/ApiHelper";
import NotificationsDataStore from "./NotificationsDataStore";
import LengthValidator from "../../../utils/length-utils/LengthValidator";


export default class Notifications extends React.Component {

    static contextType = SocketContext;

    constructor(props) {
        super(props);

        this.state = {
            showPopup: false,
            anchor: null,
            badgeCount: 0
        };

        this.dataStore = null;
    }

    componentDidMount() {
        if (this.dataStore === undefined || this.dataStore === null) {
            this.dataStore = new NotificationsDataStore(this.context.socket, this.onDataChange, this.onProgress);
        }
    }

    onProgress = (isLoading) => {
        this.setState({isLoading: isLoading});
    };

    onDataChange = (listOfData) => {

        this.setState({invitedEvents: listOfData});
        console.log(listOfData);
    };

    handlePopupClose = () => {
        this.setState({showPopup: false, anchor: null});
    };

    handleAvatarClick = (event) => {
        this.setState({showPopup: true, anchor: event.currentTarget});
    };

    onDeleteItem = (id) => {
        this.dataStore.deleteItem(id);
    };


    render() {

        let icon = <i className="material-icons">notifications</i>;

        if (LengthValidator.isNotEmpty(this.state.invitedEvents)) {
            icon = <Badge badgeContent={this.state.invitedEvents.length} color="primary">
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
