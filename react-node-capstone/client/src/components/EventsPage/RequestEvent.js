import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import UserContext from "../../Context/UserContext";

class RequestEvent extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: "",
            description: "",
            start: new Date(),
            end: new Date(),
            event_type: "global",
            status: "pending"
        };

        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    handleStartTimeChange(datetime) {
        this.setState({ start: datetime });
        console.log(this.state.start);
    }

    handleEndTimeChange(datetime) {
        this.setState({ end: datetime });
        console.log(this.state.end);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    createEvent = () => {
        this.handleToggle();
        fetch("/events", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                start: this.state.start,
                end: this.state.end,
                title: this.state.title,
                description: this.state.description,
                user_id: this.context.user_id,
                event_type: "global",
                status: "pending"
            })
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(body) {
                console.log(body);
            });
    };

    render() {
        const { open } = this.state;
        var button = (
            <Button
                type="submit"
                variant="contained"
                size="large"
                className="msgBtn2"
                onClick={this.handleToggle}
            >
                <i className="material-icons">event</i>Request Event
            </Button>
        );
        var title = "Request Event";
        var submitButton = "Request Event";


        return (
            <Fragment>
                {button}
                <Dialog
                    open={open}
                    onClose={this.handleToggle}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To request an event, please fill out the following
                            form.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="title"
                            label="Title"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.title}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            name="description"
                            label="Description"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.description}
                            fullWidth
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <div className="datePicker">
                                <DateTimePicker
                                    autoOk
                                    disablePast
                                    variant="standard"
                                    label="Start Time"
                                    value={this.state.start}
                                    onChange={this.handleStartTimeChange}
                                ></DateTimePicker>
                            </div>
                            <div className="datePicker">
                                <DateTimePicker
                                    autoOk
                                    disablePast
                                    variant="standard"
                                    label="End Time"
                                    value={this.state.end}
                                    onChange={this.handleEndTimeChange}
                                ></DateTimePicker>
                            </div>
                        </MuiPickersUtilsProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleToggle} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.createEvent} color="primary">
                            {submitButton}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}
export default RequestEvent;
