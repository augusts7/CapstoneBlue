import React from 'react';
import 'date-fns';
import MaterialButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from "../generic-components/progress"
import { get, post } from "../../../ApiHelper/ApiHelper"
import EventItemLayout from "./EventItemLayout";

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const timeOptions = { minute: '2-digit', hour: "2-digit" }


export default class EventForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            event: {},
            mode: "view"
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
    }

    hideMessage() {
        this.setState({message: ""});
    }

    handleChange(name, value) {

        var newState = {};
        newState[name] = value;

        this.setState(newState);
    }

    handleSave() {

        
        
    }

    loadData(eventId) {

        get("events/complete/" + eventId, function (res) {

            if (res.success) {

                this.setState({ "loading": false, "event": res.event });

            } else {

                this.setState({ "loading": false, "event": res.event });

            }

        });

    }

    render() {
       
        return (
            <div>
                <Dialog style={{ padding: "0px" }} open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#0D47A1", color: "white" }}>

                        <h4>{this.props.title || "Add Event"}</h4>
                    </DialogTitle>

                    <Progress show={this.state.progress} />

                    <DialogContent>

                        <EventItemLayout />

                    </DialogContent>
                    <DialogActions>
                        <MaterialButton onClick={this.props.onCancel} color="primary">
                            Cancel
                    </MaterialButton>
                        <MaterialButton onClick={this.handleSave} color="primary">
                            Edit
                    </MaterialButton>
                    </DialogActions>
                </Dialog>
            </div>
            
        );
    }
}
