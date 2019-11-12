import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import "./MyCalendar.css";
import ls from "local-storage";

class MyCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          title: "event 1",
          start: "2019-09-20"
        }
      ],
      user_type: ls.get()
    };
  }

  handleDateClick = arg => {
    alert(arg.dateStr);
  };

  componentDidMount() {
    fetch("/single-event-layout")
      .then(res => res.json())
      .then(eventData => this.setState({ events: eventData }));
  }

  render() {
    var { events } = this.state;
    return (
      <div className="grid-container">
        <div className="advisingSlots"></div>
        <div className="calendar-container">
          <FullCalendar
            defaultView="dayGridMonth"
            schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
            events={events}
            dateClick={this.handleDateClick}
            plugins={[dayGridPlugin, interactionPlugin, resourceTimelinePlugin]}
            height={700}
          />
        </div>
      </div>
    );
  }
}

export default MyCalendar;
