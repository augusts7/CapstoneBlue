import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

import "./EventListPending.css";

class EventListPending extends Component {
  getMonth(month, type) {
    var monthName = "";
    var monthAbrv = "";
    switch (month) {
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
        monthAbrv = "Nov";
        break;
      case 12:
        monthName = "December";
        monthAbrv = "Dec";
        break;
      default:
        monthName = "Error: Not a valid month.";
        monthAbrv = "Error: Not a valid month.";
    }
    if (type === "name") {
      return monthName;
    } else if (type === "abrv") {
      return monthAbrv;
    }
  }

  denyEvent(event) {
    console.log(event);
    fetch("/events/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        event_id: event
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(body) {
        console.log(body);
      });
    this.props.action();
  }

  approveEvent(event) {
    console.log(event);
    fetch("/events/approveEvent/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        event_id: event
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(body) {
        console.log(body);
      });
    this.props.action();
  }

  render() {
    var eventsList;
    if (
      this.props.events !== undefined &&
      this.props.events !== null &&
      this.props.events.length > 0
    ) {
      eventsList = this.props.events.map(event => {
        return (
          <div className="eventListItem" key={event.eventID}>
            <div className="date">
              <div className="date-number">
                {new Date(event.start).getDate()}
              </div>
              <div className="date-name">
                {this.getMonth(new Date(event.start).getMonth() + 1, "abrv")}{" "}
              </div>
            </div>
            <div className="description">
              <div className="event-title">{event.title}</div>
              <div className="time">
                {new Date(event.start).toLocaleTimeString("en-US")} -{" "}
                {new Date(event.end).toLocaleTimeString("en-US")}
              </div>
              {event.description}
            </div>
            <div>
              <IconButton
                aria-label="deny"
                className="delete-event-button"
                onClick={() => this.denyEvent(event.eventID)}
              >
                <CloseIcon />
              </IconButton>
              <IconButton
                aria-label="approve"
                className="delete-event-button"
                onClick={() => this.approveEvent(event.eventID)}
              >
                <CheckIcon />
              </IconButton>
            </div>
          </div>
        );
      });
    } else {
      eventsList = (
        <div className="emptyEventList">
          <h5>No Events Requested</h5>
        </div>
      );
    }
    return <div className="eventList">{eventsList}</div>;
  }
}

export default EventListPending;
