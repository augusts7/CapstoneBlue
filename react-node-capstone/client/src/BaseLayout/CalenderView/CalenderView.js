import React from "react";
import Calender from "../../components/Calendar/MyCalendar";
import AdvisingSlots from "../../components/AdvisingSlots/AdvisingSlots";

class CalenderView extends React.Component {
  render() {
    return (
      <div>
        <Calender />
        <AdvisingSlots />
      </div>
    );
  }
}

export default CalenderView;
