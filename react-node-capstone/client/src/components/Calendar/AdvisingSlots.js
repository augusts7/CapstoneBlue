import React from "react";
import Divider from "@material-ui/core/Divider";
import {
    MuiPickersUtilsProvider, KeyboardDatePicker,
    KeyboardTimePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import "./AdvisingSlots.css";

class AdvisingSlots extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            start: new Date(),
            end: new Date(),
            interval: "15",
            slots: [{
                startTime: "2019-09-20T12:00:00",
                endTime: "2019-09-20T12:15:00",
                advisor: "Lon Smith"
            }],
            user_type: "faculty"
        };

        this.handleDate = this.handleDate.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        // this.addToCalendar = this.addToCalendar.bind(this);
    }

    handleDate(date) {
        this.setState({date: date});
    }

    handleStartTimeChange(time) {
        this.setState({start: time});
    }

    handleEndTimeChange(time) {
        this.setState({end: time});
    }

    handleOptionChange = changeEvent => {
        this.setState({
            interval: changeEvent.target.value
        });
    };

    onClickSubmit() {
        alert("Submitted");
    }

    addToCalendar() {
        alert("Added");
    }

    componentDidMount() {
        fetch("/advising")
            .then(res => res.json())
            .then(slotData => this.setState({slots: slotData}));
    }

    render() {
        const availableSlots = this.state.slots.map(function (item, i) {
            return <li key={i} className="availableSlots">{item.startTime} to {item.endTime}</li>
        });

        const availableStudentSlots = this.state.slots.map(function(item, i) {
            return (<li key={i} className="availableSlots"> {item.startTime} to {item.endTime} with {item.advisor}
                <Button onClick={this.addToCalendar}
                     style={{color: 'green'}}>Add To Calendar</Button>
            </li>);
        }.bind(this));
        if (this.state.user_type === "faculty") {
            return (
                <div className="advisingSlots">
                    Advising Slots
                    <Divider/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Select A Date"
                            value={this.state.date}
                            onChange={this.handleDate}>
                        </KeyboardDatePicker>
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker-start"
                            label="Select A Start Time"
                            value={this.state.start}
                            onChange={this.handleStartTimeChange}
                        />
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker-end"
                            label="Select An End Time"
                            value={this.state.end}
                            onChange={this.handleEndTimeChange}
                        />
                    </MuiPickersUtilsProvider><br/>
                    <div className="intervalButtons">
                        <input type="radio" name="interval" value="15" checked={this.state.interval === "15"}
                               onChange={this.handleOptionChange}/>15 Minute Intervals
                        <input type="radio" name="interval" value="30" checked={this.state.interval === "30"}
                               onChange={this.handleOptionChange}/>30 Minute Intervals
                    </div>
                    <Button variant="contained" onClick={this.onClickSubmit}>
                        Submit
                    </Button>
                    <div className="slotList">
                        <ol>
                            Available Times<br/>
                            {availableSlots}
                        </ol>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="slotList">
                    <ol>
                        <h4>Available Advising Slots</h4><br/>
                        {availableStudentSlots}
                    </ol>
                </div>
            );
        }
    }
}

export default AdvisingSlots;