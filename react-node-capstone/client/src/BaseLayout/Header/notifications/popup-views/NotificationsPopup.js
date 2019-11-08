import React from "react";
import Popover from '@material-ui/core/Popover';
import NotificationsPopupItem from "./NotificationsPopupItem";
import Progress from "../../../../Views/CalenderView/generic-components/Progress";
import {get} from "../../../../api-helper/ApiHelper";

const anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
};

const transformOrigin = {
    vertical: 'top',
    horizontal: 'center',
};

const containerStyle = {backgroundColor: "white", "padding": "8px", width:  window.innerWidth* 0.4, maxHeight: window.innerHeight * 0.7};

export default class NotificationsPopup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "isLoading": false,
            "invitedEvents": [],
        };
    }


    handleClose = () => {
        this.props.onClose();
    };

    handleRemoveItem = (id) => {
        if (this.state.invitedEvents == null || this.state.invitedEvents.length < 1) {
            return false;
        }
        let newEvents = this.state.invitedEvents.filter((iE) => iE.eventID == id ? false : true);
        this.setState({"invitedEvents": newEvents});
    };

    componentDidMount() {
        this.loadAllEventRequests();
    }

    loadAllEventRequests = () => {
        this.setState({isLoading: true});
        get("/appointments/receivedInvite", (res) => {
            let allEvents = [];
            if (res.success) {
                allEvents = res.results;
            }
            this.setState({"invitedEvents": allEvents, isLoading: false});
            if (allEvents.length === 0) {
                this.props.onClose();
            }
        });
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.loadAllEventRequests();
    }

    render() {
        let invitedEvents = [];
        if (this.state.invitedEvents != null && this.state.invitedEvents.length > 0) {
            this.state.invitedEvents.forEach((iE) => {
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