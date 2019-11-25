import React from "react";
import Carosel from "../../components/Carousel/HomeCarousel";
import CalendarView from "../../Views/CalenderView/HomeCalenderView";
import EventList from "../../components/EventList/EventList";
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



  render() {
    return (
      <div class="main">
        <div class="main-carousel">
          <Carosel />
        </div>
        <div class="main-calendar">
        <CalendarView/>
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
