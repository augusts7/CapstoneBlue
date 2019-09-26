import React from "react";
import Divider from "@material-ui/core/Divider";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import "./AdvisingSlots.css";

class AdvisingSlots extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: new Date(),
      end: new Date(),
      advisor: "smith",
      interval: "15",
      slots: [
        {
          start: "2019-09-20T12:00:00",
          end: "2019-09-20T12:15:00",
          advisor: "Lon Smith"
        }
      ],
      user_type: "faculty"
    };

    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.addToCalendar = this.addToCalendar.bind(this);
  }

  handleStartTimeChange(datetime) {
    this.setState({ start: datetime });
  }

  handleEndTimeChange(datetime) {
    this.setState({ end: datetime });
  }

  handleOptionChange = changeEvent => {
    this.setState({
      interval: changeEvent.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    fetch("/advising", {
      method: "POST",
      body: JSON.stringify({
        start: this.state.start,
        end: this.state.end,
        advisor: this.state.advisor,
        interval: this.state.interval
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(body) {
        console.log(body);
      });
  }

  addToCalendar() {
    alert("Added");
  }

  componentDidMount() {
    fetch("/advising")
      .then(res => res.json())
      .then(slotData => this.setState({ slots: slotData }));
  }

  render() {
    const availableSlots = this.state.slots.map(function(item, i) {
      return (
        <li key={i} className="availableSlots">
          {item.start.substring(6, 8)}
          {item.start.substring(8, 10)}-{item.start.substring(0, 4)}{" "}
          {item.start.substring(11, 16)} to {item.end.substring(6, 8)}
          {item.end.substring(8, 10)}-{item.end.substring(0, 4)}{" "}
          {item.end.substring(11, 16)}
        </li>
      );
    });

    const availableStudentSlots = this.state.slots.map(
      function(item, i) {
        return (
          <li key={i} className="availableSlots">
            {" "}
            {item.start.substring(6, 8)}
            {item.start.substring(8, 10)}-{item.start.substring(0, 4)}{" "}
            {item.start.substring(11, 16)} to {item.end.substring(6, 8)}
            {item.end.substring(8, 10)}-{item.end.substring(0, 4)}{" "}
            {item.end.substring(11, 16)} with {item.advisor}
            <Button onClick={this.addToCalendar} style={{ color: "green" }}>
              Add To Calendar
            </Button>
          </li>
        );
      }.bind(this)
    );
    if (this.state.user_type === "faculty") {
      return (
        <div className="advisingSlots">
          Advising Slots
          <Divider />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              autoOk
              disablePast
              inputVariant="outlined"
              margin="normal"
              label="Start Time"
              value={this.state.start}
              onChange={this.handleStartTimeChange}
            ></DateTimePicker>
            <Divider />
            <DateTimePicker
              autoOk
              disablePast
              inputVariant="outlined"
              margin="normal"
              label="End Time"
              value={this.state.end}
              onChange={this.handleEndTimeChange}
            />
          </MuiPickersUtilsProvider>
          <Divider />
          <div className="intervalButtons">
            <input
              type="radio"
              name="interval"
              value="15"
              checked={this.state.interval === "15"}
              onChange={this.handleOptionChange}
            />
            15 Minute Intervals
            <input
              type="radio"
              name="interval"
              value="30"
              checked={this.state.interval === "30"}
              onChange={this.handleOptionChange}
            />
            30 Minute Intervals
          </div>
          <Divider />
          <br />
          <Button variant="contained" onClick={this.handleSubmit}>
            Submit
          </Button>
          <div className="slotList">
            <ol>
              Available Times
              <br />
              {availableSlots}
            </ol>
          </div>
        </div>
      );
    } else {
      return (
        <div className="slotList">
          <ol>
            <h4>Available Advising Slots</h4>
            <br />
            {availableStudentSlots}
          </ol>
        </div>
      );
    }
  }
}

export default AdvisingSlots;
