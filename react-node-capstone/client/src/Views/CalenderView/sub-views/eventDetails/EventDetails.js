import React from 'react';
import 'date-fns';
import MaterialButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from "../parts/progress"
import { get, post } from "../../../../ApiHelper/ApiHelper"


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

        this.setState({ progress: true });

        let requiredKeys = ["start", "end", "message", "title", "description", "event_type"];
        let data = {};

        for (var i = 0; i < requiredKeys.length; i++) {

            let key = requiredKeys[i];

            if (!this.state[key] || ("" + this.state[key]).length == 0) {
                this.setState({ progress: false, "message": "Please enter all fields. Don't forget to add " + key });
                return false;
            } else {
                data[key] = this.state[key];
            }
        }

        data["attendee_emails"] = this.state.attendee_emails || "";

        if (this.props.mode) {

        } else {
            post("events", data, (res) => {

                if (res.success) {
                    this.setState({ "progress": false })
                    this.props.onClose();
                } else {
                    this.setState({ "progress": false, "message": res.message })
                }
            }); 
        }
        
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


        let data = this.props.event;

        data = {
            "creator": {"name": "Sanjeeb", "email": "sanjeeb@gmail.com", "userId": 7},
            "attendees": [{ "name": "attendeeSanjeeb", "email": "sanjeeb4@gmail.com", "userId": 8 }, { "name": "attendee2Sanjeeb", "email": "sanjee3b@gmail.com", "userId": 9 }],
            "start": new Date(),
            end: new Date(),
            title: "Hi title",
            description: "This is the description of the event",

        };

        const start = new Date(data.start);
        const end = new Date(data.end);

        const date = start.toLocaleDateString("en-US", dateOptions);
        const startTime = start.toLocaleTimeString("en-US", timeOptions);
        const endTime = end.toLocaleTimeString("en-US", timeOptions);

        const dateString = date + " from " + startTime + " to " + endTime;

        const creator = this.state.creator;

        const attendees = this.state.attendees;

        let buttons = [];

        buttons.push(<div style={{ "display": "inline-block" }}><MaterialButton key="1" style={{ "padding": "2px", "backgroundColor": "#455A64", "color": "white" }} onClick={this.props.onAddToCalendar}>Delete</MaterialButton></div>);

        if (data.created) {
            buttons.push(<div style={{ "display": "inline-block", "marginLeft": "4px" }}><MaterialButton key="2" style={{ "padding": "2px", "backgroundColor": "#455A64", "color": "white" }} onClick={this.props.onAddToCalendar}>Modify</MaterialButton></div>);
        }

       
        return (
            <div>
                <Dialog style={{ padding: "0px" }} open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#0D47A1", color: "white" }}>

                        <h4>{this.props.title || "Add Event"}</h4>
                    </DialogTitle>

                    <Progress show={this.state.progress} />

                    <DialogContent>

                        <div className="slotRoot" key={data.key}>

                            <div className="mdl-grid">
                                <div className="mdl-cell--2-col">
                                    <i className="material-icons mdl-color-text--blue-900">today</i>
                                </div>
                                <div className="mdl-cell--10-col">
                                    <div className="mdl-color-text--blue-900">
                                        {date}
                                    </div>
                                    <div style={{ "fontWeight": "600" }}>
                                        {data.title}
                                    </div>

                                    <div className="cols-2">
                                        <div>
                                            {startTime}
                                        </div>
                                        <div>
                                            {endTime}
                                        </div>
                                    </div>
                                    <div>
                                        {data.description}
                                    </div>
                                    <div style={{ "paddingTop": "8px" }}>
                                        {buttons}
                                    </div>
                                </div>
                            </div>

                        </div>

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
