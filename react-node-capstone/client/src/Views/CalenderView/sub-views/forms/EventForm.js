import React from 'react';
import MessageBox from "../../../../components/Form/MessageBox/MessageBox"
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers';
import TextField from "@material-ui/core/TextField"
import MaterialButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from "../parts/progress";
import { get, post } from "../../../../ApiHelper/ApiHelper";
import Select from "../../../../components/Select/Select";


// const headerStyle = { "color": "white", "background": 'linear-gradient(45deg, #1565C0 30%, #0D47A1 90%)' };
const headerStyle = { "padding": "16px", "backgroundColor": "#01579B", "color": "white"};
const dialogTitleStyle = { "padding": "0px", "margin": "0px" };
const buttonIconStyle = { "marginRight": "8px" };
const buttonStyle = { "padding": "4px 16px 4px 16px" };





export default class EventForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "start": new Date(),
            "end": new Date(),
            "message": "",
            "title": "",
            "description": "",
            "event_type": "",
            "attendeeEmails": "",
            "progress": false,
            "calendarId": "main",
            "calendarOptions": [],
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

    componentDidMount() {

        this.setState({ "progress": true });

        get("calendar/", (res) => {

            let calendarOptions = [{ name: "Default", "value": "main" }];

            if (res.success) {

                if (res.results) {
                    res.results(d => {
                        calendarOptions.push({ "name": d.name, "value": d.id });
                    });
                }

            } else {
                this.setState({ message: res.message });
            }

            this.setState({ "progress": false, "calendarOptions": calendarOptions });
        });
    }

    handleSave() {

        this.setState({ progress: true });

        let requiredKeys = ["start", "end", "title", "description"];

        if (this.props.formMode === "event") {

            requiredKeys.push("event_type");

        }

        let data = {};

        for (var i = 0; i < requiredKeys.length; i++) {

            let key = requiredKeys[i];

            if (!this.state[key] || ("" + this.state[key]).length === 0) {
                this.setState({ progress: false, "message": "Please enter all fields. Don't forget to add " + key });
                return false;
            } else {
                data[key] = this.state[key];
            }
        }

        let postUrl = "/events";

        if (this.props.formMode === "appointment") {
            data["event_type"] = "appointment";
            postUrl = "/appointments/create";
        }

        data["calendarId"] = this.state.calendarId === "main" ? "" : this.state.calendarId;
        data["attendeeEmails"] = this.state.attendeeEmails;
        
        post(postUrl, data, (res) => {

            if (res.success) {
                this.setState({ "progress": false })
                this.props.onClose();
            } else {
                this.setState({ "progress": false, "message": res.message })
            }
        }); 
    }

    render() {

        const type = this.props.formMode;

        let eventTypeHtml = null;
        let title = "Add Event";

        if (this.props.formMode === "appointment") {

            title = "Add Appointment";

        } else {

            eventTypeHtml = <TextField
                fullWidth
                type="text"
                onChange={(event) => this.handleChange("event_type", event.target.value)}
                value={this.state.event_type}
                label={"Enter type of " + type}
                margin="normal" />;

        }

        return (
            <div>
                <Dialog open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle style={dialogTitleStyle} id="form-dialog-title">
                        <div style={headerStyle}>
                        <div><h4>{title}</h4></div>
                        </div>
                    </DialogTitle>

                    <Progress show={this.state.progress} />

                    <DialogContent>

                            <div>
                                <MessageBox noPadding message={this.state.message} hideMessage={this.hideMessage} />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="center">

                                    <DateTimePicker
                                            fullWidth
                                            autoOk
                                            disablePast
                                            inputVariant="outlined"
                                            margin="normal"
                                            label="Start Time"
                                            value={this.state.start}
                                            onChange={(value) => this.handleChange("start", value)}
                                        />
                                    <DateTimePicker
                                            fullWidth
                                            autoOk
                                            disablePast
                                            inputVariant="outlined"
                                            margin="normal"
                                            label="End Time"
                                            value={this.state.end}
                                            onChange={(value) => this.handleChange("end", value)}
                                        />

                                    <TextField
                                            fullWidth
                                            type="text"
                                            onChange={(event) => this.handleChange("title", event.target.value)}
                                            value={this.state.title}
                                            label={"Enter title for " + type}
                                            margin="normal" />

                                    <TextField
                                            fullWidth
                                            type="text"
                                            onChange={(event) => this.handleChange("description", event.target.value)}
                                            value={this.state.description}
                                            label={"Enter description for " + type}
                                            margin="normal" />

                                    {eventTypeHtml}

                                    <TextField
                                            fullWidth
                                            type="text"
                                            onChange={(event) => this.handleChange("attendeeEmails", event.target.value)}
                                            value={this.state.attendeeEmails}
                                            label={"Enter comma separated emails of users to invite them"}
                                            margin="normal" />

                                    <Select
                                        label="Calendar"
                                        helperText="Select the Calendar to associate this event in"
                                        value={this.state.calendarId}
                                        options={this.state.calendarOptions}
                                        onChange={(value) => this.handleChange("calendarId", value)} />

                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </div>

                    </DialogContent>
                    <DialogActions>
                        <MaterialButton style={buttonStyle} color="primary" onClick={this.props.onCancel}>
                            <i className="material-icons" style={buttonIconStyle}>delete</i>Cancel
                    </MaterialButton>
                        <MaterialButton style={buttonStyle} color="primary" role="main" onClick={this.handleSave}>
                            <i className="material-icons" style={buttonIconStyle}>done_all</i>Save
                    </MaterialButton>
                    </DialogActions>
                </Dialog>
            </div>
            
        );
    }
}
