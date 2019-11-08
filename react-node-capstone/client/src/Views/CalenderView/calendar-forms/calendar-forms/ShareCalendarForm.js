import React from 'react';
import TextField from '@material-ui/core/TextField';
import {get, post} from "../../../../api-helper/ApiHelper"
import Select from "../../../../components/Select/Select";
import CalendarFormBaseLayout from "../base-layout/BaseLayout";


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

            if (calendarId === null || calendarId <= 0) {
                calendarId = this.state.calendarId;
            }
            if (calendarId === null || calendarId <= 0) {
                alert("invalid calendar");
                return;
            }
            let data = {
                "sharedCalendarName": this.state.name,
                "sharedCalendarId": calendarId,
                "sharedToEmail": this.state.email
            };

            post("/calendar/share", data, (res) => {

                if (res.success) {
                    alert("shared");

                    this.handleClose();
                } else {
                    alert("Couldn't share");
                }
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
            {name: "Share Calendar", onClick: this.handleShare}
        ]
    };

    render() {

        let calendarOptions = null;

        if (this.props.sharedCalendarId == null || this.props.sharedCalendarId < 1) {
            calendarOptions = <Select label="Calendar" helperText="Select the Calendar to share"
                                      name="calendarId" value={this.state.calendarId}
                                      options={this.state.calendarOptions}
                                      onChange={this.handleCalendarValueChange}/>;
        }

        return (
            <CalendarFormBaseLayout onClose={this.handleClose} open={this.props.open} buttons={this.layoutValues.buttons} progress={this.state.progress}
                                    title="Share Your Calendar">
                <TextField
                    fullWidth
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.name}
                    label={"Name"}
                    margin="normal"/>

                <TextField
                    fullWidth
                    type="email"
                    name="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                    label={"User Email"}
                    margin="normal"/>

                {calendarOptions}
            </CalendarFormBaseLayout>
        );
    }
}
