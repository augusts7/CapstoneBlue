import React from "react";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import "./CreateEvent.css";
class CreateEvent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: new Date(),
            end: new Date(),
            title: "",
            description: "",
            event_type: "global",
            status: "approved"
        };
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onClickSubmit = this.onClickSubmit.bind(this);
    }

    handleStartTimeChange(datetime) {
        this.setState({ start: datetime });
    }

    handleEndTimeChange(datetime) {
        this.setState({ end: datetime });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onClickSubmit(e) {
        e.preventDefault();
        fetch("/single-event-layout", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                start: this.state.start,
                end: this.state.end,
                title: this.state.title,
                description: this.state.description,
                event_type: "global",
                status: "approved"
            }),
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(body) {
                console.log(body);
            });
        this.setState({
            start: new Date(),
            end: new Date(),
            title: "",
            description: ""
        });
    }

    render() {
        return (
            <div className="create-event-container">
                <div className="createTitle">
                    <h3>Create Event</h3>
                </div>
                <div className="requestForm">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <div className="datePicker">
                            <DateTimePicker
                                autoOk
                                disablePast
                                inputVariant="outlined"
                                label="Start Time"
                                value={this.state.start}
                                onChange={this.handleStartTimeChange}
                            >
                            </DateTimePicker>
                        </div>
                        <div className="datePicker">
                            <DateTimePicker
                                autoOk
                                disablePast
                                inputVariant="outlined"
                                label="End Time"
                                value={this.state.end}
                                onChange={this.handleEndTimeChange}
                            >
                            </DateTimePicker>
                        </div>
                    </MuiPickersUtilsProvider>
                    <div className="text-input">
                        <TextField
                            className="eventTitle"
                            name="title"
                            placeholder="Title of Event"
                            variant="outlined"
                            onChange={this.handleChange}
                            value={this.state.title}
                        />
                        <TextField
                            className="description"
                            name="description"
                            multiline
                            placeholder="Description of Event"
                            variant="outlined"
                            onChange={this.handleChange}
                            value={this.state.description}
                        />
                    </div>
                    <div>
                        <Button
                            type="submit"
                            name="submit"
                            variant="contained"
                            size="large"
                            className="submit"
                            onClick={this.onClickSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateEvent;