import React from 'react'
import MessageBox from "../../../../../components/Form/MessageBox/MessageBox"
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers'
import TextField from "@material-ui/core/TextField"
import MaterialButton from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Progress from "../../generic/Progress"
import {get, post} from "../../../../../ApiHelper/ApiHelper"
import Select from "../../../../../components/Select/Select"
import DialogContent from "@material-ui/core/DialogContent";
import SelectCalendars from "../../generic/select-calendars/SelectCalendars";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
            "formTitle": "Add Event"
        };

        this.handleSave = this.handleSave.bind(this);
    }

    hideMessage = () => {
        this.setState({message: ""});
    };

    handleChange = (name, value) => {
        this.setState({[name]: value});
    };

    
    componentWillReceiveProps(nextProps) {

        const formMode = "" + nextProps.formMode;

        if (formMode === "editAppointment") {

            if (nextProps.eventFormData.event) {

                const data = nextProps.eventFormData.event;

                this.setState({
                    "formTitle": "Edit Appointment",
                    "title": data.title,
                    "description": data.description,
                    "start": new Date(data.start),
                    "end": new Date(data.end)
                });
            }
        } else if (formMode === "appointment") {
            this.setState({formTitle: "Add Appointment"});
        }
    }
    componentDidMount() {
        this.loadCalendars();
    }

    loadCalendars = () => {
        this.setState({"progress": true});

        get("calendar/", (res) => {
            if (res.success) {

                let calendarOptions = [];

                if (res.results) {
                    res.results.forEach((item) => {
                        calendarOptions.push({"name": item.calendarName, "value": item.calendarId});
                    });
                }

                this.setState({"progress": false, "calendarOptions": calendarOptions});

            } else {
                this.setState({"progress": false, message: res.message});
            }
        });
    };

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

        let postUrl = "/single-event-layout";
        let formMode = "" + this.props.formMode;

        if (formMode === "appointment") {
            data["event_type"] = "appointment";
            postUrl = "/appointments";
        } else if (("" + this.props.formMode) === "editAppointment") {
            data["event_type"] = "appointment";
            postUrl = "/single-event-layout/edit";
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

        let eventTypeHtml = null;

        if (("" + this.props.formMode) === "event") {

            eventTypeHtml = <TextField
                fullWidth
                type="text"
                onChange={(event) => this.handleChange("event_type", event.target.value)}
                value={this.state.event_type}
                label={"Event type"}
                margin="normal"/>;

        }

        return (
            <div>
                <Dialog TransitionComponent={Transition} open={this.props.open} className="dialog"
                        onClose={this.props.onClose}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle className="dialog-title" id="form-dialog-title">
                        <h4>{this.state.formTitle}</h4>
                    </DialogTitle>

                    <Progress show={this.state.isLoading}/>

                    <DialogContent className="dialog-white-content styleScroll">

                        <MessageBox noPadding message={this.state.message} hideMessage={this.hideMessage}/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <div>

                                <DateTimePicker
                                    fullWidth
                                    autoOk
                                    inputVariant="outlined"
                                    margin="normal"
                                    label="Start Time"
                                    value={this.state.start}
                                    onChange={(value) => this.handleChange("start", value)}
                                />
                                <DateTimePicker
                                    fullWidth
                                    autoOk
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
                                    label={"Title"}
                                    margin="normal"/>

                                <TextField
                                    fullWidth
                                    type="text"
                                    onChange={(event) => this.handleChange("description", event.target.value)}
                                    value={this.state.description}
                                    label={"Description"}
                                    margin="normal"/>

                                {eventTypeHtml}

                                <TextField
                                    fullWidth
                                    type="text"
                                    onChange={(event) => this.handleChange("attendeeEmails", event.target.value)}
                                    value={this.state.attendeeEmails}
                                    label={"Emails of invited users"}
                                    margin="normal"/>

                                <Select
                                    label="Calendar"
                                    helperText="Select the Calendar to associate this event in"
                                    value={this.state.calendarId}
                                    options={this.state.calendarOptions}
                                    onChange={(value) => this.handleChange("calendarId", value)}/>

                            </div>
                        </MuiPickersUtilsProvider>

                    </DialogContent>
                    <DialogActions className="dialog-grey-footer">
                        <MaterialButton color="primary" onClick={this.props.onClose}>
                            Cancel
                        </MaterialButton>
                        <MaterialButton color="primary" role="main" onClick={this.handleSave}>
                            Save
                        </MaterialButton>
                    </DialogActions>
                </Dialog>
            </div>

        );
    }
}
