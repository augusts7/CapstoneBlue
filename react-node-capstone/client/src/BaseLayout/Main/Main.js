import React from "react";
import Carosel from "../../components/Carousel/HomeCarousel";
import Calender from "../../components/Calendar/MyCalendar";
import EventList from "../../components/EventList/EventList";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' 
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

import "./Main.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [{
        eventID: 1,
        start: new Date(),
        end: new Date(),
        title: "Title",
        description: "esf"
      }]
    };
  }



  componentDidMount() {
    fetch("/single-event-layout")
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
            header = {{
                left: 'prev, next today',
                center: 'title',
                right: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek'
            }}
            schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
            events={this.state.events}
            dateClick={this.handleDateClick}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin]}
            height={550}
          />
        </div>
        <div class="main-events">
          <div className="events">
            <h3>My Events</h3>
            <EventList events={this.state.eventListItems} />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
