import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import "./MyCalendar.css";

class MyCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          title: "event 1",
          start: "2019-09-20"
        }
      ]
    };
  }

  handleDateClick = arg => {
    alert(arg.dateStr);
  };

  componentDidMount() {
    fetch("/events")
      .then(res => res.json())
      .then(eventData => this.setState({ events: eventData }));
  }

  render() {
    var { events } = this.state;
    return (
      <div className="calendar-container">
        <FullCalendar
          defaultView="dayGridMonth"
          schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
          events={events}
          dateClick={this.handleDateClick}
          plugins={[dayGridPlugin, interactionPlugin, resourceTimelinePlugin]}
        />
      </div>
    );
  }
}

export default MyCalendar;
