import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {get, post} from "../../../../ApiHelper/ApiHelper"
import Progress from "../../generic-components/progress";
import Select from "../../../../components/Select/Select";
import {DialogContentText} from "@material-ui/core";


const headerStyle = {"padding": "16px", "backgroundColor": "#01579B", "color": "white"};
const dialogTitleStyle = {"padding": "0px", "margin": "0px"};


export default class ShareCalendarForm extends React.Component {

    state = {
        name: "",
        email: "",
        progress: "",
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

            let calendarId = this.props.sharedCalId;

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

    render() {

        let calendarOptions = null;

        if (this.props.showCalendarOptions === true) {
            calendarOptions = <Select label="Calendar" helperText="Select the Calendar to share"
                                      name="calendarId" value={this.state.calendarId}
                                      options={this.state.calendarOptions}
                                      onChange={this.handleCalendarValueChange}/>;
        }

        return (
            <Dialog fullWidth={true} open={this.props.open} onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                <DialogTitle style={dialogTitleStyle} id="form-dialog-title">
                    <div style={headerStyle}>
                        <div><h4>Share your calendar</h4></div>
                    </div>
                </DialogTitle>

                <Progress show={this.state.progress}/>
                <DialogContent>
                    <DialogContentText>
                        Enter the name of the shared calendar and the email of the user to share the calendar with.
                    </DialogContentText>
                    <TextField
                        fullWidth
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                        value={this.state.name}
                        label={"Name for Shared Calendar"}
                        margin="normal"/>

                    <TextField
                        fullWidth
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                        label={"Email of user to share Calendar with"}
                        margin="normal"/>

                    {calendarOptions}

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleShare} color="primary">
                        Share Calendar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
