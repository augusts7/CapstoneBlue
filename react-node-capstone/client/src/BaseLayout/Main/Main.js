import React from "react";
import Carosel from "../../components/Carousel/HomeCarousel";
import Calender from "../../components/Calendar/MyCalendar";
import EventList from "../../components/EventList/EventList";

import "./Main.css";

class Main extends React.Component {
  render() {
    return (
      <div class= "main">
        <div class = "main-carousel">
          <Carosel />
        </div>
        <div class = "main-calendar">
          <Calender />
        </div>
        <div class = "main-events">
          <EventList />
        </div>
      </div>
    );
  }
}

export default Main;
