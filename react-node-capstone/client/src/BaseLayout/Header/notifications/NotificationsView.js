import React from 'react';
import "./notifications.css"
import NotificationsPopup from "./popup-views/NotificationsPopup";
import Badge from "@material-ui/core/Badge";
import CustomIconButton from "../../../Views/CalenderView/generic-components/IconButton";
import {get} from "../../../api-helper/ApiHelper";


export default class DrawerHeader extends React.Component {


    constructor (props) {
        super(props);

        this.state = {
            showPopup: false,
            anchor: null,
            badgeCount: 0
        };
    }


    handlePopupClose = () => {
        this.setState({showPopup: false, anchor: null});
    };

    handleAvatarClick = (event) => {
        this.setState({showPopup: true, anchor: event.currentTarget});
    };



    render () {

        let icon = <i className="material-icons">notifications</i>;

        if (this.state.badgeCount > 0) {
            icon = <Badge badgeContent={this.props.badgeCount} color="primary">
                <i className="material-icons">notifications</i>
            </Badge>;
        }

        return (

            <div className="mdl-layout-title">
                <NotificationsPopup anchor={this.state.anchor} onClose={this.handlePopupClose}/>
                <div className="secondaryItem">
                    <CustomIconButton onClick={this.handleAvatarClick} aria-label="show 4 new mails" color="inherit">
                        {icon}
                    </CustomIconButton>

                </div>
            </div>
        );
    }
}
