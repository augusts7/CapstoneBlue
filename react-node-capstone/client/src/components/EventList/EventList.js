import React, { Component } from "react";

import "./EventList.css";

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          eventID: 1,
          title: "Event Title",
          description: "This is a description for the event",
          start: new Date(),
          end: new Date()
        },
        {
          eventID:2,
          title: "Event Title",
          description: "This is a description for the event",
          start: new Date(),
          end: new Date()
        }
      ]
    };
  }

  getMonth(month, type) {
    var monthName = "";
    var monthAbrv = "";
    switch(month){
      case 1: 
        monthName = "January";
        monthAbrv = "Jan";
        break;
      case 2: 
        monthName = "Febuary";
        monthAbrv = "Feb";
        break;
      case 3:
        monthName = "March";
        monthAbrv = "Mar";
        break;
      case 4: 
        monthName = "April";
        monthAbrv = "Apr";
        break;
      case 5: 
        monthName = "May";
        monthAbrv = "May";
        break;
      case 6:
        monthName = "June";
        monthAbrv = "Jun";
        break;
      case 7: 
        monthName = "July";
        monthAbrv = "Jul";
        break;
      case 8: 
        monthName = "August";
        monthAbrv = "Aug";
        break;
      case 9: 
        monthName = "September";
        monthAbrv = "Sept";
        break;
      case 10: 
        monthName = "October";
        monthAbrv = "Oct";
        break;
      case 11:
        monthName = "November";
        monthAbrv = "Nov"
        break;
      case 12:
        monthName = "December";
        monthAbrv = "Dec";
        break;
    }
    if(type==="name"){
      return monthName;
    }
    else if(type==="abrv"){
      return monthAbrv;
    }

  }

  render() {

    var eventsList = this.state.events.map(event => {
      return(
        <div class="eventListItem">
          <div class="date">
            <h2 class="date-number">{event.start.getDay()}</h2>
            <h4 class="date-name">{this.getMonth(event.start.getMonth(),"abrv")} </h4>
          </div>
          <h6 class="description">{event.description}</h6>
        </div>
      );
    });

    return (
      <div class="eventList">{eventsList}</div>
    );
  }
}

export default EventList;
