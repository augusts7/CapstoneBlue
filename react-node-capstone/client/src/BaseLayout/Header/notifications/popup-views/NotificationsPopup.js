import React from "react";
import Popover from '@material-ui/core/Popover';
import NotificationsPopupItem from "./NotificationsPopupItem";
import Progress from "../../../../Views/GenericViews/Progress/Progress";
import {Typography} from "@material-ui/core";
import EmptyListView from "../../../../Views/GenericViews/empty-view/EmptyListView";


const anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
};

const transformOrigin = {
    vertical: 'top',
    horizontal: 'center',
};

const containerStyle = {
    backgroundColor: "white",
    "padding": "8px",
    width: window.innerWidth * 0.3,
    maxHeight: window.innerHeight * 0.7
};

const titleStyle = {
    padding: "16px",
    color: "white"
};

export default class NotificationsPopup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };
    }


    handleClose = () => {
        this.props.onClose();
    };


    handleRemoveItem = (id) => {
        this.props.onDeleteItem(id);
    };


    render() {
        let invitedEvents = [];
        if (this.props.invitedEvents != null && this.props.invitedEvents.length > 0) {
            this.props.invitedEvents.forEach((iE) => {
                invitedEvents.push(<NotificationsPopupItem key={iE.eventID} onRemoveItem={this.handleRemoveItem} event={iE}/>);
            });
        } else {
            invitedEvents.push(<EmptyListView key="emptyNotificationsView" message="There are no notifications" />);
        }

        return (
            <div>
                <Popover
                    open={Boolean(this.props.anchor)}
                    anchorEl={this.props.anchor}
                    onClose={this.handleClose}
                    anchorOrigin={anchorOrigin}
                    transformOrigin={transformOrigin}>

                    <div>
                        <div className="maroon" style={titleStyle}>
                            <Typography variant="h6">Event Invites</Typography>
                        </div>

                        <div className="mdl-color--grey-50 styleScroll" style={containerStyle}>

                            <Progress show={this.state.isLoading}/>
                            {invitedEvents}

                        </div>
                    </div>

                </Popover>
            </div>
        );
    }
}