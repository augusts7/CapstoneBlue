import React from 'react';
import TextField from '@material-ui/core/TextField';
import {get, post} from "../../../../../../ApiHelper/ApiHelper"
import Select from "../../../../../../components/Select/Select";
import CalendarFormBaseLayout from "../../dialog-form/DialogForm";


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

    handleCalendarExport = () => {

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

            post("/calendar/export", data, (res) => {

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
        this.loadAllCalendars();
    }

    loadAllCalendars = () => {

    };


    layoutValues = {
        buttons: [
            {name: "Cancel", onClick: this.handleClose},
            {name: "Download Calendar", onClick: this.handleCalendarExport}
        ]
    };

    render() {

        return (
            <CalendarFormBaseLayout onClose={this.handleClose} open={this.props.open} buttons={this.layoutValues.buttons} progress={this.state.progress}
                                    title="Download Your Calendar">


            </CalendarFormBaseLayout>
        );
    }
}
