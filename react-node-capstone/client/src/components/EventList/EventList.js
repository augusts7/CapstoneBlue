import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import Tooltip from "@material-ui/core/Tooltip";
import "./EventList.css";

class EventList extends Component {
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

  addToCalender(event) {
    fetch("/events/attending", {
      method: "POST",
      headers: {
        Accept: "application/json",
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

  deleteEvent(event) {
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
  getDeleteButton(eventID) {
    if (this.props.creator_id === this.props.user) {
      return (
        <Tooltip title="Delete from Calender">
          <IconButton
            aria-label="delete"
            onClick={() => this.deleteEvent(eventID)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      );
    }
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
            <div className="buttons">
              <div className="addToCal">
                <Tooltip title="Add to Calender">
                  <IconButton
                    size="medium"
                    aria-label="addToCal"
                    onClick={() => this.addToCalender(event.eventID)}
                  >
                    <EventAvailableIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="delete">
                {this.getDeleteButton(event.eventID)}
              </div>
            </div>
          </div>
        );
      });
    } else {
      eventsList = (
        <div className="emptyEventList">
          <h5>No Events Scheduled</h5>
        </div>
      );
    }
    return <div className="eventList">{eventsList}</div>;
  }
}

export default EventList;
