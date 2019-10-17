import React from "react";
import Carosel from "../../components/Carousel/HomeCarousel";
import Calender from "../../components/Calendar/MyCalendar";
import EventList from "../../components/EventList/EventList";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

import "./Main.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
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
    return (
      <div class="main">
        <div class="main-carousel">
          <Carosel />
        </div>
        <hr />
        <div class="main-calendar">
          <FullCalendar
            className="calender"
            defaultView="dayGridMonth"
            schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
            events={this.state.events}
            dateClick={this.handleDateClick}
            plugins={[dayGridPlugin, interactionPlugin, resourceTimelinePlugin]}
            height={350}
          />
        </div>
        <div class="main-events">
          <div className="events">
            <h3>My Events</h3>
            <EventList />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
