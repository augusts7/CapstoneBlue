import React from "react";
import Carosel from "../../components/Carousel/Carousel.js";
import Calender from "../../components/Calendar/MyCalendar";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Carosel />
        <Calender />
      </div>
    );
  }
}

export default Main;
