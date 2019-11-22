import React from 'react'
import MessageBox from "../../../../../components/Form/MessageBox/MessageBox"
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers'
import TextField from "@material-ui/core/TextField"
import Select from "../../../../../components/Select/Select"
import Slide from "@material-ui/core/Slide";
import DialogForm from "../dialog-form/DialogForm";

import "../../../../../Application/styles/grid/grids.css";
import {post, get} from "../../../../../ApiHelper/ApiHelper";
import AllUsersList from "./AllUsersList";
import AttendeeList from "./AttendeeList";
import LengthValidator from "../../../../../utils/length-utils/LengthValidator";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const textFieldStyles = {marginRight: "16px"};

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
            "attendees": [],
            "isLoading": false,
            "calendarId": "main",
            "calendarOptions": [],
            "formTitle": "Add Event",
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
        let attendeeEmails = [];
        if (LengthValidator.isNotEmpty(this.state.attendees)) {
            this.state.attendees.forEach((attendee) => {
               attendeeEmails.push(attendee.campusEmail);
            });
        }
        data["attendeeEmails"] = attendeeEmails;

        post(postUrl, data, (res) => {

            if (res.success) {
                this.setState({"isLoading": false})
                this.props.onClose();
            } else {
                this.setState({"isLoading": false, "message": res.message})
            }
        });
    }

    getEventFormHelperText = () => {
        switch (this.state.formMode) {
            case "event":
                return "Enter all the details including start, end time, title, description, and calendar to create a new event";
            case "appointment":
                return "Enter all the details including the start and end time, title, description, and enter the emails of all the users who are to be invited";
            case "editAppointment":
                return "Enter details to edit them in the database";
        }
    };

    handleUsersSelected = (selectedUsers) => {
        console.log(selectedUsers);
        this.setState({attendees: selectedUsers});
    };

    render() {

        let eventTypeHtml = null;

        if (("" + this.props.formMode) === "event") {

            eventTypeHtml = <TextField
                style={textFieldStyles}
                type="text"
                onChange={(event) => this.handleChange("event_type", event.target.value)}
                value={this.state.event_type}
                label={"Event type"}
                margin="normal"/>;

        }

        let formHelperText = this.getEventFormHelperText();

        const buttons = [
            {name: "Cancel", onClick: this.props.onClose},
            {name: "Submit", onClick: this.handleSave}
        ];

        return (
            <DialogForm size="large" open={this.props.open}
                        buttons={buttons}
                        onClose={this.props.onClose}
                        progress={this.state.isLoading}
                        title={this.state.formTitle}

            >
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
                            style={textFieldStyles}
                            autoFocus
                            type="text"
                            onChange={(event) => this.handleChange("title", event.target.value)}
                            value={this.state.title}
                            label={"Title"}
                            margin="normal"/>

                        <TextField
                            type="text"
                            fullWidth
                            onChange={(event) => this.handleChange("description", event.target.value)}
                            value={this.state.description}
                            label={"Description"}
                            margin="normal"/>

                        {eventTypeHtml}

                        <AllUsersList onSubmit={this.handleUsersSelected}/>

                        <AttendeeList attendees={this.state.attendees}/>


                        <Select
                            label="Calendar"
                            helperText="Select the Calendar to associate this event in"
                            value={this.state.calendarId}
                            options={this.state.calendarOptions}
                            onChange={(value) => this.handleChange("calendarId", value)}/>

                    </div>
                </MuiPickersUtilsProvider>
            </DialogForm>
        );
    }
}
