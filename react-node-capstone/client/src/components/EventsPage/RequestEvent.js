import React from "react";
import "./RequestEvent.css";
import DateFnsUtils from "@date-io/date-fns";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';

class RequestEvent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: new Date(),
            end: new Date(),
            title: "",
            description: "",
            event_type: "global"
        };
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    }

    handleStartTimeChange(datetime) {
        this.setState({start: datetime});
    }

    handleEndTimeChange(datetime) {
        this.setState({end: datetime});
    }

    onClickSubmit() {
        //Wait to implement until API is done
        // e.preventDefault();
        // fetch("/requestEvents", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         start: this.state.start,
        //         end: this.state.end,
        //         title: this.state.title,
        //         description: this.state.description
        //     }),
        //     headers: {"Content-Type": "application/json"}
        // })
        //     .then(function (response) {
        //         return response.json();
        //     })
        //     .then(function (body) {
        //         console.log(body);
        //     });
        window.alert("submitted");
    }

    render() {
        return (
            <div>
                <h4 className="title">Request New Event</h4>
                <hr/>
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
                    </MuiPickersUtilsProvider><br/>
                    <TextField className="title" placeholder="Title of Event" variant="outlined"
                               value={this.state.title}/>
                    <TextField className="description" multiline placeholder="Description of Event" variant="outlined"
                               value={this.state.description}/><br/>
                    <div className="requestForm">
                        <Button type="submit" variant="contained" size="large" className="submit"
                                onClick={this.onClickSubmit}>Submit</Button>
                    </div>
                </div>
            </div>
        );
    }
}


export default RequestEvent;