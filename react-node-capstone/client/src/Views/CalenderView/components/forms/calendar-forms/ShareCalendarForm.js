import React from 'react';
import TextField from '@material-ui/core/TextField';
import {get, post} from "../../../../../ApiHelper/ApiHelper"
import Select from "../../../../../components/Select/Select";
import CalendarFormBaseLayout from "../dialog-form/DialogForm";
import LengthValidator from "../../../../../utils/length-utils/LengthValidator";

const textFieldStyle = {marginRight: "16px"};

export default class ShareCalendarForm extends React.Component {

    state = {
        name: "",
        email: "",
        progress: false,
        calendarOptions: [],
        calendarId: -1,
    };


    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleClose = () => {
        this.props.onClose();
    };

    handleCalendarValueChange = (value) => {
        this.setState({calendarId: value});
    };

    handleShare = () => {

        if (this.state.name.length > 0 && this.state.email.length > 0) {

            let calendarId = this.props.sharedCalendarId;

            if (LengthValidator.isEmpty(calendarId)) {
                calendarId = this.state.calendarId;
            }
            if (LengthValidator.isEmpty(calendarId)) {
                this.handleClose();
                return;
            }

            let data = {
                "sharedCalendarName": this.state.name,
                "sharedCalendarId": calendarId,
                "sharedToEmail": this.state.email
            };
            this.setState({progress: true});
            post("/calendar/share", data, (res) => {
                this.setState({progress: false});
                this.handleClose();
            });
        }
    };

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

    layoutValues = {
        buttons: [
            {name: "Cancel", onClick: this.handleClose},
            {name: "Submit", onClick: this.handleShare}
        ]
    };

    render() {

        let calendarOptions = null;
        let helperText = "To share your calendar, enter the email of the user to share the calendar with";

        if (this.props.sharedCalendarId == null || this.props.sharedCalendarId < 1) {
            calendarOptions = <Select style={textFieldStyle} label="Calendar" helperText="Select the Calendar to share"
                                      name="calendarId" value={this.state.calendarId}
                                      options={this.state.calendarOptions}
                                      onChange={this.handleCalendarValueChange}/>;

            helperText = "To share your calendar, select the calendar to share as well as enter the email of the user to share the calendar with";
        }

        return (
            <CalendarFormBaseLayout fullWidth={false} onClose={this.handleClose} open={this.props.open}
                                    buttons={this.layoutValues.buttons} progress={this.state.progress}
                                    text={helperText}

                                    title="Share Your Calendar">

                {calendarOptions}

                <TextField
                    fullWidth
                    style={textFieldStyle}
                    autoFocus
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.name}
                    label={"Name"}
                    margin="normal"/>

                <TextField
                    style={textFieldStyle}
                    fullWidth
                    type="email"
                    name="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                    label={"User Email"}
                    margin="normal"/>


            </CalendarFormBaseLayout>
        );
    }
}
