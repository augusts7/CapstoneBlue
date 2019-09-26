import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import "./MyCalendar.css";
import AdvisingSlots from "./AdvisingSlots";

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
      user_type: ""
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
      <div className="grid-container">
        <div className="advisingSlots">
          <AdvisingSlots />
        </div>
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
