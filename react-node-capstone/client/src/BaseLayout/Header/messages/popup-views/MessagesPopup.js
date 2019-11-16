import React from "react";
import Popover from '@material-ui/core/Popover';
import NotificationsPopupItem from "./NotificationsPopupItem";
import Progress from "../../../../Views/CalenderView/components/generic/Progress";


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
    width: window.innerWidth * 0.4,
    maxHeight: window.innerHeight * 0.7
};

export default class NotificationsPopup extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            isLoading: false
        };
    }


    handleClose = () => {
        this.props.onClose();
    };


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
                invitedEvents.push(<NotificationsPopupItem onRemoveItem={this.handleRemoveItem} event={iE}/>);
            });
        }
        return (
            <div>
                <Popover
                    open={Boolean(this.props.anchor)}
                    anchorEl={this.props.anchor}
                    onClose={this.handleClose}
                    anchorOrigin={anchorOrigin}
                    transformOrigin={transformOrigin}>

                    <div className="mdl-color--grey-50 styleScroll" style={containerStyle}>

                        <Progress show={this.state.isLoading}/>
                        {invitedEvents}

                    </div>

                </Popover>
            </div>
        );
    }
}