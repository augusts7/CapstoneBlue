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
            end: new Date()
        };
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    }
    handleStartTimeChange(datetime) {
        this.setState({ start: datetime });
    }

    handleEndTimeChange(datetime) {
        this.setState({ end: datetime });
    }

    onClickSubmit(){
    window.alert("Form Submitted");
    }

    render() {
        return (
            <div>
                <h4 className="title">Request New Event</h4>
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
                            />
                        </div>
                    </MuiPickersUtilsProvider><br/>
                    <TextField className="title" placeholder="Title of Event" variant="outlined"/>
                    <TextField className="description" multiline placeholder="Description of Event" variant="outlined"/><br/>
                    <div className="requestForm">
                    <Button type="submit" variant="contained" size="large" className="submit" onClick={this.onClickSubmit}>Submit</Button>
                    </div>
                    </div>
            </div>
        );
    }
}


export default RequestEvent;