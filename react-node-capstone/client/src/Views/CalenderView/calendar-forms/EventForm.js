import React from 'react'
import MessageBox from "../../../components/Form/MessageBox/MessageBox"
import 'date-fns'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers'
import TextField from "@material-ui/core/TextField"
import MaterialButton from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Progress from "../generic-components/Progress"
import {post} from "../../../ApiHelper/ApiHelper"
import Select from "../../../components/Select/Select"


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
            "isLoading": false,
            "calendarId": "main",
            "calendarOptions": [],
        };

        this.handleSave = this.handleSave.bind(this);
    }

    hideMessage = () => {
        this.setState({message: ""});
    };

    handleChange = (name, value) => {
        this.setState({[name]: value});
    };

    componentDidMount() {


    }

    componentWillReceiveProps(nextProps) {

        const formMode = "" + nextProps.formMode;

        if (formMode === "editAppointment") {

            if (nextProps.eventFormData.event) {

                const data = nextProps.eventFormData.event;

                this.setState({
                    "title": data.title,
                    "description": data.description,
                    "start": new Date(data.start),
                    "end": new Date(data.end)
                });
            }
        }
    }

    handleSave() {

        this.setState({isLoading: true});

        let requiredKeys = ["start", "end", "title", "description"];

        if (this.props.formMode === "event") {

            requiredKeys.push("event_type");

        }

        let data = {};

        for (let i = 0; i < requiredKeys.length; i++) {

            let key = requiredKeys[i];

            if (!this.state[key] || ("" + this.state[key]).length === 0) {
                this.setState({isLoading: false, "message": "Please enter all fields."});
                return false;
            } else {
                data[key] = this.state[key];
            }
        }

        let postUrl = "/events";
        let formMode = "" + this.props.formMode;

        if (formMode === "appointment") {
            data["event_type"] = "appointment";
            postUrl = "/appointments/create";
        } else if (("" + this.props.formMode) === "editAppointment") {
            data["event_type"] = "appointment";
            postUrl = "/events/edit";
            data["eventId"] = this.props.eventFormData.event.id;
        }

        data["calendarId"] = this.state.calendarId === "main" ? "" : this.state.calendarId;
        data["attendeeEmails"] = this.state.attendeeEmails;

        post(postUrl, data, (res) => {

            if (res.success) {
                this.setState({"isLoading": false})
                this.props.onClose();
            } else {
                this.setState({"isLoading": false, "message": res.message})
            }
        });
    }

    render() {

        const type = this.props.formMode;

        let eventTypeHtml = null;
        let title = "Add Event";
        let formMode = "" + this.props.formMode;
        if (formMode === "appointment" || formMode === "editAppointment") {


            title = "Add Appointment";

        } else {

            eventTypeHtml = <TextField
                fullWidth
                type="text"
                onChange={(event) => this.handleChange("event_type", event.target.value)}
                value={this.state.event_type}
                label={"Enter type of " + type}
                margin="normal"/>;

        }

        return (
            <div>
                <Dialog open={this.props.open} className="dialog" onClose={this.props.onClose}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle className="dialog-title" id="form-dialog-title">
                        <h4>{title}</h4>
                    </DialogTitle>

                    <Progress show={this.state.isLoading}/>

                    <DialogContent className="dialog-white-content">

                        <div>
                            <MessageBox noPadding message={this.state.message} hideMessage={this.hideMessage}/>
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
                                        margin="normal"/>

                                    <TextField
                                        fullWidth
                                        type="text"
                                        onChange={(event) => this.handleChange("description", event.target.value)}
                                        value={this.state.description}
                                        label={"Enter description for " + type}
                                        margin="normal"/>

                                    {eventTypeHtml}

                                    <TextField
                                        fullWidth
                                        type="text"
                                        onChange={(event) => this.handleChange("attendeeEmails", event.target.value)}
                                        value={this.state.attendeeEmails}
                                        label={"Enter comma separated emails of users to invite them"}
                                        margin="normal"/>

                                    <Select
                                        label="Calendar"
                                        helperText="Select the Calendar to associate this event in"
                                        value={this.state.calendarId}
                                        options={this.state.calendarOptions}
                                        onChange={(value) => this.handleChange("calendarId", value)}/>

                                </Grid>
                            </MuiPickersUtilsProvider>
                        </div>

                    </DialogContent>
                    <DialogActions className="dialog-grey-footer">
                        <MaterialButton color="primary" onClick={this.props.onClose}>
                            <i className="material-icons">delete</i>Cancel
                        </MaterialButton>
                        <MaterialButton color="primary" role="main" onClick={this.handleSave}>
                            <i className="material-icons">done_all</i>Save
                        </MaterialButton>
                    </DialogActions>
                </Dialog>
            </div>

        );
    }
}
